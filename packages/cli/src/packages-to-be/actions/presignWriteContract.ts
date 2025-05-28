import { Account, Chain, Client, SignTransactionParameters, Transport } from 'viem'
import { signTransaction } from 'viem/accounts'
import { getAction } from 'viem/utils'

export async function presignWriteContract<
  chain extends Chain | undefined,
  account extends Account | undefined
>(
  client: Client<Transport, chain, account>,
  preparedCall: SignTransactionParameters<chain, account>
) {
  return await getAction(client, signTransaction, 'signTransaction')(preparedCall)
}
