import { Address, eqAddress } from '@celo/base/lib/address'
import { selectiveRetryAsyncWithBackOff } from '@celo/base/lib/async'
import { Signer } from '@celo/base/lib/signatureUtils'
import { AddressType, SignatureType } from '@celo/utils/lib/io'
import { guessSigner, verifySignature } from '@celo/utils/lib/signatureUtils'
import fetch from 'cross-fetch'
import { isLeft } from 'fp-ts/lib/Either'
import * as t from 'io-ts'
import { PathReporter } from 'io-ts/lib/PathReporter'
import { Claim, ClaimPayload, ClaimType, hashOfClaims, isOfType } from './claim'
import {
  AccountMetadataSignerGetters,
  AccountSignerGetters,
  ClaimTypes,
  SINGULAR_CLAIM_TYPES,
} from './types'

export { ClaimTypes } from './types'

type KitOrAccountsWrapper = AccountMetadataSignerGetters

const MetaType = t.type({
  address: AddressType,
  signature: SignatureType,
})

export const IdentityMetadataType = t.type({
  claims: t.array(ClaimType),
  meta: MetaType,
})

export type IdentityMetadata = t.TypeOf<typeof IdentityMetadataType>

export class IdentityMetadataWrapper {
  data: IdentityMetadata

  static fromEmpty(address: Address) {
    return new IdentityMetadataWrapper({
      claims: [],
      meta: {
        address,
        signature: '',
      },
    })
  }

  static async fetchFromURL(
    contractKitOrAccountsWrapper: KitOrAccountsWrapper,
    url: string,
    tries = 3
  ) {
    return selectiveRetryAsyncWithBackOff(
      async () => {
        const resp = await fetch(url)
        if (!resp.ok) {
          throw new Error(`Request failed with status ${resp.status}`)
        }
        return this.fromRawString(contractKitOrAccountsWrapper, await resp.text())
      },
      tries,
      ['Request failed with status 404'],
      []
    )
  }

  static fromFile(contractKitOrAccountsWrapper: KitOrAccountsWrapper, path: string) {
    let readFileSync
    try {
      const fs = require('fs')
      readFileSync = fs.readFileSync
    } catch {
      console.error('cant read from file in browser or environment without native fs module')
    }
    return this.fromRawString(contractKitOrAccountsWrapper, readFileSync(path, 'utf-8'))
  }

  static async verifySigner(
    contractKitOrAccountsWrapper: KitOrAccountsWrapper,
    hash: any,
    signature: any,
    metadata: any
  ) {
    return this.verifySignerForAddress(
      contractKitOrAccountsWrapper,
      hash,
      signature,
      metadata.address
    )
  }

  static async verifySignerForAddress(
    contractKitOrAccountsWrapper: KitOrAccountsWrapper,
    hash: any,
    signature: any,
    address: Address
  ) {
    // First try to verify on account's address
    if (!verifySignature(hash, signature, address)) {
      const accounts = await getAccounts(contractKitOrAccountsWrapper)
      // If this fails, signature may still be one of `address`' signers
      if (await accounts.isAccount(address)) {
        const signers = await Promise.all([
          accounts.getVoteSigner(address),
          accounts.getValidatorSigner(address),
          accounts.getAttestationSigner(address),
        ])
        return signers.some((signer) => verifySignature(hash, signature, signer))
      }
      return false
    }
    return true
  }

  static async fromRawString(contractKitOrAccountsWrapper: KitOrAccountsWrapper, rawData: string) {
    const data = JSON.parse(rawData)

    const validatedData = IdentityMetadataType.decode(data)

    if (isLeft(validatedData)) {
      // TODO: We could probably return a more useful error in the future
      throw new Error(PathReporter.report(validatedData).join(', '))
    }

    // Verify signature on the data
    const claims = validatedData.right.claims
    const hash = hashOfClaims(claims)
    if (
      claims.length > 0 &&
      !(await this.verifySigner(
        contractKitOrAccountsWrapper,
        hash,
        validatedData.right.meta.signature,
        validatedData.right.meta
      ))
    ) {
      throw new Error(
        `Signature could not be validated. Guessing signer: ${guessSigner(
          hash,
          validatedData.right.meta.signature
        )}`
      )
    }

    const res = new IdentityMetadataWrapper(validatedData.right)

    // Verify that singular claim types appear at most once
    SINGULAR_CLAIM_TYPES.forEach((claimType) => {
      const results = res.filterClaims(claimType)
      if (results.length > 1) {
        throw new Error(`Found ${results.length} claims of type ${claimType}, should be at most 1`)
      }
    })

    return res
  }

  constructor(data: IdentityMetadata) {
    this.data = data
  }

  get claims() {
    return this.data.claims
  }

  hashOfClaims() {
    return hashOfClaims(this.data.claims)
  }

  toString() {
    return JSON.stringify({
      claims: this.data.claims,
      meta: this.data.meta,
    })
  }
  /*
   * @param claim the claim to add
   * @param signer the signer to use to sign the claim
   * @returns the claim that was added
   * @dev - the claim is appended to the claims array, for some claim types an existing claim of same will be removed
   */
  async addClaim(claim: Claim, signer: Signer) {
    switch (claim.type) {
      case ClaimTypes.ACCOUNT:
        if (eqAddress(claim.address, this.data.meta.address)) {
          throw new Error("Can't claim self")
        }
        break
      case ClaimTypes.DOMAIN: {
        const existingClaims = this.data.claims.filter((el: any) => el.domain === claim.domain)
        if (existingClaims.length > 0) {
          return existingClaims[0]
        }
        break
      }
      case ClaimTypes.RPC_URL: {
        const existingIndex = this.data.claims.findIndex((el: any) => el.rpcUrl === claim.rpcUrl)
        if (existingIndex !== -1) {
          // remove the existing claim so that there are no duplicates for the same url
          // it will be pushed back in later in this function
          // that will move it to the end
          // this allows case where a rpc url is claimed, then another but we want to go back to the former.
          // the reason to keep allowing multiple rpc urls to be claimed is that technically
          // validators could use these as fall back urls.
          this.data.claims.splice(existingIndex, 1)
        }
        break
      }
      case ClaimTypes.KEYBASE: {
        const existingClaims = this.data.claims.filter((el: any) => el.username === claim.username)
        if (existingClaims.length > 0) {
          return existingClaims[0]
        }
        break
      }
      case ClaimTypes.ATTESTATION_SERVICE_URL: {
        throw new Error('ATTESTATION_SERVICE_URL claims are not supported')
      }
      default:
        break
    }

    if (SINGULAR_CLAIM_TYPES.includes(claim.type)) {
      const index = this.data.claims.findIndex(isOfType(claim.type))
      if (index !== -1) {
        this.data.claims.splice(index, 1)
      }
    }

    this.data.claims.push(claim)
    this.data.meta.signature = await signer.sign(this.hashOfClaims())
    return claim
  }

  /*
   * @param type the type of claim to find
   * @returns the most recent claim of the type
   */
  findClaim<K extends ClaimTypes>(type: K): ClaimPayload<K> | undefined {
    return this.filterClaims(type).at(-1)
  }

  filterClaims<K extends ClaimTypes>(type: K): ClaimPayload<K>[] {
    return this.data.claims.filter(isOfType(type))
  }
}

// at first these functions required a `kit` but thats a bit heavy
// as all that is used are functions on the accounts contract so allow just those functions to be passed
async function getAccounts(
  contractKitOrAccountsWrapper: KitOrAccountsWrapper
): Promise<AccountSignerGetters> {
  if (
    'getVoteSigner' in contractKitOrAccountsWrapper &&
    'isAccount' in contractKitOrAccountsWrapper &&
    'getValidatorSigner' in contractKitOrAccountsWrapper &&
    'getAttestationSigner' in contractKitOrAccountsWrapper
  ) {
    return contractKitOrAccountsWrapper
  }
  throw new Error(
    `Must pass object with the required functions: getVoteSigner, isAccount, getValidatorSigner, getAttestationSigner. Received ${JSON.stringify(
      contractKitOrAccountsWrapper
    )}`
  )
}
