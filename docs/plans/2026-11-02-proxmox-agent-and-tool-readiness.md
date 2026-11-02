# Plan: prepare the Codex agents and tools for Proxmox

Date: 2026-11-02

Status: instruction and tool enhancements implemented; packaging and read-only behavioral validation recorded; live Proxmox pilot and installation remain pending

## Scope and objective

Upgrade the existing Codex-ready agents and tools in `agentic-workflows-codex` to build and enhance `ansible.proxmox` according to its established architecture, dependencies, tests, and contribution workflow.

This is the Codex-adjusted copy of the original agent workflows. Preserve its functional roles and compact skill packaging. This work is an upgrade to that implementation, not another port or a parallel upgrade of the Claude agents.

The confirmed implementation root is [agentic-workflows-codex](/Users/hyaish/Documents/Git/agentic-workflows-codex). Existing implementation targets below link directly to files inside that exact folder. The path `plugins/agentic-workflows/skills/ansible-collection-swarm/SKILL.md` therefore resolves to `/Users/hyaish/Documents/Git/agentic-workflows-codex/plugins/agentic-workflows/skills/ansible-collection-swarm/SKILL.md`.

The sibling Claude repository provides background context only. These absolute links identify the development files to upgrade. Instructions shipped in the plugins must continue to use installed-plugin-relative paths so users do not need this developer checkout.

Success means that the Codex workflow produces a focused, reviewable Proxmox change using the shared framework, and that the Codex tools assess it accurately. Code completion, an audit score, a working API connection, and unit-test success must remain distinct from successful live integration.

The user subsequently authorized implementing these agent/tool enhancements and publishing the minor plugin upgrade. Building target-collection modules, running a live pilot, and merging target-collection changes remain separate work requiring their normal project context and delivery scope.

## Inspected baseline

The implementation baseline was Codex commit `fdd4679`, with both plugins at `1.0.0`. The enhanced source manifests use `1.1.0` for the requested minor release. Source publication is verified by the release task; installed-session validation remains pending.

The collection research baseline is [ansible.proxmox PR #1](https://github.com/ansible-collections/ansible.proxmox/pull/1), reviewed head `09c173588bbdc2c08f4e6e88a2f96864b0105144`. It was initially open during planning, but the implementation-time refresh confirms it merged on 2026-11-02 as `2465107d0f713132f3a7c627c051025dcd2101a8`. Main was `57cba3e5d7c092330490030108188622a7a89d23` at refresh. Verify required framework code on the actual selected base rather than retaining an obsolete unmerged-prerequisite blocker.

### Implementation record

The four workflow skills, Epic analysis, and module audit are enhanced in place. Both plugins carry their own references; packaging checks exercise independent relocated installation. The version-bump skill is unchanged. See [validation notes](../PROXMOX-VALIDATION.md) for executed checks and limitations. The detailed phases below retain the agreed design; the live end-to-end pilot is outstanding.

| Area | Observed collection contract |
|---|---|
| Identity | `ansible.proxmox`, GPL-3.0-or-later; initial metadata version `1.0.0` |
| Runtime | Ansible Core >=2.16, Python >=3.11; documented PVE 9 support |
| Dependencies | `proxmoxer>=2.3.0` and `requests`; runtime, EE, and test requirement files |
| Execution | HTTPS from the module execution environment; password or token authentication; certificate validation enabled by default |
| Services | PVE by default; shared client supports internal PBS selection; current resource modules and live tests are PVE-specific |
| Shared code | Client, base, resource, info, imperative-action, task, and power helpers in `plugins/module_utils/` |
| Metadata | Shared doc fragments and `meta/runtime.yml` action group `proxmox` |
| Tests | Module and utility unit tests; paired action/info target; task lists; `prepare_tests` dependency; randomized IDs; `module_defaults`; `always` cleanup |
| CI | GitHub Actions, protected integration approval, self-hosted Proxmox runner, serialized Core 2.16/2.18/2.20/2.21 live matrix, separate SonarCloud workflow |

Primary references: [README](https://github.com/ansible-collections/ansible.proxmox/blob/09c173588bbdc2c08f4e6e88a2f96864b0105144/README.md), [module utilities](https://github.com/ansible-collections/ansible.proxmox/tree/09c173588bbdc2c08f4e6e88a2f96864b0105144/plugins/module_utils), [VM implementation](https://github.com/ansible-collections/ansible.proxmox/blob/09c173588bbdc2c08f4e6e88a2f96864b0105144/plugins/modules/proxmox_vm.py), [integration targets](https://github.com/ansible-collections/ansible.proxmox/tree/09c173588bbdc2c08f4e6e88a2f96864b0105144/tests/integration/targets), [Makefile](https://github.com/ansible-collections/ansible.proxmox/blob/09c173588bbdc2c08f4e6e88a2f96864b0105144/Makefile), and [workflows](https://github.com/ansible-collections/ansible.proxmox/tree/09c173588bbdc2c08f4e6e88a2f96864b0105144/.github/workflows).

Earlier comments about SSH support, hidden API errors, and fixed short task timeouts describe superseded code. Compare review suggestions with the selected source revision before making them instructions.

## Files and responsibilities

The files below were verified on disk in the confirmed implementation root. This Codex copy packages the agent roles in four workflow skills. Upgrade these existing source files in place.

| Target | Responsibilities |
|---|---|
| [Swarm source](/Users/hyaish/Documents/Git/agentic-workflows-codex/plugins/agentic-workflows/skills/ansible-collection-swarm/SKILL.md) | Lead architect, Jira ingestion, foundation/enhancement, prerequisites, batches, refactoring, completion, and learning |
| [Module worker source](/Users/hyaish/Documents/Git/agentic-workflows-codex/plugins/agentic-workflows/skills/ansible-collection-worker/SKILL.md) | One module's implementation, shared-code use, documentation, metadata, and tests |
| [QA source](/Users/hyaish/Documents/Git/agentic-workflows-codex/plugins/agentic-workflows/skills/ansible-collection-qa/SKILL.md) | QA coordination, applicable behavior checks, regressions, test evidence, cleanup, and readiness |
| [Delivery source](/Users/hyaish/Documents/Git/agentic-workflows-codex/plugins/agentic-workflows/skills/ansible-collection-delivery/SKILL.md) | Release coordination, focused delivery, changelog policy, CI validation, and lessons |
| [Epic analysis source](/Users/hyaish/Documents/Git/agentic-workflows-codex/plugins/agentic-tools/skills/ansible-epic-analysis/SKILL.md) | Scope, existing coverage, dependencies, module roles, API feasibility, and implementation order |
| [Module audit source](/Users/hyaish/Documents/Git/agentic-workflows-codex/plugins/agentic-tools/skills/ansible-module-audit/SKILL.md) | Evidence-based scoring plus a separate readiness verdict |
| [Version-bump source](/Users/hyaish/Documents/Git/agentic-workflows-codex/plugins/agentic-tools/skills/version-bump/SKILL.md) | Existing plugin release procedure; no Proxmox-specific behavior change needed |

Add concise references under `/Users/hyaish/Documents/Git/agentic-workflows-codex/plugins/agentic-workflows/references/`. This is a proposed addition in the same source tree. Keep standalone tools independently usable; they must not require the workflow plugin or the Claude repository.

## Phase 1: establish the repository contract and skill handoffs

Extend the existing repository discovery rather than replacing it with platform templates. Read collection metadata, requirements, neighboring modules, shared classes, doc fragments, tests, CI, and project instructions before implementation.

Record the following non-secret facts in the target collection's existing `docs/plans/PROJECT_BRIEF.md`:

- Repository/FQCN, collection root, upstream/fork identities, selected base/head SHA, and prerequisite PR/commit dependencies.
- Requested ticket scope, module role, supported service/version, documented resource boundaries, identifiers, and result shape.
- Relevant base classes, hooks, argument builders, client helpers, documentation fragments, and action-group requirements.
- Execution location, library dependencies, authentication mode, TLS configuration, test resources, and secret references.
- Test targets/fixtures, affected regressions, repository commands, CI checks, and local/protected-CI integration policy.
- Progress, actual validation evidence, unknowns, and the revision to which evidence applies.

Use environment-variable or vault references instead of writing passwords/token secrets into the brief. Standalone tools derive the same facts in memory and do not create context files.

Make the swarm load its worker, QA, and delivery skill instructions explicitly when those phases apply, using installed-plugin-relative paths. Direct invocation of any specialist skill must perform equivalent discovery. Preserve Codex's supported Jira connector/MCP/CLI options and supplied-text fallback. Do not import Claude-only dispatch calls, cache paths, or permission declarations.

Establish the working branch before edits and preserve user changes. Verify the selected base contains required framework code. Prefer a merged foundation; if it is unmerged, dependent work needs an explicitly chosen prerequisite revision and a clear PR dependency. Do not silently include the entire foundation in otherwise independent module PRs.

Acceptance: the swarm and directly invoked skills agree on the contract, stay within requested scope, and report a missing framework as a prerequisite issue.

## Phase 2: add a compact Proxmox reference

Create `/Users/hyaish/Documents/Git/agentic-workflows-codex/plugins/agentic-workflows/references/proxmox-collection.md`, loaded only for `ansible.proxmox` work and reachable by directly invoked worker/QA/delivery skills. Include evidence links and the selected collection revision. Refresh facts when that revision changes.

Cover these contracts:

- `ProxmoxClient`: lazy proxmoxer construction, shared connection arguments, auth validation, TLS, permission checks, and API error reporting.
- `ProxmoxBase`: common API calls, existence checks, and result formatting.
- `ProxmoxResourceModule`: lifecycle hooks, comparison, structured property serialization, update/deletion semantics, and check-mode predictions.
- `ProxmoxInfoModule`: read-only hook and `changed=False` results.
- `ProxmoxActionModule`: imperative-operation hooks and check mode; this helper is not an Ansible action plugin.
- `ProxmoxTask` and `ProxmoxPower`: shared-client reuse, UPID waits, task failures, explicit power policy, and final-state verification.
- `api_timeout` versus task timeout; timing out locally does not cancel a server task.
- Unique `vmid` identity, non-unique names, scalar identifiers, and documented structured options.
- Omitted parameters versus explicit empty lists; preservation of unspecified fields; default reset/deletion; creation-only disk behavior.
- Public result shapes, shared argument builders/doc fragments, and action-group registration.
- Current PVE-only resource coverage. PBS/PDM capabilities require separate evidence and appropriate tests.

Carry unresolved issues forward rather than hardcoding a resolution: the researched VM documentation names `/storage` while code checks `/`; machine defaults were disputed in review; broader version/service support remains unestablished.

Acceptance: a module uses the existing framework rather than constructing a competing REST client or generic CRUD loop.

## Phase 3: update implementation, orchestration, and QA

### Swarm

- Classify resource lifecycle, info, imperative action, and standalone work; derive actual dependencies and order independent modules accordingly.
- For the existing Proxmox collection, preserve its GPL license, metadata, CI, and test structure. Use foundation scaffolding only for a genuinely new collection.
- Verify existing API access, privileges, TLS, controller/EE libraries, node/storage/bridge resources, and test configuration. A successful version query does not prove permission to manage resources.
- Do not infer a need to install/reconfigure the hypervisor, elevate permissions, or delete unrelated stale resources.
- Replace “unit coverage where practical” with coverage of affected Python module/utility behavior or an explicit validation gap.
- Review duplication at the refactor interval; reuse or narrowly extend the framework instead of requiring a new utility extraction every ten modules.
- Capture sanitized, verified lessons with applicability and revision; do not rewrite live workflow instructions during a build.

### Worker

- Implement the appropriate base-class hooks and reuse client, argument, error, task, power, and result helpers.
- Trace inherited and delegated behavior; direct endpoint text need not occur in every module file.
- Match the documented module scope and neighboring interfaces. Avoid invented list parameters or exposing every option in the entire platform API.
- Preserve scalar and structured parameter contracts, explicit power policies, omission/reset semantics, and mutation-free check mode.
- Update shared doc fragments, `meta/runtime.yml`, requirements, and EE metadata when the change requires it.
- Add focused unit tests and affected shared-helper regressions; use the existing fake-client/mock conventions.
- Assign ownership of shared libraries/fixtures/context before concurrent work, and use sequential execution when appropriate.

### QA and test implementation

- Make CRUD scenarios conditional on resource modules. Imperative actions and connection information need their own applicable scenarios.
- Retain check-mode validation for API modules; verify predictions cause no mutation and read-only modules remain unchanged.
- Use integration task lists, paired action/info targets, declared setup dependencies such as `prepare_tests`, and justified supporting-resource fixtures.
- Follow includes/imports, role dependencies, defaults, variables, and effective `module_defaults` when evaluating coverage.
- Use generated `integration_config.yml` and shared module defaults. Do not introduce an SSH/WinRM inventory requirement for local API modules.
- Preserve randomized IDs and per-run ownership. Randomization reduces collisions but does not guarantee allocation or cleanup.
- Clean owned resources in `always`, continue cleanup after errors, and verify removal. Distinguish continuation from silently swallowed cleanup failures.
- Select Python/Core versions and commands from repository evidence and its Makefile/collection layout.
- Cover create/update/delete where applicable, idempotency, actual-state/value assertions, errors, power transitions, task completion, defaults, and empty-list semantics.
- Run affected module/utility regressions for shared changes. Zero selected tests is not coverage of known affected code.

Acceptance: the existing Proxmox fixture/target structure is accepted; inherited behavior receives credit; missing fixtures, cleanup assurance, or mutation-free check mode produce actionable failures.

## Phase 4: make delivery and CI states explicit

Configure integration execution in the brief:

| Policy | Expected behavior |
|---|---|
| Local integration | Run required live checks before the configured publication step; unavailable infrastructure remains blocked |
| Protected CI integration | After local unit/sanity/docs checks, an authorized draft PR may be needed to run live checks; integration remains pending until protected CI succeeds |
| Explicit code-only work | Report implementation and local checks separately from blocked live validation, with exact resume requirements |

Do not silently switch policies after an environment failure. A draft PR with pending integration is not a fully validated delivery.

Update the delivery skill to:

- Resolve the actual upstream/fork identities and foundation dependency; stage required utilities, doc fragments, metadata, dependencies, docs, and tests alongside module code.
- Exclude secrets, generated integration configuration, internal planning files, and unrelated changes without changing repository ignore policy indiscriminately.
- Use repository `version_added` conventions. Do not bump the target collection version or generate release changelogs to make module work pass checks.
- Apply the [corrected changelog policy](https://github.com/ansible-collections/ansible.proxmox/pull/1#issuecomment-6416325072): new documentable modules can be detected from metadata; shared utilities and enhancements/bugfixes require appropriate fragments.
- Detect CI providers and inspect real jobs/logs. For Proxmox, use GitHub Actions and account for protected approval, the self-hosted runner, serialized matrix, and separately triggered SonarCloud analysis.
- Track queued, running, approval-required, passed, failed, cancelled, superseded, justified-skipped, undiscovered, and environment-blocked states. Approval waits are not code-fix attempts; infrastructure failures are not passes.
- Tie evidence to the current PR head SHA and invalidate it after a new commit. Validate target selection as well as job conclusions.
- Apply focused fixes with bounded recovery and actual regression evidence. Do not change approval rules, secrets, runner configuration, or branch protection, or reopen closed PRs automatically.
- Follow the requested delivery target and PR template. Report pending checks honestly and do not merge automatically.

Acceptance: required files ship together, previous-SHA checks cannot validate a new head, and protected-CI waiting states are represented accurately.

## Phase 5: update the Codex standalone tools

### Epic analysis

Target: [Epic analysis source in the confirmed folder](/Users/hyaish/Documents/Git/agentic-workflows-codex/plugins/agentic-tools/skills/ansible-epic-analysis/SKILL.md).

Preserve its existing collection discovery, connector support, and inconclusive-evidence handling. Extend it to:

- Accept optional repository/PR/revision context while preserving ticket-only invocation and reporting unavailable repository evidence.
- Trace the existing framework and prerequisite revisions before declaring implementation readiness.
- Separate resource, info, imperative-action, utility, and combined requirements. Do not fabricate a `_powerstate_info` gap when existing VM information provides the observation capability.
- Preserve requested scope while showing related tickets and prerequisite work separately.
- Research the correct service/version and proxmoxer mapping from primary sources. Separate API support, privileges, framework availability, and test readiness.
- Report supported, evidenced-unsupported, not-found, and inconclusive distinctly. Failure to find documentation does not prove an operation is impossible.
- Add module role, existing capability, prerequisite dependency, evidence revision, and readiness to its concise output.

### Module audit

Target: [Module audit source in the confirmed folder](/Users/hyaish/Documents/Git/agentic-workflows-codex/plugins/agentic-tools/skills/ansible-module-audit/SKILL.md).

- Trace inheritance, hooks, delegated helpers, shared argument builders, and doc fragments before assessing coverage or reuse.
- Score documented scope and applicable role-specific operations; recognize intentional creation-only or separately managed capabilities.
- Follow paired test targets, fixture dependencies, includes, defaults, and module defaults.
- Evaluate cleanup ownership, continuation, visibility of failures, and removal verification. Recognize `failed_when: false` without assuming it proves cleanup succeeded.
- Preserve the existing five weights. Mark inapplicable dimensions explicitly, show the applicable denominator and normalized result, and qualify comparisons between differently scoped scores.
- Add a separate readiness checklist for unit coverage, affected regressions, metadata/action groups, doc/spec agreement, dependencies, auth/TLS/errors, asynchronous completion, and check mode.
- Replace the unconditional “90–100 ready” rule: required gaps can block readiness despite a high score.
- Distinguish inspected test coverage from executed validation, recording the evidence SHA, actual results, and unknowns.

Both tools remain read-only, produce conversation-only reports, and work without the workflow plugin. The version-bump tool requires no Proxmox-specific redesign.

Acceptance: the tools credit inherited behavior, avoid invented counterpart modules, preserve uncertainty, and cannot present missing required tests as an unqualified readiness pass.

## Phase 6: verify behavior and run a pilot

Structural checks: validate skill frontmatter, manifests, installed relative references, direct entry points, and consistent handoffs/completion states. Use an available Codex plugin validator resolved from the environment; do not hardcode a developer's validator/cache location.

Use the frozen collection snapshot and captured or synthetic requirements for scenario evaluation. Record observed outputs rather than testing only for strings in prompts.

| Scenario | Expected result |
|---|---|
| Selected base lacks the framework | Prerequisite reported; no competing foundation generated |
| Resource/info/action delegates to shared classes | Correct role-specific coverage and inheritance credit |
| VM-power ticket with existing VM info | No invented powerstate-info requirement |
| Insufficient PBS/PDM API evidence | Inconclusive, with the service/version identified |
| Existing task lists, prepare_tests, and paired target | Accepted; dependencies followed |
| Omitted network versus empty network list | Different documented semantics preserved |
| Read-only connection information | No invented CRUD/filter/cleanup requirements |
| Cleanup continues but does not verify removal | Missing assurance reported |
| Shared-helper change | Affected module and utility regressions selected |
| Protected CI awaiting approval | Pending approval; no bypass or success claim |
| Successful job selects no expected targets | Missing validation identified |
| New commit after green checks | Earlier evidence invalidated |
| Direct worker/QA/delivery invocation | Same contract and quality gates as swarm routing |
| Jira CLI absent, connector available | Existing Codex connector behavior preserved |
| Tool plugin installed alone | Both tools operate independently |
| Non-Proxmox collection | Its transport, language, test conventions, and CI remain supported |

After these checks, use one agreed, low-risk Proxmox ticket with a defined foundation revision and test environment for a Codex end-to-end pilot. Verify scope analysis, dependency handling, implementation through framework hooks, local checks, owned-resource integration/cleanup, authorized delivery, and current-head CI. Include relevant shared-helper regression coverage.

This later pilot requires the ticket and normal project context. Do not claim end-to-end readiness until it runs; if unavailable, deliver instruction improvements with live validation explicitly pending. No Claude pilot or cross-runtime parity gate is required.

## Phase 7: documentation and packaging

- Update this folder's [README](/Users/hyaish/Documents/Git/agentic-workflows-codex/README.md), [migration document](/Users/hyaish/Documents/Git/agentic-workflows-codex/docs/MIGRATION.md), and [marketplace document](/Users/hyaish/Documents/Git/agentic-workflows-codex/docs/MARKETPLACE.md) to describe the actual changes and validation limits.
- Bump each changed plugin once using its existing version-bump skill and the final SemVer scope. Workflow and tool versions remain independent.
- Update the affected [workflow manifest](/Users/hyaish/Documents/Git/agentic-workflows-codex/plugins/agentic-workflows/.codex-plugin/plugin.json) and [tool manifest](/Users/hyaish/Documents/Git/agentic-workflows-codex/plugins/agentic-tools/.codex-plugin/plugin.json) versions; verify names and source paths in this folder's [marketplace catalog](/Users/hyaish/Documents/Git/agentic-workflows-codex/.agents/plugins/marketplace.json). The marketplace has no duplicated version fields; do not apply the Claude manifest procedure.
- Validate both changed plugin roots and smoke-test relevant skills in fresh Codex sessions after installation.
- Keep target-collection versions and generated release files out of plugin packaging. Do not edit installed plugin caches.
- Documentation/planning alone does not require a plugin version bump.

## Implementation order and completion gates

| Order | Deliverable | Completion gate |
|---|---|---|
| 1 | Repository contract, foundation gate, skill handoffs | Direct and swarm-routed skills agree on scope and evidence |
| 2 | Proxmox reference and worker/swarm changes | Existing architecture and documented semantics preserved |
| 3 | QA and integration policy | Appropriate scenarios, fixtures, regressions, and cleanup assessed |
| 4 | Delivery and CI | Correct staging, protected-CI states, target discovery, and SHA evidence |
| 5 | Epic analysis and audit | Accurate, read-only, evidence-qualified reports |
| 6 | Scenario and non-Proxmox evaluation | New behavior works without weakening other collections |
| 7 | Agreed Codex Proxmox pilot | Actual test and CI evidence establishes readiness |
| 8 | Documentation, versions, and release preparation | Codex packaging is consistent with delivered scope |

Only the Codex repository's agents, tools, references, manifests, and documentation are implementation targets. Preserve unrelated user work and existing token-optimization plans in the sibling repository.
