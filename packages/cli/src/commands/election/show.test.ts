import { newKitFromWeb3 } from '@celo/contractkit'
import { ElectionWrapper, ValidatorGroupVote, Voter } from '@celo/contractkit/lib/wrappers/Election'
import { testWithAnvilL1 } from '@celo/dev-utils/lib/anvil-test'
import { ux } from '@oclif/core'
import BigNumber from 'bignumber.js'
import Web3 from 'web3'
import { registerAccount, setupGroup } from '../../test-utils/chain-setup'
import { stripAnsiCodesAndTxHashes, testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import Show from './show'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL1('election:show', (web3: Web3) => {
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
    const [voterAddress] = await web3.eth.getAccounts()

    await expect(testLocallyWithWeb3Node(Show, [voterAddress, '--voter'], web3)).rejects.toThrow(
      "Some checks didn't pass!"
    )
    expect(stripAnsiCodesAndTxHashes(logMock.mock.calls[1][0])).toContain(
      `${voterAddress} is not registered as an account. Try running account:register`
    )
  })

  it('shows data for a group', async () => {
    const kit = newKitFromWeb3(web3)
    const logMock = jest.spyOn(console, 'log')
    const [groupAddress] = await web3.eth.getAccounts()
    const writeMock = jest.spyOn(ux.write, 'stdout')

    await setupGroup(kit, groupAddress)

    const getValidatorGroupVotesMock = jest.spyOn(
      ElectionWrapper.prototype,
      'getValidatorGroupVotes'
    )
    getValidatorGroupVotesMock.mockImplementation(async () => {
      return {
        address: '0x1000000000000000000000000000000000000001',
        capacity: new BigNumber(3879657093998775988268146),
        eligible: true,
        name: 'Eligible group',
        votes: new BigNumber(3481303474410894544646170),
      } as ValidatorGroupVote
    })

    await testLocallyWithWeb3Node(Show, [groupAddress, '--group'], web3)

    expect(writeMock.mock.calls).toMatchInlineSnapshot(`[]`)
    expect(logMock.mock.calls.map((args) => args.map(stripAnsiCodesAndTxHashes)))
      .toMatchInlineSnapshot(`
      [
        [
          "Running Checks:",
        ],
        [
          "   ✔  0x5409ED021D9299bf6814279A6A1411A7e866A631 is ValidatorGroup ",
        ],
        [
          "All checks passed",
        ],
        [
          "address: 0x1000000000000000000000000000000000000001
      capacity: 3879657093998776000000000 (~3.880e+24)
      eligible: true
      name: Eligible group
      votes: 3481303474410894600000000 (~3.481e+24)",
        ],
      ]
    `)
  })

  it('shows data for an account', async () => {
    const kit = newKitFromWeb3(web3)
    const logMock = jest.spyOn(console, 'log')
    const [voterAddress, groupAddress, anotherGroupAddress] = await web3.eth.getAccounts()
    const writeMock = jest.spyOn(ux.write, 'stdout')

    await registerAccount(kit, voterAddress)

    const getVoterMock = jest.spyOn(ElectionWrapper.prototype, 'getVoter')
    getVoterMock.mockImplementation(async () => {
      return {
        address: voterAddress,
        votes: [
          {
            active: new BigNumber(1001),
            group: groupAddress,
            pending: new BigNumber(2002),
          },
          {
            active: new BigNumber(3003),
            group: anotherGroupAddress,
            pending: new BigNumber(4004),
          },
        ],
      } as Voter
    })

    await testLocallyWithWeb3Node(Show, [voterAddress, '--voter'], web3)

    expect(writeMock.mock.calls).toMatchInlineSnapshot(`[]`)
    expect(logMock.mock.calls.map((args) => args.map(stripAnsiCodesAndTxHashes)))
      .toMatchInlineSnapshot(`
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
          active: 1001 (~1.001e+3)
          group: 0x6Ecbe1DB9EF729CBe972C83Fb886247691Fb6beb
          pending: 2002 (~2.002e+3)
        1: 
          active: 3003 (~3.003e+3)
          group: 0xE36Ea790bc9d7AB70C55260C66D52b1eca985f84
          pending: 4004 (~4.004e+3)",
        ],
      ]
    `)
  })
})
