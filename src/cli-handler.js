/**
 * CLI Handler for plugin commands
 * Processes: claude plugins install <plugin-name>
 */

const PluginManager = require('./plugin-manager');
const path = require('path');

class CliHandler {
  constructor() {
    const pluginsDir = path.join(__dirname, '..', 'plugins');
    this.pluginManager = new PluginManager(pluginsDir);
  }

  async handleCommand(args) {
    const [command, subcommand, ...rest] = args;

    if (command !== 'plugins') {
      throw new Error(`Unknown command: ${command}`);
    }

    switch (subcommand) {
      case 'install':
        return this.handleInstall(rest);
      case 'list':
        return this.handleList();
      case 'uninstall':
        return this.handleUninstall(rest);
      case 'help':
        return this.showHelp();
      default:
        throw new Error(`Unknown subcommand: ${subcommand}`);
    }
  }

  async handleInstall(args) {
    if (args.length === 0) {
      throw new Error('Plugin name required. Usage: claude plugins install <plugin-name>');
    }

    const pluginName = args[0];
    console.log('\n🔧 Claude Plugins Installer\n');
    console.log(`Installing: ${pluginName}\n`);

    const result = await this.pluginManager.installPlugin(pluginName);

    if (result.success) {
      console.log(`\n✅ Installation complete!\n`);
      console.log(`Plugin "${result.plugin}" (v${result.version}) is now ready to use.\n`);
    } else {
      console.error(`\n❌ Installation failed: ${result.error}\n`);
      process.exit(1);
    }

    return result;
  }

  handleList() {
    const installed = this.pluginManager.listInstalledPlugins();

    if (installed.length === 0) {
      console.log('\nNo plugins installed.\n');
      return { plugins: [] };
    }

    console.log('\n📦 Installed Plugins:\n');
    installed.forEach(plugin => {
      console.log(`  • ${plugin.name} (${plugin.id}) v${plugin.version}`);
      console.log(`    Installed: ${plugin.installedAt}\n`);
    });

    return { plugins: installed };
  }

  async handleUninstall(args) {
    if (args.length === 0) {
      throw new Error('Plugin name required. Usage: claude plugins uninstall <plugin-name>');
    }

    const pluginName = args[0];
    console.log(`\nUninstalling plugin: ${pluginName}\n`);

    const result = await this.pluginManager.uninstallPlugin(pluginName);

    if (result.success) {
      console.log(`✅ Plugin "${result.plugin}" uninstalled successfully.\n`);
    } else {
      console.error(`❌ Uninstall failed: ${result.error}\n`);
      process.exit(1);
    }

    return result;
  }

  showHelp() {
    console.log(`
Claude Plugins - Command Line Interface

Usage: claude plugins <subcommand> [options]

Subcommands:
  install <plugin-name>     Install a plugin
  uninstall <plugin-name>   Uninstall a plugin
  list                      List installed plugins
  help                      Show this help message

Examples:
  claude plugins install gitkraken
  claude plugins list
  claude plugins uninstall gitkraken

For more information, visit: https://claude.ai/plugins
    `);
  }
}

module.exports = CliHandler;
