import { newReleaseGold } from '@celo/abis/web3/ReleaseGold'
import { StableToken, StrongAddress } from '@celo/base'
import { serializeSignature } from '@celo/base/lib/signatureUtils'
import { ContractKit, newKitFromWeb3 } from '@celo/contractkit'
import { AccountsWrapper } from '@celo/contractkit/lib/wrappers/Accounts'
import { GovernanceWrapper } from '@celo/contractkit/lib/wrappers/Governance'
import { ReleaseGoldWrapper } from '@celo/contractkit/lib/wrappers/ReleaseGold'
import { setBalance, testWithAnvilL1 } from '@celo/dev-utils/lib/anvil-test'
import { getContractFromEvent, testWithGanache, timeTravel } from '@celo/dev-utils/lib/ganache-test'
import BigNumber from 'bignumber.js'
import Web3 from 'web3'
import { topUpWithToken } from '../../test-utils/chain-setup'
import { testLocally, testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
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

testWithAnvilL1('releasegold:admin-revoke cmd', (web3: Web3) => {
  let kit: ContractKit
  let contractAddress: StrongAddress
  let releaseGoldWrapper: ReleaseGoldWrapper
  let accounts: StrongAddress[]

  beforeEach(async () => {
    accounts = (await web3.eth.getAccounts()) as StrongAddress[]
    kit = newKitFromWeb3(web3)
    contractAddress = await deployReleaseGoldContract(
      web3,
      await createMultisig(kit, [accounts[0], accounts[1]] as StrongAddress[], 2, 2),
      accounts[1],
      accounts[0],
      accounts[2]
    )
    releaseGoldWrapper = new ReleaseGoldWrapper(
      kit.connection,
      newReleaseGold(web3, contractAddress),
      kit.contracts
    )
  })

  test('will revoke', async () => {
    await testLocallyWithWeb3Node(AdminRevoke, ['--contract', contractAddress, '--yesreally'], web3)
    const revokedContract = await getContractFromEvent(
      'ReleaseScheduleRevoked(uint256,uint256)',
      web3
    )
    expect(revokedContract).toBe(contractAddress)
  })

  test('will rescue all cUSD balance', async () => {
    await topUpWithToken(kit, StableToken.cUSD, accounts[0], new BigNumber('100'))
    const stableToken = await kit.contracts.getStableToken()
    await stableToken.transfer(contractAddress, 100).send({
      from: accounts[0],
    })
    await testLocallyWithWeb3Node(AdminRevoke, ['--contract', contractAddress, '--yesreally'], web3)
    const balance = await stableToken.balanceOf(contractAddress)
    expect(balance.isZero()).toBeTruthy()
  })

  test('will refund and finalize', async () => {
    await testLocallyWithWeb3Node(AdminRevoke, ['--contract', contractAddress, '--yesreally'], web3)
    const destroyedContract = await getContractFromEvent(
      'ReleaseGoldInstanceDestroyed(address,address)',
      web3
    )
    expect(destroyedContract).toBe(contractAddress)
  })

  describe('#when account exists with locked celo', () => {
    const value = '10'

    beforeEach(async () => {
      // Make sure the release gold contract has enough funds
      await setBalance(web3, contractAddress, new BigNumber(web3.utils.toWei('10', 'ether')))
      await testLocallyWithWeb3Node(CreateAccount, ['--contract', contractAddress], web3)
      await testLocallyWithWeb3Node(
        LockedCelo,
        ['--contract', contractAddress, '--action', 'lock', '--value', value, '--yes'],
        web3
      )
    })

    test('will unlock all gold', async () => {
      await testLocallyWithWeb3Node(
        AdminRevoke,
        ['--contract', contractAddress, '--yesreally'],
        web3
      )
      const lockedGold = await kit.contracts.getLockedGold()
      const lockedAmount = await lockedGold.getAccountTotalLockedGold(releaseGoldWrapper.address)
      expect(lockedAmount.isZero()).toBeTruthy()
    })
  })
})

// Following tests rely on using personal_* RPC methods which are not supported in anvil
testWithGanache('releasegold:admin-revoke cmd', (web3: Web3) => {
  let kit: ContractKit
  let contractAddress: string
  let accounts: string[]

  beforeEach(async () => {
    contractAddress = await getContractFromEvent(
      'ReleaseGoldInstanceCreated(address,address)',
      web3,
      { index: 1 } // revocable: true
    )
    kit = newKitFromWeb3(web3)
    accounts = await web3.eth.getAccounts()
  })

  describe('#when account exists with locked celo', () => {
    const value = '10'

    beforeEach(async () => {
      await testLocally(CreateAccount, ['--contract', contractAddress])
      await testLocally(LockedCelo, [
        '--contract',
        contractAddress,
        '--action',
        'lock',
        '--value',
        value,
        '--yes',
      ])
    })

    describe('#when account has authorized a vote signer', () => {
      let voteSigner: string
      let accountsWrapper: AccountsWrapper

      beforeEach(async () => {
        voteSigner = accounts[2]
        accountsWrapper = await kit.contracts.getAccounts()
        const pop = await accountsWrapper.generateProofOfKeyPossession(contractAddress, voteSigner)
        await testLocally(Authorize, [
          '--contract',
          contractAddress,
          '--role',
          'vote',
          '--signer',
          voteSigner,
          '--signature',
          serializeSignature(pop),
        ])
      })

      test('will rotate vote signer', async () => {
        await testLocally(AdminRevoke, ['--contract', contractAddress, '--yesreally'])
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
          await timeTravel(dequeueFrequency + 1, web3)

          await testLocally(Approve, ['--from', accounts[0], '--proposalID', '1', '--useMultiSig'])
          await testLocally(GovernanceVote, [
            '--from',
            voteSigner,
            '--proposalID',
            '1',
            '--value',
            'Yes',
          ])
          await governance
            .propose([], 'URL')
            .sendAndWaitForReceipt({ from: accounts[0], value: minDeposit })
          await governance
            .propose([], 'URL')
            .sendAndWaitForReceipt({ from: accounts[0], value: minDeposit })
          await testLocally(GovernanceUpvote, ['--from', voteSigner, '--proposalID', '3'])

          // const validators = await kit.contracts.getValidators()
          // const groups = await validators.getRegisteredValidatorGroupsAddresses()
          // await testLocally(ElectionVote, [
          //   '--from',
          //   voteSigner,
          //   '--for',
          //   groups[0],
          //   '--value',
          //   value
          // ])
        })

        test('will revoke governance votes and upvotes', async () => {
          const isVotingBefore = await governance.isVoting(contractAddress)
          expect(isVotingBefore).toBeTruthy()
          await testLocally(AdminRevoke, ['--contract', contractAddress, '--yesreally'])
          const isVotingAfter = await governance.isVoting(contractAddress)
          expect(isVotingAfter).toBeFalsy()
        })

        // test.only('will revoke election votes', async () => {
        //   const election = await kit.contracts.getElection()
        //   const votesBefore = await election.getTotalVotesByAccount(contractAddress)
        //   expect(votesBefore.isZero).toBeFalsy()
        //   await testLocally(AdminRevoke, ['--contract', contractAddress, '--yesreally'])
        //   const votesAfter = await election.getTotalVotesByAccount(contractAddress)
        //   expect(votesAfter.isZero()).toBeTruthy()
        // })
      })
    })
  })
})
