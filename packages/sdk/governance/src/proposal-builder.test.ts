import { AbiItem } from '@celo/connect'
import { CeloContract, ContractKit, newKitFromWeb3 } from '@celo/contractkit'
import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import BigNumber from 'bignumber.js'
import { ProposalBuilder } from './proposal-builder'
testWithAnvilL2('ProposalBuilder', (web3) => {
  let kit: ContractKit
  let proposalBuilder: ProposalBuilder

  beforeEach(() => {
    kit = newKitFromWeb3(web3)
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
      // if we want to keep input in the expectation the same the dequeue index needs to be same length as it was on alfajores
      const dequeue = new Array(56).fill(0)
      dequeue.push(125)
      jest.spyOn(wrapper, 'getDequeue').mockResolvedValue(dequeue.map((x) => new BigNumber(x)))
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
      const contract = CeloContract.CeloToken
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
      const contract = CeloContract.CeloToken
      const address = '0x471ece3750da237f93b8e339c536989b8978a438'

      proposalBuilder.setRegistryAddition(contract, address)
      const result = proposalBuilder.getRegistryAddition(contract)

      expect(result).toBe(address)
    })
  })

  describe('isRegistryContract', () => {
    it('identifies registry contracts', () => {
      const contract = CeloContract.CeloToken
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
        contract: CeloContract.CeloToken,
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
        contract: CeloContract.CeloToken,
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
  describe('fromJsonTx', () => {
    it('checks CoreContract JSON transaction', async () => {
      const tx = {
        contract: 'FeeCurrencyDirectory',
        function: 'setCurrencyConfig',
        args: [
          '0x765DE816845861e75A25fCA122bb6898B8B1282a',
          '0xefB84935239dAcdecF7c5bA76d8dE40b077B7b33',
          '50000',
        ],
        value: '0',
      }
      await expect(proposalBuilder.fromJsonTx(tx)).resolves.toMatchInlineSnapshot(`
        {
          "input": "0x216ab7df000000000000000000000000765de816845861e75a25fca122bb6898b8b1282a000000000000000000000000efb84935239dacdecf7c5ba76d8de40b077b7b33000000000000000000000000000000000000000000000000000000000000c350",
          "to": "0x5a7D21C9255DAA32109c8136661D7e853Fc5BF63",
          "value": "0",
        }
      `)
    })
    it('throws error for missing value', async () => {
      const tx = {
        contract: 'FeeCurrencyDirectory',
        function: 'setCurrencyConfig',
        args: [
          '0x765DE816845861e75A25fCA122bb6898B8B1282a',
          '0xefB84935239dAcdecF7c5bA76d8dE40b077B7b33',
          '50000',
        ],
      }
      // @ts-expect-error (value is missing)
      await expect(proposalBuilder.fromJsonTx(tx)).rejects.toThrowErrorMatchingInlineSnapshot(
        `"Missing tx.value"`
      )
    })
    it('successed for 0 value', async () => {
      const tx = {
        contract: 'FeeCurrencyDirectory',
        function: 'setCurrencyConfig',
        args: [
          '0x765DE816845861e75A25fCA122bb6898B8B1282a',
          '0xefB84935239dAcdecF7c5bA76d8dE40b077B7b33',
          '50000',
        ],
        value: 0,
      }
      // @ts-expect-error (value is missing)
      await expect(proposalBuilder.fromJsonTx(tx)).resolves.toMatchInlineSnapshot(`
        {
          "input": "0x216ab7df000000000000000000000000765de816845861e75a25fca122bb6898b8b1282a000000000000000000000000efb84935239dacdecf7c5ba76d8de40b077b7b33000000000000000000000000000000000000000000000000000000000000c350",
          "to": "0x5a7D21C9255DAA32109c8136661D7e853Fc5BF63",
          "value": 0,
        }
      `)
    })
    it('gives info when it fails to build transaction', async () => {
      const tx = {
        contract: 'SuperContract',
        function: 'superFunction',
        args: ['0xa435d2BaBDF80A66eD06A8D981edFE6f5DdAeCfB', '1000'],
        value: '0',
      }
      await expect(proposalBuilder.fromJsonTx(tx)).rejects.toThrowErrorMatchingInlineSnapshot(`
        "Couldn't build call for transaction:

        {
          "contract": "SuperContract",
          "function": "superFunction",
          "args": [
            "0xa435d2BaBDF80A66eD06A8D981edFE6f5DdAeCfB",
            "1000"
          ],
          "value": "0"
        }

        At least one of the following issues must be corrected:
          1. SuperContract not (yet) registered
          2. SuperContract is not a core celo contract so address must be specified
        "
      `)
    })
  })
})
