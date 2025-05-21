import { viem_testWithAnvil } from '@celo/dev-utils/viem/anvil-test'
import { createWalletClient, http } from 'viem'
import { celo } from 'viem/chains'
import { expect, it } from 'vitest'
import { WalletCeloClient } from '../client'
import { vote } from './governance'

const TIMEOUT = 10_000

// We are forking celo mainnet at a known block and impersonating an account known to have been able to vote on that proposal
const voter = '0x3779CF289d8161Cd6679696D10647FBa2cb0ef50'
const proposalId = BigInt(230)
const forkBlockNumber = 35704485 // a few blocks before the account vote irl
const forkUrl = celo.rpcUrls.default.http[0]

viem_testWithAnvil(
  'vote',
  async (client) => {
    let walletClient: WalletCeloClient
    beforeEach(async () => {
      client.impersonateAccount({ address: voter })
      walletClient = createWalletClient({
        account: voter,
        chain: client.chain,
        transport: http(client.chain.rpcUrls.default.http[0]),
      })
    })
    afterEach(async () => {
      await client.stopImpersonatingAccount({ address: voter })
    })
    // Assume a proposal is already created and in the dequeue
    // For this test, we need a valid proposalId in the dequeue
    // We'll use a placeholder proposalId for demonstration
    // In a real test, you would create a proposal and get its ID

    it(
      'votes Yes on a proposal',
      async () => {
        // This will throw if proposalId is not in the dequeue
        // In a real test, ensure proposalId is valid and in the dequeue
        await expect(vote(walletClient, proposalId, 'Yes')).resolves.toBeDefined()
      },
      TIMEOUT
    )

    it(
      'votes No on a proposal',
      async () => {
        await expect(vote(walletClient, proposalId, 'No')).resolves.toBeDefined()
      },
      TIMEOUT
    )

    it(
      'votes Abstain on a proposal',
      async () => {
        await expect(vote(walletClient, proposalId, 'Abstain')).resolves.toBeDefined()
      },
      TIMEOUT
    )

    it(
      'throws if proposalId is not in dequeue',
      async () => {
        const invalidProposalId = 999999n
        await expect(vote(walletClient, invalidProposalId, 'Yes')).rejects.toThrow()
      },
      TIMEOUT
    )
  },
  { forkUrl, forkBlockNumber: forkBlockNumber }
)
