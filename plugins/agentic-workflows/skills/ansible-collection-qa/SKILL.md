---
name: ansible-collection-qa
description: Use when testing, reviewing, or diagnosing quality gaps in an Ansible collection or a completed collection module.
---

# Ansible Collection QA

Validate behavior and executed evidence. Read [repository contract](../../references/collection-contract.md), the project brief, changed implementation, relevant base classes/helpers, tests, and CI even when invoked directly. For `ansible.proxmox`, read [Proxmox framework](../../references/proxmox-collection.md).

## Select applicable scenarios

| Module role | Verification |
| --- | --- |
| Resource lifecycle | Applicable create/update/delete, repeat/no-op, check-mode predictions with no mutation, actual-state and value assertions, documented defaults/reset/immutable behavior |
| Imperative action | Documented operation and completion, applicable already-satisfied behavior, safe check-mode prediction, failure handling; no invented CRUD states |
| Information | Supported list/filter/no-result paths, documented output values and errors, `changed=False` including check mode |
| Standalone read/connection information | Documented read/access result and no mutation; no invented filters, paired mutation module, or resource cleanup |

Trace inherited and delegated operations; direct endpoint names need not appear in a subclass. API use does not exempt check mode. Compare behavior to documented scope and acceptance criteria rather than demanding every platform operation.

## Quality and execution gates

- Check argument specs, shared fragments, examples, returns, action-group registration, dependency metadata, sensitive-data handling, and actionable error paths.
- Require unit tests for affected Python logic and regressions for affected shared-helper consumers. Trace imports, subclasses and delegated hooks to select consumers; explain uncertain mappings and choose sufficient coverage rather than assuming only the edited module is affected. Do not mark missing coverage as passing because live infrastructure is unavailable.
- Follow test includes/imports, fixture role dependencies, defaults, variables, and effective `module_defaults`. Accept paired action/info targets and justified supporting-resource setup; preserve isolation through resource ownership.
- Check cleanup of primary and supporting resources in `always`, continued attempts after errors, and removal verification. `ignore_errors` or `failed_when: false` can permit continuation but do not establish successful cleanup; expose leftover resources.
- Use repository commands and the required collection layout with supported Python/Core versions. Start with relevant narrow checks and include affected regressions. Inspect selected integration targets: an empty selection is a gap when known affected tests were expected.
- For an available confirmed test environment, verify actual state with an info/read operation after mutations and check-mode operations. Compare concrete values, not just existence of result variables.

Record commands, selected targets, outcome, source/worktree revision, and gaps. The brief's integration policy is `local`, `protected_ci`, or explicit `code_only` (see the repository contract); never silently switch after a failure. In protected-CI mode local checks can precede an authorized draft PR while integration remains pending. Approval waits, infrastructure failures, and unavailable environments remain distinct from pass.

Return a compact matrix: item, applicable check, inspected versus executed evidence, outcome, cause, and next action. Add a focused regression when fixing a demonstrated defect. Fully validated requires all applicable required checks for the current changes; high coverage, green units, or a structurally valid target alone is insufficient.
