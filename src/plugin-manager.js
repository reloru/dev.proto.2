/**
 * Plugin Manager
 * Handles plugin installation, loading, and lifecycle management
 */

const fs = require('fs');
const path = require('path');

class PluginManager {
  constructor(pluginsDir = './plugins') {
    this.pluginsDir = pluginsDir;
    this.plugins = new Map();
    this.installedPlugins = [];
  }

  async installPlugin(pluginName) {
    console.log(`Installing plugin: ${pluginName}`);

    try {
      // Check if plugin exists locally
      const pluginPath = path.join(this.pluginsDir, pluginName);

      if (!fs.existsSync(pluginPath)) {
        throw new Error(`Plugin not found: ${pluginName}`);
      }

      // Load plugin manifest
      const manifestPath = path.join(pluginPath, 'manifest.json');
      if (!fs.existsSync(manifestPath)) {
        throw new Error(`Plugin manifest not found for ${pluginName}`);
      }

      const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

      // Validate plugin
      this.validatePlugin(manifest);

      // Load plugin implementation
      const pluginFile = path.join(pluginPath, 'plugin.js');
      if (!fs.existsSync(pluginFile)) {
        throw new Error(`Plugin implementation not found for ${pluginName}`);
      }

      // Register plugin
      const PluginClass = require(path.resolve(pluginFile));
      const pluginInstance = new PluginClass(manifest.configuration || {});

      await pluginInstance.initialize();

      this.plugins.set(pluginName, pluginInstance);
      this.installedPlugins.push({
        id: manifest.id,
        name: manifest.name,
        version: manifest.version,
        installedAt: new Date().toISOString()
      });

      console.log(`✓ Plugin installed successfully: ${pluginName} v${manifest.version}`);
      return {
        success: true,
        plugin: pluginName,
        version: manifest.version
      };
    } catch (error) {
      console.error(`✗ Failed to install plugin ${pluginName}:`, error.message);
      return {
        success: false,
        plugin: pluginName,
        error: error.message
      };
    }
  }

  validatePlugin(manifest) {
    const requiredFields = ['id', 'name', 'version', 'description'];

    for (const field of requiredFields) {
      if (!manifest[field]) {
        throw new Error(`Missing required field in manifest: ${field}`);
      }
    }

    if (!manifest.id.match(/^[a-z0-9-]+$/)) {
      throw new Error('Invalid plugin ID format');
    }

    if (!this.isValidVersion(manifest.version)) {
      throw new Error('Invalid plugin version format');
    }
  }

  isValidVersion(version) {
    return /^\d+\.\d+\.\d+/.test(version);
  }

  getPlugin(pluginName) {
    return this.plugins.get(pluginName);
  }

  listInstalledPlugins() {
    return this.installedPlugins;
  }

  async uninstallPlugin(pluginName) {
    console.log(`Uninstalling plugin: ${pluginName}`);

    if (!this.plugins.has(pluginName)) {
      return {
        success: false,
        error: `Plugin not found: ${pluginName}`
      };
    }

    this.plugins.delete(pluginName);
    this.installedPlugins = this.installedPlugins.filter(p => p.id !== pluginName);

    console.log(`✓ Plugin uninstalled: ${pluginName}`);
    return {
      success: true,
      plugin: pluginName
    };
  }
}

module.exports = PluginManager;
