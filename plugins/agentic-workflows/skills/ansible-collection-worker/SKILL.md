---
name: ansible-collection-worker
description: Use when implementing or repairing one Ansible collection module, its shared utility code, documentation, and tests.
---

# Ansible Collection Module Worker

Implement a production-quality module from the repository conventions and verified platform behavior.

## Before code

Read `galaxy.yml`, neighboring modules, all relevant `module_utils`, target tests, project brief, and CI/lint configuration. Identify the implementation type and the authoritative API/cmdlet/CLI reference. Reuse existing conventions for Python versus PowerShell modules, imports, return data, documentation, and test layout.

## Required behavior

- Validate inputs and dependencies early; use `no_log` for secrets.
- Query current state before mutation. Map `state: present` and `state: absent` to the platform’s actual lifecycle operations.
- Return `changed: false` when desired state already exists; never simulate an API call to infer state.
- Support check mode by predicting change without mutation.
- Use `fail_json`/platform-appropriate structured errors with actionable, secret-free context.
- Put reusable connection, lookup, normalization, pagination, comparison, retry, or result-formatting logic in `module_utils`; do not duplicate it.
- Document choices, defaults, return values, requirements, and examples accurately.
- Create a changelog fragment if the collection requires one.

## Tests

Write or update focused tests. Action modules need create, repeat-create/idempotency, update when applicable, delete, repeat-delete, check-mode mutation tests, actual-state verification, and cleanup in an `always` section. Info modules need list, filtered retrieval, non-existent filter, and value assertions. Cleanup every resource and dependency created by tests, use module-level cleanup, and allow cleanup to continue after an earlier cleanup failure.

Run syntax/lint/unit checks available locally; run integration tests only against a confirmed safe test environment. State precisely what was run and what was blocked.
