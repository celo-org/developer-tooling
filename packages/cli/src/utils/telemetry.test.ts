import { ux } from '@oclif/core'
import { stripAnsiCodesFromNestedArray } from '../test-utils/cliUtils'
import { printTelemetryInformation } from './telemetry'

describe('telemetry', () => {
  it('prints the information', () => {
    const writeMock = jest.spyOn(ux.write, 'stdout')

    printTelemetryInformation()

    expect(stripAnsiCodesFromNestedArray(writeMock.mock.calls)).toMatchInlineSnapshot(`
      [
        [
          "
      celocli is now gathering anonymous usage statistics. 
          
      None of the data being collected is personally identifiable and no flags or arguments are being stored nor transmitted.
                
      Data being reported is:
        - command (for example network:info)
        - celocli version (for example 5.2.3)
        - success status (false/true)
                
      If you would like to opt out of this data collection, you can do so by running:
          
      celocli config:set --telemetry 0
          
      ",
        ],
      ]
    `)
  })
})
