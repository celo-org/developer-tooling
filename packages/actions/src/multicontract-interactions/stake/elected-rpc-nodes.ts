import { eqAddress, NULL_ADDRESS } from '@celo/base/lib/address.js'
import type { Address } from 'viem'
import { PublicCeloClient } from '../../client.js'
import { AccountsContract, getAccountsContract } from '../../contracts/accounts.js'
import { getEpochManagerContract } from '../../contracts/epoch-manager.js'
import { getScoreManagerContract } from '../../contracts/score-manager.js'
import { getValidatorsContract, ValidatorsContract } from '../../contracts/validators.js'

interface UnnamedRpcNode {
  address: Address
  ecdsaPublicKey: string
  affiliation: string
  score: bigint
  signer: Address
  name?: string
}

export interface ElectedRpcNode extends UnnamedRpcNode {
  name: string
}

/**
 * Retrieves the list of currently elected RPC nodes (validators) along with their associated metadata.
 *
 * This function fetches the elected validator signers from the epoch manager contract,
 * maps them to their corresponding accounts, and then decorates each validator with additional
 * information such as their name. Optionally, it can also include information about changes
 * in validator status if the `showChanges` option is enabled.
 *
 * @param client - The public client instance used to interact with the blockchain.
 * @param options - Optional settings for the function.
 * @param options.showChanges - If true, includes information about changes in validator status.
 * @returns A promise that resolves to an array of elected validator objects, each decorated with additional metadata.
 */
export async function getElectedRpcNodes(
  client: PublicCeloClient,
  options: { showChanges?: boolean } = {}
) {
  const [validators, epochManager, accountsContract, scoreManager] = await Promise.all([
    getValidatorsContract({ public: client }),
    getEpochManagerContract({ public: client }),
    getAccountsContract({ public: client }),
    getScoreManagerContract({ public: client }),
  ])

  const electedSigners = await epochManager.read.getElectedSigners()

  const electedAccounts = await Promise.all(
    electedSigners.map((signer) => accountsContract.read.signerToAccount([signer]))
  )

  const electedValidatorsWithOutScores = await Promise.all(
    electedAccounts.map((account, index) =>
      accountToValidator({ account, signer: electedSigners[index], validators })
    )
  )
  const scores = await Promise.all(
    electedValidatorsWithOutScores.map((validator) =>
      scoreManager.read.getValidatorScore([validator.address])
    )
  )

  const electedValidators = electedValidatorsWithOutScores.map((validator, index) => {
    return {
      ...validator,
      score: scores[index],
    }
  })

  const electedValidatorsWithNames = await Promise.all(
    electedValidators.map(async (validator) => decorateWithName(validator, accountsContract))
  )

  if (options.showChanges) {
    const electedValidatorsWithChanges = decorateWithChangedStatus(
      electedValidatorsWithNames,
      electedSigners
    )
    return electedValidatorsWithChanges
  }
  return electedValidatorsWithNames
}

function decorateWithChangedStatus(
  electedValidatorsWithNames: ElectedRpcNode[],
  electedSigners: readonly Address[]
) {
  return electedValidatorsWithNames.map((validator, index) => {
    const signer = electedSigners[index]
    return {
      ...validator,
      currentSigner: signer,
      changed: eqAddress(signer, validator.signer) ? 'no' : 'CHANGING',
    }
  })
}

async function decorateWithName(
  validator: UnnamedRpcNode,
  accountsContract: AccountsContract
): Promise<ElectedRpcNode> {
  if (validator.name) {
    return validator as ElectedRpcNode
  }
  const name = await accountsContract.read.getName([validator.address])
  return {
    ...validator,
    name: name,
  }
}

async function accountToValidator({
  account,
  signer,
  validators,
}: {
  account: Address
  signer: Address
  validators: ValidatorsContract
}) {
  if (eqAddress(account, NULL_ADDRESS) || !(await validators.read.isValidator([account]))) {
    return {
      name: 'Unregistered rpc node',
      address: account,
      ecdsaPublicKey: '',
      affiliation: '',
      score: BigInt(0),
      signer,
    }
  } else {
    const [ecdsaPublicKey, _bls, affiliation, _, signer_] = await validators.read.getValidator([
      account,
    ])
    return {
      address: account,
      ecdsaPublicKey: ecdsaPublicKey,
      affiliation: affiliation,
      signer: signer_,
    }
  }
}
