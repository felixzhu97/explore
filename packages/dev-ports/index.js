import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const ports = JSON.parse(readFileSync(join(root, 'ports.json'), 'utf8'));

/**
 * @returns {Readonly<Record<string, Record<string, number>>>}
 */
export function getPorts() {
  return ports;
}

/**
 * @param {string} app - Catalogued app id (e.g. "explore-chat")
 * @param {string} role - Port role (e.g. "api", "web")
 * @returns {number}
 */
export function getPort(app, role) {
  const appPorts = ports[app];
  if (!appPorts) {
    throw new Error(`Unknown app in @explore/dev-ports: ${app}`);
  }
  const port = appPorts[role];
  if (typeof port !== 'number') {
    throw new Error(`Unknown role "${role}" for ${app} in @explore/dev-ports`);
  }
  return port;
}

export default ports;
