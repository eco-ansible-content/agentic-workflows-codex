# Agentic Workflows for Codex

Native Codex plugins for building, enhancing, auditing, and releasing Ansible collections from Jira work.

## Plugins

| Plugin | Use it for |
| --- | --- |
| `agentic-workflows` | End-to-end collection delivery: requirements, research, scaffolding, implementation, QA, CI, release, and lessons learned. |
| `agentic-tools` | Independent Epic analysis, single-module audits, and release/version hygiene. |

The workflow is platform-agnostic. It selects an API, SDK, CLI, or configuration-file pattern from evidence rather than relying on a fixed platform template.

## Install from Codex CLI

Add this marketplace directly from GitHub—no clone is required:

```bash
codex plugin marketplace add eco-ansible-content/agentic-workflows-codex --ref main
codex plugin add agentic-workflows@agentic-workflows-codex
codex plugin add agentic-tools@agentic-workflows-codex
```

Start a new Codex session after installation. To refresh the marketplace after a release, then reinstall the plugin(s) you use:

```bash
codex plugin marketplace upgrade agentic-workflows-codex
codex plugin add agentic-workflows@agentic-workflows-codex
codex plugin add agentic-tools@agentic-workflows-codex
```

## Install for a team

In a ChatGPT/Codex workspace, an administrator imports this GitHub repository as a marketplace under **Admin → Plugins → Add → Import marketplace**. The marketplace manifest is at `.agents/plugins/marketplace.json`; after import, choose the installation policy for each plugin.

## Requirements

- Codex with workspace and filesystem access to the target collection.
- Jira access through a configured connector/MCP server or a working `jira`/`jira-rh` CLI.
- `git`; `gh` when GitHub delivery or CI monitoring is requested.
- A test target only when integration testing is requested. Code-only validation remains supported.

The plugins never invent credentials, bypass Codex approvals, force-push protected branches, or report unverified tests as passing.

## Design

The original Claude agent swarm has been expressed as compact, progressive-disclosure Codex skills. The end-to-end skill manages the lifecycle; implementation, QA, and delivery skills load only for their matching task. This keeps frequently used contexts small while retaining the original functional stages.

## Development

The workflow skills discover the target repository's framework, dependencies, tests, and delivery policy before implementation. They load supporting guidance only when it applies. Standalone tools work independently and distinguish an audit score from verified readiness.

For `ansible.proxmox`, the packaged reference covers shared class hooks, HTTPS/proxmoxer authentication, UPID tasks, power policies, paired test targets, shared fixtures, and protected GitHub integration. The [implementation plan](docs/plans/2026-11-02-proxmox-agent-and-tool-readiness.md) records scope and remaining work; [validation notes](docs/PROXMOX-VALIDATION.md) distinguish local checks and read-only evaluations from the live pilot, which remains pending.

Run repository packaging checks and validator tests with Node.js 20 or later (contributor tooling only):

```bash
node scripts/validate-plugins.mjs
node --test tests/validate-plugins.test.mjs
```

The repository validator checks manifests, skill identity, and packaged reference reachability/portability; it does not execute skills or certify their behavior. It can also check a relocated plugin independently with `node scripts/validate-plugins.mjs --plugin /path/to/plugin`. Use the installed skill frontmatter validator when available. Test changed skills in fresh Codex conversations after installation and record unavailable checks explicitly.

Increment only affected plugin versions and update release notes when behavior changes. Do not edit installed caches to test source changes.

## 1.1.0 — 2026-11-02

Both plugins use `1.1.0`: repository-contract discovery, Proxmox framework guidance, role-specific QA, protected-CI/current-revision evidence, and inheritance-aware analysis/audits. Epic analysis includes the official PVE QEMU API documentation. Audit readiness is separate from normalized quality scoring. Refresh the configured marketplace to discover the minor upgrade, then upgrade the installed plugins. Live Proxmox validation remains pending.

See [Marketplace Operations](docs/MARKETPLACE.md) for team distribution and upgrades, and [Migration Map](docs/MIGRATION.md) for the Claude-to-Codex capability mapping.
