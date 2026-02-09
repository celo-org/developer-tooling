import { newKitFromWeb3 } from '@celo/contractkit'
import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import { timeTravel } from '@celo/dev-utils/ganache-test'
import BigNumber from 'bignumber.js'
import {
  EXTRA_LONG_TIMEOUT_MS,
  stripAnsiCodesAndTxHashes,
  stripAnsiCodesFromNestedArray,
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
  (client) => {
    beforeEach(async () => {
      // need to set multical deployment on the address it was found on alfajores
      // since this test impersonates the old alfajores chain id
      await deployMultiCall(client, '0xcA11bde05977b3631167028862bE2a173976CA11')

      const logMock = jest.spyOn(console, 'log')
      const kit = newKitFromWeb3(client)
      const [voterAddress] = await client.eth.getAccounts()
      const validatorsWrapper = await kit.contracts.getValidators()
      const epochManagerWrapper = await kit.contracts.getEpochManager()
      const epochDuration = new BigNumber(await epochManagerWrapper.epochDuration())
      const [group1, group2] = await validatorsWrapper.getRegisteredValidatorGroups()

      await testLocallyWithWeb3Node(Register, ['--from', voterAddress], client)
      await testLocallyWithWeb3Node(
        Lock,
        ['--value', client.utils.toWei('10', 'ether'), '--from', voterAddress],
        client
      )
      await testLocallyWithWeb3Node(
        ElectionVote,
        [
          '--from',
          voterAddress,
          '--for',
          group1.address,
          '--value',
          client.utils.toWei('1', 'ether'),
        ],
        client
      )
      await timeTravel(epochDuration.plus(1).toNumber(), client)
      await testLocallyWithWeb3Node(Switch, ['--from', voterAddress], client)
      await testLocallyWithWeb3Node(ElectionActivate, ['--from', voterAddress], client)
      await testLocallyWithWeb3Node(
        ElectionVote,
        [
          '--from',
          voterAddress,
          '--for',
          group2.address,
          '--value',
          client.utils.toWei('9', 'ether'),
        ],
        client
      )

      logMock.mockClear()
    }, EXTRA_LONG_TIMEOUT_MS)

    afterEach(async () => {
      jest.clearAllMocks()
    })

    it('fails when no args are provided', async () => {
      await expect(testLocallyWithWeb3Node(Show, [], client)).rejects.toThrow(
        "Voter or Validator Groups's address"
      )
    })

    it('fails when no flags are provided', async () => {
      const [groupAddress] = await client.eth.getAccounts()
      await expect(testLocallyWithWeb3Node(Show, [groupAddress], client)).rejects.toThrow(
        'Must select --voter or --group'
      )
    })

    it('fails when provided address is not a group', async () => {
      const logMock = jest.spyOn(console, 'log')
      const [groupAddress] = await client.eth.getAccounts()

      await expect(testLocallyWithWeb3Node(Show, [groupAddress, '--group'], client)).rejects.toThrow(
        "Some checks didn't pass!"
      )
      expect(stripAnsiCodesAndTxHashes(logMock.mock.calls[1][0])).toContain(
        `✘  ${groupAddress} is ValidatorGroup`
      )
    })

    it('fails when provided address is not a voter', async () => {
      const logMock = jest.spyOn(console, 'log')
      const [_, nonVoterAddress] = await client.eth.getAccounts()

      await expect(
        testLocallyWithWeb3Node(Show, [nonVoterAddress, '--voter'], client)
      ).rejects.toThrow("Some checks didn't pass!")
      expect(stripAnsiCodesAndTxHashes(logMock.mock.calls[1][0])).toContain(
        `${nonVoterAddress} is not registered as an account. Try running account:register`
      )
    })

    it('shows data for a group', async () => {
      const kit = newKitFromWeb3(client)
      const logMock = jest.spyOn(console, 'log').mockClear()
      const validatorsWrapper = await kit.contracts.getValidators()
      const [_, group] = await validatorsWrapper.getRegisteredValidatorGroups()

      await expect(
        testLocallyWithWeb3Node(Show, [group.address, '--group'], client)
      ).resolves.toBeUndefined()
      const logs = stripAnsiCodesFromNestedArray(logMock.mock.calls)
      expect(logs[0]).toContain('Running Checks:')
      expect(logs[1]).toContain(`   ✔  ${group.address} is ValidatorGroup `)
      expect(logs[2]).toContain('All checks passed')
      expect(logs[3][0]).toContain(`address: ${group.address}`)
      expect(logs[3][0]).toContain(`capacity: 3999`)
      expect(logs[3][0]).toContain(`eligible: true`)
      expect(logs[3][0]).toContain(`name: ${group.name}`)
      expect(logs[3][0]).toContain(`votes: 2001`)
    })

    it('shows data for an account', async () => {
      const logMock = jest.spyOn(console, 'log')
      const [voterAddress] = await client.eth.getAccounts()

      await testLocallyWithWeb3Node(Show, [voterAddress, '--voter'], client)

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
            active: 999999999999999999 (~1.000e+18)
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
