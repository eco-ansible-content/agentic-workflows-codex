---
name: ansible-epic-analysis
description: Use when analyzing a Jira Epic, Task, or ANSTRAT to identify Ansible collection scope, missing modules, dependencies, and API feasibility.
---

# Ansible Epic Analysis

Analyze requirements read-only and return the report in the conversation. Do not change files, run mutating tests, or mark implementation complete. Use configured Jira connector/MCP access or `jira`/`jira-rh`; if unavailable, analyze supplied text and identify missing evidence.

Read [collection analysis](../../references/collection-analysis.md). This tool is self-contained; no workflow plugin is required.

## Procedure

1. Establish requested scope and optional collection/PR/revision context. A Task covers its requested behavior; an Epic includes child tasks; an ANSTRAT maps its Epics. Read linked acceptance criteria, comments and attachments; distinguish related work from in-scope requirements.
2. Inspect the selected collection's metadata, module inventory, relevant base classes/helpers, shared arguments/docs, tests/fixtures, requirements and CI. Record source revision, supported service/version and execution model. Without repository access, keep existing-code/framework readiness unknown rather than guessing.
3. Map requested capabilities to existing code and tickets. Classify each as resource lifecycle, information, imperative action, or standalone utility/read, then existing/complete, existing/incomplete, missing, blocked, or out of scope. Match counterparts by capabilities: an action may use an existing resource info module rather than a new name-matched `_info` module. Report combined requests explicitly.
4. Trace inherited/delegated operations and framework hooks. Verify prerequisite code on the selected base, including unmerged dependencies, shared fixtures, permissions and test resources. API support alone does not establish implementation readiness.
5. Research authoritative documentation for the correct service/version and SDK mapping. Name exact supported operations and evidence. Preserve `supported`, `unsupported` only with affirmative evidence, `not found`, and `inconclusive` separately through recommendations; unsuccessful search is not proof of impossibility.
6. Provide a dependency-aware implementation order within scope. Surface relevant sibling work and existing observable capabilities; do not fabricate module pairs, endpoints, credentials, or test results.

For `ansible.proxmox`, apply the conditional Proxmox guidance in the analysis reference: PVE, PBS, and PDM are distinct service scopes, proxmoxer endpoint chains can live in helpers, and shared framework/fixture availability must be verified at the selected revision.

## Proxmox API documentation

For PVE virtual-machine work, start with the official [Proxmox VE QEMU API reference — `/nodes/{node}/qemu`](https://pve.proxmox.com/pve-docs/api-viewer/index.html#/nodes/%7Bnode%7D/qemu). Navigate the relevant resource and child operations to verify HTTP method/path, parameters, permissions, return data and asynchronous task behavior, then map those operations to the collection's proxmoxer calls and shared helpers. Cite the relevant API resource in feasibility findings and check compatibility with the supported PVE version.

This QEMU reference covers PVE VM operations; use service-specific official documentation for other PVE resources, PBS or PDM. If the interactive viewer cannot be read or returns an access error, seek version-matched official API/schema source, disclose the limitation and retain inconclusive findings where evidence is insufficient. An inaccessible viewer is not evidence that an operation is unsupported.

## Output

Return goal/scope and source revision; a concise table of module role, requested capability, existing implementation/counterpart, ticket, prerequisite, API evidence/status and readiness; implementation order; test/delivery requirements; and unresolved questions. Distinguish implemented code from verified behavior. Keep the report read-only and evidence-qualified even when the user supplies only a ticket key.
