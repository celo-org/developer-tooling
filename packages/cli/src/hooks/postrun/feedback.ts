import { Hook, ux } from '@oclif/core'

const hook: Hook<'postrun'> = async function (options) {
  ux.info(`Thanks for using the celocli!
We want to know which commands are most useful to the community.
Is '${options.Command.id}' a command you use often?
Let us know at https://github.com/celo-org/developer-tooling/discussions/92
`)
}

export default hook
