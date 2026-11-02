# Proxmox collection framework

Use only for `ansible.proxmox`. Read the selected checkout first and refresh these facts when its revision changes. This reference describes the initial framework, not a complete vendor API or a template for other collections.

## Source and baseline

[Foundation PR #1](https://github.com/ansible-collections/ansible.proxmox/pull/1) merged on 2026-11-02 as `2465107d0f713132f3a7c627c051025dcd2101a8`; its reviewed head was `09c173588bbdc2c08f4e6e88a2f96864b0105144`. Main was `57cba3e5d7c092330490030108188622a7a89d23` at refresh. Select the project's actual current base and verify required utilities exist; do not assume the PR is still unmerged or the snapshot is current.

Primary evidence at the reviewed revision: [requirements/usage](https://github.com/ansible-collections/ansible.proxmox/blob/09c173588bbdc2c08f4e6e88a2f96864b0105144/README.md), [utilities](https://github.com/ansible-collections/ansible.proxmox/tree/09c173588bbdc2c08f4e6e88a2f96864b0105144/plugins/module_utils), [VM implementation](https://github.com/ansible-collections/ansible.proxmox/blob/09c173588bbdc2c08f4e6e88a2f96864b0105144/plugins/modules/proxmox_vm.py), [tests](https://github.com/ansible-collections/ansible.proxmox/tree/09c173588bbdc2c08f4e6e88a2f96864b0105144/tests), [Makefile](https://github.com/ansible-collections/ansible.proxmox/blob/09c173588bbdc2c08f4e6e88a2f96864b0105144/Makefile), and [CI](https://github.com/ansible-collections/ansible.proxmox/tree/09c173588bbdc2c08f4e6e88a2f96864b0105144/.github/workflows).

## Runtime and authentication

The initial collection requires Core >=2.16, Python >=3.11, `proxmoxer>=2.3.0` and `requests`, with PVE 9 documented. Libraries must exist where modules run, normally controller/EE Python. Read root, EE, integration, and unit requirements separately; collection installation alone does not install Python libraries. Preserve its GPL-3.0-or-later license.

Public modules use HTTPS; SSH support was removed in review. Use shared arguments and auth constraints: password plus API user (optional OTP), or paired token ID/secret. A full `user@realm!token` ID can provide the user; a short token name needs `api_user`. Preserve mutual exclusions, secret masking, and TLS validation (enabled by default); `ca_path` requires validation. `api_timeout` defaults to five seconds. The client normally uses PVE; select PBS internally for a verified PBS-specific module rather than exposing a speculative backend switch. PVE and PBS default HTTPS ports are 8006/8007.

Current resource/info examples target PVE. PBS client plumbing or a PDM roadmap does not establish resource support or test coverage. Verify actual operation privileges: the connection-info version query does not validate resource ACLs. Token privilege separation can require privileges on both owner and token.

## Extend the existing classes

| Utility | Extension/contract |
| --- | --- |
| `proxmox.py` / `ProxmoxClient` | Lazy proxmoxer client, shared argument builders, required-together/exclusion groups, auth/TLS and API errors; reuse `client` across helpers |
| `proxmox_base.py` / `ProxmoxBase` | `call_api`, resource existence validation, `result_key`, `prepare_result` and `exit` |
| `proxmox_resource.py` / `ProxmoxResourceModule` | Implement `get_resource`, `create_resource`, `get_update_parameters`, `update_resource`, `delete_resource`; reuse lifecycle, comparison, formatted properties and check-mode predictions; override narrowly for domain behavior |
| `proxmox_info.py` / `ProxmoxInfoModule` | Implement `get_info`, choose `result_key`; execute read-only with `changed=False` |
| `proxmox_action.py` / `ProxmoxActionModule` | Implement `perform_action`; override `is_action_needed` and result hooks when appropriate; this is not an Ansible action plugin |
| `proxmox_task.py` / `ProxmoxTask` | Poll UPID tasks, validate exit status; default wait 300 seconds, zero indefinite, negative invalid; separate task timeout from HTTP timeout |
| `proxmox_power.py` / `ProxmoxPower` | Shared QEMU power checks/start/stop, wait for UPID, verify final state using the same client |

Read actual hooks before implementing; absence of a direct HTTP call in a subclass is not missing behavior. Shared doc fragments are `proxmox_base` and `proxmox_https_options`. Add new public modules to `meta/runtime.yml` action group `proxmox` where they share connection defaults. Reuse shared args, groups and errors instead of duplicating their internals.

## State semantics to preserve

- VM operations identify by scalar `node` and unique integer `vmid`; names are not unique. Current result keys are `vm`, `vms`, `version`, and optional `task_upid`, according to module role.
- For power-state observation, current `proxmox_vm_info` node-wide summaries expose `status`; select the matching `vmid`. Supplying `vmid` retrieves configuration rather than current power status. A `power_cycle` call through `proxmox_vm` remains a lifecycle operation: `state=present` can create a missing VM, so distinguish it from an existing-VM-only action or graceful shutdown requirement.
- Omitted desired parameters leave existing values untouched. A supplied formatted-device list is authoritative: an empty network list can remove all matching devices. Retained device entries preserve unspecified fields; defaults may reset through the API `delete` directive. Use shared serialization/comparison helpers.
- Disks are creation-only in `proxmox_vm`; preserve its documented EFI behavior and validations. Broader disk management is separate scope unless explicitly requested.
- `power_cycle=fail` is the default; changes requiring offline operation fail on a running VM. `on` can stop/update/start, `off` leaves it stopped, and `hotplug` allows live/pending configuration. Deletion permits `off` or `fail`. Pending versus current configuration matters for idempotency.
- Check mode predicts changes without mutation or power transitions while retaining applicable input/permission/state checks. UPID waits must check task failure; a timeout does not cancel the server task.

## Tests and delivery

The VM action/info pair shares `tests/integration/targets/proxmox_vm/`. Its `meta/main.yml` depends on `prepare_tests` to generate IDs; `tasks/main.yml` is a task list, with includes/defaults, group `module_defaults`, and `always` cleanup. Preserve owned-resource isolation and verify removal even when cleanup uses `failed_when: false`. Integration reads generated `integration_config.yml`; regenerate legacy configs with the current prefixed variables. Do not inject an auth environment around tasks or require WinRM/SSH inventory for local API execution.

Run repository Makefile/ansible-test commands in the expected `ansible_collections/ansible/proxmox` layout or the Makefile's install layout, after checking their effects. Use supported versions; integration needs the configured node/storage/bridge resources and privileges. Unit tests use fake clients/mocks for modules and utilities. Cover inherited behavior, structured serialization, defaults, power/task outcomes, and shared consumers touched by changes.

GitHub integration uses a protected approval environment and a self-hosted Proxmox runner, with a serialized Core matrix. Track required jobs and actual selected targets at the current head. SonarCloud is separately triggered from Units; verify its evidence rather than assuming one initial check list covers it.

For normal module work, preserve collection version and generated changelogs. [Maintainer correction](https://github.com/ansible-collections/ansible.proxmox/pull/1#issuecomment-6416325072): new documentable modules are detected from `version_added`; shared utilities and enhancements/bugfixes need fragments. Include supporting metadata/docs/dependencies in the PR.

## Unresolved evidence

At the reviewed revision the VM docs name `/storage`, while implementation checks `/` alongside `/vms` and `/sdn/zones`. The base documentation fragment also states a blanket Administrator requirement, while the connection-info module explicitly performs no ACL precheck. Check the effective rendered documentation as well as module-local notes. Machine defaults were disputed in review. Verify the selected code and supported server behavior; report these conflicts instead of spreading a new permission/default rule or silently rewriting upstream behavior. Earlier SSH, fixed-short-timeout and hidden-error comments describe superseded code.
