import { isHexString } from '@celo/base/lib/address'
import { CeloContract, RegisteredContracts } from '@celo/contractkit'
import BigNumber from 'bignumber.js'
import inquirer from 'inquirer'
import { Abi, isAddress } from 'viem'
import { ProposalBuilder } from './proposal-builder'

import type { ProposalTransactionJSON } from './'

const DONE_CHOICE = '✔ done'

export class InteractiveProposalBuilder {
  constructor(private readonly builder: ProposalBuilder) {}

  async outputTransactions() {
    const transactionList = this.builder.build()
    console.log(JSON.stringify(transactionList, null, 2))
  }

  async promptTransactions() {
    const transactions: ProposalTransactionJSON[] = []
    // eslint-disable-next-line no-constant-condition
    while (true) {
      console.log(`Transaction #${transactions.length + 1}:`)

      // prompt for contract
      const contractPromptName = 'Celo Contract'
      const contractAnswer = await inquirer.prompt({
        name: contractPromptName,
        type: 'list',
        choices: [DONE_CHOICE, ...RegisteredContracts],
      })
      const choice = contractAnswer[contractPromptName]
      if (choice === DONE_CHOICE) {
        break
      }

      const contractName = choice as CeloContract

      const contractABI = requireABI(contractName)

      const txMethods = contractABI.filter(
        (def) => def.type === 'function' && def.stateMutability !== 'view'
      )
      const txMethodNames = txMethods.map((def) => def.name!)
      // prompt for function
      const functionPromptName = contractName + ' Function'
      const functionAnswer = await inquirer.prompt<Record<string, string>>({
        name: functionPromptName,
        type: 'list',
        choices: txMethodNames,
      })
      const functionName = functionAnswer[functionPromptName]
      const idx = txMethodNames.findIndex((m) => m === functionName)
      const txDefinition = txMethods[idx]
      // prompt individually for each argument
      const args = []
      for (const functionInput of txDefinition.inputs!) {
        const inputAnswer: Record<string, string> = await inquirer.prompt({
          name: functionInput.name,
          type: 'input',
          validate: async (input: string) => {
            switch (functionInput.type) {
              case 'uint256':
                try {
                  new BigNumber(input)
                  return true
                } catch (e) {
                  return false
                }
              case 'boolean':
                return input === 'true' || input === 'false'
              case 'address':
                return isAddress(input)
              case 'bytes':
                return isHexString(input)
              default:
                return true
            }
          },
        })

        const answer: string = inputAnswer[functionInput.name]
        // transformedValue may not be in scientific notation
        const transformedValue =
          functionInput.type === 'uint256' ? new BigNumber(answer).toString(10) : answer
        args.push(transformedValue)
      }
      // prompt for value only when tx is payable
      let value: string
      if (txDefinition.payable) {
        const valuePromptName = 'Value'
        const valueAnswer = await inquirer.prompt({
          name: valuePromptName,
          type: 'input',
        })
        value = valueAnswer[valuePromptName]
      } else {
        value = '0'
      }
      const tx: ProposalTransactionJSON = {
        contract: contractName,
        function: functionName,
        args,
        value,
      }

      try {
        // use fromJsonTx as well-formed tx validation
        await this.builder.fromJsonTx(tx)
        transactions.push(tx)
      } catch (error) {
        console.error(error)
        console.error('Please retry forming this transaction')
      }
    }

    return transactions
  }
}
export function requireABI(contractName: CeloContract): Abi {
  // Handle known aliases
  if (contractName === CeloContract.CeloToken) {
    contractName = CeloContract.GoldToken
  } else if (contractName === CeloContract.LockedCelo) {
    contractName = CeloContract.LockedGold
  }

  // Attempt to load from '@celo/abis/dist/' first (preferred, raw ABI)
  try {
    // Construct path similar to getCoreContractAbi in proposal-builder.ts
    const abiPath = `@celo/abis/dist/${contractName}.json`
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const abi = require(abiPath)
    if (abi) {
      return abi as Abi
    }
  } catch (e) {
    // debug(`Failed to load ABI for ${contractName} from dist path: ${e}`)
  }

  // Fallback to legacy '@celo/abis/web3/' paths if 'dist' fails
  // These might have the { ABI: [...] } structure
  for (const path of ['', '0.8/', 'mento/']) {
    const abiFromWeb3Path = safeRequireWeb3(contractName, path)
    if (abiFromWeb3Path !== null) {
      return abiFromWeb3Path
    }
  }
  throw new Error(
    `Cannot require ABI for ${contractName} from either '@celo/abis/dist/' or '@celo/abis/web3/'`
  )
}

// Tries to load ABIs that are structured with a top-level 'ABI' key (legacy web3 style)
function safeRequireWeb3(contractName: CeloContract, subPath?: string): Abi | null {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const module = require(`@celo/abis/web3/${subPath ?? ''}${contractName}`)
    return module.ABI as Abi
  } catch {
    return null
  }
}
