import { asCoreContractsOwner, GROUP_ADDRESSES, testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import BigNumber from 'bignumber.js'
import { newKitFromProvider } from '../kit'
import { valueToFixidityString } from './BaseWrapper'

testWithAnvilL2('ScoreManager Wrapper', (providerOwner) => {
  const kit = newKitFromProvider(providerOwner.currentProvider)

  it('gets validator score', async () => {
    const epochManagerWrapper = await kit.contracts.getEpochManager()
    const scoreManagerWrapper = await kit.contracts.getScoreManager()
    const electedValidatorAddresses = await epochManagerWrapper.getElectedAccounts()

    // default score is 1
    expect(
      await scoreManagerWrapper.getValidatorScore(electedValidatorAddresses[0])
    ).toMatchInlineSnapshot(`"1"`)

    await asCoreContractsOwner(
      providerOwner,
      async (from) => {
        const scoreManagerContract = await kit._contracts.getScoreManager()

        // change the score
        await scoreManagerContract.methods
          .setValidatorScore(
            electedValidatorAddresses[0],
            valueToFixidityString(new BigNumber(0.5))
          )
          .send({ from })
      },
      new BigNumber('1e18')
    )

    // should return the new score
    expect(
      await scoreManagerWrapper.getValidatorScore(electedValidatorAddresses[0])
    ).toMatchInlineSnapshot(`"0.5"`)
  })

  it('gets group score', async () => {
    const scoreManagerWrapper = await kit.contracts.getScoreManager()

    // default score is 1
    expect(await scoreManagerWrapper.getGroupScore(GROUP_ADDRESSES[0])).toMatchInlineSnapshot(`"1"`)

    await asCoreContractsOwner(
      providerOwner,
      async (from) => {
        const scoreManagerContract = await kit._contracts.getScoreManager()

        // change the score
        await scoreManagerContract.methods
          .setGroupScore(GROUP_ADDRESSES[0], valueToFixidityString(new BigNumber(0.99)))
          .send({ from })
      },
      new BigNumber('1e18')
    )

    // should return the new score
    expect(await scoreManagerWrapper.getGroupScore(GROUP_ADDRESSES[0])).toMatchInlineSnapshot(
      `"0.99"`
    )
  })
})
