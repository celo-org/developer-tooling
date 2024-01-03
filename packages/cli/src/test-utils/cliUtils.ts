import { Interfaces } from '@oclif/core'
import { BaseCommand } from '../base'

type AbstractConstructor<T> = new (...args: any[]) => T

export async function testLocally<Runner extends AbstractConstructor<BaseCommand>>(
  command: Runner,
  argv: string[],
  config?: Interfaces.LoadOptions
) {
  const extendedArgv = [...argv, '--node', 'local']
  const runner = new command(extendedArgv, config)
  return runner.run()
}
