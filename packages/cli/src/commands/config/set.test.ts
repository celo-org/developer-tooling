import { testLocally } from '../../test-utils/cliUtils'
import * as cliUtils from '../../utils/cli'
import * as config from '../../utils/config'
import Get from './get'
import Set from './set'

process.env.NO_SYNCCHECK = 'true'

describe('config:set cmd', () => {
  afterEach(async () => {
    jest.clearAllMocks()
    jest.restoreAllMocks()

    // cleanup to defaults after each test to have deterministic results
    await testLocally(Set, [
      '--telemetry',
      config.defaultConfig.telemetry ? '1' : '0',
      '--derivationPath',
      config.defaultConfig.derivationPath,
      // node is injected by default by testLocally
    ])
  })

  describe('--derivationPath', () => {
    it('sets with bip44 path', async () => {
      const writeMock = jest.spyOn(config, 'writeConfig')
      await testLocally(Set, ['--derivationPath', "m/44'/52752'/0'/0/0"])
      expect(writeMock.mock.calls[0][1]).toEqual(
        expect.objectContaining({ derivationPath: "m/44'/52752'/0'/0/0" })
      )
    })
    it('sets with eth', async () => {
      const writeMock = jest.spyOn(config, 'writeConfig')

      await testLocally(Set, ['--derivationPath', 'eth'])
      expect(writeMock.mock.calls[0][1]).toEqual(
        expect.objectContaining({ derivationPath: "m/44'/60'/0'" })
      )
    })
    it('sets with celoLegacy ', async () => {
      const writeMock = jest.spyOn(config, 'writeConfig')

      await testLocally(Set, ['--derivationPath', 'celoLegacy'])
      expect(writeMock.mock.calls[0][1]).toEqual(
        expect.objectContaining({ derivationPath: "m/44'/52752'/0'" })
      )
    })
    describe('with bad data', () => {
      beforeEach(() => jest.spyOn(console, 'error').mockImplementation())
      it('fails with solana ', async () => {
        await expect(testLocally(Set, ['--derivationPath', 'solana'])).rejects
          .toThrowErrorMatchingInlineSnapshot(`
          "Parsing --derivationPath 
          	Invalid derivationPath: solana. should be in format  "m / 44' / coin_type' / account'"
          See more help with --help"
        `)
      })
      it('fails with invalid path', async () => {
        await expect(testLocally(Set, ['--derivationPath', "m/44'/256'/0"])).rejects
          .toThrowErrorMatchingInlineSnapshot(`
          "Parsing --derivationPath 
          	Invalid derivationPath: m/44'/256'/0. should be in format  "m / 44' / coin_type' / account'"
          See more help with --help"
        `)
      })
    })
  })

  it('allows to disable telemetry', async () => {
    const writeMock = jest.spyOn(config, 'writeConfig')
    const configDir = '.config/@celo/celocli'
    const printValueMapSpy = jest.spyOn(cliUtils, 'printValueMap')

    await testLocally(Set, ['--telemetry', '0'])

    expect(writeMock).toHaveBeenCalledTimes(1)
    expect(writeMock.mock.calls[0][0]).toMatch(configDir)
    expect(writeMock.mock.calls[0][1]).toMatchObject({
      telemetry: false,
    })

    await testLocally(Get, [])
    expect(printValueMapSpy).toHaveBeenCalledTimes(1)
    expect(printValueMapSpy.mock.calls[0][0].telemetry).toEqual(false)

    // Setting other config value should not change telemetry
    // In this case --node flag is passed by default so we don't
    // need to specify any other flags
    await testLocally(Set, [])

    expect(writeMock).toHaveBeenCalledTimes(2)
    expect(writeMock.mock.calls[1][0]).toMatch(configDir)
    expect(writeMock.mock.calls[1][1]).toMatchObject({
      telemetry: false,
    })

    // Check that it's not overwritten
    await testLocally(Get, [])
    expect(printValueMapSpy).toHaveBeenCalledTimes(2)
    expect(printValueMapSpy.mock.calls[1][0].telemetry).toEqual(false)

    // Now let's check if we can enable it back
    await testLocally(Set, ['--telemetry', '1'])

    expect(writeMock).toHaveBeenCalledTimes(3)
    expect(writeMock.mock.calls[2][0]).toMatch(configDir)
    expect(writeMock.mock.calls[2][1]).toMatchObject({
      telemetry: true,
    })

    await testLocally(Get, [])
    expect(printValueMapSpy).toHaveBeenCalledTimes(3)
    expect(printValueMapSpy.mock.calls[2][0].telemetry).toEqual(true)
  })
})
