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

testWithAnvilL2('releasegold:admin-revoke cmd', (providerOwner) => {
  let kit: ContractKit
  let contractAddress: StrongAddress
  let releaseGoldWrapper: ReleaseGoldWrapper
  let accounts: StrongAddress[]

  beforeEach(async () => {
    kit = newKitFromProvider(providerOwner.currentProvider)
    accounts = (await kit.connection.getAccounts()) as StrongAddress[]
    contractAddress = await deployReleaseGoldContract(
      providerOwner,
      await createMultisig(kit, [accounts[0], accounts[1]] as StrongAddress[], 2, 2),
      accounts[1],
      accounts[0],
      accounts[2]
    )
    releaseGoldWrapper = new ReleaseGoldWrapper(
      kit.connection,
      kit.connection.createContract(releaseGoldABI as any, contractAddress),
      kit.contracts
    )
  })

  test('will revoke', async () => {
    await testLocallyWithNode(
      AdminRevoke,
      ['--contract', contractAddress, '--yesreally'],
      providerOwner
    )
    const revokedContract = await getContractFromEvent(
      'ReleaseScheduleRevoked(uint256,uint256)',
      providerOwner
    )
    expect(revokedContract).toBe(contractAddress)
  })

  test('will rescue all USDm balance', async () => {
    await topUpWithToken(kit, StableToken.USDm, accounts[0], new BigNumber('100'))
    const stableToken = await kit.contracts.getStableToken()
    await stableToken.transfer(contractAddress, 100).send({
      from: accounts[0],
    })
    await testLocallyWithNode(
      AdminRevoke,
      ['--contract', contractAddress, '--yesreally'],
      providerOwner
    )
    const balance = await stableToken.balanceOf(contractAddress)
    expect(balance.isZero()).toBeTruthy()
  })

  test('will refund and finalize', async () => {
    await testLocallyWithNode(
      AdminRevoke,
      ['--contract', contractAddress, '--yesreally'],
      providerOwner
    )
    const destroyedContract = await getContractFromEvent(
      'ReleaseGoldInstanceDestroyed(address,address)',
      providerOwner
    )
    expect(destroyedContract).toBe(contractAddress)
  })

  describe('#when account exists with locked celo', () => {
    const value = '10'

    beforeEach(async () => {
      // Make sure the release gold contract has enough funds
      await setBalance(providerOwner, contractAddress, new BigNumber(parseEther('10').toString()))
      await testLocallyWithNode(CreateAccount, ['--contract', contractAddress], providerOwner)
      await testLocallyWithNode(
        LockedCelo,
        ['--contract', contractAddress, '--action', 'lock', '--value', value, '--yes'],
        providerOwner
      )
    })

    test('will unlock all gold', async () => {
      await testLocallyWithNode(
        AdminRevoke,
        ['--contract', contractAddress, '--yesreally'],
        providerOwner
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
          providerOwner
        )
      })

      it('will rotate vote signer', async () => {
        await testLocallyWithNode(
          AdminRevoke,
          ['--contract', contractAddress, '--yesreally'],
          providerOwner
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
          await governance
            .propose([], 'URL')
            .sendAndWaitForReceipt({ from: accounts[0], value: minDeposit })

          const dequeueFrequency = (await governance.dequeueFrequency()).toNumber()
          await timeTravel(dequeueFrequency + 1, providerOwner)
          const multiApprover = await governance.getApproverMultisig()
          await setBalance(
            providerOwner,
            multiApprover.address,
            new BigNumber(parseEther('10').toString())
          )
          await withImpersonatedAccount(providerOwner, multiApprover.address, async () => {
            await testLocallyWithNode(
              Approve,
              ['--from', multiApprover.address, '--proposalID', '1'],
              providerOwner
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
            providerOwner
          )
          await governance
            .propose([], 'URL')
            .sendAndWaitForReceipt({ from: accounts[0], value: minDeposit })
          await governance
            .propose([], 'URL')
            .sendAndWaitForReceipt({ from: accounts[0], value: minDeposit })
          await testLocallyWithNode(
            GovernanceUpvote,
            ['--from', voteSigner, '--proposalID', '3', '--privateKey', PRIVATE_KEY1],
            providerOwner
          )
        })

        it('will revoke governance votes and upvotes', async () => {
          const isVotingBefore = await governance.isVoting(contractAddress)
          expect(isVotingBefore).toBeTruthy()
          await testLocallyWithNode(
            AdminRevoke,
            ['--contract', contractAddress, '--yesreally'],
            providerOwner
          )
          const isVotingAfter = await governance.isVoting(contractAddress)
          expect(isVotingAfter).toBeFalsy()
        })
      })
    })
  })
})
