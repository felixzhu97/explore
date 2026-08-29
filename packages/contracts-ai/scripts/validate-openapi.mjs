#!/usr/bin/env node
/**
 * Validates the Explore AI Published Language OpenAPI stub.
 * Ensures the chat BFF consumer surface is present (paths + methods).
 */
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const specPath = join(root, 'openapi', 'explore-ai.openapi.json');

/** @type {[string, string][]} path + lowercase method */
const REQUIRED = [
  ['/api/health', 'get'],
  ['/api/text/chat/stream', 'post'],
  ['/api/text/providers', 'get'],
  ['/api/text/models', 'get'],
  ['/api/sessions', 'get'],
  ['/api/sessions', 'post'],
  ['/api/sessions/{sessionId}', 'get'],
  ['/api/sessions/{sessionId}', 'delete'],
  ['/api/sessions/{sessionId}/messages', 'get'],
];

const raw = readFileSync(specPath, 'utf8');
const spec = JSON.parse(raw);

if (!spec.openapi || typeof spec.openapi !== 'string') {
  console.error('contracts-ai: missing openapi version');
  process.exit(1);
}
if (!spec.info?.title || !spec.paths || typeof spec.paths !== 'object') {
  console.error('contracts-ai: invalid OpenAPI document shape');
  process.exit(1);
}

const missing = [];
for (const [path, method] of REQUIRED) {
  const item = spec.paths[path];
  if (!item || typeof item[method] !== 'object') {
    missing.push(`${method.toUpperCase()} ${path}`);
  }
}

if (missing.length > 0) {
  console.error('contracts-ai: missing consumer operations:\n  ' + missing.join('\n  '));
  process.exit(1);
}

console.log(
  `contracts-ai: OpenAPI ${spec.openapi} ok (${REQUIRED.length} consumer operations)`,
);
