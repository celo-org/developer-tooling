import { newKitFromWeb3, RegisteredContracts } from '@celo/contractkit'
import inquirer from 'inquirer'
import { InteractiveProposalBuilder, requireABI } from './interactive-proposal-builder'
import { ProposalBuilder } from './proposal-builder'
jest.mock('inquirer')

import { testWithAnvilL2 } from '@celo/dev-utils/lib/anvil-test'

describe('all registered contracts can be required', () => {
  RegisteredContracts.forEach((contract) => {
    it(`required ${contract} contract`, async () => {
      const contractABI = requireABI(contract)
      expect(contractABI).toBeDefined()
      expect(Array.isArray(contractABI)).toBeTruthy()
      expect(contractABI.filter).toBeDefined()
    })
  })
})

testWithAnvilL2('InteractiveProposalBuilder', (web3) => {
  let builder: ProposalBuilder
  let interactiveBuilder: InteractiveProposalBuilder
  let fromJsonTxSpy: jest.SpyInstance

  beforeEach(() => {
    const kit = newKitFromWeb3(web3)
    builder = new ProposalBuilder(kit)
    fromJsonTxSpy = jest.spyOn(builder, 'fromJsonTx')
    interactiveBuilder = new InteractiveProposalBuilder(builder)
  })

  describe('promptTransactions', () => {
    it('should prompt for transactions and return them', async () => {
      const mockPrompt = jest.spyOn(inquirer, 'prompt')
      // TODO the mock order is not right for the inputs
      mockPrompt
        .mockResolvedValueOnce({ 'Celo Contract': 'Governance' })
        .mockResolvedValueOnce({ 'Governance Function': 'setConstitution' })
        .mockResolvedValueOnce({ destination: '0x19F78d207493Bf6f7E8D54900d01bb387F211b28' })
        .mockResolvedValueOnce({ functionId: '0xa91ee0dc' })
        .mockResolvedValueOnce({ threshold: '900000000000000000000000' })
        .mockResolvedValueOnce({ 'Celo Contract': '✔ done' })

      const transactions = await interactiveBuilder.promptTransactions()

      expect(transactions).toEqual([
        {
          contract: 'Governance',
          function: 'setConstitution',
          args: [
            '0x19F78d207493Bf6f7E8D54900d01bb387F211b28',
            '0xa91ee0dc',
            '900000000000000000000000',
          ],
          value: '0',
        },
      ])
      expect(fromJsonTxSpy.mock.calls).toMatchInlineSnapshot(`
        [
          [
            {
              "args": [
                "0x19F78d207493Bf6f7E8D54900d01bb387F211b28",
                "0xa91ee0dc",
                "900000000000000000000000",
              ],
              "contract": "Governance",
              "function": "setConstitution",
              "value": "0",
            },
          ],
        ]
      `)
    })

    it('should handle invalid transactions and retry', async () => {
      const mockPrompt = jest.spyOn(inquirer, 'prompt')
      mockPrompt
        .mockResolvedValueOnce({ 'Celo Contract': 'Governance' })
        .mockResolvedValueOnce({ 'Governance Function': 'setConstitution' })
        .mockResolvedValueOnce({ destination: 'invalid' })
        .mockResolvedValueOnce({ functionId: 'invalid' })
        .mockResolvedValueOnce({ threshold: '900000000000000000000000' })
        .mockResolvedValueOnce({ 'Celo Contract': '✔ done' })

      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()

      const transactions = await interactiveBuilder.promptTransactions()

      expect(transactions).toEqual([]) // No valid transactions added
      expect(fromJsonTxSpy.mock.calls).toMatchInlineSnapshot(`
        [
          [
            {
              "args": [
                "invalid",
                "invalid",
                "900000000000000000000000",
              ],
              "contract": "Governance",
              "function": "setConstitution",
              "value": "0",
            },
          ],
        ]
      `)
      consoleErrorSpy.mockRestore()
    })
  })
})
