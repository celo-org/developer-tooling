import { testWithAnvilL2 } from '@celo/dev-utils/lib/anvil-test'
import Web3 from 'web3'
import { newKitFromWeb3 } from '../kit'
import { ContractVersion } from '../versions'

testWithAnvilL2('GovernanceWrapper', (web3: Web3) => {
  describe('Hotfixes', () => {
    it('gets L2 hotfix record for version >= 1.5.0.0', async () => {
      const kit = newKitFromWeb3(web3)
      const governance = await kit.contracts.getGovernance()
      const hotfixHash = Buffer.from('0x', 'hex')

      // Sanity check to make sure we're on at least 1.5.0.0 version
      expect((await governance.version()).isAtLeast(new ContractVersion(1, 5, 0, 0)))

      const hotfixRecordL2 = await governance.getHotfixRecord(hotfixHash)
      expect(hotfixRecordL2).toMatchInlineSnapshot(`
        {
          "approved": false,
          "councilApproved": false,
          "executed": false,
          "executionTimeLimit": "0",
        }
      `)
    })
  })
})
