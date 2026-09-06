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

Validate both plugins before release:

```bash
python3 /Users/hyaish/.codex/skills/.system/plugin-creator/scripts/validate_plugin.py plugins/agentic-workflows
python3 /Users/hyaish/.codex/skills/.system/plugin-creator/scripts/validate_plugin.py plugins/agentic-tools
```

Increment the affected plugin's SemVer version and update the marketplace release notes when behavior changes. Test each skill in a fresh Codex conversation after installation.

See [Marketplace Operations](docs/MARKETPLACE.md) for team distribution and upgrades, and [Migration Map](docs/MIGRATION.md) for the Claude-to-Codex capability mapping.
