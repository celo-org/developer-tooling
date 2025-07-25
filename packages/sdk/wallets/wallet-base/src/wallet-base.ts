import { isHexString, normalizeAddressWith0x } from '@celo/base/lib/address'
import { Address, CeloTx, EncodedTransaction, ReadOnlyWallet, Signer } from '@celo/connect'
import { EIP712TypedData } from '@celo/utils/lib/sign-typed-data-utils'
import * as ethUtil from '@ethereumjs/util'
import { chainIdTransformationForSigning, encodeTransaction, rlpEncodedTx } from './signing-utils'

type addInMemoryAccount = (privateKey: string) => void
type addRemoteAccount = (privateKey: string, passphrase: string) => Promise<string>

export interface Wallet extends ReadOnlyWallet {
  addAccount: addInMemoryAccount | addRemoteAccount
}

export interface UnlockableWallet extends Wallet {
  unlockAccount: (address: string, passphrase: string, duration: number) => Promise<boolean>
  isAccountUnlocked: (address: string) => boolean
}

export abstract class WalletBase<TSigner extends Signer> implements ReadOnlyWallet {
  // By creating the Signers in advance we can have a common pattern across wallets
  // Each implementation is responsible for populating this map through addSigner
  private accountSigners = new Map<Address, TSigner>()

  /**
   * Gets a list of accounts that have been registered
   */
  getAccounts(): Address[] {
    return Array.from(this.accountSigners.keys())
  }

  /**
   * Removes the account with the given address. Needs to be implemented by subclass, otherwise throws error
   * @param _address The address of the account to be removed
   */
  removeAccount(_address: string) {
    throw new Error('removeAccount is not supported for this wallet')
  }

  /**
   * Returns true if account has been registered
   * @param address Account to check
   */
  hasAccount(address?: Address): boolean {
    if (address) {
      const normalizedAddress = normalizeAddressWith0x(address)
      return this.accountSigners.has(normalizedAddress)
    } else {
      return false
    }
  }

  /**
   * Adds the account-signer set to the internal map
   * @param address Account address
   * @param signer Account signer
   */
  protected addSigner(address: Address, signer: TSigner) {
    const normalizedAddress = normalizeAddressWith0x(address)
    this.accountSigners.set(normalizedAddress, signer)
  }

  /**
   * Removes the account-signer
   * @param address Account address
   */
  protected removeSigner(address: Address) {
    const normalizedAddress = normalizeAddressWith0x(address)
    this.accountSigners.delete(normalizedAddress)
  }

  /**
   * Gets the signer based on the 'from' field in the tx body
   * @param txParams Transaction to sign
   */
  async signTransaction(txParams: CeloTx): Promise<EncodedTransaction> {
    if (!txParams) {
      throw new Error('No transaction object given!')
    }
    if (txParams.gasPrice && txParams.feeCurrency && txParams.feeCurrency !== '0x') {
      throw new Error(
        'Cannot serialize both "gasPrice" and "feeCurrency" together. To keep "feeCurrency", replace "gasPrice" with "maxFeePerGas". To keep "gasPrice" and send a type 0 transaction remove "feeCurrency"'
      )
    }
    const rlpEncoded = rlpEncodedTx(txParams)
    const addToV =
      rlpEncoded.type === 'ethereum-legacy'
        ? chainIdTransformationForSigning(txParams.chainId!)
        : 27

    // Get the signer from the 'from' field
    const fromAddress = txParams.from!.toString()
    const signer = this.getSigner(fromAddress)
    const signature = await signer!.signTransaction(addToV, rlpEncoded)

    return encodeTransaction(rlpEncoded, signature)
  }

  /**
   * Sign a personal Ethereum signed message.
   * @param address Address of the account to sign with
   * @param data Hex string message to sign
   * @return Signature hex string (order: rsv)
   */
  async signPersonalMessage(address: Address, data: string): Promise<string> {
    if (!isHexString(data)) {
      throw new Error('wallet@signPersonalMessage: Expected data has to be a hex string ')
    }

    const signer = this.getSigner(address)
    const sig = await signer.signPersonalMessage(data)

    return ethUtil.toRpcSig(BigInt(sig.v), sig.r, sig.s)
  }

  /**
   * Sign an EIP712 Typed Data message.
   * @param address Address of the account to sign with
   * @param typedData the typed data object
   * @return Signature hex string (order: rsv)
   */
  async signTypedData(address: Address, typedData: EIP712TypedData): Promise<string> {
    if (typedData === undefined) {
      throw new Error('wallet@signTypedData: TypedData Missing')
    }

    const signer = this.getSigner(address)
    const sig = await signer.signTypedData(typedData)

    return ethUtil.toRpcSig(BigInt(sig.v), sig.r, sig.s)
  }

  protected getSigner(address: string): TSigner {
    const normalizedAddress = normalizeAddressWith0x(address)
    if (!this.accountSigners.has(normalizedAddress)) {
      throw new Error(`Could not find address ${normalizedAddress}`)
    }
    return this.accountSigners.get(normalizedAddress)!
  }

  async decrypt(address: string, ciphertext: Buffer) {
    const signer = this.getSigner(address)
    return signer.decrypt(ciphertext)
  }

  /**
   * Computes the shared secret (an ECDH key exchange object) between two accounts
   */
  computeSharedSecret(address: Address, publicKey: string): Promise<Buffer> {
    const signer = this.getSigner(address)
    return signer.computeSharedSecret(publicKey)
  }
}
