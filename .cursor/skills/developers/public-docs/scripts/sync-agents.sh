#!/usr/bin/env bash
# Copy the canonical agent definitions into a project repo, or report drift.
# Usage: sync-agents.sh [--check] <repo-dir> [<repo-dir> ...]
set -euo pipefail

src="$(cd "$(dirname "$0")/../agents" && pwd)"
check=false
if [[ "${1:-}" == "--check" ]]; then check=true; shift; fi
(($#)) || { echo "usage: $0 [--check] <repo-dir>..." >&2; exit 2; }

status=0
for repo in "$@"; do
  dest="$repo/.cursor/agents"
  name="$(basename "$repo")"
  for f in "$src"/*.md; do
    b="$(basename "$f")"
    if $check; then
      if [[ ! -f "$dest/$b" ]]; then
        echo "$name: missing $b"; status=1
      elif ! cmp -s "$f" "$dest/$b"; then
        echo "$name: differs $b"; status=1
      fi
    else
      mkdir -p "$dest"
      cp "$f" "$dest/$b"
    fi
  done
  for f in "$dest"/*.md; do
    [[ -e "$f" ]] || continue
    [[ -f "$src/$(basename "$f")" ]] || echo "$name: extra $(basename "$f") (not in canonical set; kept)"
  done
  $check || echo "$name: synced $(ls "$src"/*.md | wc -l | tr -d ' ') agents"
done
exit $status
