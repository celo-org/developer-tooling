import { AbiItem } from '@celo/connect'
import { CeloContract, ContractKit, newKit } from '@celo/contractkit'
import BigNumber from 'bignumber.js'
import { ProposalBuilder } from './proposal-builder'
describe('ProposalBuilder', () => {
  let kit: ContractKit
  let proposalBuilder: ProposalBuilder

  beforeEach(() => {
    kit = newKit('https://alfajores-forno.celo-testnet.org')
    proposalBuilder = new ProposalBuilder(kit)
  })

  describe('build', () => {
    it('when no tx are in memory builds an empty proposal', async () => {
      const proposal = await proposalBuilder.build()
      expect(proposal).toEqual([])
    })
  })

  describe('addWeb3Tx', () => {
    it('adds and builds a Web3 transaction', async () => {
      const wrapper = await kit.contracts.getGovernance()
      const tx = await wrapper.approve(new BigNumber('125'))
      proposalBuilder.addWeb3Tx(tx.txo, { to: '0x5678', value: '1000' })
      const proposal = await proposalBuilder.build()
      expect(proposal).toEqual([
        {
          to: '0x5678',
          value: '1000',
          input:
            '0x5d35a3d9000000000000000000000000000000000000000000000000000000000000007d0000000000000000000000000000000000000000000000000000000000000038',
        },
      ])
    })
  })

  describe('addProxyRepointingTx', () => {
    it('adds and builds a proxy repointing transaction', async () => {
      const contract = CeloContract.GoldToken
      const newImplementationAddress = '0x471ece3750da237f93b8e339c536989b8978a438'

      proposalBuilder.addProxyRepointingTx(contract, newImplementationAddress)
      const proposal = await proposalBuilder.build()

      expect(proposal.length).toBe(1)
      expect(proposal[0].to).toBeDefined()
      expect(proposal[0].value).toBe('0')
    })
  })

  describe('setRegistryAddition', () => {
    it('sets and gets registry addition', () => {
      const contract = CeloContract.GoldToken
      const address = '0x471ece3750da237f93b8e339c536989b8978a438'

      proposalBuilder.setRegistryAddition(contract, address)
      const result = proposalBuilder.getRegistryAddition(contract)

      expect(result).toBe(address)
    })
  })

  describe('isRegistryContract', () => {
    it('identifies registry contracts', () => {
      const contract = CeloContract.GoldToken
      const address = '0x471ece3750da237f93b8e339c536989b8978a438'

      proposalBuilder.setRegistryAddition(contract, address)
      const result = proposalBuilder.isRegistryContract(contract)

      expect(result).toBe(true)
    })
  })

  describe('buildCallToExternalContract', () => {
    it('builds call to external contract', async () => {
      const tx = {
        function: 'testFunction',
        args: [],
        value: '0',
        address: '0xa435d2BaBDF80A66eD06A8D981edFE6f5DdAeCfB',
      }

      const abiItem: AbiItem = {
        name: 'testFunction',
        type: 'function',
        inputs: [],
        outputs: [],
      }

      proposalBuilder.lookupExternalMethodABI = async () => abiItem

      const result = await proposalBuilder.buildCallToExternalContract(tx)

      expect(result).toEqual({
        to: '0xa435d2BaBDF80A66eD06A8D981edFE6f5DdAeCfB',
        value: '0',
        input: '0xe16b4a9b',
      })
    })
  })

  describe('buildCallToCoreContract', () => {
    it('builds call to core contract', async () => {
      const tx = {
        contract: CeloContract.GoldToken,
        function: 'transfer',
        args: ['0xa435d2BaBDF80A66eD06A8D981edFE6f5DdAeCfB', '1000'],
        value: '0',
      }
      const result = await proposalBuilder.buildCallToCoreContract(tx)

      expect(result.to).toBeDefined()
      expect(result.value).toBe('0')
      expect(result.input).toBeDefined()
    })
  })

  describe('addJsonTx', () => {
    it('adds and builds a JSON transaction', async () => {
      const tx = {
        contract: CeloContract.GoldToken,
        function: 'transfer',
        args: ['0xa435d2BaBDF80A66eD06A8D981edFE6f5DdAeCfB', '1000'],
        value: '0',
      }

      proposalBuilder.addJsonTx(tx)
      const proposal = await proposalBuilder.build()

      expect(proposal.length).toBe(1)
      expect(proposal[0].to).toBeDefined()
      expect(proposal[0].value).toBe('0')
      expect(proposal[0].input).toBeDefined()
    })
  })
})
