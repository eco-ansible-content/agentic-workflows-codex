---
name: ansible-epic-analysis
description: Use when analyzing a Jira Epic, Task, or ANSTRAT to identify Ansible collection scope, missing modules, dependencies, and API feasibility.
---

# Ansible Epic Analysis

Analyze requirements without modifying the collection. Use Jira through a configured connector/MCP server or `jira`/`jira-rh` CLI; if unavailable, state that and analyze supplied text only.

## Procedure

1. Read the parent work item, linked issues, acceptance criteria, attachments, and labels. For an Epic, include all child tasks; for an ANSTRAT, map referenced Epics.
2. Find the target collection from the current workspace. Read `galaxy.yml`, module inventory, `module_utils`, test targets, changelog entries, and relevant sibling collections.
3. Build a desired module map. Pair action and `_info` modules by resource. Classify each as existing/complete, existing/incomplete, missing, blocked, or out of scope.
4. Infer platform characteristics (REST, SDK, cmdlet, CLI, config, database) from requirements and implementation. Research authoritative vendor documentation for incomplete modules; identify the exact read/list and create/update/delete operation or report inconclusive evidence.
5. Identify prerequisites, ordering constraints, environment needs, test dependencies, and risks.

## Output

Return a concise report with goal, source evidence, module coverage table, implementation order, API-feasibility findings, test/delivery prerequisites, and open questions. Do not create files or mark work complete.
