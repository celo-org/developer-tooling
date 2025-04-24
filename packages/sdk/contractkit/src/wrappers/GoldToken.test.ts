import { GoldToken, newGoldToken } from '@celo/abis-12/web3/GoldToken'
import { StrongAddress } from '@celo/base'
import { testWithAnvilL2 } from '@celo/dev-utils/lib/anvil-test'
import { newKitFromWeb3 } from '../kit'
import { GoldTokenWrapper } from './GoldTokenWrapper'

// TODO checking for account balance directly won't work because of missing transfer precompile
// instead we can check for the Transfer event instead and/or lowered allowance value (they both
// happen after the call to transfer precompile)
testWithAnvilL2('GoldToken Wrapper', (web3) => {
  const ONE_GOLD = web3.utils.toWei('1', 'ether')

  const kit = newKitFromWeb3(web3)
  let accounts: StrongAddress[] = []
  let goldToken: GoldTokenWrapper
  let goldTokenContract: GoldToken

  beforeAll(async () => {
    accounts = (await web3.eth.getAccounts()) as StrongAddress[]
    kit.defaultAccount = accounts[0]
    goldToken = await kit.contracts.getGoldToken()
    goldTokenContract = newGoldToken(web3, goldToken.address)
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

    const events = await goldTokenContract.getPastEvents('Transfer', { fromBlock: 'latest' })

    expect(events.length).toBe(1)
    expect(events[0].returnValues.from).toEqual(accounts[0])
    expect(events[0].returnValues.to).toEqual(accounts[1])
    expect(events[0].returnValues.value).toEqual(ONE_GOLD)
  })

  it('transfers from', async () => {
    // account1 approves account0
    await goldToken.approve(accounts[0], ONE_GOLD).sendAndWaitForReceipt({ from: accounts[1] })

    expect(await goldToken.allowance(accounts[1], accounts[0])).toEqBigNumber(ONE_GOLD)

    await goldToken.transferFrom(accounts[1], accounts[3], ONE_GOLD).sendAndWaitForReceipt()

    const events = await goldTokenContract.getPastEvents('Transfer', { fromBlock: 'latest' })

    expect(events.length).toBe(1)
    expect(events[0].returnValues.from).toEqual(accounts[1])
    expect(events[0].returnValues.to).toEqual(accounts[3])
    expect(events[0].returnValues.value).toEqual(ONE_GOLD)
    expect(await goldToken.allowance(accounts[1], accounts[0])).toEqBigNumber(0)
  })
})
