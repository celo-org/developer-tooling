import { newAttestations } from '@celo/abis/web3/Attestations'
import { StrongAddress } from '@celo/base'
import { newKitFromWeb3 } from '@celo/contractkit'
import { WrapperCache } from '@celo/contractkit/lib/contract-cache'
import { AttestationsWrapper } from '@celo/contractkit/lib/wrappers/Attestations'
import { testWithAnvilL1 } from '@celo/dev-utils/lib/anvil-test'
import { deployAttestationsContract } from '@celo/dev-utils/lib/contracts'
import Web3 from 'web3'
import { testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import GetAttestations from './get-attestations'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL1('identity:get-attetstations', (web3: Web3) => {
  beforeEach(async () => {
    const kit = newKitFromWeb3(web3)
    const accounts = (await web3.eth.getAccounts()) as StrongAddress[]
    const attestationsContractAddress = await deployAttestationsContract(web3, accounts[0])

    jest.spyOn(WrapperCache.prototype, 'getAttestations').mockImplementation(async () => {
      return new AttestationsWrapper(
        kit.connection,
        newAttestations(web3, attestationsContractAddress),
        newKitFromWeb3(web3).contracts
      )
    })
  })

  describe('input validation correctly outputs errors', () => {
    const consoleOutput: string[] = []
    const mockedError = (output: string) => consoleOutput.push(output)
    beforeEach(() => (console.error = mockedError))

    it('Fails when neither from, pepper, nor identifier are specified', async () => {
      await expect(
        testLocallyWithWeb3Node(GetAttestations, ['--phoneNumber', '+15555555555'], web3)
      ).rejects.toThrow('Must specify either --from or --pepper or --identifier')
    })

    it('Fails when neither phone number nor identifier are specified', async () => {
      await expect(
        testLocallyWithWeb3Node(
          GetAttestations,
          ['--from', '0x47e172F6CfB6c7D01C1574fa3E2Be7CC73269D95'],
          web3
        )
      ).rejects.toThrow('Must specify phoneNumber if identifier not provided')
    })

    it('Successfully prints identifier when given pepper and number', async () => {
      console.log = jest.fn()
      await testLocallyWithWeb3Node(
        GetAttestations,
        ['--phoneNumber', '+15555555555', '--pepper', 'XQke2bjvN7mPt'],
        web3
      )
      expect(console.log).toHaveBeenCalledWith(
        'Identifier: 0xd9460ae529b2889716c8f1ccebb5efec945adc46fe1e9cd16f6242463e81f37c'
      )
    })
  })
})
