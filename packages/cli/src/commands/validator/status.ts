import { Address } from '@celo/connect'
import { eqAddress } from '@celo/utils/lib/address'
import { concurrentMap } from '@celo/utils/lib/async'
import { bitIsSet, parseBlockExtraData } from '@celo/utils/lib/istanbul'
import { Flags, ux } from '@oclif/core'

import { BaseCommand } from '../../base'
import { newCheckBuilder } from '../../utils/checks'
import { CustomFlags } from '../../utils/command'
import { ElectionResultsCache } from '../../utils/election'

interface ValidatorStatusEntry {
  name: string
  address: Address
  signer: Address
  elected: boolean
  frontRunner: boolean
  signatures: number
}

export const statusTable = {
  address: {},
  name: {},
  signer: {},
  elected: {},
  frontRunner: {},
  signatures: {
    get: (vs: { status: ValidatorStatusEntry }) =>
      isNaN(vs.status.signatures) ? '' : (vs.status.signatures * 100).toFixed(2) + '%',
  },
}

export default class ValidatorStatus extends BaseCommand {
  static description =
    'Shows the consensus status of a validator. This command will show whether a validator is currently elected, would be elected if an election were to be run right now, and the percentage of blocks signed and number of blocks successfully proposed within a given window.'

  static flags = {
    ...BaseCommand.flags,
    validator: CustomFlags.address({
      description: 'address of the validator to check if elected and validating',
      exclusive: ['all', 'signer'],
    }),
    signer: CustomFlags.address({
      description: 'address of the signer to check if elected and validating',
      exclusive: ['validator', 'all'],
    }),
    all: Flags.boolean({
      description: 'get the status of all registered validators',
      exclusive: ['validator', 'signer'],
    }),
    start: Flags.integer({
      description:
        'what block to start at when looking at signer activity. defaults to the last 100 blocks',
      default: -1,
    }),
    end: Flags.integer({
      description:
        'what block to end at when looking at signer activity. defaults to the latest block',
      default: -1,
    }),
    ...(ux.table.flags() as object),
  }

  static examples = [
    'status --validator 0x5409ED021D9299bf6814279A6A1411A7e866A631',
    'status --validator 0x5409ED021D9299bf6814279A6A1411A7e866A631 --start 1480000',
    'status --all --start 1480000 --end 1490000',
  ]

  async run() {
    const kit = await this.getKit()
    const res = await this.parse(ValidatorStatus)
    const accounts = await kit.contracts.getAccounts()
    const validators = await kit.contracts.getValidators()
    const election = await kit.contracts.getElection()

    // Resolve the signer address(es) from the provide flags.
    let signers: string[] = []
    const checker = newCheckBuilder(this)
    if (res.flags.signer) {
      signers = [res.flags.signer]
      const validator = await accounts.signerToAccount(res.flags.signer)
      checker.isAccount(validator).isValidator(validator)
      await checker.runChecks()
    } else if (res.flags.validator) {
      checker.isAccount(res.flags.validator).isValidator(res.flags.validator)
      await checker.runChecks()
      const signer = await accounts.getValidatorSigner(res.flags.validator)
      signers = [signer]
    } else {
      signers = await concurrentMap(10, await validators.getRegisteredValidatorsAddresses(), (a) =>
        accounts.getValidatorSigner(a)
      )
    }

    const latest = await kit.web3.eth.getBlockNumber()
    const endBlock = res.flags.end === -1 ? await kit.web3.eth.getBlockNumber() : res.flags.end
    const startBlock = res.flags.start === -1 ? endBlock - 100 : res.flags.start
    if (startBlock > endBlock || endBlock > latest) {
      this.error('invalid values for start/end')
    }

    const epochSize = (await validators.getEpochSize()).toNumber()
    const electionCache = new ElectionResultsCache(election, epochSize)
    let frontRunnerSigners: string[] = []
    ux.action.start(`Running mock election`)
    try {
      frontRunnerSigners = await election.electValidatorSigners()
    } catch (err) {
      console.warn('Warning: Elections not available')
    }
    ux.action.stop()
    const signatureCounts = await this.getSignatureCounts(startBlock, endBlock, electionCache)
    const electedCounts = await this.getElectedCounts(
      startBlock,
      endBlock,
      electionCache,
      epochSize
    )
    ux.action.start(`Fetching validator information`)
    const validatorStatuses = await concurrentMap(10, signers, (s) =>
      this.getStatus(s, signatureCounts, electedCounts, electionCache, frontRunnerSigners)
    )
    ux.action.stop()

    ux.table(
      validatorStatuses.map((vs) => ({ status: vs })),
      statusTable,
      res.flags
    )
  }

  private async getSignatureCounts(
    start: number,
    end: number,
    electionCache: ElectionResultsCache
  ): Promise<Map<Address, any>> {
    const bar = ux.progress({
      format: 'counting block signatures [{bar}] {percentage}% | ETA: {eta}s | {value}/{total}',
    })
    bar.start(end - start)
    const countsBySigner = new Map()
    const incrementSignatureCounts = async (blockNumber: number) => {
      if ((blockNumber - start) % 10 === 0 || blockNumber === end) {
        bar.update(blockNumber - start)
      }
      const web3 = await this.getWeb3()
      const block = await web3.eth.getBlock(blockNumber)
      const bitmap = parseBlockExtraData(block.extraData).parentAggregatedSeal.bitmap
      const signers = await electionCache.electedSigners(blockNumber)
      signers.map((s, i) => {
        if (bitIsSet(bitmap, i)) {
          const count = countsBySigner.get(s) === undefined ? 0 : countsBySigner.get(s)
          countsBySigner.set(s, count + 1)
        }
      })
    }
    await concurrentMap(
      10,
      Array.from({ length: end - start + 1 }, (_, i) => i + start),
      incrementSignatureCounts
    )
    const kit = await this.getKit()
    const signerToAccountCache = new Map()
    const accounts = await kit.contracts.getAccounts()
    await concurrentMap(10, Array.from(countsBySigner.keys()), async (signer) => {
      const account = await accounts.signerToAccount(signer)
      signerToAccountCache.set(signer, account)
    })
    const countsByAccount = new Map()
    countsBySigner.forEach(async (count, signer) => {
      const account = signerToAccountCache.get(signer)
      const total = countsByAccount.get(account)
      countsByAccount.set(account, total === undefined ? count : count + total)
    })
    bar.stop()
    return countsByAccount
  }

  private epochNumber(blockNumber: number, epochSize: number): number {
    return Math.ceil(blockNumber / epochSize)
  }

  private firstBlockOfEpoch(epochNumber: number, epochSize: number): number {
    return (epochNumber - 1) * epochSize + 1
  }

  private async getElectedCounts(
    start: number,
    end: number,
    electionCache: ElectionResultsCache,
    epochSize: number
  ): Promise<Map<Address, any>> {
    const kit = await this.getKit()
    const countsBySigner = new Map()
    let i = start
    while (i < end) {
      const epoch = this.epochNumber(i, epochSize)
      const j = Math.min(this.firstBlockOfEpoch(epoch + 1, epochSize) - 1, end)
      const signers = await electionCache.electedSigners(i)
      signers.map((s) => {
        const count = countsBySigner.get(s) === undefined ? 0 : countsBySigner.get(s)
        countsBySigner.set(s, count + (j - i) + 1)
      })
      i = j + 1
    }
    const signerToAccountCache = new Map()
    const accounts = await kit.contracts.getAccounts()
    await concurrentMap(10, Array.from(countsBySigner.keys()), async (signer) => {
      const account = await accounts.signerToAccount(signer)
      signerToAccountCache.set(signer, account)
    })
    const countsByAccount = new Map()
    countsBySigner.forEach(async (count, signer) => {
      const account = signerToAccountCache.get(signer)
      const total = countsByAccount.get(account)
      countsByAccount.set(account, total === undefined ? count : count + total)
    })
    return countsByAccount
  }

  private async getStatus(
    signer: Address,
    signatureCounts: Map<Address, number>,
    electedCounts: Map<Address, number>,
    electionCache: ElectionResultsCache,
    frontRunnerSigners: Address[]
  ): Promise<ValidatorStatusEntry> {
    const kit = await this.getKit()
    const [accounts, validators] = await Promise.all([
      kit.contracts.getAccounts(),
      kit.contracts.getValidators(),
    ])
    const validator = await accounts.signerToAccount(signer)
    let name = 'Unregistered validator'
    if (await validators.isValidator(validator)) {
      name = (await accounts.getName(validator)) || ''
    }
    let signatures = signatureCounts.get(validator)
    if (signatures === undefined) {
      signatures = 0
    }
    let elected = electedCounts.get(validator)
    if (elected === undefined) {
      elected = 0
    }
    return {
      name,
      address: validator,
      signer,
      elected: await electionCache.elected(signer, await kit.web3.eth.getBlockNumber()),
      frontRunner: frontRunnerSigners.some(eqAddress.bind(null, signer)),
      signatures: signatures / elected, // may be NaN
    }
  }
}
