/* eslint max-classes-per-file: off */

import { Provider } from '@celo/connect/lib/types'
import { stopProvider } from '@celo/connect/lib/utils/provider-utils'
import { concurrentMap } from '@celo/utils/lib/async'
import { Flags, ux } from '@oclif/core'
import chalk from 'chalk'
import { BaseCommand } from '../../base'
import { CustomFlags } from '../../utils/command'
import { ElectionResultsCache } from '../../utils/election'

export default class ValidatorSignedBlocks extends BaseCommand {
  static description =
    "Display a graph of blocks and whether the given signer's signature is included in each. A green '.' indicates the signature is present in that block, a red '✘' indicates the signature is not present. A yellow '~' indicates the signer is not elected for that block."

  static flags = {
    ...BaseCommand.flags,
    signer: CustomFlags.address({
      description: 'address of the signer to check for signatures',
      exclusive: ['signers'],
    }),
    signers: CustomFlags.addressArray({
      description: 'list of signer addresses to check for signatures',
      exclusive: ['signer'],
    }),
    wasDownWhileElected: Flags.boolean({
      description: 'indicate whether a validator was down while elected for range',
    }),
    'at-block': Flags.integer({
      description: 'latest block to examine for signer activity',
      exclusive: ['follow'],
    }),
    lookback: Flags.integer({
      description: 'how many blocks to look back for signer activity',
      default: 120,
      exclusive: ['slashableDowntime'],
    }),
    slashableDowntimeLookback: Flags.boolean({
      description: 'lookback of slashableDowntime',
      exclusive: ['lookback'],
    }),
    width: Flags.integer({
      description: 'line width for printing marks',
      default: 40,
    }),
    follow: Flags.boolean({
      char: 'f',
      default: false,
      exclusive: ['at-block'],
      hidden: true,
    }),
  }

  static examples = [
    'signed-blocks --signer 0x5409ED021D9299bf6814279A6A1411A7e866A631',
    'signed-blocks --signer 0x5409ED021D9299bf6814279A6A1411A7e866A631 --follow',
    'signed-blocks --at-block 100000 --signer 0x5409ED021D9299bf6814279A6A1411A7e866A631',
    'signed-blocks --lookback 500 --signer 0x5409ED021D9299bf6814279A6A1411A7e866A631',
    'signed-blocks --lookback 50 --width 10 --signer 0x5409ED021D9299bf6814279A6A1411A7e866A631',
  ]

  async run() {
    const isCel2 = await this.isCel2()

    if (isCel2) {
      this.error(
        'This command is not supported after CEL2 hardfork as the BFT consensus has been removed, see https://docs.celo.org/cel2/whats-changed/l1-l2 for more details'
      )
    }

    const kit = await this.getKit()
    const res = await this.parse(ValidatorSignedBlocks)
    const web3 = await this.getWeb3()
    const election = await kit.contracts.getElection()
    const electionCache = new ElectionResultsCache(kit, election, isCel2)

    if (res.flags.follow) {
      console.info('Follow mode, press q or ctrl-c to quit')
    }

    const latest = res.flags['at-block']
      ? res.flags['at-block'] + 1
      : (await web3.eth.getBlock('latest')).number

    let lookback: number
    if (res.flags.slashableDowntimeLookback) {
      const downtimeSlasher = await kit.contracts.getDowntimeSlasher()
      lookback = await downtimeSlasher.slashableDowntime()
    } else {
      lookback = res.flags.lookback
    }

    const blocks = await concurrentMap(10, [...Array(lookback).keys()], (i) =>
      web3.eth.getBlock(latest - lookback! + i + 1)
    )

    const signers = res.flags.signers ?? [res.flags.signer!]

    for (const signer of signers) {
      let wasDown: boolean
      let wasElected: boolean
      let printer: MarkPrinter
      if (res.flags.wasDownWhileElected) {
        wasDown = true
        wasElected = true
      } else {
        printer = new MarkPrinter(res.flags.width!)
      }
      try {
        for (const block of blocks) {
          const elected = await electionCache.elected(signer, block.number - 1)
          const signed = elected && (await electionCache.signedParent(signer, block))
          if (res.flags.wasDownWhileElected) {
            wasElected = wasElected! && elected
            wasDown = wasDown! && !signed
          } else {
            printer!.addMark(block.number - 1, elected, signed)
          }
        }

        if (res.flags.follow) {
          const newWeb3 = await this.newWeb3()
          const subscription = web3.eth
            .subscribe('newBlockHeaders', (error) => {
              if (error) {
                this.error(error)
              }
            })
            .on('data', async (block) => {
              const elected = await electionCache.elected(signer, block.number - 1)
              const signed = elected && (await electionCache.signedParent(signer, block))
              if (!res.flags.wasDownWhileElected) {
                printer!.addMark(block.number - 1, elected, signed)
              }
            })
            .on('error', (error) => {
              this.error(`error in block header subscription: ${error}`)
            })

          try {
            let response: string
            do {
              response = await ux.prompt('', { prompt: '', type: 'single', required: false })
            } while (response !== 'q' && response !== '\u0003' /* ctrl-c */)
          } finally {
            await subscription.unsubscribe()
            stopProvider(newWeb3.currentProvider as Provider)
          }
        }
      } finally {
        if (res.flags.wasDownWhileElected) {
          const was = (b: boolean) => 'was' + (b ? '' : ' not')
          console.log(`signer ${signer} ${was(wasElected!)} elected and ${was(wasDown!)} down`)
        } else {
          await printer!.done()
        }
      }
    }
  }
}

/**
 * Printer object to output marks in a grid to indicate signing status.
 */
class MarkPrinter {
  private previousBlockNumber: number | null = null

  constructor(private width: number) {}

  addMark(blockNumber: number, elected: boolean, signed: boolean) {
    if (this.previousBlockNumber === null) {
      const labelNumber = Math.floor(blockNumber / this.width) * this.width
      this.previousBlockNumber = labelNumber - 1
    }
    if (blockNumber <= this.previousBlockNumber - 1) {
      throw new Error(
        `cannot add mark for ${blockNumber} which is not after ${this.previousBlockNumber}`
      )
    }

    for (let i = this.previousBlockNumber + 1; i <= blockNumber; i++) {
      if (i % this.width === 0) {
        this.printLineLabel(i)
      }
      if (i < blockNumber) {
        process.stdout.write(' ')
      } else {
        process.stdout.write(this.mark(elected, signed))
      }
    }
    this.previousBlockNumber = blockNumber
  }

  async done() {
    // Print a final newline to complete the line.
    return new Promise<void>((resolve, reject) => {
      process.stdout.write('\n', (err: any) => (err ? reject(err) : resolve()))
    })
  }

  private mark(elected: boolean, signed: boolean) {
    return elected ? (signed ? chalk.green('.') : chalk.red('✘')) : chalk.yellow('~')
  }

  private printLineLabel(blockNumber: number, newline: boolean = true) {
    if (newline) {
      process.stdout.write('\n')
    }
    process.stdout.write(`${blockNumber} `.padStart(8, ' '))
  }
}
