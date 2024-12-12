import { execSync } from 'child_process'
import { printTelemetryInformation } from './telemetry'

describe('telemetry', () => {
  it('prints the information with no error', () => {
    const originalExecSync = execSync
    const execSyncSpy = jest.spyOn(require('child_process'), 'execSync')

    let actualExecSyncOutput

    execSyncSpy.mockImplementation((...args: any) => {
      const command = args[0] as string

      actualExecSyncOutput = originalExecSync(command, {
        stdio: 'pipe',
      }).toString()

      return actualExecSyncOutput
    })

    printTelemetryInformation()

    expect(actualExecSyncOutput).toMatchInlineSnapshot(`
      "
      celocli is now gathering anonymous usage statistics. 
        
      None of the data being collected is personally identifiable and no flags or arguments are being stored nor transmitted.
              
      Data being reported is:
        - command (for example network:info)
        - celocli version (for example 5.2.3)
        - success status (0/1)
              
      If you would like to opt out of this data collection, you can do so by running:
        
      celocli config:set --telemetry 0
        
      "
    `)
  })
})
