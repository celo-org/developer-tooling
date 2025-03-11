import { UrlType } from '@celo/utils/lib/io'
import { hashMessage } from '@celo/utils/lib/signatureUtils'
import * as t from 'io-ts'
import { AccountClaim, AccountClaimType } from './account'
import { ClaimTypes, now, SignatureType, TimestampType } from './types'

export const KeybaseClaimType = t.type({
  type: t.literal(ClaimTypes.KEYBASE),
  timestamp: TimestampType,
  // TODO: Validate compliant username before just interpolating
  username: t.string,
})
export type KeybaseClaim = t.TypeOf<typeof KeybaseClaimType>

const DomainClaimType = t.type({
  type: t.literal(ClaimTypes.DOMAIN),
  timestamp: TimestampType,
  domain: t.string,
})

const RpcUrlClaimType = t.type({
  type: t.literal(ClaimTypes.RPC_URL),
  timestamp: TimestampType,
  rpcUrl: t.string,
})

const NameClaimType = t.type({
  type: t.literal(ClaimTypes.NAME),
  timestamp: TimestampType,
  name: t.string,
})

const StorageClaimType = t.type({
  type: t.literal(ClaimTypes.STORAGE),
  timestamp: TimestampType,
  address: t.string,
  filteredDataPaths: t.string,
})

/**
 * @deprecated Not used anymore, here only for backwards compatibility with old metadata files
 */
const AttestationServiceUrlClaimType = t.type({
  type: t.literal(ClaimTypes.ATTESTATION_SERVICE_URL),
  timestamp: TimestampType,
  url: UrlType,
})

export const ClaimType = t.union([
  AccountClaimType,
  DomainClaimType,
  RpcUrlClaimType,
  KeybaseClaimType,
  NameClaimType,
  StorageClaimType,
  AttestationServiceUrlClaimType,
])

export const SignedClaimType = t.type({
  claim: ClaimType,
  signature: SignatureType,
})

export const DOMAIN_TXT_HEADER = 'celo-site-verification'
export type DomainClaim = t.TypeOf<typeof DomainClaimType>
export type RpcUrlClaim = t.TypeOf<typeof RpcUrlClaimType>
export type NameClaim = t.TypeOf<typeof NameClaimType>
export type StorageClaim = t.TypeOf<typeof StorageClaimType>

/**
 * @deprecated Not used anymore, here only for backwards compatibility with old metadata files
 */
type AttestationServiceUrlClaim = t.TypeOf<typeof AttestationServiceUrlClaimType>

export type Claim =
  | DomainClaim
  | RpcUrlClaim
  | KeybaseClaim
  | NameClaim
  | AccountClaim
  | StorageClaim
  | AttestationServiceUrlClaim

export type ClaimPayload<K extends ClaimTypes> = K extends typeof ClaimTypes.DOMAIN
  ? DomainClaim
  : K extends typeof ClaimTypes.ATTESTATION_SERVICE_URL
  ? AttestationServiceUrlClaim
  : K extends typeof ClaimTypes.RPC_URL
  ? RpcUrlClaim
  : K extends typeof ClaimTypes.NAME
  ? NameClaim
  : K extends typeof ClaimTypes.KEYBASE
  ? KeybaseClaim
  : K extends typeof ClaimTypes.ACCOUNT
  ? AccountClaim
  : StorageClaim

/** @internal */
export const isOfType =
  <K extends ClaimTypes>(type: K) =>
  (data: Claim): data is ClaimPayload<K> =>
    data.type === type

export function hashOfClaim(claim: Claim) {
  return hashMessage(serializeClaim(claim))
}

export function hashOfClaims(claims: Claim[]) {
  const hashes = claims.map(hashOfClaim)
  return hashMessage(hashes.join(''))
}

export function serializeClaim(claim: Claim) {
  return JSON.stringify(claim)
}

export const createNameClaim = (name: string): NameClaim => ({
  name,
  timestamp: now(),
  type: ClaimTypes.NAME,
})

export const createDomainClaim = (domain: string): DomainClaim => ({
  domain,
  timestamp: now(),
  type: ClaimTypes.DOMAIN,
})

export const createRpcUrlClaim = (rpcUrl: string): RpcUrlClaim => ({
  rpcUrl,
  timestamp: now(),
  type: ClaimTypes.RPC_URL,
})

export const createStorageClaim = (storageURL: string): StorageClaim => ({
  address: storageURL,
  timestamp: now(),
  type: ClaimTypes.STORAGE,
  filteredDataPaths: '.*',
})
