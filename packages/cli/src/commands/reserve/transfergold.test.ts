import { StrongAddress } from '@celo/base'
import { newKitFromWeb3 } from '@celo/contractkit'
import { GoldTokenWrapper } from '@celo/contractkit/lib/wrappers/GoldTokenWrapper'
import { testWithGanache } from '@celo/dev-utils/lib/ganache-test'
import BigNumber from 'bignumber.js'
import Web3 from 'web3'
import { testLocally } from '../../test-utils/cliUtils'
import TransferGold from './transfergold'

process.env.NO_SYNCCHECK = 'true'

testWithGanache('reserve:transfergold cmd', (web3: Web3) => {
  const transferAmt = new BigNumber(100000)
  const kit = newKitFromWeb3(web3)

  let accounts: StrongAddress[] = []
  let goldToken: GoldTokenWrapper

  beforeEach(async () => {
    accounts = (await web3.eth.getAccounts()) as StrongAddress[]
    goldToken = await kit.contracts.getGoldToken()
  })
  test('transferGold fails if spender not passed in', async () => {
    await expect(
      testLocally(TransferGold, [
        '--from',
        accounts[0],
        '--value',
        transferAmt.toString(10),
        '--to',
        accounts[9],
      ])
    ).rejects.toThrow("Some checks didn't pass!")
  })
  test('can transferGold with multisig option', async () => {
    const initialBalance = await goldToken.balanceOf(accounts[9])
    await testLocally(TransferGold, [
      '--from',
      accounts[0],
      '--value',
      transferAmt.toString(10),
      '--to',
      accounts[9],
      '--useMultiSig',
    ])
    await testLocally(TransferGold, [
      '--from',
      accounts[7],
      '--value',
      transferAmt.toString(10),
      '--to',
      accounts[9],
      '--useMultiSig',
    ])
    expect(await goldToken.balanceOf(accounts[9])).toEqual(initialBalance.plus(transferAmt))
  })
})
