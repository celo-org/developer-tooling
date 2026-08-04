import { Address, Hex } from 'viem'

type ConfirmationGetters = {
  getConfirmations: (x: [bigint]) => Promise<readonly Hex[]>
  required: () => Promise<bigint>
}

export interface ConfirmationProgress {
  confirmations: readonly Hex[]
  confirmationsRequired: bigint
  confirmationsRemaining: bigint
}

/**
 * How many owners have confirmed a multisig transaction and how many still need to.
 *
 * MultiSig.isConfirmed compares against the internal threshold for transactions the
 * multisig sends to itself, and against the regular one for everything else.
 */
export async function getConfirmationProgress(
  readMultisig: Pick<ConfirmationGetters, 'getConfirmations'>,
  txIndex: bigint,
  transaction: { destination: Address; executed: boolean },
  thresholds: { required: bigint; internalRequired: bigint },
  multisigAddress: Address
): Promise<ConfirmationProgress> {
  const isInternal = transaction.destination.toLowerCase() === multisigAddress.toLowerCase()
  const confirmationsRequired = isInternal ? thresholds.internalRequired : thresholds.required
  const confirmations = await readMultisig.getConfirmations([txIndex])
  const missing = confirmationsRequired - BigInt(confirmations.length)

  return {
    confirmations,
    confirmationsRequired,
    confirmationsRemaining: transaction.executed || missing < 0n ? 0n : missing,
  }
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
