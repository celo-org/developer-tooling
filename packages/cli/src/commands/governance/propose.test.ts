import { Address } from '@celo/connect'
import { newKitFromWeb3 } from '@celo/contractkit'
import { NetworkConfig, testWithGanache } from '@celo/dev-utils/lib/ganache-test'
import { ux } from '@oclif/core'
import Web3 from 'web3'
import { testLocally } from '../../test-utils/cliUtils'
import Propose from './propose'
process.env.NO_SYNCCHECK = 'true'

const expConfig = NetworkConfig.governance

testWithGanache('governance:propose cmd', (web3: Web3) => {
  const minDeposit = web3.utils.toWei(expConfig.minDeposit.toString(), 'ether')
  const kit = newKitFromWeb3(web3)

  let accounts: Address[] = []

  beforeEach(async () => {
    accounts = await web3.eth.getAccounts()
    kit.defaultAccount = accounts[0]
  })
  test('fails when descriptionURl is missing', async () => {
    await expect(
      testLocally(Propose, [
        '--from',
        accounts[0],
        '--deposit',
        '0',
        '--jsonTransactions',
        './exampleProposal.json',
      ])
    ).rejects.toThrow('Missing required flag descriptionURL')
  })
  test('can submit empty proposal', async () => {
    await testLocally(Propose, [
      '--from',
      accounts[0],
      '--deposit',
      minDeposit,
      '--jsonTransactions',
      './exampleProposal.json',
      '--descriptionURL',
      'https://example.com',
    ])
  })
  test('can submit proposal using e notion for deposit', async () => {
    const spyStart = jest.spyOn(ux.action, 'start')
    const spyStop = jest.spyOn(ux.action, 'stop')
    await testLocally(Propose, [
      '--from',
      accounts[0],
      '--deposit',
      '10000e18',
      '--jsonTransactions',
      './exampleProposal.json',
      '--descriptionURL',
      'https://example.com',
    ])
    expect(spyStart).toHaveBeenCalledWith('Sending Transaction: proposeTx')
    expect(spyStop).toHaveBeenCalled()
  })
  test('when deposit is 10K it succeeds', async () => {
    const spyStart = jest.spyOn(ux.action, 'start')
    const spyStop = jest.spyOn(ux.action, 'stop')

    await testLocally(Propose, [
      '--from',
      accounts[0],
      '--deposit',
      '10000000000000000000000',
      '--jsonTransactions',
      './exampleProposal.json',
      '--descriptionURL',
      'https://example.com',
    ])
    expect(spyStart).toHaveBeenCalledWith('Sending Transaction: proposeTx')
    expect(spyStop).toHaveBeenCalled()
  })
})
