---
name: ansible-collection-worker
description: Use when implementing or repairing one Ansible collection module, its shared utility code, documentation, and tests.
---

# Ansible Collection Module Worker

Implement the requested behavior through the existing collection architecture. Direct invocation requires the same discovery as a swarm handoff.

## Before editing

Read [repository contract](../../references/collection-contract.md), the project brief if present, neighboring modules, relevant utilities and base classes, documentation fragments, target tests, requirements, and CI. Establish the source revision, requested scope, module role, required framework hooks, and selected test environment. For `ansible.proxmox`, read [Proxmox framework](../../references/proxmox-collection.md).

Trace inherited/delegated behavior before adding code: a module may obtain connection, state comparison, result shaping, or check mode from a base class. Verify required framework code is on the selected base. Do not create a competing framework to work around a missing prerequisite. Preserve user changes and establish the branch before edits; coordinate ownership of shared files.

## Implementation contract

- **Resource lifecycle:** query current state; reconcile only requested create/update/delete behavior; preserve documented omission, empty-list, reset, and immutable-field semantics.
- **Imperative action:** implement the documented operation, applicable no-op detection, result data, and check-mode prediction. Do not invent `present`/`absent` or unrelated CRUD requirements.
- **Information/standalone read:** expose documented data with `changed=False`; filters and empty-result behavior depend on the actual interface, not naming alone.
- Reuse shared client, argument builders, lifecycle hooks, normalization, task/power/error/result helpers, and doc fragments. Apply the repository's scalar/structured parameter types rather than forcing bulk interfaces.
- Support check mode without mutations, including power operations; read-only API calls may still be necessary. Respect documented safety/permission checks in check mode.
- Validate inputs/dependencies and use `no_log` for secrets. Retain useful, secret-free platform error context through the existing structured error path.
- Wait for asynchronous work through the shared task mechanism where the contract requires completion; distinguish request timeout, operation timeout, and cancellation semantics.
- Keep docs/spec/defaults/returns aligned. Update action-group membership, runtime/EE/test requirements, and metadata when needed; maintain the target's `version_added` and changelog conventions.

## Tests and handoff

Add focused unit tests for new/changed Python module and utility behavior, using existing fake-client/mock conventions. Include affected consumers when changing shared helpers; mocks do not replace required live integration.

Use repository-native integration task lists, declared setup fixtures, paired targets, defaults, and includes. Test the role's applicable state transitions, idempotency/no-op behavior, check-mode immutability, actual state, useful returned values, and failure paths. Cover special default/empty-list/power/task semantics affected by the change. Read-only connection information need not support CRUD or arbitrary filters.

Create only owned test resources with unique identifiers. Cleanup owned dependencies through `always`, continue after individual cleanup errors, and verify removal or expose remaining failures. Use configured shared `module_defaults` and integration configuration for API credentials, without introducing a remote inventory or authentication environment unnecessarily.

Run repository commands with supported versions from the contract. Record executed checks and failures against the revision/worktree state; report missing infrastructure as blocked. Hand QA the changed paths, hooks used, tests and affected consumers, commands/results, outstanding gaps, and any owned resources still requiring cleanup.
