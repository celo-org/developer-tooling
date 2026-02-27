import { Connection } from '@celo/connect'
import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import write from '@oclif/core/lib/cli-ux/write'
import { testLocallyWithNode } from '../../test-utils/cliUtils'
import Contracts from './contracts'
process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('network:contracts', (provider) => {
  describe('when version can be obtained', () => {
    test('runs', async () => {
      const spy = jest.spyOn(write, 'stdout')
      const warnSpy = jest.spyOn(console, 'warn')
      expect(warnSpy.mock.calls).toMatchInlineSnapshot(`[]`)
      await testLocallyWithNode(Contracts, ['--output', 'json'], provider)
      expect(spy.mock.calls).toMatchSnapshot()
    })
  })
  describe('when version cant be obtained', () => {
    let getCeloContractSpy: jest.SpyInstance
    beforeEach(() => {
      const originalGetCeloContract = Connection.prototype.getCeloContract
      getCeloContractSpy = jest
        .spyOn(Connection.prototype, 'getCeloContract')
        .mockImplementation(function (this: Connection, abi: any, address?: string) {
          const contract = originalGetCeloContract.call(this, abi, address!)
          // Check if this is a versioned contract call (has getVersionNumber in ABI)
          const hasGetVersionNumber =
            Array.isArray(abi) &&
            abi.some((item: any) => item.type === 'function' && item.name === 'getVersionNumber')
          if (hasGetVersionNumber) {
            return {
              ...contract,
              client: {
                ...contract.client,
                call: jest.fn().mockImplementation(async () => {
                  // fake governance slasher
                  if (address === '0x76C05a43234EB2804aa83Cd40BA10080a43d07AE') {
                    throw new Error('Error: execution reverted')
                  }
                  // return ABI-encoded [1, 2, 3, 4] (4 uint256 values)
                  return {
                    data: '0x0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000030000000000000000000000000000000000000000000000000000000000000004',
                  }
                }),
              },
            }
          }
          return contract
        })
    })
    afterEach(() => {
      getCeloContractSpy.mockRestore()
      jest.clearAllMocks()
    })
    it('still prints rest of contracts', async () => {
      const spy = jest.spyOn(write, 'stdout')
      const warnSpy = jest.spyOn(console, 'warn')

      await testLocallyWithNode(Contracts, ['--output', 'json'], provider)
      expect(warnSpy.mock.calls).toMatchInlineSnapshot(`[]`)
      expect(spy.mock.calls).toMatchSnapshot() // see the file for the snapshot
    })
  })
})
