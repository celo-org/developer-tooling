import { newBlockchainParameters } from '@celo/abis/web3/BlockchainParameters'
import { Connection } from '@celo/connect'
import { testWithAnvilL1 } from '@celo/dev-utils/lib/anvil-test'
import { AddressRegistry } from '../address-registry'
import { CeloContract } from '../base'
import { BlockchainParametersWrapper } from './BlockchainParameters'

testWithAnvilL1('BlockChainParametersWrapper', (web3) => {
  const connection = new Connection(web3)
  let blockchainParamsWrapper: BlockchainParametersWrapper

  beforeAll(async () => {
    const addressRegistry = new AddressRegistry(connection)
    const blockchainParamsAddress = await addressRegistry.addressFor(
      CeloContract.BlockchainParameters
    )
    const contract = newBlockchainParameters(web3, blockchainParamsAddress)
    blockchainParamsWrapper = new BlockchainParametersWrapper(connection, contract)
  })

  describe('#getEpochSizeNumber', () => {
    it('returns epoch size as number', async () => {
      const epochSizeNumber = await blockchainParamsWrapper.getEpochSizeNumber()
      expect(epochSizeNumber).toEqual(100)
    })
  })

  describe('#getFirstBlockNumberForEpoch', () => {
    it('returns block number', async () => {
      const blockNumber = await blockchainParamsWrapper.getFirstBlockNumberForEpoch(100)
      expect(blockNumber).toEqual(9901)
    })
  })

  describe('#getLastBlockNumberForEpoch', () => {
    it('returns block number', async () => {
      const blockNumber = await blockchainParamsWrapper.getLastBlockNumberForEpoch(100)
      expect(blockNumber).toEqual(10000)
    })
  })

  describe('#getEpochNumberOfBlock', () => {
    it('returns epoch number', async () => {
      const blockNumber = await blockchainParamsWrapper.getEpochNumberOfBlock(932837)
      expect(blockNumber).toEqual(9329)
    })
  })

  describe('#getConfig', () => {
    it('returns config', async () => {
      const config = await blockchainParamsWrapper.getConfig()

      expect(config).toMatchInlineSnapshot(`
        {
          "blockGasLimit": "13000000",
          "intrinsicGasForAlternativeFeeCurrency": "50000",
        }
      `)
    })
  })

  describe('#getUptimeLookbackWindow', () => {
    it('returns LookBack window as a number', async () => {
      const lookBack = await blockchainParamsWrapper.getUptimeLookbackWindow()
      expect(lookBack).toEqual(12)
    })
  })
})
