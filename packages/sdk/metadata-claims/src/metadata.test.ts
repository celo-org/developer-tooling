import { newKitFromWeb3 } from '@celo/contractkit'
import { testWithAnvilL2 } from '@celo/dev-utils/lib/anvil-test'
import { ACCOUNT_ADDRESSES } from '@celo/dev-utils/lib/test-accounts'
import { Address } from '@celo/utils/lib/address'
import { NativeSigner } from '@celo/utils/lib/signatureUtils'
import { Claim, createNameClaim, createRpcUrlClaim } from './claim'
import { ClaimTypes, IdentityMetadataWrapper } from './metadata'
import { now } from './types'

testWithAnvilL2('Metadata', (web3) => {
  const kit = newKitFromWeb3(web3)
  const address = ACCOUNT_ADDRESSES[0]
  const otherAddress = ACCOUNT_ADDRESSES[1]

  test('correctly recovers the claims when signed by the account', async () => {
    const name = 'Celo'
    const metadata = IdentityMetadataWrapper.fromEmpty(address)
    await metadata.addClaim(createNameClaim(name), NativeSigner(kit.connection.sign, address))
    const serializedMetadata = metadata.toString()
    const parsedMetadata = await IdentityMetadataWrapper.fromRawString(
      await kit.contracts.getAccounts(),
      serializedMetadata
    )
    const nameClaim = parsedMetadata.findClaim(ClaimTypes.NAME)

    expect(nameClaim).not.toBeUndefined()
    expect(nameClaim!.name).toEqual(name)
  })

  test("correctly recovers the claims when the metadata is signed by any of the account's authorized signers", async () => {
    const validator = await kit.contracts.getValidators()
    const name = 'Celo'
    const voteMetadata = IdentityMetadataWrapper.fromEmpty(address)
    const validatorMetadata = IdentityMetadataWrapper.fromEmpty(address)
    const attestationMetadata = IdentityMetadataWrapper.fromEmpty(address)
    const accounts = await kit.contracts.getAccounts()
    const voteSigner = ACCOUNT_ADDRESSES[2]
    const validatorSigner = ACCOUNT_ADDRESSES[3]
    const attestationSigner = ACCOUNT_ADDRESSES[4]
    await accounts.createAccount().send({ from: address })
    const testSigner = async (
      signer: Address,
      action: string,
      metadata: IdentityMetadataWrapper
    ) => {
      const pop = await accounts.generateProofOfKeyPossession(address, signer)
      if (action === 'vote') {
        await (
          await accounts.authorizeVoteSigner(signer, pop)
        ).sendAndWaitForReceipt({ from: address, gas: 13000000 })
      } else if (action === 'validator') {
        await (
          await accounts.authorizeValidatorSigner(signer, pop, validator)
        ).sendAndWaitForReceipt({
          from: address,
          gas: 13000000,
        })
      } else if (action === 'attestation') {
        await (
          await accounts.authorizeAttestationSigner(signer, pop)
        ).sendAndWaitForReceipt({ from: address, gas: 13000000 })
      }
      await metadata.addClaim(createNameClaim(name), NativeSigner(kit.connection.sign, signer))
      const serializedMetadata = metadata.toString()
      const parsedMetadata = await IdentityMetadataWrapper.fromRawString(
        await kit.contracts.getAccounts(),
        serializedMetadata
      )
      const nameClaim = parsedMetadata.findClaim(ClaimTypes.NAME)

      expect(nameClaim).not.toBeUndefined()
      expect(nameClaim!.name).toEqual(name)
    }
    await testSigner(voteSigner, 'vote', voteMetadata)
    await testSigner(validatorSigner, 'validator', validatorMetadata)
    await testSigner(attestationSigner, 'attestation', attestationMetadata)
  })

  test('should reject metadata that contains a signature by a different account', async () => {
    const name = 'Celo'
    const metadata = IdentityMetadataWrapper.fromEmpty(address)
    await metadata.addClaim(createNameClaim(name), NativeSigner(kit.connection.sign, otherAddress))
    const serializedMetadata = metadata.toString()
    try {
      await IdentityMetadataWrapper.fromRawString(
        await kit.contracts.getAccounts(),
        serializedMetadata
      )
    } catch (e: any) {
      expect(e.toString()).toContain('Signature could not be validated')
    }
  })

  it('throws an error while trying to add a ATTESTATION_SERVICE_URL claim ', async () => {
    const metadata = IdentityMetadataWrapper.fromEmpty(address)

    const claim = {
      url: 'https://example.com/',
      timestamp: now(),
      type: ClaimTypes.ATTESTATION_SERVICE_URL,
    }

    await expect(
      metadata.addClaim(claim as Claim, NativeSigner(kit.connection.sign, address))
    ).rejects.toThrow('ATTESTATION_SERVICE_URL claims are not supported')
  })

  it('allows to add a new valid claim and hashes it even if the existing claims contains deprecated ATTESTATION_SERVICE_URL', async () => {
    const metadata = await IdentityMetadataWrapper.fromRawString(
      await kit.contracts.getAccounts(),
      `{
        "claims": [
          {
            "url": "https://example.com/attestations",
            "timestamp": 1733488714,
            "type": "ATTESTATION_SERVICE_URL"
          }
        ],
        "meta": {
          "address": "0x5409ED021D9299bf6814279A6A1411A7e866A631",
          "signature": "0x48b156db90446fcc0587575ad4913c40184cae119ef40e17652c66641f6fef4611d4be7b7940d36b46ac8803ba26ea608e6009c12bf9361e2e149fee33ecbbf11c"
        }
      }`
    )

    await expect(
      metadata.addClaim(createNameClaim('Test name'), NativeSigner(kit.connection.sign, address))
    ).resolves.toMatchObject({
      // Not checking timestamp here on purpose
      name: 'Test name',
      type: 'NAME',
    })
  })
  describe('when multiple rpc urls claims have been made', () => {
    let metadata: IdentityMetadataWrapper
    const claim: Claim = createRpcUrlClaim('https:/example.com/rpc1')
    const claim2: Claim = createRpcUrlClaim('https:/example.com/rpc2')
    const claim3: Claim = createRpcUrlClaim('https:/example.com/rpc3')

    beforeEach(async () => {
      metadata = IdentityMetadataWrapper.fromEmpty(address)

      await metadata.addClaim(claim, NativeSigner(kit.connection.sign, address))
      await metadata.addClaim(claim2, NativeSigner(kit.connection.sign, address))
      await metadata.addClaim(claim3, NativeSigner(kit.connection.sign, address))
    })
    it('shows the latest claim of a type when more than one claim exists', async () => {
      expect(metadata.findClaim(ClaimTypes.RPC_URL)).toEqual(claim3)
      expect(metadata.filterClaims(ClaimTypes.RPC_URL)).toEqual([claim, claim2, claim3])
    })
    it('and same rpc url was already claimed, it moves it  the end so its returned as the latest', async () => {
      await metadata.addClaim(claim2, NativeSigner(kit.connection.sign, address))
      expect(metadata.filterClaims(ClaimTypes.RPC_URL)).toEqual([claim, claim3, claim2])
      expect(metadata.findClaim(ClaimTypes.RPC_URL)).toEqual(claim2)
    })
  })
})
