#!/usr/bin/env node
/**
 * Parse docs/References.md table links and verify HTTP reachability.
 * Report-only: exit 0 unless the script itself errors (missing file, etc.).
 *
 * Skips hosts known to block automation (403); see SKIP_HOST_SUFFIXES.
 */

import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..');
const REFERENCES_PATH = join(REPO_ROOT, 'docs', 'References.md');

/** Hosts that routinely return 403 to bots — manual / search verification per References.md */
const SKIP_HOST_SUFFIXES = [
  'iso.org',
  'webstore.ansi.org',
  'www.gs1.org',
  'gs1.org',
];

const FETCH_TIMEOUT_MS = 30_000;
const USER_AGENT =
  'explore-standards-check/1.0 (+https://github.com/felixzhu97/public)';

process.env.NO_PROXY = '*';
process.env.no_proxy = '*';

function extractUrls(markdown) {
  const urls = new Set();
  const angle = /<((?:https?):\/\/[^>]+)>/gi;
  const mdLink = /\[[^\]]*\]\((https?:\/\/[^)\s]+)\)/gi;
  let m;
  while ((m = angle.exec(markdown)) !== null) {
    urls.add(m[1].trim());
  }
  while ((m = mdLink.exec(markdown)) !== null) {
    urls.add(m[1].trim());
  }
  return [...urls].sort();
}

function hostSkipped(hostname) {
  const h = hostname.toLowerCase();
  return SKIP_HOST_SUFFIXES.some(
    (suffix) => h === suffix || h.endsWith(`.${suffix}`),
  );
}

async function checkUrl(url) {
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    return { url, status: 'error', detail: 'invalid URL' };
  }

  if (hostSkipped(parsed.hostname)) {
    return {
      url,
      status: 'skipped',
      detail: `host ${parsed.hostname} (bot 403; verify manually)`,
    };
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  const init = {
    method: 'HEAD',
    redirect: 'follow',
    signal: controller.signal,
    headers: { 'User-Agent': USER_AGENT },
  };

  try {
    let res = await fetch(url, init);
    if (res.status === 405 || res.status === 501) {
      res = await fetch(url, {
        ...init,
        method: 'GET',
        headers: { ...init.headers, Range: 'bytes=0-0' },
      });
    }
    clearTimeout(timer);
    const ok = res.ok || res.status === 304;
    if (ok) {
      return { url, status: 'ok', detail: String(res.status) };
    }
    if (res.status === 403) {
      return {
        url,
        status: 'skipped',
        detail: `HTTP 403 (may block bots; verify manually)`,
      };
    }
    return { url, status: 'broken', detail: `HTTP ${res.status}` };
  } catch (err) {
    clearTimeout(timer);
    const message =
      err instanceof Error ? err.message : String(err);
    return { url, status: 'broken', detail: message };
  }
}

function extractRfcNumbers(urls) {
  const numbers = new Set();
  const rfcRe =
    /https?:\/\/(?:www\.)?rfc-editor\.org\/rfc\/rfc(\d+)\.html/i;
  for (const url of urls) {
    const m = url.match(rfcRe);
    if (m) numbers.add(m[1]);
  }
  return [...numbers].sort((a, b) => Number(a) - Number(b));
}

async function checkRfcStatus(rfcNumber) {
  const metaUrl = `https://www.rfc-editor.org/rfc/rfc${rfcNumber}.json`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(metaUrl, {
      signal: controller.signal,
      headers: { 'User-Agent': USER_AGENT },
    });
    clearTimeout(timer);
    if (!res.ok) {
      return {
        rfc: rfcNumber,
        status: 'warn',
        detail: `metadata HTTP ${res.status}`,
      };
    }
    const data = await res.json();
    const obsoletedBy = data?.obsoleted_by;
    if (obsoletedBy && String(obsoletedBy).trim()) {
      return {
        rfc: rfcNumber,
        status: 'obsolete',
        detail: `obsoleted_by: ${obsoletedBy}`,
      };
    }
    return { rfc: rfcNumber, status: 'current', detail: '' };
  } catch (err) {
    clearTimeout(timer);
    return {
      rfc: rfcNumber,
      status: 'warn',
      detail: err instanceof Error ? err.message : String(err),
    };
  }
}

function printSection(title, lines) {
  console.log(`\n## ${title}`);
  if (lines.length === 0) {
    console.log('(none)');
    return;
  }
  for (const line of lines) console.log(line);
}

async function main() {
  let markdown;
  try {
    markdown = readFileSync(REFERENCES_PATH, 'utf8');
  } catch (err) {
    console.error(`Failed to read ${REFERENCES_PATH}:`, err);
    process.exit(1);
  }

  const urls = extractUrls(markdown);
  console.log(`References link check — ${urls.length} unique URL(s) in docs/References.md`);
  console.log(`NO_PROXY=${process.env.NO_PROXY} (direct fetch, no HTTP proxy)`);

  const results = [];
  for (const url of urls) {
    // Sequential to be polite to remote hosts in CI
    results.push(await checkUrl(url));
  }

  const byStatus = (s) => results.filter((r) => r.status === s);
  printSection(
    'Broken or unreachable',
    byStatus('broken').map((r) => `- ${r.url} — ${r.detail}`),
  );
  printSection(
    'Skipped (403 / bot-blocked hosts)',
    byStatus('skipped').map((r) => `- ${r.url} — ${r.detail}`),
  );
  printSection(
    'OK',
    byStatus('ok').map((r) => `- ${r.url} (${r.detail})`),
  );

  const summary = {
    ok: byStatus('ok').length,
    broken: byStatus('broken').length,
    skipped: byStatus('skipped').length,
  };
  console.log('\n## Summary');
  console.log(JSON.stringify(summary));

  const rfcNumbers = extractRfcNumbers(urls);
  console.log(`\n## RFC status (${rfcNumbers.length} RFC(s) linked)`);
  const rfcResults = [];
  for (const num of rfcNumbers) {
    rfcResults.push(await checkRfcStatus(num));
  }
  const obsolete = rfcResults.filter((r) => r.status === 'obsolete');
  const rfcWarn = rfcResults.filter((r) => r.status === 'warn');
  printSection(
    'RFC obsoleted_by',
    obsolete.map((r) => `- RFC ${r.rfc}: ${r.detail}`),
  );
  printSection(
    'RFC metadata warnings',
    rfcWarn.map((r) => `- RFC ${r.rfc}: ${r.detail}`),
  );

  if (summary.broken > 0 || obsolete.length > 0) {
    console.log(
      '\n(report-only mode: exiting 0; broken links or obsolete RFCs listed above)',
    );
  }

  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});