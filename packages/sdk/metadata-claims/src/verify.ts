import { eqAddress } from '@celo/base/lib/address'
import { isValidUrl } from '@celo/base/lib/io'
import { resolveTxt } from 'node:dns' // TODO replace with non node specifc package
import { promisify } from 'node:util' // TODO replace with non node specifc package
import { AccountClaim } from './account'
import { Claim, DOMAIN_TXT_HEADER, DomainClaim, serializeClaim } from './claim'
import { verifyKeybaseClaim } from './keybase'
import { IdentityMetadataWrapper } from './metadata'
import { AccountMetadataSignerGetters, ClaimTypes } from './types'

/**
 * Verifies a claim made by an account, i.e. whether a claim can be verified to be correct
 * @param accountMeta AccountMetadataSignerGetters object
 * @param claim The claim to verify
 * @param address The address that is making the claim
 * @returns If valid, returns undefined. If invalid or unable to verify, returns a string with the error
 */
export async function verifyClaim(
  accountMeta: AccountMetadataSignerGetters,
  claim: Claim,
  address: string,
  tries = 3
) {
  switch (claim.type) {
    case ClaimTypes.KEYBASE:
      return verifyKeybaseClaim(accountMeta, claim, address)
    case ClaimTypes.ACCOUNT:
      return verifyAccountClaim(accountMeta, claim, address, tries)
    case ClaimTypes.DOMAIN:
      return verifyDomainRecord(accountMeta, claim, address)
    default:
      break
  }
  return
}

export const verifyAccountClaim = async (
  accountMeta: AccountMetadataSignerGetters,
  claim: AccountClaim,
  address: string,
  tries = 3
) => {
  const metadataURL = await accountMeta.getMetadataURL(claim.address)

  if (!isValidUrl(metadataURL)) {
    return `Metadata URL of ${claim.address} could not be retrieved`
  }

  let metadata: IdentityMetadataWrapper
  try {
    metadata = await IdentityMetadataWrapper.fetchFromURL(accountMeta, metadataURL, tries)
  } catch (error: any) {
    return `Metadata could not be fetched for ${
      claim.address
    } at ${metadataURL}: ${error.toString()}`
  }

  const accountClaims = metadata.filterClaims(ClaimTypes.ACCOUNT)

  if (accountClaims.find((x) => eqAddress(x.address, address)) === undefined) {
    return `${claim.address} did not claim ${address}`
  }

  return
}

type dnsResolverFunction = (
  hostname: string,
  callback: (err: NodeJS.ErrnoException, addresses: string[][]) => void
) => void

/**
 * It verifies if a DNS domain includes in the TXT records an entry with name
 * `celo-site-verification` and a valid signature in base64
 */
export const verifyDomainRecord = async (
  accountMeta: AccountMetadataSignerGetters,
  claim: DomainClaim,
  address: string,
  dnsResolver: dnsResolverFunction = resolveTxt as any
) => {
  try {
    const getRecords = promisify(dnsResolver)
    const domainRecords = await getRecords(claim.domain)
    for (const record of domainRecords) {
      for (const entry of record) {
        if (entry.startsWith(DOMAIN_TXT_HEADER)) {
          const signatureBase64 = entry.substring(DOMAIN_TXT_HEADER.length + 1)
          const signature = Buffer.from(signatureBase64, 'base64').toString('binary')
          if (
            await IdentityMetadataWrapper.verifySignerForAddress(
              accountMeta,
              serializeClaim(claim),
              signature,
              address
            )
          ) {
            return
          }
        }
      }
    }
    return `Unable to verify domain claim with address ${address}`
  } catch (error: any) {
    return `Unable to fetch domain TXT records: ${error.toString()}`
  }
}
