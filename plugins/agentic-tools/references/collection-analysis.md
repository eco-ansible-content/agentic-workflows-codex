# Evidence for collection analysis and audits

This reference is shared by the standalone tools in this plugin. Keep analysis read-only and conversation-only; no workflow plugin, project-brief creation, skill delegation, or test execution is needed. Read an existing brief if supplied, but validate claims against source/evidence.

## Repository contract

Establish collection root/FQCN, selected base/head or worktree revision, actual upstream repository, requested scope, supported service/version and execution location. Read `galaxy.yml`, `meta/runtime.yml`, runtime/EE/test requirements, relevant modules, base classes/helpers, doc fragments, test targets/dependencies/includes/defaults, Makefile and CI. Inspect comparable modules when useful; do not demand nonexistent neighbors in a new collection.

Determine the role from documented behavior: resource lifecycle, information, imperative action, or standalone utility/read. Pair by observable capability, not suffix arithmetic. A power action may be observed by existing VM info; connection information may legitimately have no mutation counterpart. Preserve Task scope while reporting related work separately.

Trace SDK/API calls through inheritance and delegated helpers. Credit a shared lifecycle hook or lazy client actually used by the module. Check arguments, constraints, docs and results against the supported interface; optional platform operations outside documented scope are not automatically missing functionality.

Read source dependencies and verify framework availability on the selected base. Separate these from API feasibility, operation privileges and live test readiness. Primary documentation must match the actual service/version and SDK path. Preserve supported, evidenced-unsupported, not-found and inconclusive states; an absent search result is not a nonexistent API.

## Test and readiness evidence

Resolve action/info paired targets and follow setup role dependencies, includes/imports, variables and effective group/module defaults. Role task lists and justified fixture dependencies are valid. Isolation comes from resource ownership, unique IDs and cleanup, not a ban on every supporting module.

Test requirements depend on documented role: resource lifecycle operations, action/no-op/completion, or supported info/read behavior. API modules still need applicable check-mode immutability. Do not require filters, CRUD or cleanup that the interface/test setup cannot use; fixture resources still need cleanup even for read-only modules.

Cleanup must continue after individual errors and expose or verify failed removal. `failed_when: false` and `ignore_errors` are continuation mechanisms, not proof of removal. Distinguish the presence/quality of tests from a verified execution. Missing tests are applicable gaps rather than inapplicable dimensions.

Read unit tests, metadata and current-revision command/CI evidence separately from the numerical score. Live validation may be local or protected CI according to the project; a pending approval, missing environment, older-SHA check or zero selected targets for known affected code cannot establish readiness. Report missing evidence without running tests or mutating the environment.

## When the collection is ansible.proxmox

Inspect its selected source first. [Foundation PR #1](https://github.com/ansible-collections/ansible.proxmox/pull/1) merged on 2026-11-02 as `2465107d0f713132f3a7c627c051025dcd2101a8`; the reviewed source was `09c173588bbdc2c08f4e6e88a2f96864b0105144`. Do not report the foundation unmerged from old review comments. Verify the chosen base contains the required code.

Use the collection's [module utilities](https://github.com/ansible-collections/ansible.proxmox/tree/09c173588bbdc2c08f4e6e88a2f96864b0105144/plugins/module_utils), [modules](https://github.com/ansible-collections/ansible.proxmox/tree/09c173588bbdc2c08f4e6e88a2f96864b0105144/plugins/modules), [tests](https://github.com/ansible-collections/ansible.proxmox/tree/09c173588bbdc2c08f4e6e88a2f96864b0105144/tests), [requirements](https://github.com/ansible-collections/ansible.proxmox/blob/09c173588bbdc2c08f4e6e88a2f96864b0105144/README.md) and the official [PVE QEMU API — `/nodes/{node}/qemu`](https://pve.proxmox.com/pve-docs/api-viewer/index.html#/nodes/%7Bnode%7D/qemu), [PBS docs](https://pbs.proxmox.com/docs/) and [proxmoxer source](https://github.com/proxmoxer/proxmoxer) to research the actual service/version. Start PVE VM feasibility checks at the QEMU resource and follow relevant child operations; use the appropriate API resource for other PVE functionality. PDM requires its own evidence; roadmap scope or PBS client plumbing is not resource support. Viewer access failures require an official-source fallback or an inconclusive finding, not an unsupported verdict.

- Trace `ProxmoxClient`/`ProxmoxBase`, resource/info/imperative-action hooks, shared argument builders, task/power helpers, docs and result keys. `ProxmoxActionModule` is not an action plugin.
- Initial public modules use controller/EE Python over HTTPS with proxmoxer and requests; PVE resource tests do not demonstrate PBS/PDM coverage. Connection-info success does not establish resource ACL privileges.
- `vmid` is unique; VM names are not. Omission, authoritative empty device lists, default reset, pending configuration, creation-only disks, explicit power policies, and UPID/timeouts require their documented semantics, not generic CRUD assumptions.
- Existing `proxmox_vm_info` node summaries expose power `status`; its selected-VM form returns configuration. Existing power policy in `proxmox_vm` may already cover a requested start/stop feature, but can create a missing VM under `state=present`; check the task's actual semantics before calling that complete.
- VM action/info tests share a target, depend on `prepare_tests`, use group `module_defaults`, randomized IDs and `always` cleanup. Follow those dependencies before scoring. New shared-argument modules need action-group/doc/dependency checks.
- The researched VM ACL documentation and implementation differ (`/storage` versus `/`); machine defaults were disputed. Report source contradictions and verify selected revisions instead of treating review speculation as a settled API rule.
