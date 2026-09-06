---
name: ansible-collection-qa
description: Use when testing, reviewing, or diagnosing quality gaps in an Ansible collection or a completed collection module.
---

# Ansible Collection QA

Validate behavior, not just syntax. Read the module, utility code, test target, project brief, and CI configuration before choosing checks.

## Four-stage action-module verification

1. Check mode predicts create/update/delete without changing the target.
2. First `present` run changes the target and asserts useful returned values.
3. The same `present` run is idempotent.
4. `absent` removes the target and a repeated `absent` run is idempotent.

Verify actual remote state with an info/read operation after mutations. For info modules test unfiltered list, targeted lookup, no-result handling, and values—not only variable existence.

## Quality gates

- Validate docs, argument spec, return schema, and examples against implementation.
- Detect duplicated utility logic, unsafe secret handling, missing check mode, and errors that conceal the platform response.
- Confirm tests isolate names/resources and clean dependencies in `always` blocks.
- Run the repository’s narrow checks first, then unit, integration, sanity, lint, and CI-equivalent commands where available.
- Treat unavailable infrastructure as blocked validation, never a pass.

Report a compact matrix: module, checks run, outcome, evidence, failure cause, owner/next action. When fixing a failure, add a regression test before declaring it resolved.
