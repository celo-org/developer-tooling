import { Hook, ux } from '@oclif/core'

const hook: Hook<'postrun'> = async function () {
  ux.info(`
  Thanks for using the celocli! We are interested in your feedback.
  Let us know at https://github.com/celo-org/developer-tooling/discussions/92

`)
}

export default hook
