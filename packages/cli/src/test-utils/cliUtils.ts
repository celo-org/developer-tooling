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
  const runner = new command(extendedArgv, config)
  return runner.run()
}
