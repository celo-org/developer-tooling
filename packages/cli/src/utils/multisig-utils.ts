import { Hex } from 'viem'

type ConfirmationGetters = {
  getConfirmations: (x: [bigint]) => Promise<readonly Hex[]>
  required: () => Promise<bigint>
}

export async function viewConfirmationStatus(
  readMultisig: ConfirmationGetters,
  txIndex: bigint,
  log = console.log
) {
  const confirmations = await readMultisig.getConfirmations([txIndex])
  const currentConfirmations = confirmations.length
  const neededConfirmations = await readMultisig.required()

  if (BigInt(currentConfirmations + 1) === neededConfirmations) {
    log(
      `Transaction already has ${currentConfirmations} confirmations, approving this transaction will execute it`
    )
  }

  return {
    currentConfirmations,
    neededConfirmations,
  }
}
