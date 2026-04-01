import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import { setCommissionUpdateDelay } from '@celo/dev-utils/chain-setup'
import { mineBlocks, timeTravel } from '@celo/dev-utils/ganache-test'
import { addressToPublicKey } from '@celo/utils/lib/signatureUtils'
import BigNumber from 'bignumber.js'
import { newKitFromProvider } from '../kit'
import { startAndFinishEpochProcess } from '../test-utils/utils'
import { AccountsWrapper } from './Accounts'
import { LockedGoldWrapper } from './LockedGold'
import { ValidatorsWrapper } from './Validators'
/*
TEST NOTES:
- In migrations: The only account that has USDm is accounts[0]
*/

const minLockedGoldValue = '10000000000000000000000' // 10k gold

testWithAnvilL2('Validators Wrapper', (provider) => {
  const kit = newKitFromProvider(provider)
  let accounts: string[] = []
  let accountsInstance: AccountsWrapper
  let validators: ValidatorsWrapper
  let lockedGold: LockedGoldWrapper

  const registerAccountWithLockedGold = async (
    account: string,
    value: string = minLockedGoldValue
  ) => {
    if (!(await accountsInstance.isAccount(account))) {
      const hash = await accountsInstance.createAccount({ from: account })
      await kit.connection.viemClient.waitForTransactionReceipt({ hash: hash })
    }
    const lockHash = await lockedGold.lock({ from: account, value })
    await kit.connection.viemClient.waitForTransactionReceipt({ hash: lockHash })
  }

  beforeAll(async () => {
    accounts = await kit.connection.getAccounts()
    validators = await kit.contracts.getValidators()
    lockedGold = await kit.contracts.getLockedGold()
    accountsInstance = await kit.contracts.getAccounts()
  })

  const setupGroup = async (groupAccount: string, members: number = 1) => {
    await registerAccountWithLockedGold(
      groupAccount,
      new BigNumber(minLockedGoldValue).times(members).toFixed()
    )
    const hash = await validators.registerValidatorGroup(new BigNumber(0.1), { from: groupAccount })
    await kit.connection.viemClient.waitForTransactionReceipt({ hash: hash })
  }

  const setupValidator = async (validatorAccount: string) => {
    await registerAccountWithLockedGold(validatorAccount)
    const ecdsaPublicKey = await addressToPublicKey(validatorAccount, kit.connection.sign)
    const hash = await validators.registerValidatorNoBls(ecdsaPublicKey, { from: validatorAccount })
    await kit.connection.viemClient.waitForTransactionReceipt({ hash: hash })
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
    const affiliateHash = await validators.affiliate(groupAccount, { from: validatorAccount })
    await kit.connection.viemClient.waitForTransactionReceipt({ hash: affiliateHash })
    const addMemberHash = await validators.addMember(groupAccount, validatorAccount, {
      from: groupAccount,
    })
    await kit.connection.viemClient.waitForTransactionReceipt({ hash: addMemberHash })

    const members = await validators.getValidatorGroup(groupAccount).then((group) => group.members)
    expect(members).toContain(validatorAccount)
  })

  it('sets next commission update', async () => {
    const groupAccount = accounts[0]
    await setupGroup(groupAccount)
    const hash = await validators.setNextCommissionUpdate('0.2', { from: groupAccount })
    await kit.connection.viemClient.waitForTransactionReceipt({ hash: hash })
    const commission = (await validators.getValidatorGroup(groupAccount)).nextCommission
    expect(commission).toEqBigNumber('0.2')
  })

  it('updates commission', async () => {
    const groupAccount = accounts[0]
    await setupGroup(groupAccount)
    const txOpts = { from: groupAccount }

    // Set commission update delay to 3 blocks for backwards compatibility
    await setCommissionUpdateDelay(provider, validators.address, 3)
    await mineBlocks(1, provider)

    const setHash = await validators.setNextCommissionUpdate('0.2', txOpts)
    await kit.connection.viemClient.waitForTransactionReceipt({ hash: setHash })
    await mineBlocks(3, provider)
    const updateHash = await validators.updateCommission(txOpts)
    await kit.connection.viemClient.waitForTransactionReceipt({ hash: updateHash })

    const commission = (await validators.getValidatorGroup(groupAccount)).commission
    expect(commission).toEqBigNumber('0.2')
  })

  it('gets group affiliates', async () => {
    const groupAccount = accounts[0]
    const validatorAccount = accounts[1]
    await setupGroup(groupAccount)
    await setupValidator(validatorAccount)
    const affiliateHash = await validators.affiliate(groupAccount, { from: validatorAccount })
    await kit.connection.viemClient.waitForTransactionReceipt({ hash: affiliateHash })
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
        const affiliateHash = await validators.affiliate(groupAccount, { from: validator })
        await kit.connection.viemClient.waitForTransactionReceipt({ hash: affiliateHash })
        const addMemberHash = await validators.addMember(groupAccount, validator, {
          from: groupAccount,
        })
        await kit.connection.viemClient.waitForTransactionReceipt({ hash: addMemberHash })
      }

      const members = await validators
        .getValidatorGroup(groupAccount)
        .then((group) => group.members)
      expect(members).toEqual([validator1, validator2])
    })

    it('moves last to first', async () => {
      jest.setTimeout(30 * 1000)

      const hash = await validators.reorderMember(groupAccount, validator2, 0, {
        from: groupAccount,
      })
      await kit.connection.viemClient.waitForTransactionReceipt({ hash: hash })

      const membersAfter = await validators
        .getValidatorGroup(groupAccount)
        .then((group) => group.members)

      expect(membersAfter).toEqual([validator2, validator1])
    })

    it('moves first to last', async () => {
      jest.setTimeout(30 * 1000)

      const hash = await validators.reorderMember(groupAccount, validator1, 1, {
        from: groupAccount,
      })
      await kit.connection.viemClient.waitForTransactionReceipt({ hash: hash })

      const membersAfter = await validators
        .getValidatorGroup(groupAccount)
        .then((group) => group.members)

      expect(membersAfter).toEqual([validator2, validator1])
    })

    it('checks address normalization', async () => {
      jest.setTimeout(30 * 1000)

      const hash = await validators.reorderMember(groupAccount, validator2.toLowerCase(), 0, {
        from: groupAccount,
      })
      await kit.connection.viemClient.waitForTransactionReceipt({ hash: hash })

      const membersAfter = await validators
        .getValidatorGroup(groupAccount)
        .then((group) => group.members)

      expect(membersAfter).toEqual([validator2, validator1])
    })
  })
  describe('epoch block information', () => {
    beforeEach(async () => {
      const epochManagerWrapper = await kit.contracts.getEpochManager()
      const epochDuration = await epochManagerWrapper.epochDuration()
      await timeTravel(epochDuration, provider)
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
        Number(await kit.connection.viemClient.getBlockNumber())
      )
      expect(typeof (await epochNumberOfBlockPromise)).toBe('number')
    })
  })
})
