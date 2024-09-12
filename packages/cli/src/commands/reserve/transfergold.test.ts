import { newReserve } from '@celo/abis/web3/mento/Reserve'
import { newMultiSig } from '@celo/abis/web3/MultiSig'
import { StrongAddress } from '@celo/base'
import { CeloContract, newKitFromWeb3 } from '@celo/contractkit'
import { GoldTokenWrapper } from '@celo/contractkit/lib/wrappers/GoldTokenWrapper'
import {
  asCoreContractsOwner,
  DEFAULT_OWNER_ADDRESS,
  setBalance,
  testWithAnvilL1,
  withImpersonatedAccount,
} from '@celo/dev-utils/lib/anvil-test'
import BigNumber from 'bignumber.js'
import Web3 from 'web3'
import { testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import TransferGold from './transfergold'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL1('reserve:transfergold cmd', (web3: Web3) => {
  const transferAmt = new BigNumber(100000)
  const kit = newKitFromWeb3(web3)

  let accounts: StrongAddress[] = []
  let otherReserveAddress: StrongAddress
  let otherSpender: StrongAddress
  let goldToken: GoldTokenWrapper

  beforeEach(async () => {
    accounts = (await web3.eth.getAccounts()) as StrongAddress[]
    goldToken = await kit.contracts.getGoldToken()

    otherReserveAddress = accounts[9]
    otherSpender = accounts[7]
    const multiSigAddress = await kit.registry.addressFor('ReserveSpenderMultiSig' as CeloContract)
    const reserveSpenderMultiSig = await kit.contracts.getMultiSig(multiSigAddress)
    const reserve = await kit.contracts.getReserve()

    const reserveContract = newReserve(web3, reserve.address)
    const reserveSpenderMultiSigContract = newMultiSig(web3, reserveSpenderMultiSig.address)

    await withImpersonatedAccount(
      web3,
      multiSigAddress,
      async () => {
        await reserveSpenderMultiSig
          .replaceOwner(DEFAULT_OWNER_ADDRESS, accounts[0])
          .sendAndWaitForReceipt({ from: multiSigAddress })
        await reserveSpenderMultiSigContract.methods
          .addOwner(otherSpender)
          .send({ from: multiSigAddress })
        await reserveSpenderMultiSigContract.methods
          .changeRequirement(2)
          .send({ from: multiSigAddress })
      },
      new BigNumber(web3.utils.toWei('1', 'ether'))
    )

    await asCoreContractsOwner(web3, async (ownerAdress: StrongAddress) => {
      await reserveContract.methods.addSpender(multiSigAddress).send({ from: ownerAdress })
      await reserveContract.methods
        .addOtherReserveAddress(otherReserveAddress)
        .send({ from: ownerAdress })
    })

    await setBalance(web3, reserve.address, new BigNumber(web3.utils.toWei('1', 'ether')))
  })
  test('transferGold fails if spender not passed in', async () => {
    await expect(
      testLocallyWithWeb3Node(
        TransferGold,
        ['--from', accounts[0], '--value', transferAmt.toString(10), '--to', otherReserveAddress],
        web3
      )
    ).rejects.toThrow("Some checks didn't pass!")
  })
  test('can transferGold with multisig option', async () => {
    const initialBalance = await goldToken.balanceOf(otherReserveAddress)
    await testLocallyWithWeb3Node(
      TransferGold,
      [
        '--from',
        accounts[0],
        '--value',
        transferAmt.toString(10),
        '--to',
        otherReserveAddress,
        '--useMultiSig',
      ],
      web3
    )
    await testLocallyWithWeb3Node(
      TransferGold,
      [
        '--from',
        otherSpender,
        '--value',
        transferAmt.toString(10),
        '--to',
        otherReserveAddress,
        '--useMultiSig',
      ],
      web3
    )
    expect(await goldToken.balanceOf(accounts[9])).toEqual(initialBalance.plus(transferAmt))
  })
})
