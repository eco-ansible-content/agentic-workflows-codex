# Claude Marketplace Migration Map

This repository preserves the outcomes of the original `agentic-workflows` marketplace while changing the runtime model from Claude agent definitions to Codex skills.

| Original capability | Codex implementation |
| --- | --- |
| Lead architect and Phase 0 context | `ansible-collection-swarm` operating contract and lifecycle planning |
| Jira ingestion | Swarm ingestion phase and `ansible-epic-analysis` |
| Foundation/enhancement | Swarm foundation and enhancement phases |
| Platform prerequisites | Swarm prerequisite phase with bounded recovery and blocked-state reporting |
| Parallel module workers | `ansible-collection-worker`; Codex may apply it to independent modules in batches |
| QA coordinator | `ansible-collection-qa` plus swarm verification phase |
| Refactor specialist | Swarm refactor trigger and shared-utility rule |
| Release and CI validation | `ansible-collection-delivery` |
| Learning evolution / insights sync | Swarm and delivery learning-record rules |
| Epic analysis / module audit / version bump | Three focused `agentic-tools` skills |

## Intentional changes

- Claude-specific `Agent(...)` calls, cache paths, slash-command mechanics, and auto-approval instructions are removed.
- The lifecycle remains autonomous after essential context, but Codex permission boundaries and missing credentials are respected.
- Specialists are progressive-disclosure skills instead of eleven large, always-loaded prompt files. The end-to-end skill routes work by phase, so module implementation and QA instructions are loaded only when needed.
- Jira remains connector-agnostic: use an approved Jira connector/MCP server when available; a local Jira CLI is an alternate integration, not a bundled credential mechanism.

This avoids claiming parity through a text-for-text port: the functional stages and quality gates are retained, while the prompt footprint and host-specific coupling are reduced.

## Proxmox upgrade scope

The [Proxmox readiness plan](plans/2026-11-02-proxmox-agent-and-tool-readiness.md) upgrades these existing Codex-ready roles in place. The swarm retains orchestration and prerequisite responsibilities; worker, QA, and delivery retain their specialist roles and now explicitly load shared contract and conditional Proxmox references. Direct invocation performs the same discovery. No original Claude agent tree or cache path is needed.

The Codex tools retain connector/MCP/CLI access and conversation-only analysis. They trace inherited behavior and actual test fixtures; an audit score no longer implies verified readiness. [Validation notes](PROXMOX-VALIDATION.md) record local and read-only behavioral checks separately from the pending live pilot. Implementation is scoped to this Codex repository.
