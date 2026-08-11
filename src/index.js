/**
 * Claude Plugins System - Main Entry Point
 */

const PluginManager = require('./plugin-manager');
const CliHandler = require('./cli-handler');

module.exports = {
  PluginManager,
  CliHandler,
  version: '1.0.0'
};
