import CeloTokenABI from '@celo/abis/GoldToken.json'
import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import { readJSON, removeSync } from 'fs-extra'
import inquirer from 'inquirer'
import Web3 from 'web3'
import { testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import BuildProposal from './build-proposal'

process.env.NO_SYNCCHECK = 'true'

jest.mock('inquirer')

const TX_PATH_FOR_TEST = './test-tx.json'

testWithAnvilL2('governance:build-proposal cmd', (web3: Web3) => {
  describe('building proposal to transfer funds from governance', () => {
    beforeEach(async () => {
      const promptSpy = jest
        .spyOn(inquirer, 'prompt')
        .mockResolvedValueOnce({ 'Celo Contract': 'GoldToken' })
        .mockResolvedValueOnce({ 'GoldToken Function': 'transfer' })
      CeloTokenABI.abi
        .find((f) => f.name === 'transfer')!
        .inputs!.forEach((input) => {
          switch (input.type) {
            case 'address':
              promptSpy.mockResolvedValueOnce({
                [input.name!]: '0x19F78d207493Bf6f7E8D54900d01bb387F211b28',
              })
              break
            case 'uint256':
              promptSpy.mockResolvedValueOnce({ [input.name!]: '1000000000000000000' })
              break
          }
        })
      promptSpy.mockResolvedValueOnce({ 'Celo Contract': '✔ done' })
    })
    it('generates the json', async () => {
      await testLocallyWithWeb3Node(BuildProposal, ['--output', TX_PATH_FOR_TEST], web3)
      const result = await readJSON(TX_PATH_FOR_TEST)
      expect(result).toMatchInlineSnapshot(`
        [
          {
            "args": [
              "0x19F78d207493Bf6f7E8D54900d01bb387F211b28",
              "1000000000000000000",
            ],
            "contract": "GoldToken",
            "function": "transfer",
            "value": "0",
          },
        ]
      `)
    })
  })
  afterAll(() => {
    jest.restoreAllMocks()
    removeSync(TX_PATH_FOR_TEST)
  })
})
