import { viem_testWithAnvil } from '@celo/dev-utils/viem/anvil-test'
import { createPublicClient, createWalletClient, http } from 'viem'
import { celo } from 'viem/chains'
import { expect, it } from 'vitest'
import { PublicCeloClient, WalletCeloClient } from '../client'
import { vote } from './governance'

const TIMEOUT = 20_000

// We are forking celo mainnet at a known block and impersonating an account known to have been able to vote on that proposal
const voter = '0x3779CF289d8161Cd6679696D10647FBa2cb0ef50'
const proposalId = BigInt(230)
const forkBlockNumber = 35704485 // a few blocks before the account vote irl
const forkUrl = celo.rpcUrls.default.http[0]

viem_testWithAnvil(
  'vote',
  async (client) => {
    let clients: { public: PublicCeloClient; wallet: WalletCeloClient }
    beforeEach(async () => {
      await client.impersonateAccount({ address: voter })
      const walletClient = createWalletClient({
        account: voter,
        chain: client.chain,
        transport: http(client.chain.rpcUrls.default.http[0]),
      })
      clients = {
        public: createPublicClient({
          chain: client.chain,
          transport: http(client.chain.rpcUrls.default.http[0]),
        }),
        wallet: walletClient,
      }
    })
    afterEach(async () => {
      await client.stopImpersonatingAccount({ address: voter })
    })
    const txHashRegex = /^0x([A-Fa-f0-9]{64})$/

    it(
      'votes Yes on a proposal',
      async () => {
        await expect(vote(clients, proposalId, 'Yes')).resolves.toMatch(txHashRegex)
      },
      TIMEOUT
    )
    it(
      'votes No on a proposal',
      async () => {
        await expect(vote(clients, proposalId, 'No')).resolves.toMatch(txHashRegex)
      },
      TIMEOUT
    )

    it(
      'votes Abstain a proposal',
      async () => {
        await expect(vote(clients, proposalId, 'Abstain')).resolves.toMatch(txHashRegex)
      },
      TIMEOUT
    )

    it(
      'throws if proposalId is not in dequeue',
      async () => {
        const invalidProposalId = 999999n
        await expect(
          vote(clients, invalidProposalId, 'Yes')
        ).rejects.toThrowErrorMatchingInlineSnapshot(
          `[Error: ID 999999 not found in array 36,47,72,32,33,37,38,44,46,45,52,51,58,59,65,64,112,70,73,78,75,74,84,79,81,82,95,87,94,110,90,92,93,97,98,104,100,106,113,108,109,114,126,125,122,124,129,153,146,154,141,152,149,148,155,156,192,184,166,173,186,185,196,230,203,0,207,0,224,206]`
        )
      },
      TIMEOUT * 2
    )
  },
  { forkUrl, forkBlockNumber: forkBlockNumber }
)
