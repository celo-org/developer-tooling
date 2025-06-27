import { newKitFromWeb3 } from '@celo/contractkit'
import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import { timeTravel } from '@celo/dev-utils/ganache-test'
import BigNumber from 'bignumber.js'
import { celoAlfajores } from 'viem/chains'
import Web3 from 'web3'
import {
  EXTRA_LONG_TIMEOUT_MS,
  stripAnsiCodesAndTxHashes,
  testLocallyWithWeb3Node,
} from '../../test-utils/cliUtils'
import { deployMultiCall } from '../../test-utils/multicall'
import Register from '../account/register'
import Switch from '../epochs/switch'
import Lock from '../lockedcelo/lock'
import ElectionActivate from './activate'
import Show from './show'
import ElectionVote from './vote'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2(
  'election:show',
  (web3: Web3) => {
    beforeEach(async () => {
      // need to set multical deployment on the address it is found on alfajores
      // since this test impersonates alfajores chain id
      await deployMultiCall(web3, celoAlfajores.contracts.multicall3.address)

      const logMock = jest.spyOn(console, 'log')
      const kit = newKitFromWeb3(web3)
      const [voterAddress] = await web3.eth.getAccounts()
      const validatorsWrapper = await kit.contracts.getValidators()
      const epochManagerWrapper = await kit.contracts.getEpochManager()
      const epochDuration = new BigNumber(await epochManagerWrapper.epochDuration())
      const [group1, group2] = await validatorsWrapper.getRegisteredValidatorGroups()

      await testLocallyWithWeb3Node(Register, ['--from', voterAddress], web3)
      await testLocallyWithWeb3Node(
        Lock,
        ['--value', web3.utils.toWei('10', 'ether'), '--from', voterAddress],
        web3
      )
      await testLocallyWithWeb3Node(
        ElectionVote,
        [
          '--from',
          voterAddress,
          '--for',
          group1.address,
          '--value',
          web3.utils.toWei('1', 'ether'),
        ],
        web3
      )
      await timeTravel(epochDuration.plus(1).toNumber(), web3)
      await testLocallyWithWeb3Node(Switch, ['--from', voterAddress], web3)
      await testLocallyWithWeb3Node(ElectionActivate, ['--from', voterAddress], web3)
      await testLocallyWithWeb3Node(
        ElectionVote,
        [
          '--from',
          voterAddress,
          '--for',
          group2.address,
          '--value',
          web3.utils.toWei('9', 'ether'),
        ],
        web3
      )

      logMock.mockClear()
    }, EXTRA_LONG_TIMEOUT_MS)

    afterEach(async () => {
      jest.clearAllMocks()
    })

    it('fails when no args are provided', async () => {
      await expect(testLocallyWithWeb3Node(Show, [], web3)).rejects.toThrow(
        "Voter or Validator Groups's address"
      )
    })

    it('fails when no flags are provided', async () => {
      const [groupAddress] = await web3.eth.getAccounts()
      await expect(testLocallyWithWeb3Node(Show, [groupAddress], web3)).rejects.toThrow(
        'Must select --voter or --group'
      )
    })

    it('fails when provided address is not a group', async () => {
      const logMock = jest.spyOn(console, 'log')
      const [groupAddress] = await web3.eth.getAccounts()

      await expect(testLocallyWithWeb3Node(Show, [groupAddress, '--group'], web3)).rejects.toThrow(
        "Some checks didn't pass!"
      )
      expect(stripAnsiCodesAndTxHashes(logMock.mock.calls[1][0])).toContain(
        `✘  ${groupAddress} is ValidatorGroup`
      )
    })

    it('fails when provided address is not a voter', async () => {
      const logMock = jest.spyOn(console, 'log')
      const [_, nonVoterAddress] = await web3.eth.getAccounts()

      await expect(
        testLocallyWithWeb3Node(Show, [nonVoterAddress, '--voter'], web3)
      ).rejects.toThrow("Some checks didn't pass!")
      expect(stripAnsiCodesAndTxHashes(logMock.mock.calls[1][0])).toContain(
        `${nonVoterAddress} is not registered as an account. Try running account:register`
      )
    })

    it('shows data for a group', async () => {
      const kit = newKitFromWeb3(web3)
      const logMock = jest.spyOn(console, 'log')
      const validatorsWrapper = await kit.contracts.getValidators()
      const [group] = await validatorsWrapper.getRegisteredValidatorGroups()

      await testLocallyWithWeb3Node(Show, [group.address, '--group'], web3)

      expect(
        logMock.mock.calls.map((args) => args.map(stripAnsiCodesAndTxHashes))
      ).toMatchInlineSnapshot(`
      [
        [
          "Running Checks:",
        ],
        [
          "   ✔  0x70997970C51812dc3A010C7d01b50e0d17dc79C8 is ValidatorGroup ",
        ],
        [
          "All checks passed",
        ],
        [
          "address: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8
      capacity: 40004000000000000000000 (~4.000e+22)
      eligible: true
      name: cLabs
      votes: 20001000000000000000000 (~2.000e+22)",
        ],
      ]
    `)
    })

    it('shows data for an account', async () => {
      const logMock = jest.spyOn(console, 'log')
      const [voterAddress] = await web3.eth.getAccounts()

      await testLocallyWithWeb3Node(Show, [voterAddress, '--voter'], web3)

      expect(
        logMock.mock.calls.map((args) => args.map(stripAnsiCodesAndTxHashes))
      ).toMatchInlineSnapshot(`
      [
        [
          "Running Checks:",
        ],
        [
          "   ✔  0x5409ED021D9299bf6814279A6A1411A7e866A631 is a registered Account ",
        ],
        [
          "All checks passed",
        ],
        [
          "address: 0x5409ED021D9299bf6814279A6A1411A7e866A631
      votes: 
        0: 
          active: 1000000000000000000 (~1.000e+18)
          group: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8
          pending: 0 
        1: 
          active: 0 
          group: 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC
          pending: 9000000000000000000 (~9.000e+18)",
        ],
      ]
    `)
    })
  },
  { chainId: 42220 }
)
