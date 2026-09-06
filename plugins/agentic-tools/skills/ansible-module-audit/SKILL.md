---
name: ansible-module-audit
description: Use when auditing one Ansible module for platform-operation coverage, module_utils reuse, integration tests, cleanup, and test reuse; return a score out of 100.
---

# Ansible Module Audit

Audit one named module in the current collection. Do not change files unless the user separately asks for fixes.

## Evidence collection

Read `galaxy.yml`; module implementation files; all relevant `plugins/module_utils`; exact or base-name integration target; and two or three comparable modules. Detect interaction type: PowerShell cmdlet, REST, SDK, CLI, config, or database. Research the authoritative operation surface for the resource.

## Scorecard

| Dimension | Points | Evaluate |
| --- | ---: | --- |
| Platform operation coverage | 25 | Applicable read/create/update/delete operations are implemented; info modules expose useful fields. |
| Shared utility use | 20 | Reuses applicable connection, comparison, error, pagination, and result helpers; no needless duplication. |
| Integration-test coverage | 25 | CRUD/read paths, check mode, idempotency, actual-state/value assertions, and error/no-result paths. |
| Test cleanup | 15 | `block`/`always` cleanup removes primary and dependent resources, continues after errors, and verifies removal. |
| Test reuse and maintainability | 15 | Uses existing setup/assertion patterns, stable names, isolation, and clear docs. |

For each dimension, cite concrete evidence, missing behavior, and a proportionate score. “Not tested because no environment exists” is not passing evidence. Total the score and classify 90–100 ready, 70–89 needs targeted work, below 70 incomplete.

## Output

Return the scorecard, operations table (used/missing/not applicable), priority fixes, exact affected paths, and any research uncertainty. Never infer API support from module names alone.
