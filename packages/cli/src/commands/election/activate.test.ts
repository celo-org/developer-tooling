import { newKitFromWeb3 } from '@celo/contractkit'
import { testWithGanache } from '@celo/dev-utils/lib/ganache-test'
import { ux } from '@oclif/core'
import BigNumber from 'bignumber.js'
import Web3 from 'web3'
import {
  mineEpoch,
  registerAccountWithLockedGold,
  setupGroupAndAffiliateValidator,
  voteForGroupFrom,
} from '../../test-utils/chain-setup'
import { stripAnsiCodes, testLocally } from '../../test-utils/cliUtils'
import ElectionActivate from './activate'

process.env.NO_SYNCCHECK = 'true'

testWithGanache('election:activate', (web3: Web3) => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('fails when no flags are provided', async () => {
    await expect(testLocally(ElectionActivate, [])).rejects.toThrow('Missing required flag from')
  })

  it('shows no pending votes', async () => {
    const kit = newKitFromWeb3(web3)
    const [userAddress] = await web3.eth.getAccounts()
    const writeMock = jest.spyOn(ux.write, 'stdout')

    await registerAccountWithLockedGold(kit, userAddress)

    await testLocally(ElectionActivate, ['--from', userAddress])

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
    await testLocally(ElectionActivate, ['--from', userAddress])

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

    await testLocally(ElectionActivate, ['--from', userAddress])

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
      testLocally(ElectionActivate, ['--from', userAddress, '--wait']),
      new Promise<void>((resolve) => {
        // at least the amount the --wait flag waits in the check
        setTimeout(async () => {
          await mineEpoch(kit)
          resolve()
        }, 1000)
      }),
    ])

    expect(logMock.mock.calls.map((args) => args.map(stripAnsiCodes))).toMatchInlineSnapshot(`
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
          "txHash: 0xeb8b78386a4a12b607bc7fcd5025f9b831b37eda9b3719a87c7235947a314d49",
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

    await testLocally(ElectionActivate, ['--from', otherUserAddress, '--for', userAddress])

    expect(writeMock.mock.calls).toMatchInlineSnapshot(`[]`)
    expect((await election.getVotesForGroupByAccount(userAddress, groupAddress)).active).toEqual(
      new BigNumber(activateAmount)
    )
    expect(
      (await election.getVotesForGroupByAccount(otherUserAddress, groupAddress)).active
    ).toEqual(new BigNumber(0))
  })
})
