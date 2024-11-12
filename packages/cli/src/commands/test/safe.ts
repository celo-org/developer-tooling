import { Flags } from '@oclif/core'
import { MetaTransactionData } from '@safe-global/types-kit'
import { BaseCommand } from '../../base'
import { CustomFlags } from '../../utils/command'
import { performSafeTransaction } from '../../utils/safe'

export default class Safe extends BaseCommand {
  static description = 'Test command to test safe integration'

  static hidden = true

  static flags = {
    ...BaseCommand.flags,
    from: CustomFlags.address({ required: true, description: "Safe owner's address" }),
    safe: CustomFlags.address({ required: true, description: 'Safe address' }),
    testContract: CustomFlags.address({
      required: true,
      description: 'TestTransactions contract address',
    }),
    key: Flags.string({ required: true, description: 'TestTransactions key to set' }),
    value: Flags.string({ required: true, description: 'TestTransactions value to set' }),
  }

  static examples = [
    'safe --safe 0x --testContract 0x --from 0x --testContract 0x --key 123 --value 456',
  ]

  async run() {
    const kit = await this.getKit()
    const res = await this.parse(Safe)

    kit.defaultAccount = res.flags.from

    const web3 = await this.getWeb3()
    // https://github.com/celo-org/celo-monorepo/blob/master/packages/protocol/contracts/governance/test/TestTransactions.sol
    const testTransactionsContract = new web3.eth.Contract(
      [
        {
          constant: false,
          inputs: [
            {
              name: 'key',
              type: 'uint256',
            },
            {
              name: 'value',
              type: 'uint256',
            },
            {
              name: 'shouldSucceed',
              type: 'bool',
            },
          ],
          name: 'setValue',
          outputs: [],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'function',
        },
      ],
      res.flags.testContract
    )

    const tx: MetaTransactionData = {
      data: testTransactionsContract.methods
        .setValue(res.flags.key, res.flags.value, true)
        .encodeABI(),
      to: res.flags.testContract,
      value: '0',
    }

    await performSafeTransaction(await this.getWeb3(), res.flags.safe, res.flags.from, tx)
  }
}
