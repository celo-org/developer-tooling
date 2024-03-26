import { Interfaces } from '@oclif/core'
import { BaseCommand } from '../base'

type AbstractConstructor<T> = new (...args: any[]) => T
interface Runner extends AbstractConstructor<BaseCommand> {
  run: typeof BaseCommand.run
}

export async function testLocally(
  command: Runner,
  argv: string[],
  config?: Interfaces.LoadOptions
) {
  const extendedArgv = [...argv, '--node', 'local']
  return command.run(extendedArgv, config)
}

// Removes font-formatting ANSI codes (colors/styles)
export const stripAnsiCodes = (text: string): string => {
  return text.replace(/\u001b\[.*?m/g, '')
}

export function stripAnsiCodesFromNestedArray(arrays: Array<string[]>) {
  return arrays.map((level0) => level0.map((level1) => stripAnsiCodes(level1)))
}

export const LONG_TIMEOUT_MS = 10 * 1000
export const EXTRA_LONG_TIMEOUT_MS = 20 * 1000
