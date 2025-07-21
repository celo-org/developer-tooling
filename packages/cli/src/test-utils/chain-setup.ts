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
import { addressToPublicKey } from '@celo/utils/lib/signatureUtils'
import BigNumber from 'bignumber.js'
import Web3 from 'web3'
import Switch from '../commands/epochs/switch'
import { testLocallyWithWeb3Node } from './cliUtils'

export const MIN_LOCKED_CELO_VALUE = new BigNumber(Web3.utils.toWei('10000', 'ether')) // 10k CELO for the group
export const MIN_PRACTICAL_LOCKED_CELO_VALUE = MIN_LOCKED_CELO_VALUE.plus(Web3.utils.toWei('1', 'ether')) // 10k CELO for the group and 1 for gas

const GROUP_COMMISION = new BigNumber(0.1)

export const registerAccount = async (kit: ContractKit, address: string) => {
  const accounts = await kit.contracts.getAccounts()

  if (!(await accounts.isAccount(address))) {
    await accounts.createAccount().sendAndWaitForReceipt({ from: address })
  }
}

export const registerAccountWithLockedGold = async (
  kit: ContractKit,
  address: string,
  value: string = MIN_LOCKED_CELO_VALUE.toFixed()
) => {
  await registerAccount(kit, address)

  const lockedGold = await kit.contracts.getLockedGold()

  await lockedGold.lock().sendAndWaitForReceipt({ from: address, value })
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

  await (await validators.registerValidatorGroup(groupCommission)).sendAndWaitForReceipt({
    from: groupAccount,
  })
}

export const setupValidator = async (kit: ContractKit, validatorAccount: string) => {
  await registerAccountWithLockedGold(kit, validatorAccount)

  const ecdsaPublicKey = await addressToPublicKey(validatorAccount, kit.connection.sign)
  const validators = await kit.contracts.getValidators()

  await validators.registerValidatorNoBls(ecdsaPublicKey).sendAndWaitForReceipt({
    from: validatorAccount,
  })
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

  await (await election.vote(groupAddress, amount)).sendAndWaitForReceipt({ from: fromAddress })
}

export const voteForGroupFromAndActivateVotes = async (
  kit: ContractKit,
  fromAddress: string,
  groupAddress: string,
  amount: BigNumber
) => {
  const accounts = await kit.web3.eth.getAccounts()
  await voteForGroupFrom(kit, fromAddress, groupAddress, amount)

  await testLocallyWithWeb3Node(Switch, ['--from', accounts[0]], kit.web3)

  const election = await kit.contracts.getElection()

  const txos = await election.activate(fromAddress, false)

  await Promise.all(txos.map((txo) => txo.sendAndWaitForReceipt({ from: fromAddress })))
}

export const mineEpoch = async (kit: ContractKit) => {
  await mineBlocks(100, kit.web3)
}

export const topUpWithToken = async (
  kit: ContractKit,
  stableToken: StableToken,
  account: string,
  amount: BigNumber
) => {
  const token = await kit.contracts.getStableToken(stableToken)

  await impersonateAccount(kit.web3, STABLES_ADDRESS)
  await token.transfer(account, amount.toFixed()).sendAndWaitForReceipt({
    from: STABLES_ADDRESS,
  })
  await stopImpersonatingAccount(kit.web3, STABLES_ADDRESS)
}

// replace the original owner in the devchain, so we can act as the multisig owner
// the transaction needs to be sent by the multisig itself and it needs some funds first
export const changeMultiSigOwner = async (kit: ContractKit, toAccount: StrongAddress) => {
  const governance = await kit.contracts.getGovernance()
  const multisig = await governance.getApproverMultisig()
  await (
    await kit.sendTransaction({
      from: toAccount,
      to: multisig.address,
      value: kit.web3.utils.toWei('1', 'ether'),
    })
  ).waitReceipt()

  await impersonateAccount(kit.web3, multisig.address)

  await multisig
    .replaceOwner(DEFAULT_OWNER_ADDRESS, toAccount)
    .sendAndWaitForReceipt({ from: multisig.address })
  await stopImpersonatingAccount(kit.web3, multisig.address)
}

export async function setupValidatorAndAddToGroup(
  kit: ContractKit,
  validatorAccount: string,
  groupAccount: string
) {
  await setupValidator(kit, validatorAccount)

  const validators = await kit.contracts.getValidators()

  await validators.affiliate(groupAccount).sendAndWaitForReceipt({ from: validatorAccount })

  await (await validators.addMember(groupAccount, validatorAccount)).sendAndWaitForReceipt({
    from: groupAccount,
  })
}
// you MUST call clearMock after using this function!
export async function mockTimeForwardBy(seconds: number, web3: Web3) {
  const now = Date.now()
  await timeTravel(seconds, web3)
  const spy = jest.spyOn(global.Date, 'now').mockImplementation(() => now + seconds * 1000)

  console.warn('mockTimeForwardBy', seconds, 'seconds', 'call clearMock after using this function')
  return spy
}

export const activateAllValidatorGroupsVotes = async (kit: ContractKit) => {
  const [sender] = await kit.web3.eth.getAccounts()
  const validatorsContract = await kit.contracts.getValidators()
  const electionWrapper = await kit.contracts.getElection()
  const epochManagerWrapper = await kit.contracts.getEpochManager()
  const validatorGroups = await validatorsContract.getRegisteredValidatorGroupsAddresses()

  await timeTravel((await epochManagerWrapper.epochDuration()) + 1, kit.web3)

  // Make sure we are in the next epoch to activate the votes
  await epochManagerWrapper.startNextEpochProcess().sendAndWaitForReceipt({ from: sender })
  await (await epochManagerWrapper.finishNextEpochProcessTx()).sendAndWaitForReceipt({
    from: sender,
  })

  for (const validatorGroup of validatorGroups) {
    const pendingVotesForGroup = new BigNumber(
      // @ts-expect-error we need to call the method directly as it's not exposed (and no need to) via the wrapper
      await electionWrapper.contract.methods.getPendingVotesForGroup(validatorGroup).call()
    )

    if (pendingVotesForGroup.gt(0)) {
      await withImpersonatedAccount(
        kit.web3,
        validatorGroup,
        async () => {
          // @ts-expect-error here as well
          await electionWrapper.contract.methods
            .activate(validatorGroup)
            .send({ from: validatorGroup })
        },
        new BigNumber(kit.web3.utils.toWei('1', 'ether'))
      )
    }
  }
}
