import { newICeloVersionedContract } from '@celo/abis/web3/ICeloVersionedContract'
import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import write from '@oclif/core/lib/cli-ux/write'
import { testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import Contracts from './contracts'
process.env.NO_SYNCCHECK = 'true'
jest.mock('@celo/abis/web3/ICeloVersionedContract')

testWithAnvilL2('network:contracts', (web3) => {
  describe('when version can be obtained', () => {
    beforeEach(() => {
      jest.unmock('@celo/abis/web3/ICeloVersionedContract')
      jest.resetModules()
      const actual = jest.requireActual('@celo/abis/web3/ICeloVersionedContract')
      // @ts-expect-error
      newICeloVersionedContract.mockImplementation(actual.newICeloVersionedContract)
    })
    test('runs', async () => {
      const spy = jest.spyOn(write, 'stdout')
      const warnSpy = jest.spyOn(console, 'warn')
      expect(warnSpy.mock.calls).toMatchInlineSnapshot(`[]`)
      await testLocallyWithWeb3Node(Contracts, ['--output', 'json'], web3)
      expect(spy.mock.calls).toMatchSnapshot()
    })
  })
  describe('when version cant be obtained', () => {
    beforeEach(() => {
      // @ts-expect-error
      newICeloVersionedContract.mockImplementation((_, address) => {
        return {
          methods: {
            getVersionNumber: jest.fn().mockImplementation(() => {
              // fake governance slasher
              if (address === '0x76C05a43234EB2804aa83Cd40BA10080a43d07AE') {
                return { call: jest.fn().mockRejectedValue(new Error('Error: execution reverted')) }
              } else {
                // return a fake normal version
                return { call: jest.fn().mockResolvedValue([1, 2, 3, 4]) }
              }
            }),
          },
        }
      })
    })
    afterEach(() => {
      jest.clearAllMocks()
      jest.resetModules()
    })
    it('still prints rest of contracts', async () => {
      const spy = jest.spyOn(write, 'stdout')
      const warnSpy = jest.spyOn(console, 'warn')

      await testLocallyWithWeb3Node(Contracts, ['--output', 'json'], web3)
      expect(warnSpy.mock.calls).toMatchInlineSnapshot(`[]`)
      expect(spy.mock.calls).toMatchSnapshot() // see the file for the snapshot
    })
  })
})
