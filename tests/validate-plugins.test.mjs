import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const validator = path.join(root, 'scripts/validate-plugins.mjs');

function isolatedPlugin(t, name) {
  const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'codex-plugin-test-'));
  t.after(() => fs.rmSync(temporary, { recursive: true, force: true }));
  const target = path.join(temporary, 'installed-plugin');
  fs.cpSync(path.join(root, 'plugins', name), target, { recursive: true });
  return target;
}

function validate(target) {
  return spawnSync(process.execPath, [validator, '--plugin', target], { encoding: 'utf8' });
}

for (const name of ['agentic-workflows', 'agentic-tools']) {
  test(`${name} resolves references when installed alone at a new path`, t => {
    const result = validate(isolatedPlugin(t, name));
    assert.equal(result.status, 0, result.stderr);
  });
}

test('missing packaged references fail validation', t => {
  const target = isolatedPlugin(t, 'agentic-tools');
  fs.rmSync(path.join(target, 'references/collection-analysis.md'));
  const result = validate(target);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /Missing reference/);
});

test('references cannot rely on a sibling plugin', t => {
  const target = isolatedPlugin(t, 'agentic-tools');
  fs.appendFileSync(path.join(target, 'references/collection-analysis.md'), '\n[external](../../other-plugin/reference.md)\n');
  const result = validate(target);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /escapes plugin/);
});

test('skill identity must match its installed folder', t => {
  const target = isolatedPlugin(t, 'agentic-tools');
  const filename = path.join(target, 'skills/ansible-module-audit/SKILL.md');
  fs.writeFileSync(filename, fs.readFileSync(filename, 'utf8').replace('name: ansible-module-audit', 'name: mismatched-skill'));
  const result = validate(target);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /name\/folder mismatch/);
});
