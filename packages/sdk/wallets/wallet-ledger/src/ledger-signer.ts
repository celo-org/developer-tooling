import { ensureLeading0x, trimLeading0x } from '@celo/base/lib/address'
import { RLPEncodedTx, Signer } from '@celo/connect'
import Ledger from '@celo/hw-app-eth'
import { EIP712TypedData, structHash } from '@celo/utils/lib/sign-typed-data-utils'
import { LegacyEncodedTx } from '@celo/wallet-base'
import * as ethUtil from '@ethereumjs/util'
import { TransportStatusError } from '@ledgerhq/errors'
import debugFactory from 'debug'
import { SemVer } from 'semver'
import { meetsVersionRequirements, transportErrorFriendlyMessage } from './ledger-utils'
import { AddressValidation, LedgerWallet } from './ledger-wallet'
import { legacyTokenInfoByAddressAndChainId, tokenInfoByAddressAndChainId } from './tokens'

const debug = debugFactory('kit:wallet:ledger')

/**
 * Signs the EVM transaction with a Ledger device
 */
export class LedgerSigner implements Signer {
  private ledger: Ledger
  private derivationPath: string
  private validated: boolean = false
  private ledgerAddressValidation: AddressValidation
  private appConfiguration: { arbitraryDataEnabled: number; version: string; appName: string }

  constructor(
    ledger: Ledger,
    derivationPath: string,
    ledgerAddressValidation: AddressValidation,
    appConfiguration: { arbitraryDataEnabled: number; version: string; appName: string } = {
      arbitraryDataEnabled: 0,
      version: '0.0.0',
      appName: 'unknown',
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
    _addToV: number,
    encodedTx: RLPEncodedTx | LegacyEncodedTx
  ): Promise<{ v: number; r: Buffer; s: Buffer }> {
    try {
      const validatedDerivationPath = await this.getValidatedDerivationPath()
      await this.checkForKnownToken(encodedTx)
      let {
        r,
        s,
        v: _v,
      } = await this.ledger!.signTransaction(
        validatedDerivationPath,
        trimLeading0x(encodedTx.rlpEncode), // the ledger requires the rlpEncode without the leading 0x
        null
      )

      if (typeof _v === 'string' && (_v === '' || _v === '0x')) {
        console.warn(
          `ledger-signer@signTransaction: signature \`v\` was malformed \`${_v}\`. Replaced with "0x0"`
        )
        _v = '0x0'
      }
      const v = typeof _v === 'string' ? parseInt(ensureLeading0x(_v), 16) : _v
      if (isNaN(v)) {
        throw new Error(
          `ledger-signer@signTransaction: signature \`v\` was malformed and was parsed to NaN \`${_v}\``
        )
      }

      return {
        v,
        r: ethUtil.toBuffer(ensureLeading0x(r)),
        s: ethUtil.toBuffer(ensureLeading0x(s)),
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
    if (this.appConfiguration.appName === 'celo') {
      throw new Error('Not implemented as of this release.')
    }

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
  private async checkForKnownToken(rlpEncoded: RLPEncodedTx | LegacyEncodedTx) {
    const version = new SemVer(this.appConfiguration.version)
    if (meetsVersionRequirements(version, { minimum: LedgerWallet.MIN_VERSION_TOKEN_DATA })) {
      const getTokenInfo = meetsVersionRequirements(version, {
        minimum: LedgerWallet.MIN_VERSION_EIP1559,
      })
        ? tokenInfoByAddressAndChainId
        : legacyTokenInfoByAddressAndChainId

      const tokenInfo = getTokenInfo(rlpEncoded.transaction.to!, rlpEncoded.transaction.chainId!)
      if (tokenInfo) {
        await this.provideERC20TokenInformation(tokenInfo.data)
      }
      if (rlpEncoded.transaction.feeCurrency && rlpEncoded.transaction.feeCurrency !== '0x') {
        const feeTokenInfo = getTokenInfo(
          rlpEncoded.transaction.feeCurrency!,
          rlpEncoded.transaction.chainId!
        )
        if (feeTokenInfo) {
          await this.provideERC20TokenInformation(feeTokenInfo.data)
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

  private provideERC20TokenInformation(tokenInfoData: Buffer) {
    return this.ledger!.provideERC20TokenInformation(trimLeading0x(tokenInfoData.toString('hex')))
  }
}
