# Claude Plugins System

A plugin system for Claude Code that enables seamless installation and management of third-party integrations.

## Features

- Easy plugin installation via `claude plugins install <plugin-name>`
- Plugin discovery and management
- Support for various integrations including GitKraken

## Supported Plugins

- **GitKraken** - Git client integration for enhanced version control workflows

## Installation

### Installing GitKraken Plugin

```bash
claude plugins install gitkraken
```

This will:
1. Download the GitKraken plugin package
2. Verify plugin integrity
3. Register the plugin with Claude Code
4. Enable GitKraken integration features

## Usage

After installation, GitKraken features will be available within Claude Code for enhanced git operations, visualization, and collaboration.

## Architecture

- `plugins/` - Plugin definitions and metadata
- `src/` - Plugin system implementation
- `config/` - Configuration schemas

## Development

To create a new plugin, see the plugin development guide in `docs/plugin-development.md`.
