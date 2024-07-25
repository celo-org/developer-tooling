import { isCel2 } from '@celo/connect'
import { testWithAnvilL1, testWithAnvilL2 } from '@celo/dev-utils/lib/anvil-test'
import Web3 from 'web3'

testWithAnvilL1('chain setup', (web3: Web3) => {
  it('checks for L1 context', async () => {
    expect(await isCel2(web3)).toEqual(false)
  })
})

testWithAnvilL2('chain setup', (web3: Web3) => {
  it('checks for L2 context', async () => {
    expect(await isCel2(web3)).toEqual(true)
  })
})
