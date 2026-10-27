#!/usr/bin/env bash
# One-shot Orbit Studio launch for local development.
# Skips the CUA driver download that often stalls `make studio`.
set -euo pipefail

root=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)
electron="$root/desktop/electron"
frontend="$root/desktop/frontend-next"
host_bin="$electron/bin/reasonix-studio-host"

export GOPROXY="${GOPROXY:-https://goproxy.cn,direct}"
export GOTOOLCHAIN="${GOTOOLCHAIN:-local}"
export ELECTRON_MIRROR="${ELECTRON_MIRROR:-https://npmmirror.com/mirrors/electron/}"

die() { echo "error: $*" >&2; exit 1; }

# Prefer a local Go toolchain if PATH does not have one yet.
if ! command -v go >/dev/null 2>&1; then
  if [ -x "$HOME/sdk/go/bin/go" ]; then
    export PATH="$HOME/sdk/go/bin:$PATH"
  else
    die "go not found; install Go 1.26+ or put it on PATH"
  fi
fi

# Node 24+ and pnpm 10, via nvm when present.
if [ -s "${NVM_DIR:-$HOME/.nvm}/nvm.sh" ]; then
  # shellcheck disable=SC1090
  . "${NVM_DIR:-$HOME/.nvm}/nvm.sh"
  nvm use 24 >/dev/null 2>&1 || nvm use 24.19.0 >/dev/null 2>&1 || true
fi
command -v node >/dev/null 2>&1 || die "node not found"
command -v pnpm >/dev/null 2>&1 || {
  if command -v corepack >/dev/null 2>&1; then
    corepack enable >/dev/null 2>&1 || true
    corepack prepare pnpm@10 --activate
  else
    die "pnpm not found; run: corepack enable && corepack prepare pnpm@10 --activate"
  fi
}

node_major=$(node -p "process.versions.node.split('.')[0]")
[ "$node_major" -ge 24 ] || die "Node 24+ required (have $(node -v))"

echo "node=$(node -v)  pnpm=$(pnpm -v)  go=$(go version | awk '{print $3}')"

if [ ! -d "$electron/node_modules" ]; then
  echo "==> electron deps"
  (cd "$electron" && pnpm install --frozen-lockfile)
fi

if [ ! -d "$frontend/node_modules" ]; then
  echo "==> frontend deps"
  (cd "$frontend" && pnpm install --frozen-lockfile)
fi

# Force clean rebuild so brand / UI source changes are never served from a stale dist.
echo "==> frontend (clean)"
rm -rf "$frontend/dist" "$frontend/node_modules/.vite"
(cd "$frontend" && pnpm build)

# Native arm64 host only — packaging uses a universal binary + CUA download.
echo "==> kernel (clean)"
mkdir -p "$electron/bin"
rm -f "$host_bin"
(cd "$root" && CGO_ENABLED=0 go build -ldflags "-s -w" -o "$host_bin" ./cmd/reasonix-studio-host)

echo "==> studio"
cd "$electron"
exec pnpm start
