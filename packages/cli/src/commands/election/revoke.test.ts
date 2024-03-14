import { newKitFromWeb3 } from '@celo/contractkit'
import { testWithGanache } from '@celo/dev-utils/lib/ganache-test'
import BigNumber from 'bignumber.js'
import Web3 from 'web3'
import {
  registerAccount,
  registerAccountWithLockedGold,
  setupGroupAndAffiliateValidator,
  voteForGroupFromAndActivateVotes,
} from '../../test-utils/chain-setup'
import { testLocally } from '../../test-utils/cliUtils'
import Revoke from './revoke'

process.env.NO_SYNCCHECK = 'true'

testWithGanache('election:revoke', (web3: Web3) => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('fails when no flags are provided', async () => {
    await expect(testLocally(Revoke, [])).rejects.toThrow('Missing required flag')
  })

  it('fails when address is not an account', async () => {
    const logMock = jest.spyOn(console, 'log')
    const [fromAddress, groupAddress] = await web3.eth.getAccounts()

    await expect(
      testLocally(Revoke, ['--from', fromAddress, '--for', groupAddress, '--value', '1'])
    ).rejects.toThrow()
    expect(logMock.mock.calls[1][0]).toContain(
      `${fromAddress} is not a signer or registered as an account`
    )
  })

  it('fails when trying to revoke more votes than voted', async () => {
    const kit = newKitFromWeb3(web3)
    const [fromAddress, groupAddress] = await web3.eth.getAccounts()

    await registerAccount(kit, fromAddress)

    await expect(
      testLocally(Revoke, ['--from', fromAddress, '--for', groupAddress, '--value', '1'])
    ).rejects.toThrow(
      `can't revoke more votes for ${groupAddress} than have been made by ${fromAddress}`
    )
  })

  it('successfuly revokes all votes', async () => {
    const kit = newKitFromWeb3(web3)
    const election = await kit.contracts.getElection()
    const amount = new BigNumber(12345)
    const [fromAddress, validatorAddress, groupAddress] = await web3.eth.getAccounts()

    await registerAccountWithLockedGold(kit, fromAddress)
    await setupGroupAndAffiliateValidator(kit, groupAddress, validatorAddress)
    await voteForGroupFromAndActivateVotes(kit, fromAddress, groupAddress, amount)

    expect((await election.getVotesForGroupByAccount(fromAddress, groupAddress)).active).toEqual(
      amount
    )

    await testLocally(Revoke, [
      '--from',
      fromAddress,
      '--for',
      groupAddress,
      '--value',
      amount.toFixed(),
    ])

    expect((await election.getVotesForGroupByAccount(fromAddress, groupAddress)).active).toEqual(
      new BigNumber(0)
    )
  })

  it('successfuly revokes votes partially', async () => {
    const kit = newKitFromWeb3(web3)
    const election = await kit.contracts.getElection()
    const amount = new BigNumber(54321)
    const revokeAmount = new BigNumber(4321)
    const [fromAddress, validatorAddress, groupAddress] = await web3.eth.getAccounts()

    await registerAccountWithLockedGold(kit, fromAddress)
    await setupGroupAndAffiliateValidator(kit, groupAddress, validatorAddress)
    await voteForGroupFromAndActivateVotes(kit, fromAddress, groupAddress, amount)

    expect((await election.getVotesForGroupByAccount(fromAddress, groupAddress)).active).toEqual(
      amount
    )

    await testLocally(Revoke, [
      '--from',
      fromAddress,
      '--for',
      groupAddress,
      '--value',
      revokeAmount.toFixed(),
    ])

    expect((await election.getVotesForGroupByAccount(fromAddress, groupAddress)).active).toEqual(
      amount.minus(revokeAmount)
    )
  })
})
