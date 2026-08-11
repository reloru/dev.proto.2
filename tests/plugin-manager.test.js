/**
 * Tests for PluginManager
 */

const PluginManager = require('../src/plugin-manager');
const path = require('path');

describe('PluginManager', () => {
  let manager;

  beforeEach(() => {
    const testPluginsDir = path.join(__dirname, '..', 'plugins');
    manager = new PluginManager(testPluginsDir);
  });

  test('should initialize', () => {
    expect(manager).toBeDefined();
    expect(manager.plugins).toBeInstanceOf(Map);
    expect(manager.installedPlugins).toEqual([]);
  });

  test('should validate plugin manifest', () => {
    const validManifest = {
      id: 'test-plugin',
      name: 'Test Plugin',
      version: '1.0.0',
      description: 'A test plugin'
    };

    expect(() => manager.validatePlugin(validManifest)).not.toThrow();
  });

  test('should reject invalid plugin ID', () => {
    const invalidManifest = {
      id: 'Test Plugin!',
      name: 'Test Plugin',
      version: '1.0.0',
      description: 'A test plugin'
    };

    expect(() => manager.validatePlugin(invalidManifest)).toThrow('Invalid plugin ID format');
  });

  test('should reject invalid version format', () => {
    const invalidManifest = {
      id: 'test-plugin',
      name: 'Test Plugin',
      version: 'latest',
      description: 'A test plugin'
    };

    expect(() => manager.validatePlugin(invalidManifest)).toThrow('Invalid plugin version format');
  });

  test('should list installed plugins', () => {
    const installed = manager.listInstalledPlugins();
    expect(Array.isArray(installed)).toBe(true);
  });
});
