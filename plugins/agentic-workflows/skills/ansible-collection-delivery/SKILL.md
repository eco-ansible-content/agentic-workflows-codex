---
name: ansible-collection-delivery
description: Use when preparing an Ansible collection change for release, pull request delivery, CI diagnosis, or post-delivery learning.
---

# Ansible Collection Delivery

Read [repository contract](../../references/collection-contract.md), the project brief, contribution/branch/changelog/signing rules, and workflow files before delivery, including direct invocation. For `ansible.proxmox`, read [Proxmox framework](../../references/proxmox-collection.md). Keep publication authorization separate from validation status.

## Prepare a focused delivery

Resolve actual upstream/fork identities and base/head revisions; remote names alone do not establish ownership. Honor prerequisite commits/PRs and preserve user changes. The working branch belongs before implementation; do not recreate it over completed work. Stage the reviewed scope, including necessary module utilities, doc fragments, runtime/action-group metadata, requirements, docs, and tests. Exclude credentials, generated integration configuration, internal planning artifacts, and unrelated changes without indiscriminately changing ignore policy.

Follow the collection's `version_added` and changelog policy. In the Proxmox feature workflow, new documentable modules are detected from their metadata; shared utility changes and enhancements/bugfixes need appropriate fragments. Preserve collection versions and generated changelogs during ordinary module delivery; an explicitly requested collection release is a separate workflow with its own scope.

Create focused commits and use the repository PR template. Push/create a PR only within the requested delivery target and available authentication. For `protected_ci` integration, local unit/sanity/docs checks can precede an authorized draft PR needed to run live tests; label integration pending. Under `local`, required live tests pass before publication. Explicit code-only delivery retains its unverified integration status. Do not silently change policy, force-push protected/user-owned work, reopen closed PRs, or merge automatically.

Before publishing each new head, including an update to an existing draft, rerun the affected required local checks against those changes. Record any explicit code-only limits. Protected CI can supply live validation; it does not make stale local results valid for new code.

## Monitor and repair CI

When CI monitoring is in scope, detect providers from workflow files and check links. For GitHub Actions inspect runs, jobs, selected targets, and relevant raw logs; retain Azure/other-provider support when those are the repository's checks. Track expected lint, sanity, units, docs, certification, integration matrices, and separately triggered analysis such as SonarCloud.

Associate every result with the current PR head SHA, provider/run, and relevant targets. After a new commit or relevant worktree edit, invalidate affected older evidence. A green run on another SHA or no selected tests where affected targets were expected cannot validate the change.

Distinguish queued/running, approval required, passed, failed, cancelled, superseded, justified skip, undiscovered, and environment blocked. Determine justified skips from repository policy; missing checks are not automatically optional. Protected approval and serialized matrices can exceed short generic polling windows. Wait or report the exact pending action without bypassing approval rules, secrets, runner settings, or branch protection. Approval waits do not consume code-fix attempts; infrastructure timeouts remain unverified.

For actionable failures, inspect the actual relevant logs, identify the smallest root cause, add appropriate regression coverage, rerun affected local checks, and push a focused fix when authorized. Limit recovery to three focused attempts per persistent code failure; escalate with evidence and the external dependency when blocked. Size-bound log output with targeted reads instead of omitting short or large logs entirely.

## Completion and learning

Capture reusable, sanitized lessons with trigger, evidence, proven remedy, applicability, and revision in the existing learning location; do not alter live skill instructions during a build. Report delivered paths/commit/PR, current-head checks and commands, pending approvals, blocked validation, cleanup issues, and next actions. Fully validated requires every applicable required check, including live integration when required; code-only or pending-CI work must be labeled accordingly.
