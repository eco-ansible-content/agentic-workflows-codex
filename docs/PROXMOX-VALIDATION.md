# Proxmox enhancement validation

Date: 2026-11-02

Scope: Codex workflow/tool instruction enhancements for `agentic-workflows` 1.1.0 and `agentic-tools` 1.1.0. This record covers validation; source publication is verified separately by the release task and does not certify live Proxmox behavior.

## Executed checks

| Check | Result | Evidence and limits |
|---|---|---|
| Repository packaging validator | Passed for both plugins | `node scripts/validate-plugins.mjs`: four workflow skills/two references; three tool skills/one reference; valid names, versions, manifests and reference paths |
| Validator regression tests | 5 passed | `node --test tests/validate-plugins.test.mjs`: each plugin relocated alone; missing reference, cross-plugin reference and mismatched skill identity rejected |
| Bundled skill frontmatter validator | 7 passed | Installed skill-creator `scripts/quick_validate.py` used for every skill, including unchanged version-bump |
| Whitespace/diff review | Passed | Final checkout `git diff --check`; source reviewed for scope, runtime-relative paths, preservation of user work and current evidence |

The repository validator is a maintained local check, not the absent legacy plugin-creator validator previously named in the README. It checks this repository's manifest/frontmatter identity and reference packaging conventions. The bundled quick validator separately parses YAML frontmatter. Neither proves that a model follows the instructions.

Node.js v24.5.0 ran the checks. The frontmatter validator used Python 3.13.4 and PyYAML 6.0.3 in the task's temporary managed environment `/private/tmp/proxmox-codex-implementation/.venv`, without system package installation. For reproduction during this session, activate it with `source /private/tmp/proxmox-codex-implementation/.venv/bin/activate` or use its `bin/python` directly. This temporary environment is not shipped with the plugins.

## Independent read-only behavioral evaluations

Evaluators received the updated skill and raw artifacts without the expected answer. They did not modify files, execute tests, install dependencies, or contact live Proxmox services. Evaluations used the downloaded collection snapshot identified as reviewed PR head `09c173588bbdc2c08f4e6e88a2f96864b0105144`; the extracted snapshot has no Git metadata, so provenance was qualified accordingly.

### Epic analysis

Supplied Task DEMO-1 requested idempotent QEMU VM start/stop, check mode and power observation. Related future PBS backups were outside scope.

The tool identified the existing `proxmox_vm`/`ProxmoxPower` implementation and node-summary `proxmox_vm_info` observation. It did not invent a new name-matched info module or widen scope to PBS. It distinguished implemented source from unexecuted behavior, noted that lifecycle `state=present` can create a missing VM, and retained permission/cleanup/test gaps. The evaluator used authoritative source when the official API viewer returned HTTP 403 and qualified version uncertainty.

### Module audit

The tool audited `proxmox_api_connection_info` without execution logs. It credited inherited client/info behavior, treated CRUD/filters and fixture-free cleanup as inapplicable, identified missing integration coverage and contradictory inherited permission documentation, and kept execution unverified.

The first pass exposed an ambiguity: unit tests earned integration-reuse credit despite absent integration coverage. The rubric was clarified and reevaluated. The final result was 45/85 applicable points, normalized to 52.9/100, with `needs_work` and unverified execution. The score did not override readiness gates; unit tests no longer substitute for an absent integration target. These are findings about the supplied collection snapshot, not collection fixes performed by this task.

### Delivery state scenario

An independent evaluation used an authorized protected-CI draft PR handoff with newer unvalidated shared-utility changes, a waiting approval, a previous successful zero-target run, required supporting metadata files, and secret-bearing generated configuration.

The evaluator included the module, utility, doc fragment, runtime metadata and tests while excluding internal plans/secrets. It invalidated affected older-SHA evidence, rejected the zero-target run as validation, kept approval pending without treating it as a code-fix attempt, and separated authorized draft delivery from full validation. One underspecified point was tightened afterward: affected local checks must be rerun before each new published head, including updates to an existing draft. QA also now describes tracing imports/subclasses/delegation for consumer selection. Those narrow clarifications were reviewed locally; a second independent pass of the delivery scenario was not run.

## Foundation refresh

GitHub read-only metadata confirmed PR #1 merged on 2026-11-02 at `2465107d0f713132f3a7c627c051025dcd2101a8`. Main was `57cba3e5d7c092330490030108188622a7a89d23` at refresh. References preserve the reviewed snapshot's contracts while requiring discovery against the actual selected checkout; an obsolete unmerged-foundation blocker is not retained.

## Still pending

- A fresh installed Codex-session smoke test; source changes have not been installed into user caches.
- The agreed end-to-end ticket pilot against a configured live PVE test environment, with owned-resource cleanup and current-head CI evidence.
- Broader non-Proxmox behavioral pilots and the full scenario matrix in the plan; instructions remain generic, but preservation by inspection is not executed platform validation.
- Workspace/team marketplace synchronization and installed-session verification remain deployment-specific. No target-collection modules, infrastructure, permissions, protected-CI settings, or the Claude agents were changed.
