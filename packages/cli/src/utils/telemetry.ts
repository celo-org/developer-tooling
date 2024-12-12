import { execSync } from 'child_process'
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

const TELEMETRY_PRINTED_FILE = '.telemetry'

const telemetryInformationAlreadyPrinted = (configDir: string) => {
  return fs.existsSync(path.join(configDir, TELEMETRY_PRINTED_FILE))
}

const markTelemetryInformationAsPrinted = (configDir: string) => {
  fs.writeFileSync(path.join(configDir, TELEMETRY_PRINTED_FILE), '')
}

export const reportUsageStatisticsIfTelemetryEnabled = (
  configDir: string,
  success: boolean,
  command: string = '_unknown',
  fetchHandler: typeof fetch = fetch
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
    }, 1000)

    fetchHandler(process.env.TELEMETRY_URL!, {
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
  try {
    // This approach makes sure that we don't have redundant printing logic
    // with an extra benefit of this output not being captured by tests
    execSync(path.join(__dirname, '../../scripts/telemetry-notice.js'), {
      stdio: 'inherit',
    })
  } catch (_) {
    // Ignore errors
  }
}
