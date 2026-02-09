import { newKitFromWeb3 } from '@celo/contractkit'
import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import BigNumber from 'bignumber.js'
import {
  registerAccount,
  registerAccountWithLockedGold,
  setupGroupAndAffiliateValidator,
  voteForGroupFromAndActivateVotes,
} from '../../test-utils/chain-setup'
import { testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import Revoke from './revoke'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('election:revoke', (client) => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('fails when no flags are provided', async () => {
    await expect(testLocallyWithWeb3Node(Revoke, [], client)).rejects.toThrow(
      'Missing required flag'
    )
  })

  it('fails when address is not an account', async () => {
    const logMock = jest.spyOn(console, 'log')
    const [fromAddress, groupAddress] = await client.eth.getAccounts()

    await expect(
      testLocallyWithWeb3Node(
        Revoke,
        ['--from', fromAddress, '--for', groupAddress, '--value', '1'],
        client
      )
    ).rejects.toMatchInlineSnapshot(`[Error: Some checks didn't pass!]`)
    expect(logMock.mock.calls[1][0]).toContain(
      `${fromAddress} is not a signer or registered as an account`
    )
  })

  it('fails when trying to revoke more votes than voted', async () => {
    const kit = newKitFromWeb3(client)
    const [fromAddress, groupAddress] = await client.eth.getAccounts()

    await registerAccount(kit, fromAddress)

    await expect(
      testLocallyWithWeb3Node(
        Revoke,
        ['--from', fromAddress, '--for', groupAddress, '--value', '1'],
        client
      )
    ).rejects.toThrow(
      `can't revoke more votes for ${groupAddress} than have been made by ${fromAddress}`
    )
  })

  it('successfuly revokes all votes', async () => {
    const kit = newKitFromWeb3(client)
    const election = await kit.contracts.getElection()
    const amount = new BigNumber(12345)
    const [fromAddress, validatorAddress, groupAddress] = await client.eth.getAccounts()

    await registerAccountWithLockedGold(kit, fromAddress)
    await setupGroupAndAffiliateValidator(kit, groupAddress, validatorAddress)
    await voteForGroupFromAndActivateVotes(kit, fromAddress, groupAddress, amount)

    expect((await election.getVotesForGroupByAccount(fromAddress, groupAddress)).active).toEqual(
      amount
    )

    await testLocallyWithWeb3Node(
      Revoke,
      ['--from', fromAddress, '--for', groupAddress, '--value', amount.toFixed()],
      client
    )

    expect((await election.getVotesForGroupByAccount(fromAddress, groupAddress)).active).toEqual(
      new BigNumber(0)
    )
  })

  it('successfuly revokes votes partially', async () => {
    const kit = newKitFromWeb3(client)
    const election = await kit.contracts.getElection()
    const amount = new BigNumber(54321)
    const revokeAmount = new BigNumber(4321)
    const [fromAddress, validatorAddress, groupAddress] = await client.eth.getAccounts()

    await registerAccountWithLockedGold(kit, fromAddress)
    await setupGroupAndAffiliateValidator(kit, groupAddress, validatorAddress)
    await voteForGroupFromAndActivateVotes(kit, fromAddress, groupAddress, amount)

    expect((await election.getVotesForGroupByAccount(fromAddress, groupAddress)).active).toEqual(
      amount
    )

    await testLocallyWithWeb3Node(
      Revoke,
      ['--from', fromAddress, '--for', groupAddress, '--value', revokeAmount.toFixed()],
      client
    )

    expect((await election.getVotesForGroupByAccount(fromAddress, groupAddress)).active).toEqual(
      amount.minus(revokeAmount)
    )
  })
})
