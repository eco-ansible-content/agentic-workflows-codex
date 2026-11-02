---
name: ansible-module-audit
description: Use when auditing one Ansible module for platform-operation coverage, module_utils reuse, integration tests, cleanup, and test reuse; return a score out of 100 with a separate readiness verdict.
---

# Ansible Module Audit

Audit one named module read-only. Return findings in the conversation; fixes, mutating tests, and generated files require a separate request. Read [collection analysis](../../references/collection-analysis.md); this tool does not depend on the workflow plugin.

## Collect evidence

Read collection metadata, all implementation files for the module, relevant utility/base classes, argument builders, doc fragments, runtime/action groups, requirements, and comparable modules. Determine documented scope, role, source revision and service/version. Research the actual authoritative operation surface; do not infer it from module names.

Trace inheritance and delegation through lifecycle hooks and shared clients: lack of a direct API call or explicit utility call in a subclass does not mean the behavior is missing. Assess creation-only or deliberately separate capabilities against documented scope. Treat documentation/code contradictions as findings, not authority to silently broaden the module.

Resolve the exact or paired/base-name integration target. Follow includes/imports, fixture role dependencies, defaults, variables and effective `module_defaults`. Inspect unit tests and affected shared-helper consumers too. Read-only connection information, resource lifecycle and imperative actions have different applicable scenarios; do not invent CRUD states, filters, or name-matched info counterparts.

## Scorecard

| Dimension | Maximum | Evaluate |
| --- | ---: | --- |
| Platform operation coverage | 25 | Documented applicable operations, inherited/delegated implementation, meaningful outputs and errors |
| Shared utility use | 20 | Applicable clients, hooks, arguments, normalization, errors and result helpers reused without duplication |
| Integration-test coverage | 25 | Role-specific state/read/action behavior, check mode, idempotency/no-op, actual-state/value assertions, error/no-result paths where applicable |
| Test cleanup | 15 | Owned primary/supporting resources removed through guaranteed cleanup, continued attempts, error visibility and removal verification |
| Integration-test reuse and maintainability | 15 | Repository-native fixtures/includes/paired targets, unique resource ownership, clear assertions and repeatable structure |

Justify points and missing evidence for each dimension. Mark a dimension `N/A` only when intrinsically irrelevant (for example cleanup for read-only tests that create no fixtures). Missing tests/evidence are not `N/A`: keep the applicable maximum and identify the gap. Distinguish source coverage from execution; unavailable execution does not erase source coverage but cannot establish a passing run.

The reuse dimension evaluates integration tests. If required integration coverage is absent, integration coverage and integration reuse both score zero; unit tests are assessed in the separate readiness gate and do not substitute for an absent integration target. Cleanup can still be inapplicable for a fixture-free read-only module. Cite evidence for any claimed absence after searching paired targets and their includes/dependencies.

Show earned/applicable points and normalized quality score `100 * earned / applicable_max`, rounded consistently; if nothing is assessable, report unassessed rather than 100. Show excluded dimensions and do not compare differently scoped scores as identical measures. Quality bands are strong (90–100), targeted work (70–89), and incomplete (below 70); a band is not a readiness verdict.

Cleanup may continue through `ignore_errors`, `failed_when: false`, or another justified pattern. Credit continuation, then check detection and verification of failed removal. Do not award full cleanup assurance solely because errors are suppressed. Fixtures and supporting module calls are legitimate when justified and owned; do not impose universally empty target dependencies.

## Readiness gates, separate from points

Report each required gate as satisfied, failed, unverified, or not applicable, with evidence:

- Unit tests for affected Python module/utility behavior and regressions for affected shared consumers.
- Doc/spec/default/return agreement, doc fragments, action-group registration and dependency/EE metadata.
- Applicable auth/TLS/secrets/errors, asynchronous completion/timeouts, check-mode immutability, and documented power/default/empty-list behavior.
- Required executed checks, actual selected integration targets, and relevant CI results for the current changes/revision.
- Owned-resource cleanup assurance and unresolved prerequisite/environment constraints.

Set readiness to `ready` only with all applicable required gates satisfied by current evidence; `needs_work` for demonstrated defects; `blocked` for established external prerequisites; `unverified` when required evidence is unavailable. List multiple causes when relevant. A high normalized score cannot override a failed, blocked, or unverified required gate. Never imply this read-only audit ran tests.

## Output

Return scope/role/revision, operation table (used/missing/not applicable/unknown), the five-dimension scorecard and normalization, separate readiness gates/verdict, inspected versus executed evidence, prioritized fixes with paths, and research uncertainty. Cite concrete source locations and the primary references supporting API claims.
