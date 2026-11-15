#!/usr/bin/env node
/**
 * Report-only denylist scan per docs/plans/naming-standards.md §7.
 * Searches explore-* project dirs and docs/ via ripgrep (excludes node_modules).
 */

import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..');

/** Initial denylist — report-only until N4 products are migrated */
const DENYLIST = [
  'permissionPoint',
  'Enableable',
  'OwnerKey',
  'X-Client-Id',
  'ea_cid',
  'X-Service-Key',
  'X-Admin-Key',
  'X-Quota-',
  'KAFKA_BROKERS',
  'whatschat',
  'SIM_COIN',
  'SUMMARISATION',
  'EXPO_PUBLIC_DEMO_',
  'DD_RUM_USER_EMAIL',
  'shopping-mongodb',
];

function discoverSearchRoots() {
  const roots = ['docs'];
  const exploreGlob = spawnSync(
    'bash',
    [
      '-lc',
      `find "${REPO_ROOT}" -maxdepth 1 -type d -name 'explore-*' -print 2>/dev/null`,
    ],
    { encoding: 'utf8' },
  );
  if (exploreGlob.status === 0 && exploreGlob.stdout.trim()) {
    for (const line of exploreGlob.stdout.trim().split('\n')) {
      if (line) roots.push(line);
    }
  }
  return roots.filter((p) => existsSync(p));
}

function rgForPattern(pattern, roots) {
  const args = [
    '--line-number',
    '--no-heading',
    '--color',
    'never',
    '--glob',
    '!**/node_modules/**',
    '-F',
    pattern,
    ...roots,
  ];
  const result = spawnSync('rg', args, {
    cwd: REPO_ROOT,
    encoding: 'utf8',
    maxBuffer: 10 * 1024 * 1024,
  });
  if (result.error?.code === 'ENOENT') {
    console.error('ripgrep (rg) is required on PATH');
    process.exit(1);
  }
  if (result.status === 1) {
    return [];
  }
  if (result.status !== 0 && result.status !== 2) {
    console.error(`rg failed for pattern ${pattern}:`, result.stderr || result.stdout);
    process.exit(1);
  }
  return (result.stdout || '')
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);
}

function main() {
  const roots = discoverSearchRoots();
  console.log('Naming denylist check (report-only)');
  console.log(`Patterns: ${DENYLIST.length}`);
  console.log(`Roots: ${roots.map((r) => r.replace(REPO_ROOT + '/', '')).join(', ')}`);

  let totalHits = 0;
  for (const pattern of DENYLIST) {
    const lines = rgForPattern(pattern, roots);
    if (lines.length === 0) continue;
    totalHits += lines.length;
    console.log(`\n## ${pattern} (${lines.length} hit(s))`);
    const max = 50;
    for (const line of lines.slice(0, max)) {
      console.log(line);
    }
    if (lines.length > max) {
      console.log(`... and ${lines.length - max} more`);
    }
  }

  console.log('\n## Summary');
  console.log(JSON.stringify({ patterns: DENYLIST.length, totalHits }));

  if (totalHits > 0) {
    console.log(
      '(report-only mode: exiting 0; migrate naming per naming-standards.md)',
    );
  }

  process.exit(0);
}

main();