import { Interfaces } from '@oclif/core'
import Web3 from 'web3'
import { BaseCommand } from '../base'

type AbstractConstructor<T> = new (...args: any[]) => T
interface Runner extends AbstractConstructor<BaseCommand> {
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
  if (web3.currentProvider instanceof Web3.providers.HttpProvider) {
    return web3.currentProvider.host
  }

  // CeloProvider is not exported from @celo/connect, but it's injected into web3
  if (web3.currentProvider !== null && web3.currentProvider.constructor.name === 'CeloProvider') {
    return (web3.currentProvider as any).existingProvider.host
  }

  throw new Error('Unsupported provider')
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

// Removes font-formatting ANSI codes (colors/styles) from a string
export const stripAnsiCodes = (text: string): string => {
  return text.replace(/\u001b\[.*?m/g, '')
}

export function stripAnsiCodesFromNestedArray(arrays: Array<string[]>) {
  return arrays.map((level0) => level0.map((level1) => stripAnsiCodes(level1)))
}

export const LONG_TIMEOUT_MS = 10 * 1000
export const EXTRA_LONG_TIMEOUT_MS = 20 * 1000
