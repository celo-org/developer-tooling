import { newICeloVersionedContract } from '@celo/abis/web3/ICeloVersionedContract'
import { newProxy } from '@celo/abis/web3/Proxy'
import { concurrentMap } from '@celo/base'
import { CeloContract } from '@celo/contractkit'
import { ux } from '@oclif/core'

import { BaseCommand } from '../../base'

const UNVERSIONED_CONTRACTS = [
  CeloContract.Registry,
  CeloContract.FeeCurrencyWhitelist,
  CeloContract.Freezer,
  CeloContract.StableToken,
  CeloContract.StableTokenBRL,
  CeloContract.StableTokenEUR,
]
const UNPROXIED_CONTRACTS: CeloContract[] = []

export default class Contracts extends BaseCommand {
  static description = 'Lists Celo core contracts and their addresses.'

  static flags = {
    ...BaseCommand.flags,
    ...(ux.table.flags() as object),
  }

  async run() {
    const kit = await this.getKit()
    const res = await this.parse(Contracts)

    const addressMapping = await kit.registry.addressMapping()
    const contractInfo = await concurrentMap(
      6,
      Array.from(addressMapping.entries()),
      async ([contract, proxy]) => {
        // skip implementation check for known unproxied contracts
        let implementation: string
        if (UNPROXIED_CONTRACTS.includes(contract)) {
          implementation = 'NONE'
        } else {
          try {
            implementation = await newProxy(kit.web3, proxy).methods._getImplementation().call()
          } catch (e) {
            // if we fail to get implementation that means it doesnt have one so set it to NONE
            implementation = 'NONE'
          }
        }
        // skip version check for unversioned contracts (unproxied contracts are by definition unversioned))
        let version: string
        if (UNVERSIONED_CONTRACTS.includes(contract) || implementation === 'NONE') {
          version = 'NONE'
        } else {
          const raw = await newICeloVersionedContract(kit.web3, implementation)
            .methods.getVersionNumber()
            .call()
          version = `${raw[0]}.${raw[1]}.${raw[2]}.${raw[3]}`
        }

        const balances = await kit.celoTokens.balancesOf(proxy)
        return {
          contract,
          proxy,
          implementation,
          version,
          balances,
        }
      }
    )

    const tokenBalanceColumns: ux.Table.table.Columns<(typeof contractInfo)[number]> = {}
    await kit.celoTokens.forEachCeloToken(
      (token) =>
        (tokenBalanceColumns[token.symbol] = {
          header: token.symbol,
          get: (i) => {
            const balance = i.balances[token.symbol]!
            return balance.isZero() ? '0' : balance.toExponential(3)
          },
        })
    )

    ux.table(
      contractInfo,
      {
        contract: { get: (i) => i.contract },
        proxy: { get: (i) => i.proxy },
        implementation: { get: (i) => i.implementation },
        version: {
          get: (i) => i.version,
        },
        ...tokenBalanceColumns,
      },
      { sort: 'contract', ...res.flags }
    )
  }
}
