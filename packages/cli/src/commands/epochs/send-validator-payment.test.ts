import { newKitFromProvider } from '@celo/contractkit'
import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import { activateAllValidatorGroupsVotes } from '../../test-utils/chain-setup'
import { stripAnsiCodesFromNestedArray, testLocallyWithNode } from '../../test-utils/cliUtils'
import SendValidatorPayment from './send-validator-payment'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('epochs:send-validator-payment cmd', (client) => {
  const logMock = jest.spyOn(console, 'log')
  const errorMock = jest.spyOn(console, 'error')

  beforeEach(async () => {
    logMock.mockClear()
    errorMock.mockClear()

    await activateAllValidatorGroupsVotes(newKitFromProvider(client.currentProvider))
  })

  it('successfuly sends the payments', async () => {
    const kit = newKitFromProvider(client.currentProvider)
    const [sender] = await kit.connection.getAccounts()
    const epochManagerWrapper = await kit.contracts.getEpochManager()
    const validatorsWrapper = await kit.contracts.getValidators()
    const electedValidators = await epochManagerWrapper.getElectedAccounts()
    const validatorAddress = electedValidators[0]
    const groupAddress = await validatorsWrapper.getValidatorsGroup(validatorAddress)
    const validatorBalanceBefore = (await kit.getTotalBalance(validatorAddress)).USDm!
    const groupBalanceBefore = (await kit.getTotalBalance(groupAddress)).USDm!

    await testLocallyWithNode(
      SendValidatorPayment,
      ['--for', validatorAddress, '--from', sender],
      client
    )

    // TODO as the numbers are not deterministic, we can't assert the exact values, so it's tested separately
    expect(stripAnsiCodesFromNestedArray(logMock.mock.calls.slice(0, -1))).toMatchInlineSnapshot(`
      [
        [
          "Running Checks:",
        ],
        [
          "   ✔  0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 is Validator ",
        ],
        [
          "All checks passed",
        ],
        [
          "SendTransaction: EpochManager->sendValidatorPayment",
        ],
        [
          "txHash: 0xtxhash",
        ],
        [
          "ValidatorEpochPaymentDistributed:",
        ],
      ]
    `)

    const validatorBalanceAfter = (await kit.getTotalBalance(validatorAddress)).USDm!
    const groupBalanceAfter = (await kit.getTotalBalance(groupAddress)).USDm!

    expect(validatorBalanceAfter.gt(validatorBalanceBefore)).toBe(true)
    expect(groupBalanceAfter.gt(groupBalanceBefore)).toBe(true)
  })

  it('fails if not a validator', async () => {
    const kit = newKitFromProvider(client.currentProvider)
    const [nonValidatorAccount, sender] = await kit.connection.getAccounts()

    await expect(
      testLocallyWithNode(
        SendValidatorPayment,
        ['--for', nonValidatorAccount, '--from', sender],
        client
      )
    ).rejects.toMatchInlineSnapshot(`[Error: Some checks didn't pass!]`)

    expect(stripAnsiCodesFromNestedArray(logMock.mock.calls)).toMatchInlineSnapshot(`
      [
        [
          "Running Checks:",
        ],
        [
          "   ✘  0x5409ED021D9299bf6814279A6A1411A7e866A631 is Validator ",
        ],
      ]
    `)
    expect(stripAnsiCodesFromNestedArray(errorMock.mock.calls)).toMatchInlineSnapshot(`[]`)
  })
})
