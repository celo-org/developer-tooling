import { URL_REGEX } from '@celo/base/lib/io'
import { secp256k1 } from '@noble/curves/secp256k1'
import { getAddress } from 'viem'
import * as t from 'io-ts'
import { either } from 'fp-ts/lib/Either'
import { isValidAddress } from './address'

// Exports moved to @celo/base, forwarding them
// here for backwards compatibility
export { isValidUrl, URL_REGEX } from '@celo/base/lib/io'

export const UrlType = new t.Type<string, string, unknown>(
  'Url',
  t.string.is,
  (input, context) =>
    either.chain(t.string.validate(input, context), (stringValue) =>
      URL_REGEX.test(stringValue)
        ? t.success(stringValue)
        : t.failure(stringValue, context, 'is not a valid url')
    ),
  String
)

export const JSONStringType = new t.Type<string, string, unknown>(
  'JSONString',
  t.string.is,
  (input, context) =>
    either.chain(t.string.validate(input, context), (stringValue) => {
      try {
        JSON.parse(stringValue)
        return t.success(stringValue)
      } catch (error) {
        return t.failure(stringValue, context, 'can not be parsed as JSON')
      }
    }),
  String
)

export const AddressType = new t.Type<string, string, unknown>(
  'Address',
  t.string.is,
  (input, context) =>
    either.chain(t.string.validate(input, context), (stringValue) =>
      isValidAddress(stringValue)
        ? t.success(getAddress(stringValue))
        : t.failure(stringValue, context, 'is not a valid address')
    ),
  String
)

export const PublicKeyType = new t.Type<string, string, unknown>(
  'Public Key',
  t.string.is,
  (input, context) =>
    either.chain(t.string.validate(input, context), (stringValue) => {
      if (!stringValue.startsWith('0x')) {
        return t.failure(stringValue, context, 'is not a valid public key')
      }
      // Accept both 64-byte raw (128 hex chars) and 65-byte uncompressed (130 hex chars with 04 prefix)
      let hexKey = stringValue.slice(2)
      if (hexKey.length === 128) {
        hexKey = '04' + hexKey
      }
      try {
        secp256k1.ProjectivePoint.fromHex(hexKey)
        return t.success(stringValue)
      } catch {
        return t.failure(stringValue, context, 'is not a valid public key')
      }
    }),
  String
)

export const SignatureType = t.string
export const SaltType = t.string

export type Signature = t.TypeOf<typeof SignatureType>
export type Address = t.TypeOf<typeof AddressType>
