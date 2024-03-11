import { newKitFromWeb3 } from '@celo/contractkit'
import { testWithGanache } from '@celo/dev-utils/lib/ganache-test'
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
import { testLocally } from '../../test-utils/cliUtils'
import Activate from './activate'

process.env.NO_SYNCCHECK = 'true'

testWithGanache('election:activate', (web3: Web3) => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('fails when no flags are provided', async () => {
    await expect(testLocally(Activate, [])).rejects.toThrow('Missing required flag from')
  })

  it('shows no pending votes', async () => {
    const kit = newKitFromWeb3(web3)
    const [userAddress] = await web3.eth.getAccounts()
    const writeMock = jest.spyOn(ux.write, 'stdout')

    registerAccount(kit, userAddress)

    await testLocally(Activate, ['--from', userAddress])

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
    await testLocally(Activate, ['--from', userAddress])

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

    await testLocally(Activate, ['--from', userAddress])

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

    await testLocally(Activate, ['--from', otherUserAddress, '--for', userAddress])

    expect(writeMock.mock.calls).toMatchInlineSnapshot(`[]`)
    expect((await election.getVotesForGroupByAccount(userAddress, groupAddress)).active).toEqual(
      new BigNumber(activateAmount)
    )
    expect(
      (await election.getVotesForGroupByAccount(otherUserAddress, groupAddress)).active
    ).toEqual(new BigNumber(0))
  })
})
