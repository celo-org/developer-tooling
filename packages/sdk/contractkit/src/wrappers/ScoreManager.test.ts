import { asCoreContractsOwner, GROUP_ADDRESSES, testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import BigNumber from 'bignumber.js'
import { encodeFunctionData } from 'viem'
import { newKitFromProvider } from '../kit'
import { valueToFixidityString } from './BaseWrapper'

testWithAnvilL2('ScoreManager Wrapper', (provider) => {
  const kit = newKitFromProvider(provider)

  it('gets validator score', async () => {
    const epochManagerWrapper = await kit.contracts.getEpochManager()
    const scoreManagerWrapper = await kit.contracts.getScoreManager()
    const electedValidatorAddresses = await epochManagerWrapper.getElectedAccounts()

    // default score is 1
    expect(
      await scoreManagerWrapper.getValidatorScore(electedValidatorAddresses[0])
    ).toMatchInlineSnapshot(`"1"`)

    await asCoreContractsOwner(
      provider,
      async (from) => {
        const scoreManagerContract = await kit._contracts.getScoreManager()

        // change the score
        const data = encodeFunctionData({
          abi: scoreManagerContract.abi as any,
          functionName: 'setValidatorScore',
          args: [electedValidatorAddresses[0], valueToFixidityString(new BigNumber(0.5))],
        })
        await kit.connection.sendTransaction({
          to: scoreManagerContract.address,
          data,
          from,
        })
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
      provider,
      async (from) => {
        const scoreManagerContract = await kit._contracts.getScoreManager()

        // change the score
        const data = encodeFunctionData({
          abi: scoreManagerContract.abi as any,
          functionName: 'setGroupScore',
          args: [GROUP_ADDRESSES[0], valueToFixidityString(new BigNumber(0.99))],
        })
        await kit.connection.sendTransaction({
          to: scoreManagerContract.address,
          data,
          from,
        })
      },
      new BigNumber('1e18')
    )

    // should return the new score
    expect(await scoreManagerWrapper.getGroupScore(GROUP_ADDRESSES[0])).toMatchInlineSnapshot(
      `"0.99"`
    )
  })
})
