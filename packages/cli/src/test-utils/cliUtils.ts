import { Interfaces } from '@oclif/core'
import { BaseCommand } from '../base'

export async function testLocally(
  command: typeof BaseCommand,
  argv: string[],
  config?: Interfaces.LoadOptions
) {
  const extendedArgv = [...argv, '--node', 'local']
  return command.run(extendedArgv, config)
}
