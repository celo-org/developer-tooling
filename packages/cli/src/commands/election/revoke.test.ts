import { newKitFromProvider } from '@celo/contractkit'
import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import BigNumber from 'bignumber.js'
import {
  registerAccount,
  registerAccountWithLockedGold,
  setupGroupAndAffiliateValidator,
  voteForGroupFromAndActivateVotes,
} from '../../test-utils/chain-setup'
import { testLocallyWithNode } from '../../test-utils/cliUtils'
import Revoke from './revoke'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('election:revoke', (provider) => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('fails when no flags are provided', async () => {
    await expect(testLocallyWithNode(Revoke, [], provider)).rejects.toThrow('Missing required flag')
  })

  it('fails when address is not an account', async () => {
    const logMock = jest.spyOn(console, 'log')
    const kit = newKitFromProvider(provider)
    const [fromAddress, groupAddress] = await kit.connection.getAccounts()

    await expect(
      testLocallyWithNode(
        Revoke,
        ['--from', fromAddress, '--for', groupAddress, '--value', '1'],
        provider
      )
    ).rejects.toMatchInlineSnapshot(`[Error: Some checks didn't pass!]`)
    expect(logMock.mock.calls[1][0]).toContain(
      `${fromAddress} is not a signer or registered as an account`
    )
  })

  it('fails when trying to revoke more votes than voted', async () => {
    const kit = newKitFromProvider(provider)
    const [fromAddress, groupAddress] = await kit.connection.getAccounts()

    await registerAccount(kit, fromAddress)

    await expect(
      testLocallyWithNode(
        Revoke,
        ['--from', fromAddress, '--for', groupAddress, '--value', '1'],
        provider
      )
    ).rejects.toThrow(
      `can't revoke more votes for ${groupAddress} than have been made by ${fromAddress}`
    )
  })

  it('successfuly revokes all votes', async () => {
    const kit = newKitFromProvider(provider)
    const election = await kit.contracts.getElection()
    const amount = new BigNumber(12345)
    const [fromAddress, validatorAddress, groupAddress] = await kit.connection.getAccounts()

    await registerAccountWithLockedGold(kit, fromAddress)
    await setupGroupAndAffiliateValidator(kit, groupAddress, validatorAddress)
    await voteForGroupFromAndActivateVotes(kit, fromAddress, groupAddress, amount)

    expect((await election.getVotesForGroupByAccount(fromAddress, groupAddress)).active).toEqual(
      amount
    )

    await testLocallyWithNode(
      Revoke,
      ['--from', fromAddress, '--for', groupAddress, '--value', amount.toFixed()],
      provider
    )

    expect((await election.getVotesForGroupByAccount(fromAddress, groupAddress)).active).toEqual(
      new BigNumber(0)
    )
  }, 120000)

  it('successfuly revokes votes partially', async () => {
    const kit = newKitFromProvider(provider)
    const election = await kit.contracts.getElection()
    const amount = new BigNumber(54321)
    const revokeAmount = new BigNumber(4321)
    const [fromAddress, validatorAddress, groupAddress] = await kit.connection.getAccounts()

    await registerAccountWithLockedGold(kit, fromAddress)
    await setupGroupAndAffiliateValidator(kit, groupAddress, validatorAddress)
    await voteForGroupFromAndActivateVotes(kit, fromAddress, groupAddress, amount)

    expect((await election.getVotesForGroupByAccount(fromAddress, groupAddress)).active).toEqual(
      amount
    )

    await testLocallyWithNode(
      Revoke,
      ['--from', fromAddress, '--for', groupAddress, '--value', revokeAmount.toFixed()],
      provider
    )

    expect((await election.getVotesForGroupByAccount(fromAddress, groupAddress)).active).toEqual(
      amount.minus(revokeAmount)
    )
  }, 120000)
})
