import * as t from 'io-ts'

import type { Address, StrongAddress } from '@celo/base/lib/address'

export const SignatureType = t.string
export const TimestampType = t.number

/** @internal */
export const now = () => Math.round(new Date().getTime() / 1000)

export enum ClaimTypes {
  ACCOUNT = 'ACCOUNT',
  DOMAIN = 'DOMAIN',
  RPC_URL = 'RPC_URL',
  KEYBASE = 'KEYBASE',
  NAME = 'NAME',
  PROFILE_PICTURE = 'PROFILE_PICTURE',
  STORAGE = 'STORAGE',
  TWITTER = 'TWITTER',
}

export const VERIFIABLE_CLAIM_TYPES = [ClaimTypes.KEYBASE, ClaimTypes.ACCOUNT, ClaimTypes.DOMAIN]
export const SINGULAR_CLAIM_TYPES = [ClaimTypes.NAME]

export type AccountSignerGetters = {
  isAccount: (address: Address) => Promise<boolean>
  getVoteSigner: (address: Address) => Promise<StrongAddress>
  getValidatorSigner: (address: Address) => Promise<StrongAddress>
  getAttestationSigner: (address: Address) => Promise<StrongAddress>
}

export type AccountMetadataSignerGetters = {
  getMetadataURL: (address: string) => Promise<string>
} & AccountSignerGetters
