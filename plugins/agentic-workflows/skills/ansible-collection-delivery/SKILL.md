---
name: ansible-collection-delivery
description: Use when preparing an Ansible collection change for release, pull request delivery, CI diagnosis, or post-delivery learning.
---

# Ansible Collection Delivery

Deliver only verified changes. First read the repository’s contribution, branch, changelog, signing, and CI rules.

## Pre-delivery audit

Confirm scope matches the brief; changed modules have accurate docs and tests; required changelog fragments exist; tests are clean; no credentials, generated noise, or unrelated edits are staged; and results are correctly classified as pass, fail, or blocked.

Create small, intelligible commits. Preserve user changes and existing branch policy. Push/create a PR only when explicitly within the requested delivery target and authenticated. Never force-push protected or user-owned work.

## CI recovery

If CI is available, inspect the failing job and raw logs, identify the smallest root cause, fix it with a regression test where possible, rerun the relevant local check, then push a focused amendment. Limit repeated attempts and escalate with logs when a failure depends on unavailable infrastructure or an external service.

## Learning record

Record only reusable, verified insights: context, symptom, evidence, resolution, prevention, and applicable characteristics. Exclude secrets, customer data, and one-off guesses.

Report commit/PR, CI status, checks and evidence, unresolved risks, and precise next steps.
