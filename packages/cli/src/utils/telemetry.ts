import { ux } from '@oclif/core'
import chalk from 'chalk'
import fs from 'fs'
import path from 'path'
import packageJson from '../../package.json'
import { readConfig } from './config'

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

const TIMEOUT = 1000 // 1 second
const TELEMETRY_PRINTED_FILE = '.telemetry'
const UNKNOWN_COMMAND = '_unknown'

const telemetryInformationAlreadyPrinted = (configDir: string) => {
  return fs.existsSync(path.join(configDir, TELEMETRY_PRINTED_FILE))
}

const markTelemetryInformationAsPrinted = (configDir: string) => {
  fs.writeFileSync(path.join(configDir, TELEMETRY_PRINTED_FILE), '')
}

export const reportUsageStatisticsIfTelemetryEnabled = (
  configDir: string,
  success: boolean,
  command: string = UNKNOWN_COMMAND
) => {
  const config = readConfig(configDir)

  if (config.telemetry === true) {
    const telemetry = getTelemetryOptions(command, success)

    // Only show the information upon first usage
    if (!telemetryInformationAlreadyPrinted(configDir)) {
      printTelemetryInformation()
      markTelemetryInformationAsPrinted(configDir)
    }

    // TODO alfajores needs to be hardcoded for now
    const telemetryData = `test_pag_celocli{success="${
      telemetry.success ? 'true' : 'false'
    }", version="${telemetry.version}", command="${telemetry.command}", network="alfajores"} 1`

    debug(`Sending telemetry data: ${telemetryData}`)

    const controller = new AbortController()
    const timeout = setTimeout(() => {
      controller.abort()
    }, TIMEOUT)

    // TODO either create an .env file or use a default value
    return fetch(process.env.TELEMETRY_URL!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/octet-stream',
      },
      signal: controller.signal,
      body: `
${telemetryData}
`,
    })
      .then((response) => {
        clearTimeout(timeout)

        if (!response.ok && response.body) {
          debug(`Failed to send telemetry data: ${response.statusText}`)

          return
        }

        debug(`Telemetry data sent successfuly`)
      })
      .catch((err) => {
        debug(`Failed to send telemetry data: ${err}`)
      })
  }
}

export const printTelemetryInformation = () => {
  ux.info(
    chalk.green(
      `\ncelocli is now gathering anonymous usage statistics. 
    
None of the data being collected is personally identifiable and no flags or arguments are being stored nor transmitted.
          
Data being reported is:
  - command (for example ${chalk.bold('network:info')})
  - celocli version (for example ${chalk.bold('5.2.3')})
  - success status (true/false)
          
If you would like to opt out of this data collection, you can do so by running:
    
${chalk.bold('celocli config:set --telemetry 0')}
    `
    )
  )
}
