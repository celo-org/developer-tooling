import { accessSync, constants } from 'node:fs'
import { delimiter, join } from 'node:path'

/**
 * Resolve the `anvil` binary to use for the test harness.
 *
 * The devchain state snapshot (`@celo/devchain-anvil`) is generated for the
 * foundry version pinned by CI, and newer anvil releases cannot parse it. When
 * a package depends on the npm-distributed anvil (e.g. `@foundry-rs/anvil`,
 * which celocli bundles for runtime forking), yarn creates a
 * `node_modules/.bin/anvil` shim that shadows the foundry install on PATH. That
 * shim is a different (incompatible) anvil version, so we must skip it and pick
 * the system/foundry anvil instead.
 *
 * Honors `CELO_TEST_ANVIL_BINARY` as an explicit override; otherwise returns
 * the first `anvil` on PATH that is NOT inside a `node_modules/.bin` directory,
 * falling back to `'anvil'` (let @viem/anvil resolve it) when none is found.
 */
export function resolveSystemAnvilBinary(): string {
  const override = process.env.CELO_TEST_ANVIL_BINARY
  if (override) {
    return override
  }

  const isWindows = process.platform === 'win32'
  const exeNames = isWindows ? ['anvil.exe', 'anvil.cmd', 'anvil'] : ['anvil']

  // Prefer foundry's standard install location. This is where `foundryup`
  // installs locally and where the `foundry-toolchain` GitHub Action installs in
  // CI ($HOME/.foundry/bin), so it reliably points at the snapshot-compatible
  // version regardless of how PATH is ordered by the package manager.
  const home = process.env.HOME || process.env.USERPROFILE
  if (home) {
    for (const exe of exeNames) {
      const candidate = join(home, '.foundry', 'bin', exe)
      try {
        accessSync(candidate, constants.X_OK)
        return candidate
      } catch {
        // not installed here, fall through to PATH scan
      }
    }
  }

  // Fallback: first `anvil` on PATH that is not a package-manager bin shim.
  // Skip node_modules/.bin and yarn's temporary wrapper dirs (e.g. `.../xfs-*`,
  // `.yarn/`), which may resolve to a bundled, snapshot-incompatible anvil.
  const isShimDir = (dir: string) =>
    dir.includes('node_modules') || /[\\/](xfs-[^\\/]*|\.yarn)([\\/]|$)/.test(dir)

  for (const dir of (process.env.PATH ?? '').split(delimiter)) {
    if (!dir || isShimDir(dir)) {
      continue
    }
    for (const exe of exeNames) {
      const candidate = join(dir, exe)
      try {
        accessSync(candidate, constants.X_OK)
        return candidate
      } catch {
        // not here, keep looking
      }
    }
  }

  return 'anvil'
}
