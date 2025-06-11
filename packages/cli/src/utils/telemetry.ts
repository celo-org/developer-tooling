import { ux } from '@oclif/core'
import chalk from 'chalk'
import fs from 'fs'
import path from 'node:path'
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

const TELEMETRY_TIMEOUT = 1000 // 1 second
const TELEMETRY_PRINTED_FILE = '.telemetry'
const TELEMETRY_URL = 'https://pag.mainnet.celo-testnet.org/metrics'

const UNKNOWN_COMMAND = '_unknown'

export const telemetryInformationAlreadyPrinted = (configDir: string) => {
  try {
    return fs.existsSync(path.join(configDir, TELEMETRY_PRINTED_FILE))
  } catch (err) {
    debug(`Failed to check if .telemetry file exists: ${err}`)
  }

  return false
}

const markTelemetryInformationAsPrinted = (configDir: string) => {
  try {
    fs.writeFileSync(path.join(configDir, TELEMETRY_PRINTED_FILE), '')
  } catch (err) {
    debug(`Failed to write .telemetry file: ${err}`)
  }
}

export const reportUsageStatisticsIfTelemetryEnabled = (
  configDir: string,
  success: boolean,
  hideUsageInformation: boolean = false,
  command: string = UNKNOWN_COMMAND
) => {
  if (process.env.TELEMETRY_ENABLED === '0') {
    return
  }

  const config = readConfig(configDir)

  if (config.telemetry === true) {
    const telemetry = getTelemetryOptions(command, success)

    // Only show the information upon first usage and when it shouldn't be hidden according to
    // hideUsageInformation flag
    if (!hideUsageInformation && !telemetryInformationAlreadyPrinted(configDir)) {
      printTelemetryInformation()
      markTelemetryInformationAsPrinted(configDir)
    }

    const telemetryData = `celocli_invocation{success="${
      telemetry.success ? 'true' : 'false'
    }", version="${telemetry.version}", command="${telemetry.command}"} 1`

    debug(`Sending telemetry data: ${telemetryData}`)

    const controller = new AbortController()
    const timeout = setTimeout(() => {
      controller.abort()
    }, TELEMETRY_TIMEOUT)

    // allow the cli to exit without waiting for the telemetry max time to finish
    timeout.unref()

    return fetch(process.env.TELEMETRY_URL ?? TELEMETRY_URL, {
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
  } else {
    debug('Telemetry is disabled')
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
