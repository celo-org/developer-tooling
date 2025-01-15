import { StrongAddress } from '@celo/base'
import { isCel2 } from '@celo/connect'
import { ContractKit, StableToken } from '@celo/contractkit'
import {
  DEFAULT_OWNER_ADDRESS,
  impersonateAccount,
  STABLES_ADDRESS,
  stopImpersonatingAccount,
  withImpersonatedAccount,
} from '@celo/dev-utils/lib/anvil-test'
import { mineBlocks, timeTravel } from '@celo/dev-utils/lib/ganache-test'
import { addressToPublicKey } from '@celo/utils/lib/signatureUtils'
import BigNumber from 'bignumber.js'
import Web3 from 'web3'
import Switch from '../commands/epochs/switch'
import { testLocallyWithWeb3Node } from './cliUtils'

export const GANACHE_EPOCH_SIZE = 100
export const MIN_LOCKED_CELO_VALUE = new BigNumber(Web3.utils.toWei('10000', 'ether')) // 10k CELO

const GROUP_COMMISION = new BigNumber(0.1)
const BLS_PUBLIC_KEY =
  '0x4fa3f67fc913878b068d1fa1cdddc54913d3bf988dbe5a36a20fa888f20d4894c408a6773f3d7bde11154f2a3076b700d345a42fd25a0e5e83f4db5586ac7979ac2053cd95d8f2efd3e959571ceccaa743e02cf4be3f5d7aaddb0b06fc9aff00'
const BLS_POP =
  '0xcdb77255037eb68897cd487fdd85388cbda448f617f874449d4b11588b0b7ad8ddc20d9bb450b513bb35664ea3923900'

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

  await (
    await validators.registerValidatorGroup(groupCommission)
  ).sendAndWaitForReceipt({
    from: groupAccount,
  })
}

export const setupValidator = async (kit: ContractKit, validatorAccount: string) => {
  await registerAccountWithLockedGold(kit, validatorAccount)

  const ecdsaPublicKey = await addressToPublicKey(validatorAccount, kit.connection.sign)
  const validators = await kit.contracts.getValidators()

  if (!(await isCel2(kit.web3))) {
    await validators
      .registerValidator(ecdsaPublicKey, BLS_PUBLIC_KEY, BLS_POP)
      .sendAndWaitForReceipt({
        from: validatorAccount,
      })

    return
  }

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

  if (!(await isCel2(kit.web3))) {
    await mineEpoch(kit)
  } else {
    await testLocallyWithWeb3Node(Switch, ['--from', accounts[0]], kit.web3)
  }

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

  await (
    await validators.addMember(groupAccount, validatorAccount)
  ).sendAndWaitForReceipt({
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
  await (
    await epochManagerWrapper.finishNextEpochProcessTx()
  ).sendAndWaitForReceipt({ from: sender })

  for (const validatorGroup of validatorGroups) {
    // @ts-expect-error we need to call the method directly as it's not exposed (and no need to) via the wrapper
    const pendingVotesForGroup = new BigNumber(
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
