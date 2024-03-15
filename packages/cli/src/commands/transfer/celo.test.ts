import { COMPLIANT_ERROR_RESPONSE, SANCTIONED_ADDRESSES } from '@celo/compliance'
import { ContractKit, StableToken, newKitFromWeb3 } from '@celo/contractkit'
import { testWithGanache } from '@celo/dev-utils/lib/ganache-test'
import Web3 from 'web3'
import { testLocally } from '../../test-utils/cliUtils'
import TransferCelo from './celo'

process.env.NO_SYNCCHECK = 'true'

// Lots of commands, sometimes times out
jest.setTimeout(15000)

testWithGanache('transfer:celo cmd', (web3: Web3) => {
  let accounts: string[] = []
  let kit: ContractKit

  beforeEach(async () => {
    kit = newKitFromWeb3(web3)
    accounts = await web3.eth.getAccounts()
  })

  test('can transfer celo', async () => {
    const balanceBefore = await kit.getTotalBalance(accounts[0])
    const receiverBalanceBefore = await kit.getTotalBalance(accounts[1])
    const amountToTransfer = '500000000000000000000'
    // Send cUSD to RG contract
    await testLocally(TransferCelo, [
      '--from',
      accounts[0],
      '--to',
      accounts[1],
      '--value',
      amountToTransfer,
      '--gasCurrency',
      (await kit.contracts.getStableToken(StableToken.cUSD)).address,
    ])
    // RG cUSD balance should match the amount sent
    const receiverBalance = await kit.getTotalBalance(accounts[1])
    expect(receiverBalance.CELO!.toFixed()).toEqual(
      receiverBalanceBefore.CELO!.plus(amountToTransfer).toFixed()
    )
    // Attempt to send cUSD back
    await testLocally(TransferCelo, [
      '--from',
      accounts[1],
      '--to',
      accounts[0],
      '--value',
      amountToTransfer,
      '--gasCurrency',
      (await kit.contracts.getStableToken(StableToken.cUSD)).address,
    ])
    const balanceAfter = await kit.getTotalBalance(accounts[0])
    expect(balanceBefore.CELO).toEqual(balanceAfter.CELO)
  })

  test('should fail if to address is sanctioned', async () => {
    const spy = jest.spyOn(console, 'log')
    await expect(
      testLocally(TransferCelo, [
        '--from',
        accounts[1],
        '--to',
        SANCTIONED_ADDRESSES[0],
        '--value',
        '1',
      ])
    ).rejects.toThrow()
    expect(spy).toHaveBeenCalledWith(expect.stringContaining(COMPLIANT_ERROR_RESPONSE))
  })
  test('should fail if from address is sanctioned', async () => {
    const spy = jest.spyOn(console, 'log')
    await expect(
      testLocally(TransferCelo, [
        '--from',
        SANCTIONED_ADDRESSES[0],
        '--to',
        accounts[0],
        '--value',
        '1',
      ])
    ).rejects.toThrow()
    expect(spy).toHaveBeenCalledWith(expect.stringContaining(COMPLIANT_ERROR_RESPONSE))
  })

  test("should fail if the feeCurrency isn't correctly formatted", async () => {
    const wrongFee = '0x123'
    await expect(
      testLocally(TransferCelo, [
        '--from',
        accounts[0],
        '--to',
        accounts[1],
        '--value',
        '1',
        '--gasCurrency',
        wrongFee,
      ])
    ).rejects.toThrowErrorMatchingInlineSnapshot(`
      "Parsing --gasCurrency 
      	0x123 is not a valid address
      See more help with --help"
    `)
  })

  test("should fail if the feeCurrency isn't whitelisted", async () => {
    const wrongFee = '0x1234567890123456789012345678901234567890'
    await expect(
      testLocally(TransferCelo, [
        '--from',
        accounts[0],
        '--to',
        accounts[1],
        '--value',
        '1',
        '--gasCurrency',
        wrongFee,
      ])
    ).rejects.toThrowErrorMatchingInlineSnapshot(`
      "0x1234567890123456789012345678901234567890 is not a valid fee currency. Available currencies:
      0x5315e44798395d4a952530d131249fE00f554565 - Celo Dollar (cUSD)
      0x965D352283a3C8A016b9BBbC9bf6306665d495E7 - Celo Brazilian Real (cREAL)
      0xdD66C23e07b4D6925b6089b5Fe6fc9E62941aFE8 - Celo Euro (cEUR)"
    `)
  })
})
