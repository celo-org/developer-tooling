import { CELO_DERIVATION_PATH_BASE } from '@celo/base/lib/account'
import { zeroRange } from '@celo/base/lib/collections'
import { Address, CeloTx, EncodedTransaction, ReadOnlyWallet, isPresent } from '@celo/connect'
import {
  chainIdTransformationForSigning,
  encodeTransaction,
  encode_deprecated_celo_legacy_type_only_for_temporary_ledger_compat,
  isCIP64,
  isEIP1559,
  rlpEncodedTx,
} from '@celo/wallet-base'
import { RemoteWallet } from '@celo/wallet-remote'
import { TransportError, TransportStatusError } from '@ledgerhq/errors'
import Ledger from '@celo/hw-app-eth'
import debugFactory from 'debug'
import { SemVer } from 'semver'
import { LedgerSigner } from './ledger-signer'
import { meetsVersionRequirements, transportErrorFriendlyMessage } from './ledger-utils'

export const CELO_BASE_DERIVATION_PATH = `${CELO_DERIVATION_PATH_BASE.slice(2)}/0`
const ADDRESS_QTY = 5

// Validates an address using the Ledger
export enum AddressValidation {
  // Validates every address required only when the ledger is initialized
  initializationOnly,
  // Validates the address every time a transaction is made
  everyTransaction,
  // Validates the address the first time a transaction is made for that specific address
  firstTransactionPerAddress,
  // Never validates the addresses
  never,
}

export async function newLedgerWalletWithSetup(
  transport: any,
  derivationPathIndexes?: number[],
  baseDerivationPath?: string,
  ledgerAddressValidation?: AddressValidation,
  isCel2?: boolean
): Promise<LedgerWallet> {
  const wallet = new LedgerWallet(
    derivationPathIndexes,
    baseDerivationPath,
    transport,
    ledgerAddressValidation,
    isCel2
  )
  await wallet.init()
  return wallet
}

const debug = debugFactory('kit:wallet:ledger')

export class LedgerWallet extends RemoteWallet<LedgerSigner> implements ReadOnlyWallet {
  static MIN_VERSION_SUPPORTED = '1.0.0'
  static MIN_VERSION_TOKEN_DATA = '1.0.2'
  static MIN_VERSION_EIP1559 = '1.2.0'
  ledger: Ledger | undefined

  /**
   * @param derivationPathIndexes number array of "address_index" for the base derivation path.
   * Default: Array[0..9].
   * Example: [3, 99, 53] will retrieve the derivation paths of
   * [`${baseDerivationPath}/3`, `${baseDerivationPath}/99`, `${baseDerivationPath}/53`]
   * @param baseDerivationPath base derivation path. Default: "44'/52752'/0'/0"
   * @param transport Transport to connect the ledger device
   */
  constructor(
    readonly derivationPathIndexes: number[] = zeroRange(ADDRESS_QTY),
    readonly baseDerivationPath: string = CELO_BASE_DERIVATION_PATH,
    readonly transport: any = {},
    readonly ledgerAddressValidation: AddressValidation = AddressValidation.firstTransactionPerAddress,
    readonly isCel2?: boolean
  ) {
    super()
    const invalidDPs = derivationPathIndexes.some(
      (value) => !(Number.isInteger(value) && value >= 0)
    )
    if (invalidDPs) {
      throw new Error('ledger-wallet: Invalid address index')
    }
  }

  async signTransaction(txParams: CeloTx): Promise<EncodedTransaction> {
    const rlpEncoded = await this.rlpEncodedTxForLedger(txParams)
    const addToV =
      rlpEncoded.type === 'celo-legacy' ? chainIdTransformationForSigning(txParams.chainId!) : 27

    // Get the signer from the 'from' field
    const fromAddress = txParams.from!.toString()
    const signer = this.getSigner(fromAddress)
    const signature = await signer!.signTransaction(addToV, rlpEncoded)

    return encodeTransaction(rlpEncoded, signature)
  }

  async rlpEncodedTxForLedger(txParams: CeloTx) {
    if (!txParams) {
      throw new Error('No transaction object given!')
    }

    const deviceApp = await this.retrieveAppConfiguration()
    const version = new SemVer(deviceApp.version)

    // if the app is of minimum version it doesnt matter if chain is cel2 or not
    if (meetsVersionRequirements(version, { minimum: LedgerWallet.MIN_VERSION_EIP1559 })) {
      if (txParams.gasPrice && txParams.feeCurrency && txParams.feeCurrency !== '0x') {
        throw new Error(
          `celo ledger app above ${LedgerWallet.MIN_VERSION_EIP1559} cannot serialize legacy celo transactions. Replace "gasPrice" with "maxFeePerGas".`
        )
      }
      if (txParams.gasPrice) {
        throw new Error(
          'ethereum-legacy transactions are not supported, please try sending a more modern transaction instead (eip1559, cip64, etc.)'
        )
      }
      // TODO ensure it is building a 1559 or cip64 tx, possibly force it
      // by deleting/ adding properties instead of throwing.
      // TODO when cip66 is implemented ensure it is not that
      // @ts-expect-error -- 66 isnt in this branch but will be in the release so future proof
      if (isEIP1559(txParams) || (isCIP64(txParams) && !isPresent(txParams.maxFeePerFeeCurrency))) {
        return rlpEncodedTx(txParams)
      } else {
        throw new Error(
          'only eip1559 and cip64 transactions can be signd by this version of celo ledger app'
        )
      }
      // but if not celo as layer 2 and as layer 1 are different
    } else {
      if (this.isCel2) {
        throw new Error(
          `celo ledger app version must be at least ${LedgerWallet.MIN_VERSION_EIP1559} to sign transactions supported on celo after the L2 upgrade`
        )
      } else {
        // the l1 legacy case
        console.warn(
          `Upgrade your celo ledger app to at least ${LedgerWallet.MIN_VERSION_EIP1559} before cel2 transition`
        )
        if (!txParams.gasPrice) {
          // this version of app only supports legacy so must have gasPrice
          txParams.gasPrice = txParams.maxFeePerGas
          delete txParams.maxFeePerGas
          delete txParams.maxPriorityFeePerGas
          console.info('automatically converting to legacy transaction')
        }
        return encode_deprecated_celo_legacy_type_only_for_temporary_ledger_compat(txParams)
      }
    }
  }

  protected async loadAccountSigners(): Promise<Map<Address, LedgerSigner>> {
    if (!this.ledger) {
      this.ledger = this.generateNewLedger(this.transport)
    }
    debug('Fetching addresses from the ledger')
    let addressToSigner = new Map<Address, LedgerSigner>()
    try {
      addressToSigner = await this.retrieveAccounts()
    } catch (error) {
      if (error instanceof TransportStatusError || error instanceof TransportError) {
        transportErrorFriendlyMessage(error)
      }
      throw error
    }
    return addressToSigner
  }

  // Extracted for testing purpose
  private generateNewLedger(transport: any) {
    return new Ledger(transport)
  }

  private async retrieveAccounts(): Promise<Map<Address, LedgerSigner>> {
    const addressToSigner = new Map<Address, LedgerSigner>()
    const appConfiguration = await this.retrieveAppConfiguration()
    const validationRequired = this.ledgerAddressValidation === AddressValidation.initializationOnly

    // Each address must be retrieved synchronously, (ledger lock)
    for (const value of this.derivationPathIndexes) {
      const derivationPath = `${this.baseDerivationPath}/${value}`
      const addressInfo = await this.ledger!.getAddress(derivationPath, validationRequired)
      addressToSigner.set(
        addressInfo.address!,
        new LedgerSigner(
          this.ledger!,
          derivationPath,
          this.ledgerAddressValidation,
          appConfiguration
        )
      )
    }
    return addressToSigner
  }

  private async retrieveAppConfiguration(): Promise<{
    arbitraryDataEnabled: number
    version: string
  }> {
    const appConfiguration = await this.ledger!.getAppConfiguration()
    if (new SemVer(appConfiguration.version).compare(LedgerWallet.MIN_VERSION_SUPPORTED) === -1) {
      throw new Error(
        `Due to technical issues, we require the users to update their ledger celo-app to >= ${LedgerWallet.MIN_VERSION_SUPPORTED}. You can do this on ledger-live by updating the celo-app in the app catalog.`
      )
    }
    if (!appConfiguration.arbitraryDataEnabled) {
      console.warn(
        'Beware, your ledger does not allow the use of contract data. Some features may not work correctly, including token transfers. You can enable it from the ledger app settings.'
      )
    }
    return appConfiguration
  }
}
