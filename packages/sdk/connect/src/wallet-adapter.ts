import type { StrongAddress } from '@celo/base'
import type { EIP712TypedData } from '@celo/utils/lib/sign-typed-data-utils'
import { toHex } from 'viem'
import type { Hex, LocalAccount } from 'viem'
import { toAccount } from 'viem/accounts'
import type { CeloTransactionSerializable } from 'viem/celo'
import type { CeloTx } from './types'
import type { ReadOnlyWallet } from './wallet'

/**
 * Adapts a ReadOnlyWallet to a viem LocalAccount.
 * This allows using any ReadOnlyWallet implementation (local, HSM, etc.)
 * with viem's wallet client and contract write operations.
 *
 * @param wallet - A ReadOnlyWallet instance
 * @param address - The account address to use for signing
 * @returns A viem LocalAccount backed by the wallet
 */
export function readOnlyWalletToAccount(
  wallet: ReadOnlyWallet,
  address: StrongAddress
): LocalAccount {
  return toAccount({
    address,

    async signTransaction(transaction: CeloTransactionSerializable) {
      const celoTx: CeloTx = {
        from: address,
        to: transaction.to ?? undefined,
        value: transaction.value,
        data: transaction.data,
        nonce: transaction.nonce,
        chainId: transaction.chainId,
        gas: transaction.gas,
      }

      if ('maxFeePerGas' in transaction) {
        celoTx.maxFeePerGas = transaction.maxFeePerGas
      }
      if ('maxPriorityFeePerGas' in transaction) {
        celoTx.maxPriorityFeePerGas = transaction.maxPriorityFeePerGas
      }
      if ('gasPrice' in transaction) {
        celoTx.gasPrice = transaction.gasPrice
      }
      if ('feeCurrency' in transaction && transaction.feeCurrency) {
        celoTx.feeCurrency = transaction.feeCurrency as StrongAddress
      }
      if ('maxFeeInFeeCurrency' in transaction) {
        celoTx.maxFeeInFeeCurrency = transaction.maxFeeInFeeCurrency as bigint
      }
      if ('accessList' in transaction && transaction.accessList) {
        celoTx.accessList = transaction.accessList as CeloTx['accessList']
      }

      const encodedTx = await wallet.signTransaction(celoTx)
      return encodedTx.raw
    },

    async signMessage({ message }) {
      const data =
        typeof message === 'string'
          ? toHex(message)
          : typeof message.raw === 'string'
            ? message.raw
            : toHex(message.raw)
      return (await wallet.signPersonalMessage(address, data)) as Hex
    },

    async signTypedData(parameters) {
      const sig = await wallet.signTypedData(address, {
        types: parameters.types,
        primaryType: parameters.primaryType,
        domain: parameters.domain ?? {},
        message: parameters.message,
      } as unknown as EIP712TypedData)
      return sig as Hex
    },
  })
}
