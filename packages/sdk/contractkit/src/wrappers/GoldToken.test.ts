import { goldTokenABI } from '@celo/abis'
import { StrongAddress } from '@celo/base'
import type { ViemContract } from '@celo/connect'
import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import BigNumber from 'bignumber.js'
import { newKitFromProvider } from '../kit'
import { GoldTokenWrapper } from './GoldTokenWrapper'

// TODO checking for account balance directly won't work because of missing transfer precompile
// instead we can check for the Transfer event instead and/or lowered allowance value (they both
// happen after the call to transfer precompile)
testWithAnvilL2('GoldToken Wrapper', (provider) => {
  const ONE_GOLD = new BigNumber('1e18').toFixed()

  const kit = newKitFromProvider(provider)
  let accounts: StrongAddress[] = []
  let goldToken: GoldTokenWrapper
  let goldTokenContract: ViemContract

  beforeAll(async () => {
    accounts = await kit.connection.getAccounts()
    kit.defaultAccount = accounts[0]
    goldToken = await kit.contracts.getGoldToken()
    goldTokenContract = kit.connection.getViemContract(goldTokenABI as any, goldToken.address)
  })

  it('checks balance', () => expect(goldToken.balanceOf(accounts[0])).resolves.toBeBigNumber())
  it('checks decimals', () => expect(goldToken.decimals()).resolves.toBe(18))
  it('checks name', () => expect(goldToken.name()).resolves.toBe('Celo native asset'))
  it('checks symbol', () => expect(goldToken.symbol()).resolves.toBe('CELO'))
  it('checks totalSupply', () => expect(goldToken.totalSupply()).resolves.toBeBigNumber())

  it('approves spender', async () => {
    const before = await goldToken.allowance(accounts[0], accounts[1])
    expect(before).toEqBigNumber(0)

    await goldToken.approve(accounts[1], ONE_GOLD).sendAndWaitForReceipt()
    const after = await goldToken.allowance(accounts[0], accounts[1])
    expect(after).toEqBigNumber(ONE_GOLD)
  })

  it('transfers', async () => {
    await goldToken.transfer(accounts[1], ONE_GOLD).sendAndWaitForReceipt()

    const events = await goldTokenContract.client.getContractEvents({
      abi: goldTokenContract.abi as any,
      address: goldTokenContract.address as `0x${string}`,
      eventName: 'Transfer',
      fromBlock: 'latest',
    })

    expect(events.length).toBe(1)
    const args = (events[0] as any).args
    expect(args.from).toEqual(accounts[0])
    expect(args.to).toEqual(accounts[1])
    expect(args.value.toString()).toEqual(ONE_GOLD)
  })

  it('transfers from', async () => {
    // account1 approves account0
    await goldToken.approve(accounts[0], ONE_GOLD).sendAndWaitForReceipt({ from: accounts[1] })

    expect(await goldToken.allowance(accounts[1], accounts[0])).toEqBigNumber(ONE_GOLD)

    await goldToken.transferFrom(accounts[1], accounts[3], ONE_GOLD).sendAndWaitForReceipt()

    const events = await goldTokenContract.client.getContractEvents({
      abi: goldTokenContract.abi as any,
      address: goldTokenContract.address as `0x${string}`,
      eventName: 'Transfer',
      fromBlock: 'latest',
    })

    expect(events.length).toBe(1)
    const args = (events[0] as any).args
    expect(args.from).toEqual(accounts[1])
    expect(args.to).toEqual(accounts[3])
    expect(args.value.toString()).toEqual(ONE_GOLD)
    expect(await goldToken.allowance(accounts[1], accounts[0])).toEqBigNumber(0)
  })
})
