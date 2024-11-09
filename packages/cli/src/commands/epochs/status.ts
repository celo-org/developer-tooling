import { BaseCommand } from '../../base'

export default class Start extends BaseCommand {
  static description = 'Shows info on epoch process.'

  static flags = {
    ...BaseCommand.flags,
  }

  static args = {}

  async run() {
    const kit = await this.getKit()
    const res = await this.parse(Start)
    const address = res.flags.from

    kit.defaultAccount = address

    const epochManager = await kit.contracts.getEpochManager()

    console.log('Duration of Epoch', await epochManager.epochDuration())

    const isTimeForNextEpoch = await epochManager.isTimeForNextEpoch()

    console.log('isTimeForNextEpoch', isTimeForNextEpoch)

    const epochNumber = await epochManager.getCurrentEpochNumber()
    console.log('Current Epoch Number', epochNumber)

    console.log('Is Procssing? Epoch', await epochManager.isOnEpochProcess())

    console.log('first block of epoch', await epochManager.getFirstBlockAtEpoch(epochNumber))
    console.log('Current Block Number', await kit.web3.eth.getBlockNumber())
  }
}
