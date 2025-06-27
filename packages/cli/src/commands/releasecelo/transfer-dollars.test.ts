import { StableToken, StrongAddress } from '@celo/base'
import { COMPLIANT_ERROR_RESPONSE, SANCTIONED_ADDRESSES } from '@celo/compliance'
import { ContractKit, newKitFromWeb3 } from '@celo/contractkit'
import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import BigNumber from 'bignumber.js'
import { formatEther } from 'viem'
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
      return '3000'
    })
    jest.spyOn(kit.connection, 'getMaxPriorityFeePerGas').mockImplementation(async () => {
      return '4000'
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
    const balanceBefore = await kit.getTotalBalance(accounts[0])
    const cUSDToTransfer = '500000000000000000000'
    // Send cUSD to RG contract
    await testLocallyWithWeb3Node(
      TransferDollars,
      ['--from', accounts[0], '--to', contractAddress, '--value', cUSDToTransfer],
      web3
    )
    // RG cUSD balance should match the amount sent
    const contractBalance = await kit.getTotalBalance(contractAddress)
    expect(contractBalance.cUSD!.toFixed()).toEqual(cUSDToTransfer)
    // Attempt to send cUSD back
    await testLocallyWithWeb3Node(
      RGTransferDollars,
      ['--contract', contractAddress, '--to', accounts[0], '--value', cUSDToTransfer],
      web3
    )
    const balanceAfter = await kit.getTotalBalance(accounts[0])
    expect(balanceBefore.cUSD).toEqual(balanceAfter.cUSD)
  })

  test('should fail if contract has no celo dollars', async () => {
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
  test('should fail if to address is sanctioned', async () => {
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
})
