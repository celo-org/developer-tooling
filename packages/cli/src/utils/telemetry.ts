import { ux } from '@oclif/core'
import chalk from 'chalk'
import packageJson from '../../package.json'
import { CeloConfig } from './config'

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

export const reportUsageStatisticsIfTelemetryEnabled = async (
  config: CeloConfig,
  success: boolean,
  command: string = '_unknown'
) => {
  if (config.telemetry) {
    const telemetry = getTelemetryOptions(command, success)

    printUsageInformation()

    // TODO do we want to await when sending a request to a server?
    // in this case fire and forget is probably fine unless it's not
    // stopped by the process exiting
    try {
      return fetch('http://127.0.0.1:3001/telemetry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(telemetry),
      })
    } catch (err) {
      // TODO log error (if in dev mode - how to check that?)
    }
  }
}

// TODO possibly rename as this is too general and misleading
// TODO add a reference to actual implementation so users can see what data is being sent
export const printUsageInformation = () => {
  ux.info(
    chalk.green(
      `\ncelocli is now gathering anonymous usage statistics. 

None of the data being gathered is personally identifiable and no flags or arguments are being stored.
      
Data being reported is:
  - command (for example ${chalk.bold('network:info')})
  - celocli version (for example ${chalk.bold('5.2.3')})
  - success status (0/1)
      
If you would like to opt out of this data collection, you can do so by running:

${chalk.bold('celocli config:set --telemetry 0')}`
    )
  )
}
