export const calculateEpochNumberOfBlock = (blockNumber: bigint, epochSize: bigint) => {
  const epochNumber = blockNumber / epochSize

  if (blockNumber % epochSize === 0n) {
    return epochNumber
  } else {
    return epochNumber + 1n
  }
}

export const calculateFirstBlockNumberForEpoch = (
  epochNumber: bigint,
  epochSize: bigint
): bigint => {
  // Follows GetEpochFirstBlockNumber from celo-blockchain/blob/master/consensus/istanbul/utils.go
  if (epochNumber === 0n) {
    // No first block for epoch 0
    return 0n
  }

  return (epochNumber - 1n) * epochSize + 1n
}

export const calculateLastBlockNumberForEpoch = (
  epochNumber: bigint,
  epochSize: bigint
): bigint => {
  // Follows GetEpochLastBlockNumber from celo-blockchain/blob/master/consensus/istanbul/utils.go
  if (epochNumber === 0n) {
    return 0n
  }

  const firstBlockNumberForEpoch = calculateFirstBlockNumberForEpoch(epochNumber, epochSize)

  return firstBlockNumberForEpoch + (epochSize - 1n)
}
