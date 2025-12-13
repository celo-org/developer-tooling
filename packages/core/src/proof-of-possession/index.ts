import {
  Address,
  encodePacked,
  Hex,
  isAddress,
  keccak256,
  recoverAddress,
  parseSignature as viemParseSignature,
  serializeSignature as viemSerializeSignature,
} from 'viem'

export const generateProofOfPossessionHash = (address: Address): Hex => {
  // Exactly matches web3.utils.soliditySha3({ type: 'address', value: address })
  return keccak256(encodePacked(['address'], [address]))
}

/**
 * Parse and validate a signature for proof of possession
 * @param messageHash The hash that was signed
 * @param signature The signature to parse
 * @param expectedSigner The expected signer address
 * @returns Parsed signature with v, r, s components
 */
export const parseSignature = async (
  messageHash: Hex,
  signature: Hex,
  expectedSigner: Address
): Promise<{ v: number; r: Hex; s: Hex }> => {
  // Parse signature using viem
  const parsed = viemParseSignature(signature)

  // Convert yParity to v (yParity is 0 or 1, v is 27 or 28)
  const v = parsed.yParity === 0 ? 27 : 28

  // Recover the address to validate
  const recoveredAddress = await recoverAddress({
    hash: messageHash,
    signature: signature,
  })

  // Validate that the recovered address matches expected signer
  if (!isAddress(expectedSigner)) {
    throw new Error(`Invalid signer address: ${expectedSigner}`)
  }

  if (recoveredAddress.toLowerCase() !== expectedSigner.toLowerCase()) {
    throw new Error(
      `Unable to parse signature (expected signer ${expectedSigner}, got ${recoveredAddress})`
    )
  }

  return {
    v,
    r: parsed.r,
    s: parsed.s,
  }
}

/**
 * Serialize a structured signature into hex format
 * @param signature The structured signature with v, r, s components
 * @returns Serialized hex signature
 */
export const serializeSignature = (signature: { v: number; r: string; s: string }): Hex => {
  // Convert v back to yParity for viem (v is 27 or 28, yParity is 0 or 1)
  const yParity = signature.v === 27 ? 0 : 1

  return viemSerializeSignature({
    r: signature.r as Hex,
    s: signature.s as Hex,
    yParity,
  })
}

export const parseProofOfPossession = async (address: Address, signer: Address, signature: Hex) => {
  const hash = generateProofOfPossessionHash(address)
  return parseSignature(hash, signature, signer)
}
