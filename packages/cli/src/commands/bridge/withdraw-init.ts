import { Flags } from '@oclif/core'
import { BaseCommand } from '../../base'
import { displayViemTx } from '../../utils/cli'
import { CustomFlags } from '../../utils/command'
import { newCheckBuilder } from '../../utils/checks'
import { BRIDGE_CONFIG, L2_L1_MESSAGE_PASSER_ABI, validateNetwork } from '../../utils/bridge'

export default class BridgeWithdrawInit extends BaseCommand {
  static description =
    'Initiate a withdrawal of CELO from Celo (L2) to Ethereum (L1). This is step 1 of the withdrawal process.\n\nAfter initiating, you will need to:\n1. Wait ~1 hour for the proof to become available\n2. Run bridge:withdraw-prove to submit the proof\n3. Wait 7 days for the challenge period\n4. Run bridge:withdraw-finalize to claim your funds on L1'

  static examples = [
    'bridge:withdraw-init --from 0xYOUR_L2_ADDRESS --to 0xL1_RECIPIENT --value 1000000000000000000 --network mainnet -n mainnet -k 0xPRIVATE_KEY',
    'bridge:withdraw-init --from 0xYOUR_L2_ADDRESS --value 1000000000000000000 --network sepolia -n celo-sepolia -k 0xPRIVATE_KEY',
  ]

  static flags = {
    ...BaseCommand.flags,
    from: CustomFlags.address({
      required: true,
      description: 'Address of the sender on L2',
    }),
    to: CustomFlags.address({
      description: 'Address of the recipient on L1 (defaults to sender address)',
    }),
    value: CustomFlags.bigint({
      required: true,
      description: 'Amount of CELO to withdraw (in wei)',
    }),
    network: Flags.string({
      required: true,
      options: ['mainnet', 'sepolia'],
      description: 'Network to bridge on (mainnet or sepolia)',
    }),
  }

  async init() {
    // noop — skip ContractKit, we use viem directly
  }

  async run() {
    const client = await this.getPublicClient()
    const wallet = await this.getWalletClient()
    const res = await this.parse(BridgeWithdrawInit)

    const { from, value, network: networkFlag } = res.flags
    const to = res.flags.to || from
    const network = validateNetwork(networkFlag)
    const config = BRIDGE_CONFIG[network]

    await newCheckBuilder(this)
      .isNotSanctioned(from)
      .isNotSanctioned(to)
      .isValidWalletSigner(from)
      .hasEnoughCelo(from, value)
      .runChecks()

    console.log('\nInitiating withdrawal from L2 to L1...')
    console.log('This sends your CELO to the L2→L1 message bridge.\n')

    const txHash = wallet.writeContract({
      address: config.l2L1MessagePasser,
      abi: L2_L1_MESSAGE_PASSER_ABI,
      functionName: 'initiateWithdrawal',
      // Type assertion needed: wallet client is created dynamically so TS can't infer chain/account
      args: [to, BigInt(0), '0x'],
      value: value,
      chain: client.chain,
      account: wallet.account!,
    } as any) as Promise<`0x${string}`>

    await displayViemTx('InitiateWithdrawal', txHash, client)

    console.log('\nWithdrawal initiated! Save the transaction hash above.')
    console.log('Next steps:')
    console.log('  1. Wait ~1 hour for the proof to become available')
    console.log('  2. Run: celocli bridge:withdraw-prove --txHash <HASH> ...')
    console.log('  3. Wait 7 days for the challenge period to pass')
    console.log('  4. Run: celocli bridge:withdraw-finalize --txHash <HASH> ...')
  }
}
