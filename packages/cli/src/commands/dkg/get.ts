import { decodeFunctionResult, encodeFunctionData } from 'viem'
import { Flags } from '@oclif/core'
import { BaseCommand } from '../../base'
import { CustomFlags } from '../../utils/command'
import { deprecationOptions } from '../../utils/notice'
const DKG = require('./DKG.json')

const bigintToString = (_key: string, value: unknown) =>
  typeof value === 'bigint' ? value.toString() : value

export enum Method {
  shares = 'shares',
  responses = 'responses',
  justifications = 'justifications',
  participants = 'participants',
  phase = 'phase',
  group = 'group',
}

export default class DKGGet extends BaseCommand {
  static description = 'Gets data from the contract to run the next phase'

  static hidden = true
  static deprecationOptions = deprecationOptions

  static options = ['shares', 'responses', 'justifications', 'participants', 'phase', 'group']

  static flags = {
    ...BaseCommand.flags,
    method: Flags.option({
      options: DKGGet.options,
      required: true,
      description: 'Getter method to call',
    })(),
    address: CustomFlags.address({ required: true, description: 'DKG Contract Address' }),
  }

  private async callAndDecode(
    kit: Awaited<ReturnType<BaseCommand['getKit']>>,
    dkg: { address: `0x${string}`; abi: any },
    functionName: string
  ) {
    const callData = encodeFunctionData({ abi: dkg.abi, functionName, args: [] })
    const { data: resultData } = await kit.connection.viemClient.call({
      to: dkg.address,
      data: callData,
    })
    if (!resultData) {
      this.error(`Contract call ${functionName} returned no data — wrong address or reverted call`)
    }
    return decodeFunctionResult({ abi: dkg.abi, functionName, data: resultData })
  }

  async run() {
    const kit = await this.getKit()
    const res = await this.parse(DKGGet)
    const dkg = kit.connection.getCeloContract(DKG.abi, res.flags.address)

    const methodType = res.flags.method as keyof typeof Method
    switch (methodType) {
      case Method.shares: {
        const data = await this.callAndDecode(kit, dkg, 'getShares')
        this.log(JSON.stringify(data, bigintToString))
        break
      }
      case Method.responses: {
        const data = await this.callAndDecode(kit, dkg, 'getResponses')
        this.log(JSON.stringify(data, bigintToString))
        break
      }
      case Method.justifications: {
        const data = await this.callAndDecode(kit, dkg, 'getJustifications')
        this.log(JSON.stringify(data, bigintToString))
        break
      }
      case Method.participants: {
        const data = await this.callAndDecode(kit, dkg, 'getParticipants')
        this.log(JSON.stringify(data, bigintToString))
        break
      }
      case Method.phase: {
        const phase = await this.callAndDecode(kit, dkg, 'inPhase')
        this.log(`In phase: ${phase}`)
        break
      }
      case Method.group: {
        const data = (await this.callAndDecode(kit, dkg, 'getBlsKeys')) as readonly [
          unknown,
          unknown,
        ]
        const group = { threshold: data[0], blsKeys: data[1] }
        this.log(JSON.stringify(group, bigintToString))
        break
      }
    }
  }
}
