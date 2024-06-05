import { isCel2 } from '@celo/connect'
import { newKitFromWeb3 } from '@celo/contractkit'
import { testWithAnvil } from '@celo/dev-utils/lib/anvil-test'
import Web3 from 'web3'
import { setupL2 } from './chain-setup'

testWithAnvil('chain setup', (web3: Web3) => {
  describe('setupL2()', () => {
    it('sets up L2 context', async () => {
      const kit = newKitFromWeb3(web3)

      expect(await isCel2(web3)).toEqual(false)

      await setupL2(kit)

      expect(await isCel2(web3)).toEqual(true)
    })
  })
})
