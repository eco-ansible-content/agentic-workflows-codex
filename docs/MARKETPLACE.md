# Marketplace Operations

This repository is a native Codex marketplace. Its catalog is [`.agents/plugins/marketplace.json`](../.agents/plugins/marketplace.json), which lists the two local plugin roots in display order.

## Team distribution

An administrator imports `https://github.com/eco-ansible-content/agentic-workflows-codex` in **Admin → Plugins → Add → Import marketplace**. Leave the path blank because the marketplace manifest is at the repository root. The workspace can then expose either plugin as Available or install it by default for selected roles.

The workspace syncs the GitHub source automatically; use **Sync now** after merging an urgent release. Administrators must review changes before merge because a synced marketplace can introduce newly listed plugins.

## Local development

Register the checkout as a local marketplace, install a plugin, then test in a new Codex conversation:

```bash
codex plugin marketplace add /absolute/path/to/agentic-workflows-codex
codex plugin add agentic-workflows@agentic-workflows-codex
codex plugin add agentic-tools@agentic-workflows-codex
```

For an iteration after installation, update only the changed plugin's version/cachebuster, reinstall it, and use a new conversation. Do not edit the installed copy.

## Release checklist

1. Test each changed skill with a representative fresh Codex conversation.
2. Bump the affected `plugins/<name>/.codex-plugin/plugin.json` SemVer version.
3. Run the plugin validator for each changed plugin.
4. Verify the marketplace entry still names the same plugin and points to `./plugins/<name>`.
5. Commit, tag if appropriate, push, and ask the workspace administrator to sync.

The marketplace separates release versions by plugin. A change to `agentic-tools` does not require a version bump to `agentic-workflows`.
