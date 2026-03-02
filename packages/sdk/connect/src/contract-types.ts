import {
  type GetContractReturnType,
  type PublicClient,
  type WalletClient,
  defineChain,
  getContract,
} from 'viem'

/**
 * Viem-native contract type for Celo contracts.
 * Replaces the custom ViemContract interface with viem's native GetContractReturnType.
 * Provides type-safe `.read`, `.write`, `.simulate`, `.estimateGas` namespaces
 * when a const-typed ABI is provided.
 */
export type CeloContract<TAbi extends readonly unknown[] = readonly unknown[]> =
  GetContractReturnType<TAbi, { public: PublicClient; wallet: WalletClient }>

/**
 * Wrap the `.write` proxy from viem's getContract so that CeloTx-style
 * `{ from }` overrides are mapped to viem's `{ account }`, a dynamic
 * default account is injected when neither is provided, and the `chain`
 * is resolved from the connected RPC to satisfy viem's chain validation.
 */
function wrapWriteWithAccountMapping(
  write: any,
  estimateGasNs: any,
  getDefaultAccount?: () => string | undefined,
  getChainId?: () => Promise<number>
): any {
  let chainCache: ReturnType<typeof defineChain> | undefined

  return new Proxy(write, {
    get(target: any, prop: string | symbol, receiver: any) {
      const method = Reflect.get(target, prop, receiver)
      if (typeof method !== 'function') return method
      return async (...args: any[]) => {
        const lastIdx = args.length - 1
        const lastArg = lastIdx >= 0 ? args[lastIdx] : undefined
        const isOverrides =
          lastArg != null && typeof lastArg === 'object' && !Array.isArray(lastArg)

        // Map CeloTx 'from' -> viem 'account'
        if (isOverrides && lastArg.from && !lastArg.account) {
          args[lastIdx] = { ...lastArg, account: lastArg.from }
          delete args[lastIdx].from
        }

        // Inject default account when no account is present
        const currentOverrides = isOverrides ? args[lastIdx] : undefined
        if (!currentOverrides?.account && getDefaultAccount) {
          const defaultAccount = getDefaultAccount()
          if (defaultAccount) {
            if (isOverrides) {
              args[lastIdx] = { ...args[lastIdx], account: defaultAccount }
            } else if (lastIdx >= 0 && args[lastIdx] == null) {
              args[lastIdx] = { account: defaultAccount }
            } else {
              args.push({ account: defaultAccount })
            }
          }
        }

        // Inject chain from RPC so viem's chain validation passes
        if (getChainId) {
          if (!chainCache) {
            const id = await getChainId()
            chainCache = defineChain({
              id,
              name: 'celo',
              nativeCurrency: { name: 'CELO', symbol: 'CELO', decimals: 18 },
              rpcUrls: { default: { http: [] } },
            })
          }
          // Ensure chain is in the last overrides object
          const oIdx = args.length - 1
          const oArg = oIdx >= 0 ? args[oIdx] : undefined
          if (oArg && typeof oArg === 'object' && !Array.isArray(oArg)) {
            if (!oArg.chain) {
              args[oIdx] = { ...oArg, chain: chainCache }
            }
          } else {
            args.push({ chain: chainCache })
          }
        }

        // Pre-flight gas estimation to catch reverts before sending the tx.
        // Strip `gas` from estimation args — estimation determines gas, it shouldn't receive a gas limit.
        if (estimateGasNs && typeof estimateGasNs[prop as string] === 'function') {
          const estArgs = [...args]
          const estLastIdx = estArgs.length - 1
          const estLast = estLastIdx >= 0 ? estArgs[estLastIdx] : undefined
          if (
            estLast &&
            typeof estLast === 'object' &&
            !Array.isArray(estLast) &&
            'gas' in estLast
          ) {
            const { gas, ...rest } = estLast
            estArgs[estLastIdx] = rest
          }
          await estimateGasNs[prop as string](...estArgs)
        }

        // Strip gas: 0 from write args — let viem estimate gas normally
        {
          const wLastIdx = args.length - 1
          const wLast = wLastIdx >= 0 ? args[wLastIdx] : undefined
          if (
            wLast &&
            typeof wLast === 'object' &&
            !Array.isArray(wLast) &&
            'gas' in wLast &&
            !wLast.gas
          ) {
            const { gas, ...rest } = wLast
            args[wLastIdx] = rest
          }
        }

        return method(...args)
      }
    },
  })
}

/**
 * Create a viem contract instance for a Celo contract.
 * Direct replacement for Connection.getViemContract().
 *
 * @param getDefaultAccount - optional callback returning the current default
 *   account address (e.g. Connection.defaultAccount). Evaluated lazily on each
 *   `.write` call so it picks up runtime changes.
 * @param getChainId - optional async callback returning the chain ID of the
 *   connected RPC. Used to satisfy viem's chain validation on write calls.
 */
export function createCeloContract<TAbi extends readonly unknown[]>(
  abi: TAbi,
  address: `0x${string}`,
  publicClient: PublicClient,
  walletClient?: WalletClient,
  getDefaultAccount?: () => string | undefined,
  getChainId?: () => Promise<number>
): CeloContract<TAbi> {
  const contract: any = walletClient
    ? getContract({
        abi,
        address,
        client: { public: publicClient, wallet: walletClient },
      })
    : getContract({ abi, address, client: publicClient })

  // Wrap .write to handle CeloTx from -> viem account mapping
  if (contract.write) {
    return {
      ...contract,
      write: wrapWriteWithAccountMapping(
        contract.write,
        contract.estimateGas,
        getDefaultAccount,
        getChainId
      ),
    } as CeloContract<TAbi>
  }

  return contract as CeloContract<TAbi>
}
