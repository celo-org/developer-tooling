import { newKitFromWeb3 } from '@celo/contractkit'
import { testWithAnvilL1 } from '@celo/dev-utils/lib/anvil-test'
import { ACCOUNT_ADDRESSES } from '@celo/dev-utils/lib/ganache-setup'
import { Address } from '@celo/utils/lib/address'
import { NativeSigner } from '@celo/utils/lib/signatureUtils'
import { createNameClaim } from './claim'
import { ClaimTypes, IdentityMetadataWrapper } from './metadata'

testWithAnvilL1('Metadata', (web3) => {
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
})
