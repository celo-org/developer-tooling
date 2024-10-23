import { testWithAnvilL2 } from '@celo/dev-utils/lib/anvil-test'
import { newKitFromWeb3 } from '../kit'

testWithAnvilL2('Election Wrapper', (web3) => {
  it('returns elected validators', async () => {
    const kit = newKitFromWeb3(web3)
    const wrapper = await kit.contracts.getElection()
    const electedValidators = await wrapper.getElectedValidators(4)

    expect(electedValidators).toMatchInlineSnapshot()
  })
})
