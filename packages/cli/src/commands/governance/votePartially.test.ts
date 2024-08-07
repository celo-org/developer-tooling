import { StrongAddress } from '@celo/base'
import { newKitFromWeb3 } from '@celo/contractkit'
import { GovernanceWrapper } from '@celo/contractkit/lib/wrappers/Governance'
import { testWithAnvilL1 } from '@celo/dev-utils/lib/anvil-test'
import { NetworkConfig, timeTravel } from '@celo/dev-utils/lib/ganache-test'
import BigNumber from 'bignumber.js'
import Web3 from 'web3'
import { changeMultiSigOwner } from '../../test-utils/chain-setup'
import { testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import Register from '../account/register'
import Lock from '../lockedgold/lock'
import Approve from './approve'
import Dequeue from './dequeue'
import VotePartially from './votePartially'

process.env.NO_SYNCCHECK = 'true'

const expConfig = NetworkConfig.governance

testWithAnvilL1('governance:vote-partially cmd', (web3: Web3) => {
  let minDeposit: string
  const kit = newKitFromWeb3(web3)
  const proposalID = new BigNumber(1)

  let accounts: StrongAddress[] = []
  let governance: GovernanceWrapper

  beforeEach(async () => {
    accounts = (await web3.eth.getAccounts()) as StrongAddress[]
    kit.defaultAccount = accounts[0]
    governance = await kit.contracts.getGovernance()
    minDeposit = (await governance.minDeposit()).toFixed()
    await governance
      .propose([], 'URL')
      .sendAndWaitForReceipt({ from: accounts[0], value: minDeposit })
    await timeTravel(expConfig.dequeueFrequency, web3)
    await testLocallyWithWeb3Node(Dequeue, ['--from', accounts[0]], web3)
    await changeMultiSigOwner(kit, accounts[0])
    await testLocallyWithWeb3Node(
      Approve,
      ['--from', accounts[0], '--proposalID', proposalID.toString(10), '--useMultiSig'],
      web3
    )
    await testLocallyWithWeb3Node(Register, ['--from', accounts[0]], web3)
    await testLocallyWithWeb3Node(Lock, ['--from', accounts[0], '--value', '100'], web3)
  })

  test('can vote partially yes and no', async () => {
    await testLocallyWithWeb3Node(
      VotePartially,
      [
        '--from',
        accounts[0],
        '--proposalID',
        proposalID.toString(10),
        '--yes',
        '10',
        '--no',
        '20',
        '--abstain',
        '0',
      ],
      web3
    )
    const votes = await governance.getVotes(proposalID)
    expect(votes.Yes.toNumber()).toEqual(10)
    expect(votes.No.toNumber()).toEqual(20)
  })
})
