import { PublicCeloClient } from '@celo/actions'
import { Provider } from '@celo/connect'
import { TestClientExtended } from '@celo/dev-utils/viem/anvil-test'
import { Interfaces } from '@oclif/core'
import { BaseCommand } from '../base'

type AbstractConstructor<T> = new (...args: any[]) => T
interface Runner extends AbstractConstructor<BaseCommand> {
  run: typeof BaseCommand.run
  flags: typeof BaseCommand.flags
}

export async function testLocallyWithWeb3Node(
  command: Runner,
  argv: string[],
  client: { currentProvider: Provider },
  config?: Interfaces.LoadOptions
) {
  return testLocally(command, [...argv, '--node', extractHostFromWeb3(client)], config)
}

export const extractHostFromWeb3 = (client: { currentProvider: Provider }): string => {
  const provider = client.currentProvider as Provider & {
    host?: string
    url?: string
    existingProvider?: { host?: string; url?: string }
  }
  if (!provider) {
    throw new Error('No currentProvider on client')
  }

  // CeloProvider wraps the underlying provider
  if (provider.constructor.name === 'CeloProvider') {
    const inner = provider.existingProvider
    return inner?.host || inner?.url || 'http://localhost:8545'
  }

  // Direct provider (HttpProvider or SimpleHttpProvider)
  if (provider.host) {
    return provider.host
  }
  if (provider.url) {
    return provider.url
  }

  throw new Error(`Unsupported provider, ${provider.constructor.name}`)
}

export async function testLocallyWithViemNode(
  command: Runner,
  argv: string[],
  client: TestClientExtended,
  config?: Interfaces.LoadOptions
) {
  jest.spyOn(BaseCommand.prototype, 'getPublicClient').mockResolvedValue(client as PublicCeloClient)
  return testLocally(command, [...argv, '--node', client.chain.rpcUrls.default.http[0]], config)
}

export async function testLocally(
  command: Runner,
  argv: string[],
  config?: Interfaces.LoadOptions
) {
  if (argv.includes('--node')) {
    return command.run(argv, config)
  }

  const extendedArgv = command.flags.node ? [...argv, '--node', 'local'] : argv
  return command.run(extendedArgv, config)
}

export async function testWithoutChain(
  command: Runner,
  argv: string[],
  config?: Interfaces.LoadOptions
) {
  return command.run(argv, config)
}

// Removes font-formatting ANSI codes (colors/styles) and transaction hashes from a string
export const stripAnsiCodesAndTxHashes = (text: string): string => {
  if (typeof text !== 'string') {
    // Not everything that comes in here is a string (you can console.log anything), so we just return it as is
    return text
  }

  return text
    .replace(/\u001b\[.*?m/g, '')
    .replace(/^txHash: 0x([A-Fa-f0-9]{64})$/, 'txHash: 0xtxhash')
}

export function stripAnsiCodesFromNestedArray(arrays: string[][]) {
  return arrays.map((level0) => level0.map((level1) => stripAnsiCodesAndTxHashes(level1)))
}

export const LONG_TIMEOUT_MS = 10 * 1000
export const EXTRA_LONG_TIMEOUT_MS = 60 * 1000

export const TEST_SANCTIONED_ADDRESS = '0x01e2919679362dfbc9ee1644ba9c6da6d6245bb1'
