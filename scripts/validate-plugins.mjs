#!/usr/bin/env node
// Repository packaging checks; does not execute skills or certify model behavior.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

function check(condition, message) {
  if (!condition) throw new Error(message);
}

function inside(root, target) {
  return target === root || target.startsWith(root + path.sep);
}

function markdownFiles(directory) {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const target = path.join(directory, entry.name);
    return entry.isDirectory() ? markdownFiles(target) : entry.name.endsWith('.md') ? [target] : [];
  });
}

function readJson(filename) {
  return JSON.parse(fs.readFileSync(filename, 'utf8'));
}

function validatePlugin(directory) {
  const root = fs.realpathSync(directory);
  const manifest = readJson(path.join(root, '.codex-plugin/plugin.json'));
  check(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(manifest.name ?? ''), 'Invalid plugin name');
  check(/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/.test(manifest.version ?? ''), 'Invalid plugin version');
  check(typeof manifest.description === 'string' && manifest.description.trim(), 'Missing plugin description');
  check(typeof manifest.skills === 'string' && !path.isAbsolute(manifest.skills), 'Skills must use a relative path');
  const skillsRoot = fs.realpathSync(path.resolve(root, manifest.skills));
  check(inside(root, skillsRoot), 'Skill root escapes plugin');
  const skills = fs.readdirSync(skillsRoot, { withFileTypes: true })
    .filter(entry => entry.isDirectory()).map(entry => path.join(skillsRoot, entry.name, 'SKILL.md'));
  check(skills.length > 0, 'Plugin contains no skills');
  const names = new Set();
  for (const filename of skills) {
    const contents = fs.readFileSync(filename, 'utf8');
    const header = contents.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/)?.[1];
    check(header, `Missing skill frontmatter: ${filename}`);
    const name = header.match(/^name:\s*([a-z0-9-]+)\s*$/m)?.[1];
    check(name === path.basename(path.dirname(filename)), `Skill name/folder mismatch: ${filename}`);
    check(!names.has(name), `Duplicate skill name: ${name}`);
    names.add(name);
    check(/^description:\s*\S.+$/m.test(header), `Missing skill description: ${filename}`);
  }

  // Follow links from entrypoints to check that every packaged reference is usable
  // with this plugin installed by itself, including after relocation.
  const visited = new Set();
  const queue = [...skills];
  while (queue.length) {
    const filename = fs.realpathSync(queue.shift());
    check(inside(root, filename), `Reference escapes plugin: ${filename}`);
    if (visited.has(filename)) continue;
    visited.add(filename);
    const contents = fs.readFileSync(filename, 'utf8');
    for (const match of contents.matchAll(/\[[^\]\n]*\]\(([^)\s]+)\)/g)) {
      const href = match[1];
      if (/^(?:https?:|mailto:|#)/.test(href)) continue;
      check(!path.isAbsolute(href) && !/^[a-z]+:/i.test(href), `Nonportable reference: ${href}`);
      const target = path.resolve(path.dirname(filename), decodeURIComponent(href.split('#')[0]));
      check(inside(root, target), `Reference escapes plugin: ${href}`);
      check(fs.existsSync(target), `Missing reference in ${filename}: ${href}`);
      const resolved = fs.realpathSync(target);
      check(inside(root, resolved), `Reference symlink escapes plugin: ${href}`);
      if (resolved.endsWith('.md')) queue.push(resolved);
    }
  }
  for (const reference of markdownFiles(path.join(root, 'references'))) {
    check(visited.has(fs.realpathSync(reference)), `Unreachable reference: ${reference}`);
  }
  return `${manifest.name} ${manifest.version}: ${skills.length} skills, ${visited.size - skills.length} references`;
}

try {
  const args = process.argv.slice(2);
  if (args[0] === '--plugin' && args.length === 2) {
    console.log(`PASS ${validatePlugin(args[1])}`);
  } else {
    check(args.length === 0, 'Usage: node scripts/validate-plugins.mjs [--plugin PATH]');
    const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
    const catalog = readJson(path.join(root, '.agents/plugins/marketplace.json'));
    check(Array.isArray(catalog.plugins) && catalog.plugins.length > 0, 'Marketplace contains no plugins');
    const names = new Set();
    for (const entry of catalog.plugins) {
      check(!names.has(entry.name), `Duplicate marketplace entry: ${entry.name}`);
      names.add(entry.name);
      check(entry.source?.source === 'local', `Expected local source: ${entry.name}`);
      check(typeof entry.source.path === 'string' && !path.isAbsolute(entry.source.path), 'Nonportable marketplace path');
      const target = fs.realpathSync(path.resolve(root, entry.source.path));
      check(inside(root, target), 'Marketplace source escapes repository');
      const manifest = readJson(path.join(target, '.codex-plugin/plugin.json'));
      check(manifest.name === entry.name, `Marketplace name mismatch: ${entry.name}`);
      console.log(`PASS ${validatePlugin(target)}`);
    }
  }
} catch (error) {
  console.error(`FAIL ${error.message}`);
  process.exitCode = 1;
}
