import {
  asCoreContractsOwner,
  GROUP_ADDRESSES,
  testWithAnvilL2,
} from '@celo/dev-utils/lib/anvil-test'
import BigNumber from 'bignumber.js'
import { newKitFromWeb3 } from '../kit'
import { valueToFixidityString } from './BaseWrapper'

testWithAnvilL2('ScoreManager Wrapper', (web3) => {
  const kit = newKitFromWeb3(web3)

  it('gets validator score', async () => {
    const epochManagerWrapper = await kit.contracts.getEpochManager()
    const scoreManagerWrapper = await kit.contracts.getScoreManager()
    const electedValidatorAddresses = await epochManagerWrapper.getElected()

    // default score is 0
    expect(
      await scoreManagerWrapper.getValidatorScore(electedValidatorAddresses[0])
    ).toMatchInlineSnapshot(`"0"`)

    await asCoreContractsOwner(
      web3,
      async (from) => {
        const scoreManagerContract = await kit._web3Contracts.getScoreManager()

        // change the score
        await scoreManagerContract.methods
          .setValidatorScore(
            electedValidatorAddresses[0],
            valueToFixidityString(new BigNumber(0.5))
          )
          .send({ from })
      },
      new BigNumber(web3.utils.toWei('1', 'ether'))
    )

    // should return the new score
    expect(
      await scoreManagerWrapper.getValidatorScore(electedValidatorAddresses[0])
    ).toMatchInlineSnapshot(`"0.5"`)
  })

  it('gets group score', async () => {
    const scoreManagerWrapper = await kit.contracts.getScoreManager()

    // default score is 0
    expect(await scoreManagerWrapper.getGroupScore(GROUP_ADDRESSES[0])).toMatchInlineSnapshot(`"0"`)

    await asCoreContractsOwner(
      web3,
      async (from) => {
        const scoreManagerContract = await kit._web3Contracts.getScoreManager()

        // change the score
        await scoreManagerContract.methods
          .setGroupScore(GROUP_ADDRESSES[0], valueToFixidityString(new BigNumber(0.99)))
          .send({ from })
      },
      new BigNumber(web3.utils.toWei('1', 'ether'))
    )

    // should return the new score
    expect(await scoreManagerWrapper.getGroupScore(GROUP_ADDRESSES[0])).toMatchInlineSnapshot(
      `"0.99"`
    )
  })
})
