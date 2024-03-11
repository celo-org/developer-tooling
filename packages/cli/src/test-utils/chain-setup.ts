import { ContractKit } from '@celo/contractkit'
import { mineBlocks } from '@celo/dev-utils/lib/ganache-test'
import { addressToPublicKey } from '@celo/utils/lib/signatureUtils'
import BigNumber from 'bignumber.js'
import Web3 from 'web3'

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

const setupValidator = async (kit: ContractKit, validatorAccount: string) => {
  await registerAccountWithLockedGold(kit, validatorAccount)

  const ecdsaPublicKey = await addressToPublicKey(validatorAccount, kit.connection.sign)
  const validators = await kit.contracts.getValidators()

  await validators
    .registerValidator(ecdsaPublicKey, BLS_PUBLIC_KEY, BLS_POP)
    .sendAndWaitForReceipt({
      from: validatorAccount,
    })
}

export const setupGroupAndAffiliateValidator = async (
  kit: ContractKit,
  groupAccount: string,
  validatorAccount: string
) => {
  await setupGroup(kit, groupAccount)
  await setupValidator(kit, validatorAccount)

  const validators = await kit.contracts.getValidators()

  await validators.affiliate(groupAccount).sendAndWaitForReceipt({ from: validatorAccount })

  await (
    await validators.addMember(groupAccount, validatorAccount)
  ).sendAndWaitForReceipt({
    from: groupAccount,
  })
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
  await voteForGroupFrom(kit, fromAddress, groupAddress, amount)

  await mineEpoch(kit)

  const election = await kit.contracts.getElection()

  const txos = await election.activate(fromAddress, false)

  await Promise.all(txos.map((txo) => txo.sendAndWaitForReceipt({ from: fromAddress })))
}

export const mineEpoch = async (kit: ContractKit) => {
  await mineBlocks(100, kit.web3)
}
