import { newKitFromWeb3 } from '@celo/contractkit'
import { testWithAnvilL1 } from '@celo/dev-utils/lib/anvil-test'
import { ux } from '@oclif/core'
import Web3 from 'web3'
import {
  extractHostFromWeb3,
  stripAnsiCodesFromNestedArray,
  testLocallyWithWeb3Node,
} from '../../test-utils/cliUtils'
import * as config from '../../utils/config'
import Set from './set'

process.env.NO_SYNCCHECK = 'true'

afterEach(async () => {
  jest.clearAllMocks()
  jest.restoreAllMocks()
})

testWithAnvilL1('config:set cmd', (web3: Web3) => {
  describe('--derivationPath', () => {
    it('sets with bip44 path', async () => {
      const writeMock = jest.spyOn(config, 'writeConfig')
      await testLocallyWithWeb3Node(Set, ['--derivationPath', "m/44'/52752'/0'/0/0"], web3)
      expect(writeMock.mock.calls[0][1]).toEqual(
        expect.objectContaining({ derivationPath: "m/44'/52752'/0'/0/0" })
      )
    })
    it('sets with eth', async () => {
      const writeMock = jest.spyOn(config, 'writeConfig')

      await testLocallyWithWeb3Node(Set, ['--derivationPath', 'eth'], web3)
      expect(writeMock.mock.calls[0][1]).toEqual(
        expect.objectContaining({ derivationPath: "m/44'/60'/0'" })
      )
    })
    it('sets with celoLegacy ', async () => {
      const writeMock = jest.spyOn(config, 'writeConfig')

      await testLocallyWithWeb3Node(Set, ['--derivationPath', 'celoLegacy'], web3)
      expect(writeMock.mock.calls[0][1]).toEqual(
        expect.objectContaining({ derivationPath: "m/44'/52752'/0'" })
      )
    })
    describe('with bad data', () => {
      beforeEach(() => jest.spyOn(console, 'error').mockImplementation())
      it('fails with solana ', async () => {
        await expect(testLocallyWithWeb3Node(Set, ['--derivationPath', 'solana'], web3)).rejects
          .toThrowErrorMatchingInlineSnapshot(`
          "Parsing --derivationPath 
          	Invalid derivationPath: solana. should be in format  "m / 44' / coin_type' / account'"
          See more help with --help"
        `)
      })
      it('fails with invalid path', async () => {
        await expect(testLocallyWithWeb3Node(Set, ['--derivationPath', "m/44'/256'/0"], web3))
          .rejects.toThrowErrorMatchingInlineSnapshot(`
          "Parsing --derivationPath 
          	Invalid derivationPath: m/44'/256'/0. should be in format  "m / 44' / coin_type' / account'"
          See more help with --help"
        `)
      })
    })
  })
  it('shows a warning if gasCurrency is passed', async () => {
    const kit = newKitFromWeb3(web3)
    const feeCurrencyDirectory = await kit.contracts.getFeeCurrencyDirectory()
    const consoleMock = jest.spyOn(ux, 'warn')
    const writeMock = jest.spyOn(config, 'writeConfig')

    await testLocallyWithWeb3Node(
      Set,
      ['--gasCurrency', (await feeCurrencyDirectory.getCurrencies())[0]],
      web3
    )
    expect(stripAnsiCodesFromNestedArray(consoleMock.mock.calls as string[][]))
      .toMatchInlineSnapshot(`
      [
        [
          "
      Setting a default gasCurrency has been removed from the config, you may still use the --gasCurrency on every command.
      Did you value this feature a lot and would like to see it back? Let us know at https://github.com/celo-org/developer-tooling/discussions/92",
        ],
      ]
    `)
    expect(writeMock.mock.calls[0][1]).toMatchInlineSnapshot(`
      {
        "derivationPath": "m/44'/52752'/0'",
        "node": ${extractHostFromWeb3(web3)},
        "telemetry": true,
      }
    `)

    expect(writeMock).toHaveBeenCalledTimes(1)
    expect(writeMock.mock.calls[0][0]).toMatch('.config/@celo/celocli')
    expect(writeMock.mock.calls[0][1]).toMatchObject({ derivationPath: "m/44'/52752'/0'" })
    expect(writeMock.mock.calls[0][1]).not.toHaveProperty('gasCurrency')
  })
})
