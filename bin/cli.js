#!/usr/bin/env node

/**
 * Claude Plugins CLI
 * Entry point for plugin management commands
 */

const CliHandler = require('../src/cli-handler');

async function main() {
  try {
    const handler = new CliHandler();
    const args = process.argv.slice(2);

    if (args.length === 0) {
      handler.showHelp();
      return;
    }

    await handler.handleCommand(args);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();
