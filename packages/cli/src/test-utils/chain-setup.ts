import { StrongAddress } from '@celo/base'
import { ContractKit, StableToken } from '@celo/contractkit'
import {
  DEFAULT_OWNER_ADDRESS,
  impersonateAccount,
  STABLES_ADDRESS,
  stopImpersonatingAccount,
  withImpersonatedAccount,
} from '@celo/dev-utils/anvil-test'
import { mineBlocks, timeTravel } from '@celo/dev-utils/ganache-test'
import { Provider } from '@celo/connect'
import { addressToPublicKey } from '@celo/utils/lib/signatureUtils'
import BigNumber from 'bignumber.js'
import { decodeFunctionResult, encodeFunctionData, parseEther } from 'viem'
import Switch from '../commands/epochs/switch'
import { testLocallyWithNode } from './cliUtils'

export const MIN_LOCKED_CELO_VALUE = new BigNumber(parseEther('10000').toString()) // 10k CELO for the group
export const MIN_PRACTICAL_LOCKED_CELO_VALUE = MIN_LOCKED_CELO_VALUE.plus(
  parseEther('1').toString()
) // 10k CELO for the group and 1 for gas

const GROUP_COMMISION = new BigNumber(0.1)

export const registerAccount = async (kit: ContractKit, address: string) => {
  const accounts = await kit.contracts.getAccounts()

  if (!(await accounts.isAccount(address))) {
    const hash = await accounts.createAccount({ from: address })
    await kit.connection.waitForTransactionReceipt(hash)
  }
}

export const registerAccountWithLockedGold = async (
  kit: ContractKit,
  address: string,
  value: string = MIN_LOCKED_CELO_VALUE.toFixed()
) => {
  await registerAccount(kit, address)

  const lockedGold = await kit.contracts.getLockedGold()

  const hash = await lockedGold.lock({ from: address, value })
  await kit.connection.waitForTransactionReceipt(hash)
}

export const setupGroup = async (
  kit: ContractKit,
  groupAccount: string,
  groupCommission = GROUP_COMMISION
) => {
  await registerAccountWithLockedGold(
    kit,
    groupAccount,
    new BigNumber(MIN_LOCKED_CELO_VALUE).toFixed()
  )

  const validators = await kit.contracts.getValidators()

  const hash = await validators.registerValidatorGroup(groupCommission, {
    from: groupAccount,
  })
  await kit.connection.waitForTransactionReceipt(hash)
}

export const setupValidator = async (kit: ContractKit, validatorAccount: string) => {
  await registerAccountWithLockedGold(kit, validatorAccount)

  const ecdsaPublicKey = await addressToPublicKey(validatorAccount, kit.connection.sign)
  const validators = await kit.contracts.getValidators()

  const hash = await validators.registerValidatorNoBls(ecdsaPublicKey, {
    from: validatorAccount,
  })
  await kit.connection.waitForTransactionReceipt(hash)
}

export const setupGroupAndAffiliateValidator = async (
  kit: ContractKit,
  groupAccount: string,
  validatorAccount: string
) => {
  await setupGroup(kit, groupAccount)
  await setupValidatorAndAddToGroup(kit, validatorAccount, groupAccount)
}

export const voteForGroupFrom = async (
  kit: ContractKit,
  fromAddress: string,
  groupAddress: string,
  amount: BigNumber
) => {
  const election = await kit.contracts.getElection()

  const hash = await election.vote(groupAddress, amount, { from: fromAddress })
  await kit.connection.waitForTransactionReceipt(hash)
}

export const voteForGroupFromAndActivateVotes = async (
  kit: ContractKit,
  fromAddress: string,
  groupAddress: string,
  amount: BigNumber
) => {
  const accounts = await kit.connection.getAccounts()
  await voteForGroupFrom(kit, fromAddress, groupAddress, amount)
  await timeTravel(24 * 60 * 60, kit.connection.currentProvider) // wait for 24 hours to
  await testLocallyWithNode(Switch, ['--from', accounts[0]], kit.connection.currentProvider)

  const election = await kit.contracts.getElection()

  // activate returns hashes directly (transactions already sent)
  const hashes = await election.activate(fromAddress, false, { from: fromAddress })
  for (const hash of hashes) {
    await kit.connection.waitForTransactionReceipt(hash)
  }
}

export const mineEpoch = async (kit: ContractKit) => {
  await mineBlocks(100, kit.connection.currentProvider)
}

export const topUpWithToken = async (
  kit: ContractKit,
  stableToken: StableToken,
  account: string,
  amount: BigNumber
) => {
  const token = await kit.contracts.getStableToken(stableToken)

  await impersonateAccount(kit.connection.currentProvider, STABLES_ADDRESS)
  const hash = await token.transfer(account, amount.toFixed(), {
    from: STABLES_ADDRESS,
  })
  await kit.connection.waitForTransactionReceipt(hash)
  await stopImpersonatingAccount(kit.connection.currentProvider, STABLES_ADDRESS)
}

// replace the original owner in the devchain, so we can act as the multisig owner
// the transaction needs to be sent by the multisig itself and it needs some funds first
export const changeMultiSigOwner = async (kit: ContractKit, toAccount: StrongAddress) => {
  const governance = await kit.contracts.getGovernance()
  const multisig = await governance.getApproverMultisig()
  const hash = await kit.sendTransaction({
    from: toAccount,
    to: multisig.address,
    value: parseEther('1').toString(),
  })
  await kit.connection.waitForTransactionReceipt(hash)

  await impersonateAccount(kit.connection.currentProvider, multisig.address)

  const replaceHash = await multisig.replaceOwner(DEFAULT_OWNER_ADDRESS, toAccount, {
    from: multisig.address,
  })
  await kit.connection.waitForTransactionReceipt(replaceHash)
  await stopImpersonatingAccount(kit.connection.currentProvider, multisig.address)
}

export async function setupValidatorAndAddToGroup(
  kit: ContractKit,
  validatorAccount: string,
  groupAccount: string
) {
  await setupValidator(kit, validatorAccount)

  const validators = await kit.contracts.getValidators()

  const affiliateHash = await validators.affiliate(groupAccount, { from: validatorAccount })
  await kit.connection.waitForTransactionReceipt(affiliateHash)

  const addMemberHash = await validators.addMember(groupAccount, validatorAccount, {
    from: groupAccount,
  })
  await kit.connection.waitForTransactionReceipt(addMemberHash)
}
// you MUST call clearMock after using this function!
export async function mockTimeForwardBy(seconds: number, provider: Provider) {
  const now = Date.now()
  await timeTravel(seconds, provider)
  const spy = jest.spyOn(global.Date, 'now').mockImplementation(() => now + seconds * 1000)

  console.warn('mockTimeForwardBy', seconds, 'seconds', 'call clearMock after using this function')
  return spy
}

export const activateAllValidatorGroupsVotes = async (kit: ContractKit) => {
  const [sender] = await kit.connection.getAccounts()
  const validatorsContract = await kit.contracts.getValidators()
  const electionWrapper = await kit.contracts.getElection()
  const epochManagerWrapper = await kit.contracts.getEpochManager()
  const validatorGroups = await validatorsContract.getRegisteredValidatorGroupsAddresses()

  await timeTravel((await epochManagerWrapper.epochDuration()) + 1, kit.connection.currentProvider)

  // Make sure we are in the next epoch to activate the votes
  const startHash = await epochManagerWrapper.startNextEpochProcess({ from: sender })
  await kit.connection.waitForTransactionReceipt(startHash)
  const finishHash = await epochManagerWrapper.finishNextEpochProcessTx({ from: sender })
  await kit.connection.waitForTransactionReceipt(finishHash)

  for (const validatorGroup of validatorGroups) {
    const getPendingCallData = encodeFunctionData({
      // @ts-expect-error we need to call the method directly as it's not exposed via the wrapper
      abi: electionWrapper.contract.abi,
      functionName: 'getPendingVotesForGroup',
      args: [validatorGroup as `0x${string}`],
    })
    const { data: getPendingResultData } = await kit.connection.viemClient.call({
      // @ts-expect-error we need to call the method directly as it's not exposed via the wrapper
      to: electionWrapper.contract.address,
      data: getPendingCallData,
    })
    const pendingVotesRaw = decodeFunctionResult({
      // @ts-expect-error we need to call the method directly as it's not exposed via the wrapper
      abi: electionWrapper.contract.abi,
      functionName: 'getPendingVotesForGroup',
      data: getPendingResultData!,
    })
    const pendingVotesForGroup = new BigNumber(String(pendingVotesRaw))

    if (pendingVotesForGroup.gt(0)) {
      await withImpersonatedAccount(
        kit.connection.currentProvider,
        validatorGroup,
        async () => {
          const activateData = encodeFunctionData({
            // @ts-expect-error here as well
            abi: electionWrapper.contract.abi,
            functionName: 'activate',
            args: [validatorGroup as `0x${string}`],
          })
          const hash = await kit.connection.sendTransaction({
            // @ts-expect-error here as well
            to: electionWrapper.contract.address,
            data: activateData,
            from: validatorGroup,
          })
          await kit.connection.waitForTransactionReceipt(hash)
        },
        new BigNumber(parseEther('1').toString())
      )
    }
  }
}
