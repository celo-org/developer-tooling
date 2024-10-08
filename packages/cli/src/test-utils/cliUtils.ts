import { Interfaces } from '@oclif/core'
import Web3 from 'web3'
import { BaseCommand } from '../base'
import { CeloCommand } from '../celo'

type AbstractConstructor<T> = new (...args: any[]) => T
interface Runner extends AbstractConstructor<CeloCommand> {
  run: typeof BaseCommand.run
}

export async function testLocallyWithWeb3Node(
  command: Runner,
  argv: string[],
  web3: Web3,
  config?: Interfaces.LoadOptions
) {
  return testLocally(command, [...argv, '--node', extractHostFromWeb3(web3)], config)
}

export const extractHostFromWeb3 = (web3: Web3): string => {
  // why would the constructor name be HttpProvider but it not be considered an instance of HttpProvider? idk but it happens
  if (
    web3.currentProvider instanceof Web3.providers.HttpProvider ||
    web3.currentProvider?.constructor.name === 'HttpProvider'
  ) {
    // @ts-ignore
    return web3.currentProvider.host
  }

  // CeloProvider is not exported from @celo/connect, but it's injected into web3
  if (web3.currentProvider !== null && web3.currentProvider.constructor.name === 'CeloProvider') {
    return (web3.currentProvider as any).existingProvider.host
  }

  throw new Error(`Unsupported provider, ${web3.currentProvider?.constructor.name}`)
}

export async function testLocally(
  command: Runner,
  argv: string[],
  config?: Interfaces.LoadOptions
) {
  if (argv.includes('--node')) {
    return command.run(argv, config)
  }

  const extendedArgv = [...argv, '--node', 'local']
  return command.run(extendedArgv, config)
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

export function stripAnsiCodesFromNestedArray(arrays: Array<string[]>) {
  return arrays.map((level0) => level0.map((level1) => stripAnsiCodesAndTxHashes(level1)))
}

export const LONG_TIMEOUT_MS = 10 * 1000
export const EXTRA_LONG_TIMEOUT_MS = 60 * 1000
