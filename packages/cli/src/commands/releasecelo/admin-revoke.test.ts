import { releaseGoldABI } from '@celo/abis'
import { StableToken, StrongAddress } from '@celo/base'
import { serializeSignature } from '@celo/base/lib/signatureUtils'
import { ContractKit, newKitFromProvider } from '@celo/contractkit'
import { AccountsWrapper } from '@celo/contractkit/lib/wrappers/Accounts'
import { GovernanceWrapper } from '@celo/contractkit/lib/wrappers/Governance'
import { ReleaseGoldWrapper } from '@celo/contractkit/lib/wrappers/ReleaseGold'
import { setBalance, testWithAnvilL2, withImpersonatedAccount } from '@celo/dev-utils/anvil-test'
import { getContractFromEvent, timeTravel } from '@celo/dev-utils/ganache-test'
import BigNumber from 'bignumber.js'
import { parseEther } from 'viem'
import { privateKeyToAddress } from 'viem/accounts'
import { topUpWithToken } from '../../test-utils/chain-setup'
import { testLocallyWithNode } from '../../test-utils/cliUtils'
import { createMultisig } from '../../test-utils/multisigUtils'
import { deployReleaseGoldContract } from '../../test-utils/release-gold'
import Approve from '../governance/approve'
import GovernanceUpvote from '../governance/upvote'
import GovernanceVote from '../governance/vote'
import AdminRevoke from './admin-revoke'
import Authorize from './authorize'
import CreateAccount from './create-account'
import LockedCelo from './locked-gold'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('releasegold:admin-revoke cmd', (provider) => {
  let kit: ContractKit
  let contractAddress: StrongAddress
  let releaseGoldWrapper: ReleaseGoldWrapper
  let accounts: StrongAddress[]

  beforeEach(async () => {
    kit = newKitFromProvider(provider)
    accounts = (await kit.connection.getAccounts()) as StrongAddress[]
    contractAddress = await deployReleaseGoldContract(
      provider,
      await createMultisig(kit, [accounts[0], accounts[1]] as StrongAddress[], 2, 2),
      accounts[1],
      accounts[0],
      accounts[2]
    )
    releaseGoldWrapper = new ReleaseGoldWrapper(
      kit.connection,
      kit.connection.getCeloContract(releaseGoldABI as any, contractAddress) as any,
      kit.contracts
    )
  })

  test('will revoke', async () => {
    await testLocallyWithNode(AdminRevoke, ['--contract', contractAddress, '--yesreally'], provider)
    const revokedContract = await getContractFromEvent(
      'ReleaseScheduleRevoked(uint256,uint256)',
      provider
    )
    expect(revokedContract).toBe(contractAddress)
  })

  test('will rescue all USDm balance', async () => {
    await topUpWithToken(kit, StableToken.USDm, accounts[0], new BigNumber('100'))
    const stableToken = await kit.contracts.getStableToken()
    const transferHash = await stableToken.transfer(contractAddress, 100, {
      from: accounts[0],
    })
    await kit.connection.viemClient.waitForTransactionReceipt({ hash: transferHash as `0x${string}` })
    await testLocallyWithNode(AdminRevoke, ['--contract', contractAddress, '--yesreally'], provider)
    const balance = await stableToken.balanceOf(contractAddress)
    expect(balance.isZero()).toBeTruthy()
  })

  test('will refund and finalize', async () => {
    await testLocallyWithNode(AdminRevoke, ['--contract', contractAddress, '--yesreally'], provider)
    const destroyedContract = await getContractFromEvent(
      'ReleaseGoldInstanceDestroyed(address,address)',
      provider
    )
    expect(destroyedContract).toBe(contractAddress)
  })

  describe('#when account exists with locked celo', () => {
    const value = '10'

    beforeEach(async () => {
      // Make sure the release gold contract has enough funds
      await setBalance(provider, contractAddress, new BigNumber(parseEther('10').toString()))
      await testLocallyWithNode(CreateAccount, ['--contract', contractAddress], provider)
      await testLocallyWithNode(
        LockedCelo,
        ['--contract', contractAddress, '--action', 'lock', '--value', value, '--yes'],
        provider
      )
    })

    test('will unlock all gold', async () => {
      await testLocallyWithNode(
        AdminRevoke,
        ['--contract', contractAddress, '--yesreally'],
        provider
      )
      const lockedGold = await kit.contracts.getLockedGold()
      const lockedAmount = await lockedGold.getAccountTotalLockedGold(releaseGoldWrapper.address)
      expect(lockedAmount.isZero()).toBeTruthy()
    })

    describe('#when account has authorized a vote signer', () => {
      let voteSigner: string
      let accountsWrapper: AccountsWrapper
      //
      const PRIVATE_KEY1 = '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'

      beforeEach(async () => {
        voteSigner = privateKeyToAddress(PRIVATE_KEY1)
        accountsWrapper = await kit.contracts.getAccounts()
        const pop = await accountsWrapper.generateProofOfKeyPossessionLocally(
          contractAddress,
          voteSigner,
          PRIVATE_KEY1
        )
        await testLocallyWithNode(
          Authorize,
          [
            '--contract',
            contractAddress,
            '--role',
            'vote',
            '--signer',
            voteSigner,
            '--signature',
            serializeSignature(pop),
          ],
          provider
        )
      })

      it('will rotate vote signer', async () => {
        await testLocallyWithNode(
          AdminRevoke,
          ['--contract', contractAddress, '--yesreally'],
          provider
        )
        const newVoteSigner = await accountsWrapper.getVoteSigner(contractAddress)
        expect(newVoteSigner).not.toEqual(voteSigner)
      })

      describe('#when account has voted', () => {
        let governance: GovernanceWrapper

        beforeEach(async () => {
          // from vote.test.ts
          governance = await kit.contracts.getGovernance()
          const minDeposit = (await governance.minDeposit()).toFixed()
          const proposeHash1 = await governance.propose([], 'URL', {
            from: accounts[0],
            value: minDeposit,
          })
          await kit.connection.viemClient.waitForTransactionReceipt({ hash: proposeHash1 as `0x${string}` })

          const dequeueFrequency = (await governance.dequeueFrequency()).toNumber()
          await timeTravel(dequeueFrequency + 1, provider)
          const multiApprover = await governance.getApproverMultisig()
          await setBalance(
            provider,
            multiApprover.address,
            new BigNumber(parseEther('10').toString())
          )
          await withImpersonatedAccount(provider, multiApprover.address, async () => {
            await testLocallyWithNode(
              Approve,
              ['--from', multiApprover.address, '--proposalID', '1'],
              provider
            )
          })
          await testLocallyWithNode(
            GovernanceVote,
            [
              '--from',
              voteSigner,
              '--proposalID',
              '1',
              '--value',
              'Yes',
              '--privateKey',
              PRIVATE_KEY1,
            ],
            provider
          )
          const proposeHash2 = await governance.propose([], 'URL', {
            from: accounts[0],
            value: minDeposit,
          })
          await kit.connection.viemClient.waitForTransactionReceipt({ hash: proposeHash2 as `0x${string}` })
          const proposeHash3 = await governance.propose([], 'URL', {
            from: accounts[0],
            value: minDeposit,
          })
          await kit.connection.viemClient.waitForTransactionReceipt({ hash: proposeHash3 as `0x${string}` })
          await testLocallyWithNode(
            GovernanceUpvote,
            ['--from', voteSigner, '--proposalID', '3', '--privateKey', PRIVATE_KEY1],
            provider
          )
        })

        it('will revoke governance votes and upvotes', async () => {
          const isVotingBefore = await governance.isVoting(contractAddress)
          expect(isVotingBefore).toBeTruthy()
          await testLocallyWithNode(
            AdminRevoke,
            ['--contract', contractAddress, '--yesreally'],
            provider
          )
          const isVotingAfter = await governance.isVoting(contractAddress)
          expect(isVotingAfter).toBeFalsy()
        })
      })
    })
  })
})
