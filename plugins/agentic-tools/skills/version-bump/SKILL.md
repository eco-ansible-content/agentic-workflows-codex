---
name: version-bump
description: Use when preparing a release or changing plugin content in this repository; update the owning Codex plugin version and verify marketplace consistency.
---

# Codex Plugin Version Bump

This repository publishes two independent plugins: `agentic-workflows` and `agentic-tools`. Determine which `plugins/<name>/` tree changed; bump both only when both changed.

## Procedure

1. Read the current manifest version and classify the change: patch for fixes/content edits, minor for a new compatible skill/capability, major for breaking behavior.
2. Update `plugins/<name>/.codex-plugin/plugin.json` using SemVer. Confirm the marketplace entry name and relative source path still match the folder and manifest name.
3. Validate the changed plugin with the plugin validator. Check JSON parsing, the skill frontmatter, and that manifest metadata contains no placeholders.
4. Update release notes/README if behavior, prerequisites, or installation changed. Run representative skill smoke tests in a fresh Codex session after installation.

Do not alter the other plugin version merely because the marketplace lists both. Do not add cachebuster build metadata to a public release version unless performing a local development reinstall.
