import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import { setCommissionUpdateDelay } from '@celo/dev-utils/chain-setup'
import { mineBlocks } from '@celo/dev-utils/ganache-test'
import { addressToPublicKey } from '@celo/utils/lib/signatureUtils'
import BigNumber from 'bignumber.js'
import Web3 from 'web3'
import { newKitFromWeb3 } from '../kit'
import { startAndFinishEpochProcess } from '../test-utils/utils'
import { AccountsWrapper } from './Accounts'
import { LockedGoldWrapper } from './LockedGold'
import { ValidatorsWrapper } from './Validators'
/*
TEST NOTES:
- In migrations: The only account that has cUSD is accounts[0]
*/

const minLockedGoldValue = Web3.utils.toWei('10000', 'ether') // 10k gold

testWithAnvilL2('Validators Wrapper', (web3) => {
  const kit = newKitFromWeb3(web3)
  let accounts: string[] = []
  let accountsInstance: AccountsWrapper
  let validators: ValidatorsWrapper
  let lockedGold: LockedGoldWrapper

  const registerAccountWithLockedGold = async (
    account: string,
    value: string = minLockedGoldValue
  ) => {
    if (!(await accountsInstance.isAccount(account))) {
      await accountsInstance.createAccount().sendAndWaitForReceipt({ from: account })
    }
    await lockedGold.lock().sendAndWaitForReceipt({ from: account, value })
  }

  beforeAll(async () => {
    accounts = await web3.eth.getAccounts()
    validators = await kit.contracts.getValidators()
    lockedGold = await kit.contracts.getLockedGold()
    accountsInstance = await kit.contracts.getAccounts()
  })

  const setupGroup = async (groupAccount: string, members: number = 1) => {
    await registerAccountWithLockedGold(
      groupAccount,
      new BigNumber(minLockedGoldValue).times(members).toFixed()
    )
    await (await validators.registerValidatorGroup(new BigNumber(0.1))).sendAndWaitForReceipt({
      from: groupAccount,
    })
  }

  const setupValidator = async (validatorAccount: string) => {
    await registerAccountWithLockedGold(validatorAccount)
    const ecdsaPublicKey = await addressToPublicKey(validatorAccount, kit.connection.sign)
    await validators
      // @ts-ignore
      .registerValidatorNoBls(ecdsaPublicKey)
      .sendAndWaitForReceipt({
        from: validatorAccount,
      })
  }

  it('registers a validator group', async () => {
    const groupAccount = accounts[0]
    await setupGroup(groupAccount)
    await expect(validators.isValidatorGroup(groupAccount)).resolves.toBe(true)
  })

  it('registers a validator', async () => {
    const validatorAccount = accounts[1]
    await setupValidator(validatorAccount)
    await expect(validators.isValidator(validatorAccount)).resolves.toBe(true)
  })

  it('adds a member', async () => {
    const groupAccount = accounts[0]
    const validatorAccount = accounts[1]
    await setupGroup(groupAccount)
    await setupValidator(validatorAccount)
    await validators.affiliate(groupAccount).sendAndWaitForReceipt({ from: validatorAccount })
    await (await validators.addMember(groupAccount, validatorAccount)).sendAndWaitForReceipt({
      from: groupAccount,
    })

    const members = await validators.getValidatorGroup(groupAccount).then((group) => group.members)
    expect(members).toContain(validatorAccount)
  })

  it('sets next commission update', async () => {
    const groupAccount = accounts[0]
    await setupGroup(groupAccount)
    await validators.setNextCommissionUpdate('0.2').sendAndWaitForReceipt({
      from: groupAccount,
    })
    const commission = (await validators.getValidatorGroup(groupAccount)).nextCommission
    expect(commission).toEqBigNumber('0.2')
  })

  it('updates commission', async () => {
    const groupAccount = accounts[0]
    await setupGroup(groupAccount)
    const txOpts = { from: groupAccount }

    // Set commission update delay to 3 blocks for backwards compatibility
    await setCommissionUpdateDelay(web3, validators.address, 3)
    await mineBlocks(1, web3)

    await validators.setNextCommissionUpdate('0.2').sendAndWaitForReceipt(txOpts)
    await mineBlocks(3, web3)
    await validators.updateCommission().sendAndWaitForReceipt(txOpts)

    const commission = (await validators.getValidatorGroup(groupAccount)).commission
    expect(commission).toEqBigNumber('0.2')
  })

  it('gets group affiliates', async () => {
    const groupAccount = accounts[0]
    const validatorAccount = accounts[1]
    await setupGroup(groupAccount)
    await setupValidator(validatorAccount)
    await validators.affiliate(groupAccount).sendAndWaitForReceipt({ from: validatorAccount })
    const group = await validators.getValidatorGroup(groupAccount)
    expect(group.affiliates).toContain(validatorAccount)
  })

  describe('reorders member', () => {
    jest.setTimeout(30 * 1000)
    let groupAccount: string, validator1: string, validator2: string

    beforeEach(async () => {
      jest.setTimeout(30 * 1000)

      groupAccount = accounts[0]
      await setupGroup(groupAccount, 2)

      validator1 = accounts[1]
      validator2 = accounts[2]

      for (const validator of [validator1, validator2]) {
        await setupValidator(validator)
        await validators.affiliate(groupAccount).sendAndWaitForReceipt({ from: validator })
        await (await validators.addMember(groupAccount, validator)).sendAndWaitForReceipt({
          from: groupAccount,
        })
      }

      const members = await validators
        .getValidatorGroup(groupAccount)
        .then((group) => group.members)
      expect(members).toEqual([validator1, validator2])
    })

    it('moves last to first', async () => {
      jest.setTimeout(30 * 1000)

      await validators
        .reorderMember(groupAccount, validator2, 0)
        .then((x) => x.sendAndWaitForReceipt({ from: groupAccount }))

      const membersAfter = await validators
        .getValidatorGroup(groupAccount)
        .then((group) => group.members)

      expect(membersAfter).toEqual([validator2, validator1])
    })

    it('moves first to last', async () => {
      jest.setTimeout(30 * 1000)

      await validators
        .reorderMember(groupAccount, validator1, 1)
        .then((x) => x.sendAndWaitForReceipt({ from: groupAccount }))

      const membersAfter = await validators
        .getValidatorGroup(groupAccount)
        .then((group) => group.members)

      expect(membersAfter).toEqual([validator2, validator1])
    })

    it('checks address normalization', async () => {
      jest.setTimeout(30 * 1000)

      await validators
        .reorderMember(groupAccount, validator2.toLowerCase(), 0)
        .then((x) => x.sendAndWaitForReceipt({ from: groupAccount }))

      const membersAfter = await validators
        .getValidatorGroup(groupAccount)
        .then((group) => group.members)

      expect(membersAfter).toEqual([validator2, validator1])
    })
  })

  it("can fetch epoch's last block information", async () => {
    const lastEpoch = (await validators.getEpochNumber()).toNumber()
    await startAndFinishEpochProcess(kit)
    const lastBlockNumberForEpochPromise = validators.getLastBlockNumberForEpoch(lastEpoch)
    expect(typeof (await lastBlockNumberForEpochPromise)).toBe('number')
  })
  it("can fetch block's epoch information", async () => {
    await startAndFinishEpochProcess(kit)
    const epochNumberOfBlockPromise = validators.getEpochNumberOfBlock(
      await kit.connection.getBlockNumber()
    )
    expect(typeof (await epochNumberOfBlockPromise)).toBe('number')
  })
})
