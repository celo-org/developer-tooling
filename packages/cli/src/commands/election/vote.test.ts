import { newKitFromWeb3 } from '@celo/contractkit'
import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import { ux } from '@oclif/core'
import BigNumber from 'bignumber.js'
import Web3 from 'web3'
import {
  registerAccount,
  registerAccountWithLockedGold,
  setupGroupAndAffiliateValidator,
} from '../../test-utils/chain-setup'
import { stripAnsiCodesAndTxHashes, testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import Vote from './vote'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('election:vote', (web3: Web3) => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('fails when no flags are provided', async () => {
    await expect(testLocallyWithWeb3Node(Vote, [], web3)).rejects.toThrow('Missing required flag')
  })

  it('fails when voter is not an account', async () => {
    const logMock = jest.spyOn(console, 'log')
    const [fromAddress, groupAddress] = await web3.eth.getAccounts()

    await expect(
      testLocallyWithWeb3Node(
        Vote,
        ['--from', fromAddress, '--for', groupAddress, '--value', '1'],
        web3
      )
    ).rejects.toThrow()

    expect(logMock.mock.calls[1][0]).toContain(
      `${fromAddress} is not a signer or registered as an account`
    )
  })

  it('fails when "for" is not a validator group', async () => {
    const kit = newKitFromWeb3(web3)
    const logMock = jest.spyOn(console, 'log')
    const [fromAddress, groupAddress] = await web3.eth.getAccounts()

    await registerAccount(kit, fromAddress)

    await expect(
      testLocallyWithWeb3Node(
        Vote,
        ['--from', fromAddress, '--for', groupAddress, '--value', '1'],
        web3
      )
    ).rejects.toThrow()

    expect(stripAnsiCodesAndTxHashes(logMock.mock.calls[2][0])).toContain(
      `✘  0x6Ecbe1DB9EF729CBe972C83Fb886247691Fb6beb is ValidatorGroup`
    )
  })

  it('fails when value is too high', async () => {
    const kit = newKitFromWeb3(web3)
    const logMock = jest.spyOn(console, 'log')
    const [fromAddress, groupAddress, validatorAddress] = await web3.eth.getAccounts()

    await registerAccount(kit, fromAddress)
    await setupGroupAndAffiliateValidator(kit, groupAddress, validatorAddress)

    await expect(
      testLocallyWithWeb3Node(
        Vote,
        ['--from', fromAddress, '--for', groupAddress, '--value', '1'],
        web3
      )
    ).rejects.toThrow()

    expect(stripAnsiCodesAndTxHashes(logMock.mock.calls[3][0])).toContain(
      `✘  Account has at least 0.000000000000000001 non-voting Locked Celo`
    )
  })

  it('successfuly votes for a group', async () => {
    const kit = newKitFromWeb3(web3)
    const logMock = jest.spyOn(console, 'log')
    const writeMock = jest.spyOn(ux.write, 'stdout')
    const [fromAddress, groupAddress, validatorAddress] = await web3.eth.getAccounts()
    const amount = new BigNumber(12345)
    const election = await kit.contracts.getElection()

    await registerAccountWithLockedGold(kit, fromAddress)
    await setupGroupAndAffiliateValidator(kit, groupAddress, validatorAddress)

    expect(await election.getTotalVotesForGroupByAccount(groupAddress, fromAddress)).toEqual(
      new BigNumber(0)
    )

    await expect(
      testLocallyWithWeb3Node(
        Vote,
        ['--from', fromAddress, '--for', groupAddress, '--value', amount.toFixed()],
        web3
      )
    ).resolves.not.toThrow()

    expect(await election.getTotalVotesForGroupByAccount(groupAddress, fromAddress)).toEqual(amount)
    expect(
      logMock.mock.calls.map((args) => args.map(stripAnsiCodesAndTxHashes))
    ).toMatchInlineSnapshot(`
      [
        [
          "Running Checks:",
        ],
        [
          "   ✔  0x5409ED021D9299bf6814279A6A1411A7e866A631 is Signer or registered Account ",
        ],
        [
          "   ✔  0x6Ecbe1DB9EF729CBe972C83Fb886247691Fb6beb is ValidatorGroup ",
        ],
        [
          "   ✔  Account has at least 0.000000000000012345 non-voting Locked Celo ",
        ],
        [
          "All checks passed",
        ],
        [
          "SendTransaction: Electon -> Vote",
        ],
        [
          "txHash: 0xtxhash",
        ],
        [
          "ValidatorGroupVoteCast:",
        ],
        [
          "account: 0x5409ED021D9299bf6814279A6A1411A7e866A631
      group: 0x6Ecbe1DB9EF729CBe972C83Fb886247691Fb6beb
      value: 12345",
        ],
      ]
    `)
    expect(writeMock.mock.calls).toMatchInlineSnapshot(`
      [
        [
          "Remember to activate your vote next epoch
      ",
        ],
      ]
    `)
  })
})
