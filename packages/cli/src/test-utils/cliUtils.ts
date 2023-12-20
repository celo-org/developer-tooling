import { Interfaces } from '@oclif/core'

type Runner = { run: (argv: string[], config?: Interfaces.LoadOptions) => Promise<any> }

export async function testLocally(
  command: Runner,
  argv: string[],
  config?: Interfaces.LoadOptions
) {
  const extendedArgv = [...argv, '--node', 'local']
  return command.run(extendedArgv, config)
}
