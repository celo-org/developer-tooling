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
    let createContractSpy: jest.SpyInstance
    beforeEach(() => {
      const originalCreateContract = Connection.prototype.createContract
      createContractSpy = jest
        .spyOn(Connection.prototype, 'createContract')
        .mockImplementation(function (this: Connection, abi: any, address?: string) {
          const contract = originalCreateContract.call(this, abi, address)
          // Check if this is a versioned contract call (has getVersionNumber method)
          if (contract.methods.getVersionNumber) {
            contract.methods.getVersionNumber = jest.fn().mockImplementation(() => {
              // fake governance slasher
              if (address === '0x76C05a43234EB2804aa83Cd40BA10080a43d07AE') {
                return {
                  call: jest.fn().mockRejectedValue(new Error('Error: execution reverted')),
                }
              } else {
                // return a fake normal version
                return { call: jest.fn().mockResolvedValue([1, 2, 3, 4]) }
              }
            })
          }
          return contract
        })
    })
    afterEach(() => {
      createContractSpy.mockRestore()
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
