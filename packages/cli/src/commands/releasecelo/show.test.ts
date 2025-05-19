import { newReleaseGold } from '@celo/abis/web3/ReleaseGold'
import { StrongAddress } from '@celo/base'
import { ContractKit, newKitFromWeb3 } from '@celo/contractkit'
import { unixSecondsTimestampToDateString } from '@celo/contractkit/lib/wrappers/BaseWrapper'
import { ReleaseGoldWrapper } from '@celo/contractkit/lib/wrappers/ReleaseGold'
import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import Web3 from 'web3'
import { stripAnsiCodesAndTxHashes, testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import { createMultisig } from '../../test-utils/multisigUtils'
import { deployReleaseGoldContract } from '../../test-utils/release-gold'
import Show from './show'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('releasegold:show cmd', (web3: Web3) => {
  let contractAddress: string
  let kit: ContractKit

  beforeEach(async () => {
    const accounts = (await web3.eth.getAccounts()) as StrongAddress[]
    kit = newKitFromWeb3(web3)

    contractAddress = await deployReleaseGoldContract(
      web3,
      await createMultisig(kit, [accounts[0], accounts[1]] as StrongAddress[], 2, 2),
      accounts[1],
      accounts[0],
      accounts[2]
    )
  })

  it('shows contract info', async () => {
    const logMock = jest.spyOn(console, 'log')
    const releaseGoldWrapper = new ReleaseGoldWrapper(
      kit.connection,
      newReleaseGold(kit.connection.web3, contractAddress),
      kit.contracts
    )

    await testLocallyWithWeb3Node(Show, ['--contract', contractAddress], web3)

    const schedule = await releaseGoldWrapper.getReleaseSchedule()

    expect(logMock.mock.calls.map((args) => args.map(stripAnsiCodesAndTxHashes)))
      .toMatchInlineSnapshot(`
      [
        [
          "authorizedSigners: 
        attestations: null
        validator: null
        voter: null
      balanceStateData: 
        currentReleasedTotalAmount: 0 
        maxDistribution: 20000000000000000000 (~2.000e+19)
        remainingLockedBalance: 0 
        remainingTotalBalance: 40000000000000000000 (~4.000e+19)
        remainingUnlockedBalance: 40000000000000000000 (~4.000e+19)
        totalBalance: 40000000000000000000 (~4.000e+19)
        totalWithdrawn: 0 
      beneficiary: 0x6Ecbe1DB9EF729CBe972C83Fb886247691Fb6beb
      canValidate: false
      canVote: true
      isRevoked: false
      liquidityProvisionMet: false
      owner: 0x1dC4c1cEFEF38a777b15aA20260a54E584b16C48
      refundAddress: 0xE36Ea790bc9d7AB70C55260C66D52b1eca985f84
      releaseGoldWrapperAddress: 0xDdbe68bEae54dd94465C6bbA2477EE9500ce1974
      releaseOwner: 0x5409ED021D9299bf6814279A6A1411A7e866A631
      releaseSchedule: 
        amountReleasedPerPeriod: 10000000000000000000 (~1.000e+19)
        numReleasePeriods: 4
        releaseCliff: ${unixSecondsTimestampToDateString(schedule.releaseCliff)}
        releasePeriod: 3 months
        releaseStartTime: ${unixSecondsTimestampToDateString(schedule.releaseStartTime)}
      revokedStateData: 
        canExpire: true
        releasedBalanceAtRevoke: 0 
        revocable: true
        revokeTime: 0",
        ],
      ]
    `)
  })
})
