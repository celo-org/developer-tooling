import { newGoldToken as newToken } from '@celo/abis-12/web3/GoldToken'
import { newMintGoldSchedule as newCeloGoldSchedule } from '@celo/abis-12/web3/MintGoldSchedule'
import { DEFAULT_OWNER_ADDRESS, withImpersonatedAccount } from '@celo/dev-utils/lib/anvil-test'
import { mineBlocks } from '@celo/dev-utils/lib/ganache-test'
import BigNumber from 'bignumber.js'
import Web3 from 'web3'
import { ContractKit } from '../kit'
import { proxySend, valueToFixidityString, valueToString } from '../wrappers/BaseWrapper'

const GANACHE_EPOCH_SIZE = 100
export const currentEpochNumber = async (web3: Web3, epochSize: number = GANACHE_EPOCH_SIZE) => {
  const blockNumber = await web3.eth.getBlockNumber()

  return getEpochNumberOfBlock(blockNumber, epochSize)
}

const getFirstBlockNumberForEpoch = (
  epochNumber: number,
  epochSize: number = GANACHE_EPOCH_SIZE
) => {
  if (epochNumber === 0) {
    // No first block for epoch 0
    return 0
  }
  return (epochNumber - 1) * epochSize + 1
}

const getEpochNumberOfBlock = (blockNumber: number, epochSize: number = GANACHE_EPOCH_SIZE) => {
  // Follows GetEpochNumber from celo-blockchain/blob/master/consensus/istanbul/utils.go
  const epochNumber = Math.floor(blockNumber / epochSize)
  if (blockNumber % epochSize === 0) {
    return epochNumber
  } else {
    return epochNumber + 1
  }
}

export const mineToNextEpoch = async (web3: Web3, epochSize: number = GANACHE_EPOCH_SIZE) => {
  const blockNumber = await web3.eth.getBlockNumber()
  const epochNumber = await currentEpochNumber(web3, epochSize)
  const blocksUntilNextEpoch = getFirstBlockNumberForEpoch(epochNumber + 1, epochSize) - blockNumber
  await mineBlocks(blocksUntilNextEpoch, web3)
}

const L2_TIMESTAMP = new BigNumber(1715808537)

// This method tries to mimic the logic in
// https://github.com/celo-org/celo-monorepo/blob/a4eba790e5a5fe12d36bcbf3929aec2722da26ee/packages/protocol/test-sol/unit/common/MintGoldSchedule.t.sol#L103
// in order to make the contract usable in L2 context
export const activateMintCeloSchedule = async (kit: ContractKit) => {
  await withImpersonatedAccount(kit.web3, DEFAULT_OWNER_ADDRESS, async () => {
    const mintCeloScheduleWrapper = await kit.contracts.getMintCeloSchedule()
    const tokenWrapper = await kit.contracts.getGoldToken()
    const accounts = await kit.web3.eth.getAccounts()
    const token = newToken(kit.web3, tokenWrapper.address)
    const mintCeloSchedule = newCeloGoldSchedule(kit.web3, mintCeloScheduleWrapper.address)

    // this (and other) methods are not exposed in wrappers, so we need to use proxySend
    // directly on methods provided by generated web3 files in @celo/abis package
    const setCeloScheduleAddressFn = proxySend(
      kit.connection,
      token.methods.setGoldTokenMintingScheduleAddress
    )

    // In L2 context only address specified as schedule contract can mint
    // but in this case it cannot be the actual address because trying to
    // send any Celo to that address results in a revert, so the value
    // is being set to the first account provided by anvil, so that it
    // can be later used to mint
    await setCeloScheduleAddressFn(accounts[0]).sendAndWaitForReceipt({
      from: DEFAULT_OWNER_ADDRESS,
    })

    // Need to mint more than https://github.com/celo-org/celo-monorepo/blob/master/packages/protocol/contracts-0.8/common/MintGoldSchedule.sol#L20
    // to avoid overflow error in solidity
    const mintFn = proxySend(kit.connection, token.methods.mint)
    await mintFn(
      mintCeloScheduleWrapper.address,
      kit.web3.utils.toWei('612345678', 'ether')
    ).sendAndWaitForReceipt({
      from: accounts[0],
    })

    // When all the prerequisites are met, the schedule can be activated
    const activateFn = proxySend(kit.connection, mintCeloSchedule.methods.activate)
    await activateFn(
      valueToString(L2_TIMESTAMP),
      valueToFixidityString('.25'),
      '0x0000000000000000000000000000000000000003',
      valueToFixidityString('.001'),
      '0x000000000000000000000000000000000000ce10'
    ).sendAndWaitForReceipt({
      from: DEFAULT_OWNER_ADDRESS,
    })
  })
}
