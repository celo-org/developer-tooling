import { StableToken, StrongAddress } from '@celo/base'
import { COMPLIANT_ERROR_RESPONSE, SANCTIONED_ADDRESSES } from '@celo/compliance'
import { ContractKit, newKitFromWeb3 } from '@celo/contractkit'
import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import { mineBlocks } from '@celo/dev-utils/ganache-test'
import { ACCOUNT_PRIVATE_KEYS } from '@celo/dev-utils/test-accounts'
import { TEST_BASE_FEE, TEST_GAS_PRICE } from '@celo/dev-utils/test-utils'
import BigNumber from 'bignumber.js'
import { formatEther, toHex } from 'viem'
import Web3 from 'web3'
import { topUpWithToken } from '../../test-utils/chain-setup'
import { stripAnsiCodesFromNestedArray, testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import { createMultisig } from '../../test-utils/multisigUtils'
import { deployReleaseGoldContract } from '../../test-utils/release-gold'
import Register from '../account/register'
import TransferDollars from '../transfer/dollars'
import CreateAccount from './create-account'
import RGTransferDollars from './transfer-dollars'

process.env.NO_SYNCCHECK = 'true'

// Lots of commands, sometimes times out
jest.setTimeout(15000)

testWithAnvilL2('releasegold:transfer-dollars cmd', (web3: Web3) => {
  let accounts: StrongAddress[] = []
  let contractAddress: any
  let kit: ContractKit

  beforeEach(async () => {
    accounts = (await web3.eth.getAccounts()) as StrongAddress[]
    kit = newKitFromWeb3(web3)
    jest.spyOn(console, 'log').mockImplementation(() => {
      // noop
    })
    jest.spyOn(console, 'error').mockImplementation(() => {
      // noop
    })

    contractAddress = await deployReleaseGoldContract(
      web3,
      await createMultisig(kit, [accounts[0], accounts[1]] as StrongAddress[], 2, 2),
      accounts[1],
      accounts[0],
      accounts[2]
    )
    jest.spyOn(kit.connection, 'gasPrice').mockImplementation(async () => {
      return toHex(TEST_GAS_PRICE)
    })
    jest.spyOn(kit.connection, 'getMaxPriorityFeePerGas').mockImplementation(async () => {
      return toHex(TEST_GAS_PRICE - TEST_BASE_FEE)
    })
    await testLocallyWithWeb3Node(Register, ['--from', accounts[0]], web3)
    await testLocallyWithWeb3Node(CreateAccount, ['--contract', contractAddress], web3)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('can transfer dollars out of the ReleaseGold contract', async () => {
    await topUpWithToken(
      kit,
      StableToken.cUSD,
      accounts[0],
      new BigNumber(web3.utils.toWei('1000', 'ether'))
    )
    jest.clearAllMocks()
    const logSpy = jest.spyOn(console, 'log')
    const cUSDToTransfer = '500000000000000000000'
    // Send cUSD to RG contract
    await expect(
      testLocallyWithWeb3Node(
        TransferDollars,
        ['--from', accounts[0], '--to', contractAddress, '--value', cUSDToTransfer],
        web3
      )
    ).resolves.toBeUndefined()
    expect(stripAnsiCodesFromNestedArray(logSpy.mock.calls)).toMatchInlineSnapshot(`
      [
        [
          "Running Checks:",
        ],
        [
          "   ✔  Account has at least 500 cUSD ",
        ],
        [
          "   ✔  Compliant Address ",
        ],
        [
          "   ✔  Compliant Address ",
        ],
        [
          "   ✔  0x5409ED021D9299bf6814279A6A1411A7e866A631 can sign txs ",
        ],
        [
          "   ✔  Account can afford to transfer cUSD with gas paid in CELO ",
        ],
        [
          "All checks passed",
        ],
        [
          "SendTransaction: cUSD->Transfer",
        ],
        [
          "txHash: 0xtxhash",
        ],
      ]
    `)
    jest.clearAllMocks()
    await mineBlocks(2, web3)
    // RG cUSD balance should match the amount sent
    const contractBalance = await kit.getTotalBalance(contractAddress)
    expect(contractBalance.cUSD!.toFixed()).toEqual(cUSDToTransfer)
    // Test that transfer succeeds when using the beneficiary (accounts[1])
    await expect(
      testLocallyWithWeb3Node(
        RGTransferDollars,
        ['--contract', contractAddress, '--to', accounts[0], '--value', cUSDToTransfer, '--privateKey', ACCOUNT_PRIVATE_KEYS[1]],
        web3
      )
    ).resolves.toBeUndefined()
    
    const balanceAfter = await kit.getTotalBalance(accounts[0])
    const contractBalanceAfter = await kit.getTotalBalance(contractAddress)
    
    // Verify the transfer succeeded by checking the contract is empty
    expect(contractBalanceAfter.cUSD!.toFixed()).toEqual('0') // Contract should be empty after transfer
    expect(balanceAfter.cUSD!.toFixed()).toEqual('1000000000000000000000') // Should be 1000 cUSD (500 initial + 500 transferred)
  })

  test('fails if contract has no celo dollars', async () => {
    const logSpy = jest.spyOn(console, 'log')
    const value = BigInt(1)
    await expect(
      testLocallyWithWeb3Node(
        RGTransferDollars,
        ['--contract', contractAddress, '--to', accounts[0], '--value', value.toString()],
        web3
      )
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"Some checks didn't pass!"`)
    expect(stripAnsiCodesFromNestedArray(logSpy.mock.calls).at(-1)).toMatchInlineSnapshot(`
      [
        "   ✘  Account has at least ${formatEther(value)} cUSD ",
      ]
    `)
  })
  test('fails if to address is sanctioned', async () => {
    await topUpWithToken(
      kit,
      StableToken.cUSD,
      accounts[0],
      new BigNumber(web3.utils.toWei('1000', 'ether'))
    )
    const spy = jest.spyOn(console, 'log')
    const cUSDToTransfer = '500000000000000000000'
    // Send cUSD to RG contract
    await testLocallyWithWeb3Node(
      TransferDollars,
      ['--from', accounts[0], '--to', contractAddress, '--value', cUSDToTransfer],
      web3
    )

    await expect(
      testLocallyWithWeb3Node(
        RGTransferDollars,
        ['--contract', contractAddress, '--to', SANCTIONED_ADDRESSES[0], '--value', '10'],
        web3
      )
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"Some checks didn't pass!"`)
    expect(spy).toHaveBeenCalledWith(expect.stringContaining(COMPLIANT_ERROR_RESPONSE))
  })

  test('fails if signing account is not the beneficiary or release owner', async () => {
    await topUpWithToken(
      kit,
      StableToken.cUSD,
      accounts[0],
      new BigNumber(web3.utils.toWei('1000', 'ether'))
    )
    const spy = jest.spyOn(console, 'log')
    const cUSDToTransfer = '500000000000000000000'
    // Send cUSD to RG contract
    await testLocallyWithWeb3Node(
      TransferDollars,
      ['--from', accounts[0], '--to', contractAddress, '--value', cUSDToTransfer],
      web3
    )

    // Try to transfer using account[2] which is neither beneficiary nor release owner
    await expect(
      testLocallyWithWeb3Node(
        RGTransferDollars,
        [
          '--contract',
          contractAddress,
          '--to',
          accounts[3],
          '--value',
          '10',
          '--privateKey',
          ACCOUNT_PRIVATE_KEYS[2],
        ],
        web3
      )
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"Some checks didn't pass!"`)

    expect(
      stripAnsiCodesFromNestedArray(spy.mock.calls).some((call) =>
        call.some(
          (arg) => typeof arg === 'string' && arg.includes('Signing Account is Beneficiary')
        )
      )
    ).toBe(true)
  })
})
