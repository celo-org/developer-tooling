import { Hook, ux } from '@oclif/core'
import chalk from 'chalk'
import { readConfig } from '../../utils/config'
import { reportUsageStatisticsIfTelemetryEnabled } from '../../utils/telemetry'

const hook: Hook<'postrun'> = async function (options) {
  // TODO possibly move to other hook or rename this one
  reportUsageStatisticsIfTelemetryEnabled(
    readConfig(options.config.configDir),
    true,
    options.Command.id
  )

  ux.info(
    chalk.cyan(
      `\nThanks for using the celocli! We are interested in your feedback.\nLet us know at ${chalk.bold(
        `github.com/celo-org/developer-tooling/discussions/92`
      )}`
    )
  )
}

export default hook
