import { eqAddress, NULL_ADDRESS } from '@celo/base'
import BigNumber from 'bignumber.js'
import { Address, PublicClient } from 'viem'
import {
  AccountsContract,
  getAccountsContract,
  getEpochManagerContract,
  getValidatorsContract,
  ValidatorsContract,
} from './contracts'
import { bigintToBigNumber } from './utils'

interface UnnamedValidator {
  address: Address
  ecdsaPublicKey: string
  affiliation: string
  score: BigNumber
  signer: Address
  name?: string
}

interface NamedValidator extends UnnamedValidator {
  name: string
}

export async function getElectedValidators(
  client: PublicClient,
  options: { showChanges?: boolean } = {}
) {
  const [validators, epochManager, accountsContract] = await Promise.all([
    getValidatorsContract(client),
    getEpochManagerContract(client),
    getAccountsContract(client),
  ])

  const electedSigners = await epochManager.read.getElectedSigners()

  const electedAccounts = await Promise.all(
    electedSigners.map((signer) => accountsContract.read.signerToAccount([signer]))
  )

  const electedValidators = await Promise.all(
    electedAccounts.map((account, index) =>
      accountToValidator({ account, signer: electedSigners[index], validators })
    )
  )

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
  electedValidatorsWithNames: NamedValidator[],
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
  validator: UnnamedValidator,
  accountsContract: AccountsContract
): Promise<NamedValidator> {
  if (validator.name) {
    return validator as NamedValidator
  }
  const name = await accountsContract.read.getName([validator.address])
  return {
    ...validator,
    name: name || 'Unnamed',
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
      name: 'Unregistered validator',
      address: account,
      ecdsaPublicKey: '',
      affiliation: '',
      score: new BigNumber(0),
      signer: signer,
    }
  } else {
    const [ecdsaPublicKey, _bls, affiliation, score, signer] = await validators.read.getValidator([
      account,
    ])
    return {
      address: account,
      ecdsaPublicKey: ecdsaPublicKey,
      affiliation: affiliation,
      score: bigintToBigNumber(score),
      signer: signer,
    }
  }
}
