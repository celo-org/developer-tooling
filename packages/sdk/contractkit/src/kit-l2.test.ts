import { StrongAddress } from '@celo/base'
import { testWithAnvilL2 } from '@celo/dev-utils/lib/anvil-test'
import Web3 from 'web3'
import { ContractKit, newKitFromWeb3 } from './kit'

testWithAnvilL2('kit', (web3: Web3) => {
  let kit: ContractKit
  let feeToken: StrongAddress

  beforeAll(async () => {
    kit = newKitFromWeb3(web3)

    const feeCurrencyWhitelist = await kit.contracts.getFeeCurrencyWhitelist()
    const gasOptions = await feeCurrencyWhitelist.getWhitelist()
    feeToken = gasOptions[0]
  })

  describe('when on cel2', () => {
    describe('when gas is missing', () => {
      it('fills the gas and works as normal', async () => {
        await expect(
          kit.populateMaxFeeInToken({
            feeCurrency: feeToken,
          })
        ).resolves.toMatchInlineSnapshot(`
          {
            "feeCurrency": "0x0c6a0fde0A72bA3990870f0F99ED79a821703474",
            "gas": 53001,
            "maxFeeInFeeCurrency": "54061020000000",
            "maxFeePerGas": "1000000000",
            "maxPriorityFeePerGas": "1000000000",
          }
        `)
      })
    })
    describe('when maxFeePerFeeCurrency exists', () => {
      it('returns without modification', async () => {
        const maxFeeInFeeCurrency = '2000000'
        await expect(
          kit.populateMaxFeeInToken({
            maxFeeInFeeCurrency,
            feeCurrency: feeToken,
            gas: '102864710371401736267367367',
          })
        ).resolves.toMatchObject({
          maxFeeInFeeCurrency,
          feeCurrency: feeToken,
          gas: '102864710371401736267367367',
        })
      })
    })
    describe('when feeCurrency provided with gas', () => {
      it('returns with maxFeePerFeeCurrency estimated', async () => {
        await expect(
          kit.populateMaxFeeInToken({
            feeCurrency: feeToken,
            gas: '102864710371401736267367367',
          })
        ).resolves.toMatchInlineSnapshot(`
          {
            "feeCurrency": "0x0c6a0fde0A72bA3990870f0F99ED79a821703474",
            "gas": "102864710371401736267367367",
            "maxFeeInFeeCurrency": "104922004578829770992714714340000000",
            "maxFeePerGas": "1000000000",
            "maxPriorityFeePerGas": "1000000000",
          }
        `)
      })
    })
  })
})
