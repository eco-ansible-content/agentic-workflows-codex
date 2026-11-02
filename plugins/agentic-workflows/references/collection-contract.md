# Repository contract

Read this before implementation, QA, or delivery. Derive the contract from the selected checkout and explicit user requirements; preserve existing supported interfaces and report conflicting requirements instead of inventing behavior.

## Discover

Read project instructions, `galaxy.yml`, `meta/runtime.yml`, requirements and EE metadata, representative modules, their inherited utility classes, doc fragments, test targets/fixtures, Makefile, and contribution/CI rules. Resolve source revision and actual upstream/fork identities. Separate the module execution location (controller/EE versus managed host), transport, and managed API/service.

Classify each work item as resource lifecycle, information, imperative action, or standalone utility/read. A naming convention suggests a role but does not prove its API or imply a required counterpart module. Map observable capabilities across existing modules. Check documented module boundaries, identifiers, omission/default/reset semantics, result keys, framework hooks, and prerequisites.

Use authoritative documentation for the selected service/version and SDK mapping. A module's dependency may be an unmerged PR, shared helper, test fixture, permission, or environment resource; verify its availability before scheduling dependent implementation. Preserve existing collection license/metadata/CI during enhancement.

## Brief and handoff

The workflow records these facts in the target's existing `docs/plans/PROJECT_BRIEF.md`; standalone analysis keeps equivalent evidence in memory. Reuse existing project state instead of creating a second competing backlog.

| Field | Record |
| --- | --- |
| Source | Collection root/FQCN, repository, base/head SHA or worktree state, prerequisite revision/PR |
| Scope | Requested ticket(s), acceptance criteria, module role and documented boundaries |
| Implementation | Existing client/base classes, lifecycle hooks, shared args/docs, identifiers, result shapes |
| Environment | Python/Core/service versions, libraries and execution location, TLS/auth mode, required resources and secret references |
| Tests | Target/fixture mappings, includes/defaults, unit and shared-consumer regressions, repository commands and required matrix |
| Delivery | User-selected target, branch/upstream/fork, changelog policy, expected CI checks and protected environment |
| Evidence | Commands/targets actually run, revision, outcome, missing evidence, next action |

For secrets, store names/references rather than values. Keep planning artifacts and generated secret-bearing config out of delivered changes. Resolve each plugin reference relative to its installed skill; do not depend on another checkout or plugin.

## Validation policy

Establish the integration policy from supplied project context; ask only if the missing choice affects permitted delivery:

- `local`: execute required live checks before publication; unavailable infrastructure remains blocked.
- `protected_ci`: local unit/sanity/docs checks precede an authorized draft PR needed for live validation. Integration remains pending through protected approval and completion.
- `code_only`: explicitly requested implementation/local validation; report live checks as unverified with recovery requirements.

Do not switch policy automatically when checks fail. Support the repository's versions and collection layout. Use role task lists for `ansible-test` integration; retain declared fixtures and justified supporting modules, paired targets, and shared `module_defaults`. Isolation comes from owned resources and cleanup rather than universally empty dependencies. Trace includes/defaults and verify target discovery.

Require unit tests for affected Python behavior and regressions for affected consumers of shared changes. Resource tests cover applicable lifecycle/check-mode/no-op behavior; info and imperative actions use their actual interfaces. Check mode can make reads but must not mutate. Cleanup continues after individual errors and exposes failed removal rather than silently claiming success.

Track implementation, local validation, integration pending, approval required, blocked, failed, and fully validated independently. Record command/target/revision evidence and invalidate affected results after changes. Missing infrastructure, a high audit score, or a green run without relevant tests cannot establish readiness.
