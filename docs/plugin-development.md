# Plugin Development Guide

This guide explains how to create plugins for Claude Code using the plugin system.

## Plugin Structure

A plugin consists of:
- `manifest.json` - Plugin metadata and configuration schema
- `plugin.js` - Plugin implementation
- Optional: `README.md`, `LICENSE`, documentation files

```
my-plugin/
├── manifest.json
├── plugin.js
├── README.md
└── LICENSE
```

## Manifest Format

The `manifest.json` file describes your plugin:

```json
{
  "id": "my-plugin",
  "name": "My Plugin",
  "version": "1.0.0",
  "description": "Description of what the plugin does",
  "author": "Your Name",
  "license": "MIT",
  "capabilities": ["capability1", "capability2"],
  "permissions": ["read:something", "write:something"],
  "configuration": {
    "type": "object",
    "properties": {
      "setting": {
        "type": "string",
        "description": "A setting"
      }
    }
  }
}
```

## Plugin Class

Implement a plugin by extending the base Plugin class:

```javascript
class MyPlugin {
  constructor(config = {}) {
    this.config = config;
    this.name = 'my-plugin';
    this.version = '1.0.0';
    this.initialized = false;
  }

  async initialize() {
    // Setup plugin
    this.initialized = true;
  }

  // Your plugin methods here
}

module.exports = MyPlugin;
```

## Capabilities

Plugins can declare capabilities they provide:
- `git-operations` - Git command execution
- `repository-visualization` - Repository visualization features
- `branch-management` - Branch management tools
- `commit-analysis` - Commit history analysis
- `conflict-resolution` - Merge conflict handling
- `team-collaboration` - Collaboration features

## Installation

To make your plugin available for installation:

1. Place it in the `plugins/` directory
2. Ensure manifest.json and plugin.js are present
3. Install with: `claude plugins install my-plugin`

## Example: GitKraken Plugin

See `plugins/gitkraken/` for a complete example implementation.
