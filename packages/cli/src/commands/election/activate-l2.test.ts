import { newKitFromWeb3 } from '@celo/contractkit'
import { testWithAnvilL2 } from '@celo/dev-utils/lib/anvil-test'
import { ux } from '@oclif/core'
import BigNumber from 'bignumber.js'
import Web3 from 'web3'
import {
  mineEpoch,
  registerAccount,
  registerAccountWithLockedGold,
  setupGroupAndAffiliateValidator,
  voteForGroupFrom,
} from '../../test-utils/chain-setup'
import { stripAnsiCodesAndTxHashes, testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import ElectionActivate from './activate'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('election:activate', (web3: Web3) => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('fails when no flags are provided', async () => {
    await expect(testLocallyWithWeb3Node(ElectionActivate, [], web3)).rejects.toThrow(
      'Missing required flag from'
    )
  })

  it('shows no pending votes', async () => {
    const kit = newKitFromWeb3(web3)
    const [userAddress] = await web3.eth.getAccounts()
    const writeMock = jest.spyOn(ux.write, 'stdout')

    await registerAccount(kit, userAddress)

    await testLocallyWithWeb3Node(ElectionActivate, ['--from', userAddress], web3)

    expect(writeMock.mock.calls).toMatchInlineSnapshot(`
      [
        [
          "No pending votes to activate
      ",
        ],
      ]
    `)
  })

  it('shows no activatable votes yet', async () => {
    const kit = newKitFromWeb3(web3)
    const [groupAddress, validatorAddress, userAddress] = await web3.eth.getAccounts()

    const writeMock = jest.spyOn(ux.write, 'stdout')

    await setupGroupAndAffiliateValidator(kit, groupAddress, validatorAddress)
    await registerAccountWithLockedGold(kit, userAddress)

    await voteForGroupFrom(kit, userAddress, groupAddress, new BigNumber(10))
    await testLocallyWithWeb3Node(ElectionActivate, ['--from', userAddress], web3)

    expect(writeMock.mock.calls).toMatchInlineSnapshot(`
      [
        [
          "Pending votes not yet activatable. Consider using the --wait flag.
      ",
        ],
      ]
    `)
  })

  it('activate votes', async () => {
    const kit = newKitFromWeb3(web3)
    const [groupAddress, validatorAddress, userAddress] = await web3.eth.getAccounts()
    const election = await kit.contracts.getElection()
    const writeMock = jest.spyOn(ux.write, 'stdout')
    const activateAmount = 12345

    await setupGroupAndAffiliateValidator(kit, groupAddress, validatorAddress)
    await registerAccountWithLockedGold(kit, userAddress)

    await voteForGroupFrom(kit, userAddress, groupAddress, new BigNumber(activateAmount))

    await mineEpoch(kit)

    expect((await election.getVotesForGroupByAccount(userAddress, groupAddress)).active).toEqual(
      new BigNumber(0)
    )

    await testLocallyWithWeb3Node(ElectionActivate, ['--from', userAddress], web3)

    expect(writeMock.mock.calls).toMatchInlineSnapshot(`[]`)
    expect((await election.getVotesForGroupByAccount(userAddress, groupAddress)).active).toEqual(
      new BigNumber(activateAmount)
    )
  })

  it('activate votes with --wait flag', async () => {
    const kit = newKitFromWeb3(web3)
    const [groupAddress, validatorAddress, userAddress] = await web3.eth.getAccounts()
    const election = await kit.contracts.getElection()
    const writeMock = jest.spyOn(ux.write, 'stdout')
    const activateAmount = 12345
    const logMock = jest.spyOn(console, 'log')

    await setupGroupAndAffiliateValidator(kit, groupAddress, validatorAddress)
    await registerAccountWithLockedGold(kit, userAddress)

    await voteForGroupFrom(kit, userAddress, groupAddress, new BigNumber(activateAmount))

    expect((await election.getVotesForGroupByAccount(userAddress, groupAddress)).active).toEqual(
      new BigNumber(0)
    )

    await Promise.all([
      testLocallyWithWeb3Node(ElectionActivate, ['--from', userAddress, '--wait'], web3),
      new Promise<void>((resolve) => {
        // at least the amount the --wait flag waits in the check
        setTimeout(async () => {
          await mineEpoch(kit)
          resolve()
        }, 1000)
      }),
    ])

    expect(logMock.mock.calls.map((args) => args.map(stripAnsiCodesAndTxHashes)))
      .toMatchInlineSnapshot(`
      [
        [
          "Running Checks:",
        ],
        [
          "   ✔  0xE36Ea790bc9d7AB70C55260C66D52b1eca985f84 is Signer or registered Account ",
        ],
        [
          "All checks passed",
        ],
        [
          "SendTransaction: activate",
        ],
        [
          "txHash: 0xtxhash",
        ],
      ]
    `)
    expect(writeMock.mock.calls).toMatchInlineSnapshot(`[]`)
    expect((await election.getVotesForGroupByAccount(userAddress, groupAddress)).active).toEqual(
      new BigNumber(activateAmount)
    )
  })

  it('activate votes for other address', async () => {
    const kit = newKitFromWeb3(web3)
    const [groupAddress, validatorAddress, userAddress, otherUserAddress] =
      await web3.eth.getAccounts()
    const election = await kit.contracts.getElection()
    const writeMock = jest.spyOn(ux.write, 'stdout')
    const activateAmount = 54321

    await setupGroupAndAffiliateValidator(kit, groupAddress, validatorAddress)
    await registerAccountWithLockedGold(kit, userAddress)

    await voteForGroupFrom(kit, userAddress, groupAddress, new BigNumber(activateAmount))

    await mineEpoch(kit)

    expect((await election.getVotesForGroupByAccount(userAddress, groupAddress)).active).toEqual(
      new BigNumber(0)
    )
    expect(
      (await election.getVotesForGroupByAccount(otherUserAddress, groupAddress)).active
    ).toEqual(new BigNumber(0))

    await testLocallyWithWeb3Node(
      ElectionActivate,
      ['--from', otherUserAddress, '--for', userAddress],
      web3
    )

    expect(writeMock.mock.calls).toMatchInlineSnapshot(`[]`)
    expect((await election.getVotesForGroupByAccount(userAddress, groupAddress)).active).toEqual(
      new BigNumber(activateAmount)
    )
    expect(
      (await election.getVotesForGroupByAccount(otherUserAddress, groupAddress)).active
    ).toEqual(new BigNumber(0))
  })
})
