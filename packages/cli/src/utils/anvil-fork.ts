import { type Anvil, createAnvil } from '@viem/anvil'
import { type AddressInfo, createServer } from 'net'

/**
 * Ask the OS for a free TCP port on loopback. Avoids colliding with @viem/anvil's
 * default 8545 (which createAnvil uses unless a port is given, and does not retry
 * on bind failure) when another anvil/devchain is already running locally.
 */
async function getFreePort(): Promise<number> {
  return new Promise<number>((resolve, reject) => {
    const server = createServer()
    server.unref()
    server.on('error', reject)
    server.listen(0, '127.0.0.1', () => {
      const port = (server.address() as AddressInfo).port
      server.close(() => resolve(port))
    })
  })
}

// Maps the running platform to the @foundry-rs/anvil prebuilt-binary package.
const PLATFORM_PACKAGES: Record<string, string> = {
  'darwin-arm64': '@foundry-rs/anvil-darwin-arm64',
  'darwin-x64': '@foundry-rs/anvil-darwin-amd64',
  'linux-x64': '@foundry-rs/anvil-linux-amd64',
  'linux-arm64': '@foundry-rs/anvil-linux-arm64',
  'win32-x64': '@foundry-rs/anvil-win32-amd64',
}

/**
 * Resolve the path to the bundled anvil binary for the current platform.
 * Returns undefined when no prebuilt binary is available, in which case
 * @viem/anvil falls back to an `anvil` on the PATH (e.g. a foundry install).
 */
export function resolveAnvilBinary(): string | undefined {
  const pkg = PLATFORM_PACKAGES[`${process.platform}-${process.arch}`]
  if (!pkg) {
    return undefined
  }
  for (const binPath of [`${pkg}/bin/anvil`, `${pkg}/bin/anvil.exe`]) {
    try {
      return require.resolve(binPath)
    } catch {
      // try the next candidate
    }
  }
  return undefined
}

/**
 * Start a local anvil instance forking `forkUrl`, run `fn` against its RPC URL,
 * and always stop the instance afterwards. Auto-impersonation is enabled so
 * callers can send transactions from arbitrary accounts (e.g. the Governance
 * contract) without unlocking them.
 */
export async function withAnvilFork<T>(
  forkUrl: string,
  fn: (rpcUrl: string) => Promise<T>
): Promise<T> {
  const anvil: Anvil = createAnvil({
    forkUrl,
    autoImpersonate: true,
    anvilBinary: resolveAnvilBinary(),
    host: '127.0.0.1',
    // Without this @viem/anvil defaults to 8545 and does not fall back on bind
    // failure, so a locally-running node/anvil would break the simulation.
    port: await getFreePort(),
  })

  await anvil.start()
  try {
    return await fn(`http://${anvil.host}:${anvil.port}`)
  } finally {
    await anvil.stop()
  }
}
