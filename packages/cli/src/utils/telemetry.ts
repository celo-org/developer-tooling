import { ux } from '@oclif/core'
import chalk from 'chalk'
import packageJson from '../../package.json'
import { CeloConfig } from './config'

const debug = require('debug')('celocli:telemetry')

export type TelemetryOptions = {
  command: string
  success: boolean
  version: string
}

const getTelemetryOptions = (command: string, success: boolean): TelemetryOptions => {
  return {
    command,
    success,
    version: packageJson.version,
  }
}

export const reportUsageStatisticsIfTelemetryEnabled = (
  config: CeloConfig,
  success: boolean,
  command: string = '_unknown',
  fetchHandler: typeof fetch = fetch
) => {
  if (config.telemetry) {
    const telemetry = getTelemetryOptions(command, success)

    printTelemetryInformation()

    // TODO alfajores needs to be hardcoded for now
    const telemetryData = `test_pag_celocli{success="${
      telemetry.success ? 'true' : 'false'
    }", version="${telemetry.version}", command="${telemetry.command}", network="alfajores"} 1`

    debug(`Sending telemetry data: ${telemetryData}`)

    // node waits for promise to resolve before exiting, so we can assume
    // it will be sent before the process exits, but we don't want it
    // to block other operations
    //
    // TODO add a reasonable timeout
    fetchHandler(process.env.TELEMETRY_URL!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/octet-stream',
      },
      body: `
${telemetryData}
`,
    })
      .then((response) => {
        if (!response.ok) {
          if (!response.ok && response.body) {
            debug(`Failed to send telemetry data: ${response.statusText}`)

            return
          }

          debug(`Telemetry data sent successfully`)
        }
      })
      .catch((err) => {
        debug(`Failed to send telemetry data: ${err}`)
      })
  }
}

// TODO add a reference to actual implementation so users can see what data is being sent
export const printTelemetryInformation = () => {
  ux.info(
    chalk.green(
      `\ncelocli is now gathering anonymous usage statistics. 

None of the data being gathered is personally identifiable and no flags or arguments are being stored.
      
Data being reported is:
  - command (for example ${chalk.bold('network:info')})
  - celocli version (for example ${chalk.bold('5.2.3')})
  - success status (0/1)
      
If you would like to opt out of this data collection, you can do so by running:

${chalk.bold('celocli config:set --telemetry 0')}
`
    )
  )
}
