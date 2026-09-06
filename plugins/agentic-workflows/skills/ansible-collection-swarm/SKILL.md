---
name: ansible-collection-swarm
description: Use when the user asks to build, scaffold, or enhance an Ansible collection from a Jira Task, Epic, ANSTRAT, or equivalent requirements.
---

# Ansible Collection Swarm

Deliver a complete Ansible collection or a review-ready enhancement. Work autonomously after the minimum context is gathered, but do not claim access, test results, or delivery that was not verified.

## Operating contract

First establish only what is essential:

1. Work item or complete requirements; retrieve it from Jira when access exists.
2. Target collection location and whether this is a new build or an enhancement.
3. Delivery target: local changes, branch/PR, or a repository URL.
4. Test environment, or explicit code-only validation.

Use supplied analysis as authority. Persist material requirements in `docs/plans/PROJECT_BRIEF.md` in the target collection: goals, module backlog, constraints, prerequisites, quality rules, and definition of done. Do not ask further permission for normal in-scope work. Escalate only for missing credentials, external destructive operations, a contradictory requirement, or a decision that changes scope.

## Lifecycle

### 1. Ingest and plan

Read the work item and existing repository. Classify scope: Task = one module, Epic = related backlog, ANSTRAT = multiple Epics. Resolve dependencies and acceptance criteria. Prefer an existing collection if `galaxy.yml` is found; otherwise create a new collection in the agreed location.

Classify the platform by characteristics, not its brand name:

| Evidence | Primary pattern |
| --- | --- |
| HTTP endpoints, JSON, OAuth | REST API |
| Python client/library | SDK |
| PowerShell cmdlets | Windows/PowerShell |
| Device commands or network connection | CLI/network |
| Desired file state | Configuration file |
| SQL queries/connection | Database |

Research authoritative vendor documentation for unfamiliar APIs, SDK calls, permissions, and lifecycle semantics. Record the specific operation backing every module; never fabricate an endpoint or cmdlet.

### 2. Foundation or enhancement

For new collections, create standard Ansible collection structure: `galaxy.yml`, `README.md`, `plugins/modules`, `plugins/module_utils`, `tests/integration/targets`, docs, changelog fragments, CI configuration compatible with the target project, and an inventory template. Do not overwrite an existing structure unnecessarily.

For enhancements, inventory modules, utilities, tests, CI rules, branch conventions, and changelog policy before editing. Preserve established patterns unless the brief requires a deliberate migration.

### 3. Prerequisites

Check required CLIs, Python/PowerShell dependencies, credentials, and test connectivity before a batch. Make up to three focused recovery attempts for a setup failure, logging commands, errors, and the next action. If the environment remains unavailable, continue safe code-only work, mark integration validation blocked, and leave exact reproduction steps.

### 4. Implement in small batches

Prioritize independent modules. For each module invoke the `ansible-collection-worker` workflow principles: complete argument validation, read-before-write state comparison, idempotency, check mode, structured error handling, sensitive-data protection, documentation, unit coverage where practical, and integration tests. Reuse `module_utils`; extract a utility after repeated logic appears in three places.

Maintain a status table in the project brief: planned, implemented, tested, blocked, and reason. Do not implement placeholders merely to count a module as complete.

### 5. Verify and refactor

Use `ansible-collection-qa` principles after each module or batch. Run the narrowest relevant checks first, then collection lint/unit/integration checks available in the repository. Refactor after roughly ten modules or when duplication materially harms consistency. Regression-test affected modules.

### 6. Deliver and learn

Use `ansible-collection-delivery` principles. Create focused commits and changelog fragments; create a PR only if the target and authentication are available. Monitor CI when requested, diagnose from logs, and apply focused fixes. Do not force-push a protected or user-owned branch.

Capture reusable, evidence-backed lessons in `insights/` or the project’s existing learning location. Lessons describe trigger, diagnosis, proven remedy, and applicability; do not record secrets or unverified speculation.

## Completion report

Return: scope handled; modules and tests completed; blocked work with cause and recovery command; changed paths; validation commands/results; delivery location or PR; and learning captured. Clearly distinguish code-only validation from successful integration testing.
