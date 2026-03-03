import { accountsABI } from '@celo/abis'
import { StrongAddress } from '@celo/base'
import { NativeSigner, Signature, Signer } from '@celo/base/lib/signatureUtils'
import { Address, CeloTx } from '@celo/connect'
import { keccak256 } from 'viem'
import {
  LocalSigner,
  hashMessageWithPrefix,
  parseSignature,
  signedMessageToPublicKey,
} from '@celo/utils/lib/signatureUtils'
import { soliditySha3 } from '@celo/utils/lib/solidity'
import { authorizeSigner as buildAuthorizeSignerTypedData } from '@celo/utils/lib/typed-data-constructors'
import { getParsedSignatureOfAddress } from '../utils/getParsedSignatureOfAddress'
import { newContractVersion } from '../versions'
import {
  solidityBytesToString,
  stringToSolidityBytes,
  toViemAddress,
} from '../wrappers/BaseWrapper'
import { BaseWrapper } from './BaseWrapper'
interface AccountSummary {
  address: string
  name: string
  authorizedSigners: {
    vote: Address
    validator: Address
    attestation: Address
  }
  metadataURL: string
  wallet: Address
  dataEncryptionKey: string
}

/**
 * Contract for handling deposits needed for voting.
 */
export class AccountsWrapper extends BaseWrapper<typeof accountsABI> {
  private RELEASE_4_VERSION = newContractVersion(1, 1, 2, 0)

  /**
   * @internal Convert CeloTx overrides for contract.write calls.
   * CeloProvider transport handles Celo-specific field mapping at runtime.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private writeOverrides(txParams?: Omit<CeloTx, 'data'>): any {
    return txParams ? { ...txParams } : undefined
  }

  /**
   * Creates an account.
   */
  createAccount = (txParams?: Omit<CeloTx, 'data'>) =>
    this.contract.write.createAccount(this.writeOverrides(txParams))

  /**
   * Returns the attestation signer for the specified account.
   * @param account The address of the account.
   * @return The address with which the account can vote.
   */
  getAttestationSigner = async (account: string): Promise<StrongAddress> =>
    this.contract.read.getAttestationSigner([toViemAddress(account)])

  /**
   * Returns if the account has authorized an attestation signer
   * @param account The address of the account.
   * @return If the account has authorized an attestation signer
   */
  hasAuthorizedAttestationSigner = async (account: string): Promise<boolean> =>
    this.contract.read.hasAuthorizedAttestationSigner([toViemAddress(account)])

  /**
   * Returns the vote signer for the specified account.
   * @param account The address of the account.
   * @return The address with which the account can vote.
   */
  getVoteSigner = async (account: string): Promise<StrongAddress> =>
    this.contract.read.getVoteSigner([toViemAddress(account)])
  /**
   * Returns the validator signer for the specified account.
   * @param account The address of the account.
   * @return The address with which the account can register a validator or group.
   */
  getValidatorSigner = async (account: string): Promise<StrongAddress> =>
    this.contract.read.getValidatorSigner([toViemAddress(account)])

  /**
   * Returns the account address given the signer for voting
   * @param signer Address that is authorized to sign the tx as voter
   * @return The Account address
   */
  voteSignerToAccount = async (signer: Address): Promise<StrongAddress> =>
    this.contract.read.voteSignerToAccount([toViemAddress(signer)])

  /**
   * Returns the account address given the signer for validating
   * @param signer Address that is authorized to sign the tx as validator
   * @return The Account address
   */
  validatorSignerToAccount = async (signer: Address): Promise<StrongAddress> =>
    this.contract.read.validatorSignerToAccount([toViemAddress(signer)])

  /**
   * Returns the account associated with `signer`.
   * @param signer The address of the account or previously authorized signer.
   * @dev Fails if the `signer` is not an account or previously authorized signer.
   * @return The associated account.
   */
  signerToAccount = async (signer: Address): Promise<StrongAddress> =>
    this.contract.read.signerToAccount([toViemAddress(signer)])

  /**
   * Check if an account already exists.
   * @param account The address of the account
   * @return Returns `true` if account exists. Returns `false` otherwise.
   */
  isAccount = async (account: string): Promise<boolean> =>
    this.contract.read.isAccount([toViemAddress(account)])

  /**
   * Check if an address is a signer address
   * @param address The address of the account
   * @return Returns `true` if account exists. Returns `false` otherwise.
   */
  isSigner = async (address: string): Promise<boolean> =>
    this.contract.read.isAuthorizedSigner([toViemAddress(address)])

  getCurrentSigners(address: string): Promise<string[]> {
    return Promise.all([
      this.getVoteSigner(address),
      this.getValidatorSigner(address),
      this.getAttestationSigner(address),
    ])
  }

  async getAccountSummary(account: string): Promise<AccountSummary> {
    const ret = await Promise.all([
      this.getName(account),
      this.getVoteSigner(account),
      this.getValidatorSigner(account),
      this.getAttestationSigner(account),
      this.getMetadataURL(account),
      this.getWalletAddress(account),
      this.getDataEncryptionKey(account),
    ])
    return {
      address: account,
      name: ret[0],
      authorizedSigners: {
        vote: ret[1],
        validator: ret[2],
        attestation: ret[3],
      },
      metadataURL: ret[4],
      wallet: ret[5],
      dataEncryptionKey: ret[6],
    }
  }

  /**
   * Authorize an attestation signing key on behalf of this account to another address.
   * @param signer The address of the signing key to authorize.
   * @param proofOfSigningKeyPossession The account address signed by the signer address.
   * @returns A promise that resolves to the transaction hash
   */
  async authorizeAttestationSigner(
    signer: Address,
    proofOfSigningKeyPossession: Signature,
    txParams?: Omit<CeloTx, 'data'>
  ): Promise<`0x${string}`> {
    return this.contract.write.authorizeAttestationSigner(
      [
        toViemAddress(signer),
        proofOfSigningKeyPossession.v,
        proofOfSigningKeyPossession.r as `0x${string}`,
        proofOfSigningKeyPossession.s as `0x${string}`,
      ] as const,
      this.writeOverrides(txParams)
    )
  }

  /**
   * Authorizes an address to sign votes on behalf of the account.
   * @param signer The address of the vote signing key to authorize.
   * @param proofOfSigningKeyPossession The account address signed by the signer address.
   * @returns A promise that resolves to the transaction hash
   */
  async authorizeVoteSigner(
    signer: Address,
    proofOfSigningKeyPossession: Signature,
    txParams?: Omit<CeloTx, 'data'>
  ): Promise<`0x${string}`> {
    return this.contract.write.authorizeVoteSigner(
      [
        toViemAddress(signer),
        proofOfSigningKeyPossession.v,
        proofOfSigningKeyPossession.r as `0x${string}`,
        proofOfSigningKeyPossession.s as `0x${string}`,
      ] as const,
      this.writeOverrides(txParams)
    )
  }

  /**
   * Authorizes an address to sign consensus messages on behalf of the account.
   * @param signer The address of the signing key to authorize.
   * @param proofOfSigningKeyPossession The account address signed by the signer address.
   * @returns A promise that resolves to the transaction hash
   */
  async authorizeValidatorSigner(
    signer: Address,
    proofOfSigningKeyPossession: Signature,
    validatorsWrapper: { isValidator: (account: string) => Promise<boolean> },
    txParams?: Omit<CeloTx, 'data'>
  ): Promise<`0x${string}`> {
    const account = this.connection.defaultAccount || (await this.connection.getAccounts())[0]
    if (await validatorsWrapper.isValidator(account)) {
      const message = soliditySha3({
        type: 'address',
        value: account,
      })!
      const prefixedMsg = hashMessageWithPrefix(message)
      const pubKey = signedMessageToPublicKey(
        prefixedMsg!,
        proofOfSigningKeyPossession.v,
        proofOfSigningKeyPossession.r,
        proofOfSigningKeyPossession.s
      )
      return this.contract.write.authorizeValidatorSignerWithPublicKey(
        [
          toViemAddress(signer),
          proofOfSigningKeyPossession.v,
          proofOfSigningKeyPossession.r as `0x${string}`,
          proofOfSigningKeyPossession.s as `0x${string}`,
          stringToSolidityBytes(pubKey) as `0x${string}`,
        ] as const,
        this.writeOverrides(txParams)
      )
    } else {
      return this.contract.write.authorizeValidatorSigner(
        [
          toViemAddress(signer),
          proofOfSigningKeyPossession.v,
          proofOfSigningKeyPossession.r as `0x${string}`,
          proofOfSigningKeyPossession.s as `0x${string}`,
        ] as const,
        this.writeOverrides(txParams)
      )
    }
  }

  /**
   * Authorizes an address to sign consensus messages on behalf of the account. Also switch BLS key at the same time.
   * @param signer The address of the signing key to authorize.
   * @param proofOfSigningKeyPossession The account address signed by the signer address.
   * @returns A promise that resolves to the transaction hash
   */
  async authorizeValidatorSignerWithPublicKey(
    signer: Address,
    proofOfSigningKeyPossession: Signature,
    txParams?: Omit<CeloTx, 'data'>
  ): Promise<`0x${string}`> {
    const account = this.connection.defaultAccount || (await this.connection.getAccounts())[0]
    const message = soliditySha3({
      type: 'address',
      value: account,
    })!
    const prefixedMsg = hashMessageWithPrefix(message)
    const pubKey = signedMessageToPublicKey(
      prefixedMsg!,
      proofOfSigningKeyPossession.v,
      proofOfSigningKeyPossession.r,
      proofOfSigningKeyPossession.s
    )
    return this.contract.write.authorizeValidatorSignerWithPublicKey(
      [
        toViemAddress(signer),
        proofOfSigningKeyPossession.v,
        proofOfSigningKeyPossession.r as `0x${string}`,
        proofOfSigningKeyPossession.s as `0x${string}`,
        stringToSolidityBytes(pubKey) as `0x${string}`,
      ] as const,
      this.writeOverrides(txParams)
    )
  }

  async authorizeSigner(
    signer: Address,
    role: string,
    txParams?: Omit<CeloTx, 'data'>
  ): Promise<`0x${string}`> {
    await this.onlyVersionOrGreater(this.RELEASE_4_VERSION)
    const [accounts, chainId] = await Promise.all([
      this.connection.getAccounts(),
      this.connection.viemClient.getChainId(),
      // This IS the accounts contract wrapper no need to get it
    ])
    const account = this.connection.defaultAccount || accounts[0]

    const hashedRole = this.keccak256(role)
    const typedData = buildAuthorizeSignerTypedData({
      account,
      signer,
      chainId,
      role: hashedRole,
      accountsContractAddress: this.address,
    })

    const sig = await this.connection.signTypedData(signer, typedData)
    return this.contract.write.authorizeSignerWithSignature(
      [
        toViemAddress(signer),
        hashedRole as `0x${string}`,
        sig.v,
        sig.r as `0x${string}`,
        sig.s as `0x${string}`,
      ] as const,
      this.writeOverrides(txParams)
    )
  }

  async startSignerAuthorization(
    signer: Address,
    role: string,
    txParams?: Omit<CeloTx, 'data'>
  ): Promise<`0x${string}`> {
    await this.onlyVersionOrGreater(this.RELEASE_4_VERSION)
    return this.contract.write.authorizeSigner(
      [toViemAddress(signer), this.keccak256(role) as `0x${string}`] as const,
      this.writeOverrides(txParams)
    )
  }

  async completeSignerAuthorization(
    account: Address,
    role: string,
    txParams?: Omit<CeloTx, 'data'>
  ): Promise<`0x${string}`> {
    await this.onlyVersionOrGreater(this.RELEASE_4_VERSION)
    return this.contract.write.completeSignerAuthorization(
      [toViemAddress(account), this.keccak256(role) as `0x${string}`] as const,
      this.writeOverrides(txParams)
    )
  }

  /**
   * Removes the currently authorized attestation signer for the account
   * @returns A promise that resolves to the transaction hash
   */
  async removeAttestationSigner(txParams?: Omit<CeloTx, 'data'>): Promise<`0x${string}`> {
    return this.contract.write.removeAttestationSigner(this.writeOverrides(txParams))
  }

  async generateProofOfKeyPossession(account: Address, signer: Address) {
    return this.getParsedSignatureOfAddress(
      account,
      signer,
      NativeSigner(this.connection.sign, signer)
    )
  }

  async generateProofOfKeyPossessionLocally(account: Address, signer: Address, privateKey: string) {
    return this.getParsedSignatureOfAddress(account, signer, LocalSigner(privateKey))
  }

  /**
   * Returns the set name for the account
   * @param account Account
   * @param blockNumber Height of result, defaults to tip.
   */
  private _getName = async (account: string) => this.contract.read.getName([toViemAddress(account)])

  async getName(account: Address, _blockNumber?: number): Promise<string> {
    // @ts-ignore: Expected 0-1 arguments, but got 2
    return this._getName(account)
  }

  /**
   * Returns the set data encryption key for the account
   * @param account Account
   */
  getDataEncryptionKey = async (account: string) => {
    const res = await this.contract.read.getDataEncryptionKey([toViemAddress(account)])
    return solidityBytesToString(res)
  }

  /**
   * Returns the set wallet address for the account
   * @param account Account
   */
  getWalletAddress = async (account: string): Promise<string> =>
    this.contract.read.getWalletAddress([toViemAddress(account)])

  /**
   * Returns the metadataURL for the account
   * @param account Account
   */
  getMetadataURL = async (account: string): Promise<string> =>
    this.contract.read.getMetadataURL([toViemAddress(account)])

  /**
   * Sets the data encryption of the account
   * @param encryptionKey The key to set
   */
  setAccountDataEncryptionKey = (encryptionKey: string, txParams?: Omit<CeloTx, 'data'>) =>
    this.contract.write.setAccountDataEncryptionKey(
      [encryptionKey as `0x${string}`] as const,
      this.writeOverrides(txParams)
    )

  /**
   * Convenience Setter for the dataEncryptionKey and wallet address for an account
   * @param name A string to set as the name of the account
   * @param dataEncryptionKey secp256k1 public key for data encryption. Preferably compressed.
   * @param walletAddress The wallet address to set for the account
   * @param proofOfPossession Signature from the wallet address key over the sender's address
   */
  async setAccount(
    name: string,
    dataEncryptionKey: string,
    walletAddress: Address,
    proofOfPossession: Signature | null = null,
    txParams?: Omit<CeloTx, 'data'>
  ): Promise<`0x${string}`> {
    if (proofOfPossession) {
      return this.contract.write.setAccount(
        [
          name,
          dataEncryptionKey as `0x${string}`,
          toViemAddress(walletAddress),
          proofOfPossession.v,
          proofOfPossession.r as `0x${string}`,
          proofOfPossession.s as `0x${string}`,
        ] as const,
        this.writeOverrides(txParams)
      )
    } else {
      return this.contract.write.setAccount(
        [
          name,
          dataEncryptionKey as `0x${string}`,
          toViemAddress(walletAddress),
          0,
          '0x0' as `0x${string}`,
          '0x0' as `0x${string}`,
        ] as const,
        this.writeOverrides(txParams)
      )
    }
  }

  /**
   * Sets the name for the account
   * @param name The name to set
   */
  setName = (name: string, txParams?: Omit<CeloTx, 'data'>) =>
    this.contract.write.setName([name] as const, this.writeOverrides(txParams))

  /**
   * Sets the metadataURL for the account
   * @param url The url to set
   */
  setMetadataURL = (url: string, txParams?: Omit<CeloTx, 'data'>) =>
    this.contract.write.setMetadataURL([url] as const, this.writeOverrides(txParams))

  /**
   * Set a validator's payment delegation settings.
   * @param beneficiary The address that should receive a portion of validator
   * payments.
   * @param fraction The fraction of the validator's payment that should be
   * diverted to `beneficiary` every epoch, given as FixidityLib value. Must not
   * be greater than 1.
   * @dev Use `deletePaymentDelegation` to unset the payment delegation.
   */
  setPaymentDelegation = (beneficiary: string, fraction: string, txParams?: Omit<CeloTx, 'data'>) =>
    this.contract.write.setPaymentDelegation(
      [toViemAddress(beneficiary), BigInt(fraction)] as const,
      this.writeOverrides(txParams)
    )

  /**
   * Remove a validator's payment delegation by setting beneficiary and
   * fraction to 0.
   */
  deletePaymentDelegation = (txParams?: Omit<CeloTx, 'data'>) =>
    this.contract.write.deletePaymentDelegation(this.writeOverrides(txParams))

  /**
   * Get a validator's payment delegation settings.
   * @param account Account of the validator.
   * @return Beneficiary address and fraction of payment delegated.
   */
  getPaymentDelegation = async (account: string) => {
    const res = await this.contract.read.getPaymentDelegation([toViemAddress(account)])
    return {
      0: res[0] as string,
      1: res[1].toString(),
    }
  }

  /**
   * Sets the wallet address for the account
   * @param address The address to set
   */
  async setWalletAddress(
    walletAddress: Address,
    proofOfPossession: Signature | null = null,
    txParams?: Omit<CeloTx, 'data'>
  ): Promise<`0x${string}`> {
    if (proofOfPossession) {
      return this.contract.write.setWalletAddress(
        [
          toViemAddress(walletAddress),
          proofOfPossession.v,
          proofOfPossession.r as `0x${string}`,
          proofOfPossession.s as `0x${string}`,
        ] as const,
        this.writeOverrides(txParams)
      )
    } else {
      return this.contract.write.setWalletAddress(
        [
          toViemAddress(walletAddress),
          0,
          '0x0000000000000000000000000000000000000000000000000000000000000000',
          '0x0000000000000000000000000000000000000000000000000000000000000000',
        ] as const,
        this.writeOverrides(txParams)
      )
    }
  }

  parseSignatureOfAddress(address: Address, signer: string, signature: string) {
    const hash = soliditySha3({ type: 'address', value: address })
    return parseSignature(hash!, signature, signer)
  }

  private async getParsedSignatureOfAddress(address: Address, signer: string, signerFn: Signer) {
    return getParsedSignatureOfAddress(soliditySha3, signerFn.sign, address, signer)
  }

  private keccak256(value: string): string {
    return keccak256(value as `0x${string}`)
  }
}

export type AccountsWrapperType = AccountsWrapper
