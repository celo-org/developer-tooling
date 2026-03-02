import { addressToPublicKey } from '@celo/utils/lib/signatureUtils'
import BigNumber from 'bignumber.js'
import { startAndFinishEpochProcess } from '../test-utils/utils'

import { NULL_ADDRESS } from '@celo/base'
import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import { timeTravel } from '@celo/dev-utils/ganache-test'
import { newKitFromProvider } from '../kit'
import { AccountsWrapper } from './Accounts'
import { ElectionWrapper } from './Election'
import { LockedGoldWrapper } from './LockedGold'
import { ValidatorsWrapper } from './Validators'
import { parseEther } from 'viem'

const minLockedGoldValue = parseEther('10000').toString()

jest.setTimeout(60000)

testWithAnvilL2('Election Wrapper', (provider) => {
  const ZERO_GOLD = new BigNumber('0')
  const ONE_HUNDRED_GOLD = new BigNumber(parseEther('100').toString())
  const ONE_HUNDRED_ONE_GOLD = new BigNumber(parseEther('101').toString())
  const TWO_HUNDRED_GOLD = new BigNumber(parseEther('200').toString())
  const TWO_HUNDRED_ONE_GOLD = new BigNumber(parseEther('201').toString())
  const THREE_HUNDRED_GOLD = new BigNumber(parseEther('300').toString())
  const GROUP_COMMISSION = new BigNumber(0.1)
  const kit = newKitFromProvider(provider)
  let accounts: string[] = []
  let election: ElectionWrapper
  let accountsInstance: AccountsWrapper
  let validators: ValidatorsWrapper
  let lockedGold: LockedGoldWrapper

  beforeAll(async () => {
    accounts = await kit.connection.getAccounts()

    election = await kit.contracts.getElection()

    validators = await kit.contracts.getValidators()

    lockedGold = await kit.contracts.getLockedGold()

    accountsInstance = await kit.contracts.getAccounts()
  })

  afterAll(async () => {
    kit.connection.stop()
  })

  const registerAccountWithLockedGold = async (
    account: string,
    value: string = minLockedGoldValue
  ) => {
    if (!(await accountsInstance.isAccount(account))) {
      const hash = await accountsInstance.createAccount({ from: account })
      await kit.connection.waitForTransactionReceipt(hash)
    }
    const lockHash = await lockedGold.lock({ from: account, value })
    await kit.connection.waitForTransactionReceipt(lockHash)
  }

  const setupGroup = async (groupAccount: string) => {
    await registerAccountWithLockedGold(groupAccount, new BigNumber(minLockedGoldValue).toFixed())
    const hash = await validators.registerValidatorGroup(GROUP_COMMISSION, { from: groupAccount })
    await kit.connection.waitForTransactionReceipt(hash)
  }

  const setupValidator = async (validatorAccount: string) => {
    await registerAccountWithLockedGold(validatorAccount)
    const ecdsaPublicKey = await addressToPublicKey(validatorAccount, kit.connection.sign)
    const hash = await validators.registerValidatorNoBls(ecdsaPublicKey, { from: validatorAccount })
    await kit.connection.waitForTransactionReceipt(hash)
  }

  const setupGroupAndAffiliateValidator = async (
    groupAccount: string,
    validatorAccount: string
  ) => {
    await setupGroup(groupAccount)
    await setupValidator(validatorAccount)
    const affiliateHash = await validators.affiliate(groupAccount, { from: validatorAccount })
    await kit.connection.waitForTransactionReceipt(affiliateHash)
    const addMemberHash = await validators.addMember(groupAccount, validatorAccount, {
      from: groupAccount,
    })
    await kit.connection.waitForTransactionReceipt(addMemberHash)
  }

  const activateAndVote = async (groupAccount: string, userAccount: string, amount: BigNumber) => {
    const voteHash = await election.vote(groupAccount, amount, { from: userAccount })
    await kit.connection.waitForTransactionReceipt(voteHash)
    const epochDuraction = await kit.getEpochSize()
    await timeTravel(epochDuraction + 1, provider)
    await startAndFinishEpochProcess(kit)

    const hashes = await election.activate(userAccount, undefined, { from: userAccount })
    for (const hash of hashes) {
      await kit.connection.waitForTransactionReceipt(hash)
    }
  }

  describe('ElectionWrapper', () => {
    let groupAccount: string
    let validatorAccount: string
    let userAccount: string

    beforeEach(async () => {
      groupAccount = accounts[0]
      validatorAccount = accounts[1]
      userAccount = accounts[2]

      await setupGroupAndAffiliateValidator(groupAccount, validatorAccount)
      await registerAccountWithLockedGold(userAccount)
    }, 60000)

    describe('#getValidatorGroupVotes', () => {
      // Confirm base assumptions once to avoid duplicating test code later
      test('shows non-empty group as eligible', async () => {
        const groupVotesBefore = await election.getValidatorGroupVotes(groupAccount)
        expect(groupVotesBefore.eligible).toBe(true)
      })

      test('shows empty group as ineligible', async () => {
        const deaffiliateHash = await validators.deaffiliate({ from: validatorAccount })
        await kit.connection.waitForTransactionReceipt(deaffiliateHash)
        const groupVotesAfter = await election.getValidatorGroupVotes(groupAccount)
        expect(groupVotesAfter.eligible).toBe(false)
      })
    })

    describe('#vote', () => {
      beforeEach(async () => {
        const hash = await election.vote(groupAccount, ONE_HUNDRED_GOLD, { from: userAccount })
        await kit.connection.waitForTransactionReceipt(hash)
      }, 60000)
      it('votes', async () => {
        const totalGroupVotes = await election.getTotalVotesForGroup(groupAccount)
        expect(totalGroupVotes).toEqual(ONE_HUNDRED_GOLD)
      })

      test('total votes remain unchanged when group becomes ineligible', async () => {
        const deaffiliateHash = await validators.deaffiliate({ from: validatorAccount })
        await kit.connection.waitForTransactionReceipt(deaffiliateHash)
        const totalGroupVotes = await election.getTotalVotesForGroup(groupAccount)
        expect(totalGroupVotes).toEqual(ONE_HUNDRED_GOLD)
      })
    })

    describe('#activate', () => {
      beforeEach(async () => {
        const voteHash = await election.vote(groupAccount, ONE_HUNDRED_GOLD, { from: userAccount })
        await kit.connection.waitForTransactionReceipt(voteHash)
        const epochDuraction = await kit.getEpochSize()

        await timeTravel(epochDuraction + 1, provider)

        await startAndFinishEpochProcess(kit)

        const hashes = await election.activate(userAccount, undefined, { from: userAccount })
        for (const hash of hashes) {
          await kit.connection.waitForTransactionReceipt(hash)
        }
      }, 60000)

      it('activates vote', async () => {
        const activeVotes = await election.getActiveVotesForGroup(groupAccount)
        expect(activeVotes).toEqual(ONE_HUNDRED_GOLD)
      })

      test('active votes remain unchanged when group becomes ineligible', async () => {
        const deaffiliateHash = await validators.deaffiliate({ from: validatorAccount })
        await kit.connection.waitForTransactionReceipt(deaffiliateHash)
        const activeVotes = await election.getActiveVotesForGroup(groupAccount)
        expect(activeVotes).toEqual(ONE_HUNDRED_GOLD)
      })
    })

    describe('#revokeActive', () => {
      beforeEach(async () => {
        await activateAndVote(groupAccount, userAccount, ONE_HUNDRED_GOLD)
      }, 60000)

      it('revokes active', async () => {
        const hash = await election.revokeActive(
          userAccount,
          groupAccount,
          ONE_HUNDRED_GOLD,
          undefined,
          undefined,
          { from: userAccount }
        )
        await kit.connection.waitForTransactionReceipt(hash)

        const remainingVotes = await election.getTotalVotesForGroup(groupAccount)
        expect(remainingVotes).toEqual(ZERO_GOLD)
      })

      it('revokes active when group is ineligible', async () => {
        const deaffiliateHash = await validators.deaffiliate({ from: validatorAccount })
        await kit.connection.waitForTransactionReceipt(deaffiliateHash)
        const hash = await election.revokeActive(
          userAccount,
          groupAccount,
          ONE_HUNDRED_GOLD,
          undefined,
          undefined,
          { from: userAccount }
        )
        await kit.connection.waitForTransactionReceipt(hash)

        const remainingVotes = await election.getTotalVotesForGroup(groupAccount)
        expect(remainingVotes).toEqual(ZERO_GOLD)
      })
    })

    describe('#revokePending', () => {
      beforeEach(async () => {
        const hash = await election.vote(groupAccount, ONE_HUNDRED_GOLD, { from: userAccount })
        await kit.connection.waitForTransactionReceipt(hash)
      })

      it('revokes pending', async () => {
        const hash = await election.revokePending(userAccount, groupAccount, ONE_HUNDRED_GOLD, {
          from: userAccount,
        })
        await kit.connection.waitForTransactionReceipt(hash)
        const remainingVotes = await election.getTotalVotesForGroup(groupAccount)
        expect(remainingVotes).toEqual(ZERO_GOLD)
      })

      it('revokes pending when group is ineligible', async () => {
        const deaffiliateHash = await validators.deaffiliate({ from: validatorAccount })
        await kit.connection.waitForTransactionReceipt(deaffiliateHash)
        const hash = await election.revokePending(userAccount, groupAccount, ONE_HUNDRED_GOLD, {
          from: userAccount,
        })
        await kit.connection.waitForTransactionReceipt(hash)
        const remainingVotes = await election.getTotalVotesForGroup(groupAccount)
        expect(remainingVotes).toEqual(ZERO_GOLD)
      })
    })

    describe('#revoke', () => {
      beforeEach(async () => {
        await activateAndVote(groupAccount, userAccount, TWO_HUNDRED_GOLD)
        const voteHash = await election.vote(groupAccount, ONE_HUNDRED_GOLD, { from: userAccount })
        await kit.connection.waitForTransactionReceipt(voteHash)
      }, 60000)

      it('revokes active and pending votes', async () => {
        const hashes = await election.revoke(userAccount, groupAccount, THREE_HUNDRED_GOLD, {
          from: userAccount,
        })
        for (const hash of hashes) {
          await kit.connection.waitForTransactionReceipt(hash)
        }
        const remainingVotes = await election.getTotalVotesForGroup(groupAccount)
        expect(remainingVotes).toEqual(ZERO_GOLD)
      })

      it('revokes active and pending votes when group is ineligible', async () => {
        const deaffiliateHash = await validators.deaffiliate({ from: validatorAccount })
        await kit.connection.waitForTransactionReceipt(deaffiliateHash)
        const hashes = await election.revoke(userAccount, groupAccount, THREE_HUNDRED_GOLD, {
          from: userAccount,
        })
        for (const hash of hashes) {
          await kit.connection.waitForTransactionReceipt(hash)
        }
        const remainingVotes = await election.getTotalVotesForGroup(groupAccount)
        expect(remainingVotes).toEqual(ZERO_GOLD)
      })
    })
  })

  describe('#findLesserAndGreaterAfterVote', () => {
    let groupAccountA: string
    let groupAccountB: string
    let groupAccountC: string
    let validatorAccountA: string
    let validatorAccountB: string
    let validatorAccountC: string
    let userAccount: string

    beforeEach(async () => {
      ;[
        groupAccountA,
        groupAccountB,
        groupAccountC,
        validatorAccountA,
        validatorAccountB,
        validatorAccountC,
        userAccount,
      ] = accounts

      await registerAccountWithLockedGold(userAccount)

      // Cant `await Promise.all()` because of race condition when finding
      // lesser and greater addresses for voting and adding a member to a group.
      await setupGroupAndAffiliateValidator(groupAccountA, validatorAccountA)
      await setupGroupAndAffiliateValidator(groupAccountB, validatorAccountB)
      await setupGroupAndAffiliateValidator(groupAccountC, validatorAccountC)

      await activateAndVote(groupAccountA, userAccount, TWO_HUNDRED_GOLD)
      await activateAndVote(groupAccountB, userAccount, TWO_HUNDRED_ONE_GOLD)
      await activateAndVote(groupAccountC, userAccount, ONE_HUNDRED_ONE_GOLD)
    }, 120000)

    test('Validator groups should be in the correct order', async () => {
      const voteHash = await election.vote(groupAccountA, ONE_HUNDRED_GOLD, { from: userAccount })
      await kit.connection.waitForTransactionReceipt(voteHash)
      const revokeHashes = await election.revoke(userAccount, groupAccountA, TWO_HUNDRED_GOLD, {
        from: userAccount,
      })
      for (const hash of revokeHashes) {
        await kit.connection.waitForTransactionReceipt(hash)
      }
      const groupOrder = await election.findLesserAndGreaterAfterVote(groupAccountA, ZERO_GOLD)
      expect(groupOrder).toEqual({ lesser: NULL_ADDRESS, greater: groupAccountC })
    })
  })
})
