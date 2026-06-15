import { Connection } from '@celo/connect'
import { parseSignature } from '@celo/utils/lib/signatureUtils'
import type { SolidityValue } from '@celo/utils/lib/solidity'

export const getParsedSignatureOfAddress = async (
  sha3: (...args: SolidityValue[]) => string | null,
  sign: Connection['sign'],
  address: string,
  signer: string
) => {
  const addressHash = sha3({ type: 'address', value: address })!
  const signature = await sign(addressHash, signer)
  return parseSignature(addressHash, signature, signer)
}
