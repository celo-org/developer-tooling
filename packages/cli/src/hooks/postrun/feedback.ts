import { Hook, ux } from '@oclif/core'
import chalk from 'chalk'

const hook: Hook<'postrun'> = async function () {
  ux.info(
    chalk.cyan(
      `\nThanks for using the celocli! We are interested in your feedback.\nLet us know at ${chalk.bold(
        `github.com/celo-org/developer-tooling/discussions/92`
      )}`
    )
  )
}

export default hook
