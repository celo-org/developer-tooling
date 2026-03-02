import { federatedAttestationsABI } from '@celo/abis'
import { Address, CeloTx } from '@celo/connect'
import { registerAttestation as buildRegisterAttestationTypedData } from '@celo/utils/lib/typed-data-constructors'
import { BaseWrapper, toViemAddress, toViemBigInt } from './BaseWrapper'

export class FederatedAttestationsWrapper extends BaseWrapper<typeof federatedAttestationsABI> {
  /**
   * @notice Returns identifiers mapped to `account` by signers of `trustedIssuers`
   * @param account Address of the account
   * @param trustedIssuers Array of n issuers whose identifier mappings will be used
   * @return countsPerIssuer Array of number of identifiers returned per issuer
   * @return identifiers Array (length == sum([0])) of identifiers
   * @dev Adds identifier info to the arrays in order of provided trustedIssuers
   * @dev Expectation that only one attestation exists per (identifier, issuer, account)
   */
  lookupIdentifiers = async (account: string, trustedIssuers: string[]) => {
    const res = await this.contract.read.lookupIdentifiers([
      toViemAddress(account),
      trustedIssuers.map(toViemAddress),
    ])
    return {
      countsPerIssuer: [...res[0]].map((v) => v.toString()),
      identifiers: [...res[1]] as string[],
    }
  }

  /**
   * @notice Returns info about attestations for `identifier` produced by
   *    signers of `trustedIssuers`
   * @param identifier Hash of the identifier
   * @param trustedIssuers Array of n issuers whose attestations will be included
   * @return countsPerIssuer Array of number of attestations returned per issuer
   *          For m (== sum([0])) found attestations:
   * @return accounts Array of m accounts
   * @return signers Array of m signers
   * @return issuedOns Array of m issuedOns
   * @return publishedOns Array of m publishedOns
   * @dev Adds attestation info to the arrays in order of provided trustedIssuers
   * @dev Expectation that only one attestation exists per (identifier, issuer, account)
   */
  lookupAttestations = async (identifier: string, trustedIssuers: string[]) => {
    const res = await this.contract.read.lookupAttestations([
      identifier as `0x${string}`,
      trustedIssuers.map(toViemAddress),
    ])
    return {
      countsPerIssuer: [...res[0]].map((v) => v.toString()),
      accounts: [...res[1]] as string[],
      signers: [...res[2]] as string[],
      issuedOns: [...res[3]].map((v) => v.toString()),
      publishedOns: [...res[4]].map((v) => v.toString()),
    }
  }

  /**
   * @notice Validates the given attestation and signature
   * @param identifier Hash of the identifier to be attested
   * @param issuer Address of the attestation issuer
   * @param account Address of the account being mapped to the identifier
   * @param issuedOn Time at which the issuer issued the attestation in Unix time
   * @param signer Address of the signer of the attestation
   * @param v The recovery id of the incoming ECDSA signature
   * @param r Output value r of the ECDSA signature
   * @param s Output value s of the ECDSA signature
   * @dev Throws if attestation has been revoked
   * @dev Throws if signer is not an authorized AttestationSigner of the issuer
   */
  validateAttestationSig = async (
    identifier: string,
    issuer: string,
    account: string,
    signer: string,
    issuedOn: number,
    v: number | string,
    r: string | number[],
    s: string | number[]
  ): Promise<void> => {
    await this.contract.read.validateAttestationSig([
      identifier as `0x${string}`,
      toViemAddress(issuer),
      toViemAddress(account),
      toViemAddress(signer),
      toViemBigInt(issuedOn),
      v as unknown as number,
      r as `0x${string}`,
      s as `0x${string}`,
    ])
  }

  /**
   * @return keccak 256 of abi encoded parameters
   */
  getUniqueAttestationHash = async (
    identifier: string,
    issuer: string,
    account: string,
    signer: string,
    issuedOn: number
  ): Promise<string> => {
    const res = await this.contract.read.getUniqueAttestationHash([
      identifier as `0x${string}`,
      toViemAddress(issuer),
      toViemAddress(account),
      toViemAddress(signer),
      toViemBigInt(issuedOn),
    ])
    return res
  }

  /**
   * @notice Registers an attestation directly from the issuer
   * @param identifier Hash of the identifier to be attested
   * @param account Address of the account being mapped to the identifier
   * @param issuedOn Time at which the issuer issued the attestation in Unix time
   * @dev Attestation signer and issuer in storage is set to msg.sender
   * @dev Throws if an attestation with the same (identifier, issuer, account) already exists
   */
  registerAttestationAsIssuer = (
    identifier: string,
    account: Address,
    issuedOn: number,
    txParams?: Omit<CeloTx, 'data'>
  ) =>
    this.contract.write.registerAttestationAsIssuer(
      [identifier as `0x${string}`, toViemAddress(account), BigInt(issuedOn)] as const,
      txParams as any
    )

  /**
   * @notice Generates a valid signature and registers the attestation
   * @param identifier Hash of the identifier to be attested
   * @param issuer Address of the attestation issuer
   * @param account Address of the account being mapped to the identifier
   * @param issuedOn Time at which the issuer issued the attestation in Unix time
   * @param signer Address of the signer of the attestation
   * @dev Throws if an attestation with the same (identifier, issuer, account) already exists
   */
  async registerAttestation(
    identifier: string,
    issuer: Address,
    account: Address,
    signer: Address,
    issuedOn: number,
    txParams?: Omit<CeloTx, 'data'>
  ): Promise<`0x${string}`> {
    const chainId = await this.connection.chainId()
    const typedData = buildRegisterAttestationTypedData(chainId, this.address, {
      identifier,
      issuer,
      account,
      signer,
      issuedOn,
    })
    const sig = await this.connection.signTypedData(signer, typedData)
    return this.contract.write.registerAttestation(
      [
        identifier as `0x${string}`,
        toViemAddress(issuer),
        toViemAddress(account),
        toViemAddress(signer),
        BigInt(issuedOn),
        sig.v,
        sig.r as `0x${string}`,
        sig.s as `0x${string}`,
      ] as const,
      txParams as any
    )
  }

  /**
   * @notice Revokes an attestation
   * @param identifier Hash of the identifier to be revoked
   * @param issuer Address of the attestation issuer
   * @param account Address of the account mapped to the identifier
   * @dev Throws if sender is not the issuer, signer, or account
   */
  revokeAttestation = (
    identifier: string,
    issuer: Address,
    account: Address,
    txParams?: Omit<CeloTx, 'data'>
  ) =>
    this.contract.write.revokeAttestation(
      [identifier as `0x${string}`, toViemAddress(issuer), toViemAddress(account)] as const,
      txParams as any
    )

  /**
   * @notice Revokes attestations [identifiers <-> accounts] from issuer
   * @param issuer Address of the issuer of all attestations to be revoked
   * @param identifiers Hash of the identifiers
   * @param accounts Addresses of the accounts mapped to the identifiers
   *   at the same indices
   * @dev Throws if the number of identifiers and accounts is not the same
   * @dev Throws if sender is not the issuer or currently registered signer of issuer
   * @dev Throws if an attestation is not found for identifiers[i] <-> accounts[i]
   */
  batchRevokeAttestations = (
    issuer: Address,
    identifiers: string[],
    accounts: Address[],
    txParams?: Omit<CeloTx, 'data'>
  ) =>
    this.contract.write.batchRevokeAttestations(
      [
        toViemAddress(issuer),
        identifiers.map((id) => id as `0x${string}`),
        accounts.map(toViemAddress),
      ] as const,
      txParams as any
    )
}
