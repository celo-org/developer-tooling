import { authorizeValidatorSigner, authorizeVoteSigner } from '@celo/actions'
import { parseProofOfPossession } from '@celo/core'
import { Flags } from '@oclif/core'
import { Hex } from 'viem'
import { BaseCommand } from '../../base'
import { newCheckBuilder } from '../../utils/checks'
import { displaySendTx, displayViemTx } from '../../utils/cli'
import { CustomFlags } from '../../utils/command'

export default class Authorize extends BaseCommand {
  static description =
    'Keep your locked CELO more secure by authorizing alternative keys to be used for signing attestations, voting, or validating. By doing so, you can continue to participate in the protocol while keeping the key with access to your locked Gold in cold storage. You must include a "proof-of-possession" of the key being authorized, which can be generated with the "account:proof-of-possession" command.'

  static flags = {
    ...BaseCommand.flags,
    from: CustomFlags.address({ required: true }),
    role: Flags.string({
      char: 'r',
      options: ['vote', 'validator', 'attestation'],
      description: 'Role to delegate',
      required: true,
    }),
    signature: CustomFlags.proofOfPossession({
      description: 'Signature (a.k.a proof-of-possession) of the signer key',
      required: true,
    }),
    signer: CustomFlags.address({ required: true }),

    force: Flags.boolean({
      description:
        'Allow rotation of validator ECDSA key without rotating the BLS key. Only intended for validators with a special reason to do so.',
      default: false,
      hidden: true,
    }),
  }

  static args = {}

  static examples = [
    'authorize --from 0x5409ED021D9299bf6814279A6A1411A7e866A631 --role vote --signer 0x6ecbe1db9ef729cbe972c83fb886247691fb6beb --signature 0x1b9fca4bbb5bfb1dbe69ef1cddbd9b4202dcb6b134c5170611e1e36ecfa468d7b46c85328d504934fce6c2a1571603a50ae224d2b32685e84d4d1a1eebad8452eb',
    'authorize --from 0x5409ED021D9299bf6814279A6A1411A7e866A631 --role validator --signer 0x6ecbe1db9ef729cbe972c83fb886247691fb6beb --signature 0x1b9fca4bbb5bfb1dbe69ef1cddbd9b4202dcb6b134c5170611e1e36ecfa468d7b46c85328d504934fce6c2a1571603a50ae224d2b32685e84d4d1a1eebad8452eb',
  ]

  async run() {
    const res = await this.parse(Authorize)
    const publicClient = await this.getPublicClient()
    const walletClient = await this.getWalletClient()
    const clients = { public: publicClient, wallet: walletClient }

    // Parse signature using core package
    const sig = await parseProofOfPossession(res.flags.from, res.flags.signer, res.flags.signature)

    if (res.flags.role === 'validator') {
      if (res.flags.blsKey || res.flags.blsPop) {
        this.error('BLS keys are not supported anymore', { exit: 1 })
      }
    }

    const checker = newCheckBuilder(this).isAccount(res.flags.from)
    await checker.runChecks()

    let txHash: Promise<Hex>
    if (res.flags.role === 'vote') {
      // dont await here as the displayViemTx needs the promise
      txHash = authorizeVoteSigner(clients, res.flags.signer, sig)
    } else if (res.flags.role === 'validator') {
      // dont await here as the displayViemTx needs the promise
      txHash = authorizeValidatorSigner(clients, res.flags.signer, sig)
    } else if (res.flags.role === 'attestation') {
      // Keep attestation authorization in CLI using ContractKit (deprecated)
      const kit = await this.getKit()
      const accounts = await kit.contracts.getAccounts()
      const tx = await accounts.authorizeAttestationSigner(res.flags.signer, sig)
      await displaySendTx('authorizeTx', tx)
      return
    } else {
      this.error(`Invalid role provided`)
      return
    }

    await displayViemTx('authorizeTx', txHash, publicClient)
  }
}
