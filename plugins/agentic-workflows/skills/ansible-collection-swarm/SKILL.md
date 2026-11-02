---
name: ansible-collection-swarm
description: Use when the user asks to build, scaffold, or enhance an Ansible collection from a Jira Task, Epic, ANSTRAT, or equivalent requirements.
---

# Ansible Collection Swarm

Deliver a complete collection or a review-ready enhancement using the target repository's architecture and workflow. Keep implementation, executed validation, and delivery states separate.

## Establish context

Reuse supplied requirements and context; ask only for missing information that affects scope, delivery, credentials, or the test environment. Use a configured Jira connector/MCP server or `jira`/`jira-rh` CLI; when unavailable, analyze supplied requirements and identify missing evidence. Task scope stays within that task; an Epic includes its children; an ANSTRAT includes its referenced Epics. Related work does not silently expand the assignment.

Read [repository contract](../../references/collection-contract.md) before planning. For `ansible.proxmox`, also read [Proxmox framework](../../references/proxmox-collection.md). Discover the actual collection, source revision, framework, dependencies, supported service/versions, tests, and CI. Verify prerequisite code exists on the selected base; if a prerequisite is unmerged, establish its revision and delivery dependency before dependent work. Preserve user changes and choose the working branch before editing.

Record material requirements and non-secret contract facts in the target collection's `docs/plans/PROJECT_BRIEF.md`: scope/backlog, implementation role per module, dependencies, base/head revisions, required hooks, test targets/commands, validation policy, and definition of done. Reference existing secret stores or environment variables; keep credentials out of planning artifacts.

## Execute by phase

Load the matching sibling instructions from this plugin when entering each phase; names alone are not a substitute for reading them:

| Phase | Instructions | Handoff |
| --- | --- | --- |
| Implementation | [worker](../ansible-collection-worker/SKILL.md) | Collection root/revision, one module's role and acceptance criteria, framework hooks, dependency ownership, test targets |
| Verification | [QA](../ansible-collection-qa/SKILL.md) | Changed paths, affected consumers, commands/results, environment and unresolved gaps |
| Delivery and CI | [delivery](../ansible-collection-delivery/SKILL.md) | Requested delivery target, selected base, validation policy, evidence SHA, remaining checks |

1. **Foundation/enhancement:** use `galaxy.yml` and repository evidence. Enhance existing code without replacing its license, metadata, CI, or test layout. Scaffold a new collection only when required, using the chosen project's conventions.
2. **Prerequisites:** separate controller/EE libraries from managed-platform installation. Verify configured API/transport access and required test resources; connectivity alone does not prove operation privileges. Make up to three focused recovery attempts for actionable setup failures. Do not infer authorization to reconfigure a hypervisor, increase privileges, or clean unrelated resources.
3. **Build:** order work by shared utilities, fixtures, and module dependencies. Implement one module or cohesive action/info pair per work item. Assign an owner for shared files before parallel work; use sequential work when the host or authorization does not support delegation.
4. **Verify/refactor:** require unit coverage for affected Python behavior, or record a blocking validation gap. Run QA after each module/batch. Review duplication around ten modules or when it materially harms consistency; reuse or narrowly extend existing utilities and regression-test affected consumers.
5. **Deliver/learn:** follow the delivery skill within the user's requested target. Capture sanitized, evidence-backed lessons with applicability and revision in the existing learning location; agent-definition maintenance is separate from the active build.

## Progress and completion

Track each work item as planned, implemented, locally validated, integration pending, approval required, blocked, failed, or fully validated, with evidence and next action. Invalidate validation affected by subsequent edits. An explicitly selected code-only run may complete its requested scope while live validation remains unverified; label that limitation.

Return scope handled, changed paths, module/test outcomes, exact executed commands and revision, blocked work and recovery steps, and delivery location/PR if created. Required integration or CI still pending prevents an unqualified readiness claim. Never fabricate test results or imply the brief authorizes additional external actions.
