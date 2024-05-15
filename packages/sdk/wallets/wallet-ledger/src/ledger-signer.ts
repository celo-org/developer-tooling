import { ensureLeading0x, trimLeading0x } from '@celo/base/lib/address'
import { RLPEncodedTx, Signer } from '@celo/connect'
import { EIP712TypedData, structHash } from '@celo/utils/lib/sign-typed-data-utils'
import { chainIdTransformationForSigning } from '@celo/wallet-base'
import * as ethUtil from '@ethereumjs/util'
import { TransportStatusError } from '@ledgerhq/errors'
import Ledger, { ledgerService } from '@ledgerhq/hw-app-eth'
import debugFactory from 'debug'
import { SemVer } from 'semver'
import { transportErrorFriendlyMessage } from './ledger-utils'
import { AddressValidation } from './ledger-wallet'
import { tokenInfoByAddressAndChainId } from './tokens'

const debug = debugFactory('kit:wallet:ledger')
const CELO_APP_ACCEPTS_CONTRACT_DATA_FROM_VERSION = '1.0.2'

/**
 * Signs the EVM transaction with a Ledger device
 */
export class LedgerSigner implements Signer {
  private ledger: Ledger
  private derivationPath: string
  private validated: boolean = false
  private ledgerAddressValidation: AddressValidation
  private appConfiguration: { arbitraryDataEnabled: number; version: string }

  constructor(
    ledger: Ledger,
    derivationPath: string,
    ledgerAddressValidation: AddressValidation,
    appConfiguration: { arbitraryDataEnabled: number; version: string } = {
      arbitraryDataEnabled: 0,
      version: '0.0.0',
    }
  ) {
    this.ledger = ledger
    this.derivationPath = derivationPath
    this.ledgerAddressValidation = ledgerAddressValidation
    this.appConfiguration = appConfiguration
  }

  getNativeKey(): string {
    return this.derivationPath
  }

  async signTransaction(
    addToV: number,
    encodedTx: RLPEncodedTx
  ): Promise<{ v: number; r: Buffer; s: Buffer }> {
    try {
      const validatedDerivationPath = await this.getValidatedDerivationPath()
      await this.checkForKnownToken(encodedTx)
      const resolution = await ledgerService.resolveTransaction(
        trimLeading0x(encodedTx.rlpEncode),
        this.ledger.loadConfig,
        { erc20: true }
      )
      const signature = await this.ledger!.signTransaction(
        validatedDerivationPath,
        trimLeading0x(encodedTx.rlpEncode), // the ledger requires the rlpEncode without the leading 0x
        resolution
      )

      // EIP155 support. check/recalc signature v value.
      const _v = parseInt(signature.v, 16)
      // eslint-disable-next-line no-bitwise
      if (_v !== addToV && (_v & addToV) !== _v) {
        addToV += 1 // add signature v bit.
      }

      return {
        v:
          encodedTx.type === 'ethereum-legacy'
            ? _v + chainIdTransformationForSigning(encodedTx.transaction.chainId)
            : _v,
        r: ethUtil.toBuffer(ensureLeading0x(signature.r)),
        s: ethUtil.toBuffer(ensureLeading0x(signature.s)),
      }
    } catch (error: unknown) {
      if (error instanceof TransportStatusError) {
        // The Ledger fails if it doesn't know the feeCurrency
        if (error.statusCode === 27264 && error.statusText === 'INCORRECT_DATA') {
          debug('Possible invalid feeCurrency field')
          throw new Error(
            'ledger-signer@signTransaction: Incorrect Data. Verify that the feeCurrency is a valid one'
          )
        } else {
          transportErrorFriendlyMessage(error)
        }
      }
      throw error
    }
  }

  async signPersonalMessage(data: string): Promise<{ v: number; r: Buffer; s: Buffer }> {
    try {
      // Ledger's signPersonalMessage adds the 'Ethereum' header
      const signature = await this.ledger!.signPersonalMessage(
        await this.getValidatedDerivationPath(),
        trimLeading0x(data)
      )
      return {
        v: signature.v,
        r: ethUtil.toBuffer(ensureLeading0x(signature.r)),
        s: ethUtil.toBuffer(ensureLeading0x(signature.s)),
      }
    } catch (error) {
      if (error instanceof TransportStatusError) {
        transportErrorFriendlyMessage(error)
      }
      throw error
    }
  }

  async signTypedData(typedData: EIP712TypedData): Promise<{ v: number; r: Buffer; s: Buffer }> {
    try {
      const domainSeparator = structHash('EIP712Domain', typedData.domain, typedData.types)
      const hashStructMessage = structHash(
        typedData.primaryType,
        typedData.message,
        typedData.types
      )

      const sig = await this.ledger!.signEIP712HashedMessage(
        await this.getValidatedDerivationPath(),
        domainSeparator.toString('hex'),
        hashStructMessage.toString('hex')
      )
      return {
        v: sig.v,
        r: ethUtil.toBuffer(ensureLeading0x(sig.r)),
        s: ethUtil.toBuffer(ensureLeading0x(sig.s)),
      }
    } catch (error) {
      if (error instanceof TransportStatusError) {
        transportErrorFriendlyMessage(error)
      }
      throw error
    }
  }

  private async getValidatedDerivationPath(): Promise<string> {
    if (this.validationRequired()) {
      await this.ledger!.getAddress(this.derivationPath, true)
      this.validated = true
    }
    return this.derivationPath
  }

  private validationRequired(): boolean {
    switch (this.ledgerAddressValidation) {
      case AddressValidation.never: {
        return false
      }
      case AddressValidation.everyTransaction: {
        return true
      }
      case AddressValidation.firstTransactionPerAddress: {
        return !this.validated
      }
      case AddressValidation.initializationOnly: {
        // Already initialized, so no need to validate in this state
        return false
      }
      default: {
        throw new Error('ledger-signer@validationRequired: invalid ledgerValidation value')
      }
    }
  }

  /**
   * Display ERC20 info on ledger if contract is well known
   * @param rlpEncoded Encoded transaction
   */
  private async checkForKnownToken(rlpEncoded: RLPEncodedTx) {
    if (
      new SemVer(this.appConfiguration.version).compare(
        CELO_APP_ACCEPTS_CONTRACT_DATA_FROM_VERSION
      ) >= 0
    ) {
      const tokenInfo = tokenInfoByAddressAndChainId(
        rlpEncoded.transaction.to!,
        rlpEncoded.transaction.chainId!
      )
      if (tokenInfo) {
        await this.ledger!.provideERC20TokenInformation(`0x${tokenInfo.data.toString('hex')}`)
      }
      if (rlpEncoded.transaction.feeCurrency && rlpEncoded.transaction.feeCurrency !== '0x') {
        const feeTokenInfo = tokenInfoByAddressAndChainId(
          rlpEncoded.transaction.feeCurrency!,
          rlpEncoded.transaction.chainId!
        )
        if (feeTokenInfo) {
          await this.ledger!.provideERC20TokenInformation(`0x${feeTokenInfo.data.toString('hex')}`)
        }
      }
    }
  }

  decrypt(_ciphertext: Buffer) {
    throw new Error('Decryption operation is not supported on this signer')
    // To make the compiler happy
    return Promise.resolve(_ciphertext)
  }

  computeSharedSecret(_publicKey: string) {
    throw new Error('Not implemented')
    return Promise.resolve(Buffer.from([]))
  }
}
