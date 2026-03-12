import { decodeFunctionResult, encodeFunctionData } from 'viem'
import { Flags } from '@oclif/core'
import { BaseCommand } from '../../base'
import { CustomFlags } from '../../utils/command'
import { deprecationOptions } from '../../utils/notice'
const DKG = require('./DKG.json')

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

  async run() {
    const kit = await this.getKit()
    const res = await this.parse(DKGGet)
    const dkg = kit.connection.getCeloContract(DKG.abi, res.flags.address)

    const methodType = res.flags.method as keyof typeof Method
    switch (methodType) {
      case Method.shares: {
        const callData = encodeFunctionData({ abi: dkg.abi, functionName: 'getShares', args: [] })
        const { data: resultData } = await kit.connection.viemClient.call({
          to: dkg.address,
          data: callData,
        })
        const data = decodeFunctionResult({
          abi: dkg.abi,
          functionName: 'getShares',
          data: resultData!,
        })
        this.log(JSON.stringify(data))
        break
      }
      case Method.responses: {
        const callData = encodeFunctionData({
          abi: dkg.abi,
          functionName: 'getResponses',
          args: [],
        })
        const { data: resultData } = await kit.connection.viemClient.call({
          to: dkg.address,
          data: callData,
        })
        const data = decodeFunctionResult({
          abi: dkg.abi,
          functionName: 'getResponses',
          data: resultData!,
        })
        this.log(JSON.stringify(data))
        break
      }
      case Method.justifications: {
        const callData = encodeFunctionData({
          abi: dkg.abi,
          functionName: 'getJustifications',
          args: [],
        })
        const { data: resultData } = await kit.connection.viemClient.call({
          to: dkg.address,
          data: callData,
        })
        const data = decodeFunctionResult({
          abi: dkg.abi,
          functionName: 'getJustifications',
          data: resultData!,
        })
        this.log(JSON.stringify(data))
        break
      }
      case Method.participants: {
        const callData = encodeFunctionData({
          abi: dkg.abi,
          functionName: 'getParticipants',
          args: [],
        })
        const { data: resultData } = await kit.connection.viemClient.call({
          to: dkg.address,
          data: callData,
        })
        const data = decodeFunctionResult({
          abi: dkg.abi,
          functionName: 'getParticipants',
          data: resultData!,
        })
        this.log(JSON.stringify(data))
        break
      }
      case Method.phase: {
        const callData = encodeFunctionData({ abi: dkg.abi, functionName: 'inPhase', args: [] })
        const { data: resultData } = await kit.connection.viemClient.call({
          to: dkg.address,
          data: callData,
        })
        const phase = decodeFunctionResult({
          abi: dkg.abi,
          functionName: 'inPhase',
          data: resultData!,
        })
        this.log(`In phase: ${phase}`)
        break
      }
      case Method.group: {
        const callData = encodeFunctionData({ abi: dkg.abi, functionName: 'getBlsKeys', args: [] })
        const { data: resultData } = await kit.connection.viemClient.call({
          to: dkg.address,
          data: callData,
        })
        const data = decodeFunctionResult({
          abi: dkg.abi,
          functionName: 'getBlsKeys',
          data: resultData!,
        }) as readonly [unknown, unknown]
        const group = { threshold: data[0], blsKeys: data[1] }
        this.log(JSON.stringify(group))
        break
      }
    }
  }
}
