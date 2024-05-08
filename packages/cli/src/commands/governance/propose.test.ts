import { StrongAddress } from '@celo/base'
import { newKitFromWeb3 } from '@celo/contractkit'
import { GoldTokenWrapper } from '@celo/contractkit/lib/wrappers/GoldTokenWrapper'
import { GovernanceWrapper } from '@celo/contractkit/lib/wrappers/Governance'
import { NetworkConfig, testWithGanache } from '@celo/dev-utils/lib/ganache-test'
import { ux } from '@oclif/core'
import * as fs from 'fs'
import Web3 from 'web3'
import { EXTRA_LONG_TIMEOUT_MS, testLocally } from '../../test-utils/cliUtils'
import { createMultisig } from '../../test-utils/multisigUtils'
import Approve from '../multisig/approve'
import Propose from './propose'

process.env.NO_SYNCCHECK = 'true'

const randomAddress = '0x13B10327aA54Cb055B0ea4B85B59b4bcf64B3B92'

const transactions = [
  {
    contract: 'GoldToken',
    function: 'transfer',
    args: ['0xC870dc32e84531DA06C0156f0dfa73CfA091C4bd', '42'],
    value: '0',
  },
]

const transactionsUnknownAddress = [
  {
    address: randomAddress,
    function: 'transfer(address,uint256)',
    args: ['0xC870dc32e84531DA06C0156f0dfa73CfA091C4bd', '42'],
    value: '0',
  },
]

const transactionsWithStruct = [
  {
    address: '0x3d79EdAaBC0EaB6F08ED885C05Fc0B014290D95A',
    function:
      'mint((address token0,address token1,uint24 fee,int24 tickLower,int24 tickUpper,uint256 amount0Desired,uint256 amount1Desired,uint256 amount0Min,uint256 amount1Min,address recipient,uint256 deadline))',
    args: [
      '{"token0": "0x471EcE3750Da237f93B8E339c536989b8978a438","token1": "0xC668583dcbDc9ae6FA3CE46462758188adfdfC24","fee": 100,"tickLower": -1764,"tickUpper": -631,"amount0Desired": "0","amount1Desired": "100000000000000000","amount0Min": "0","amount1Min": "99900000000000000","recipient": "0xD533Ca259b330c7A88f74E000a3FaEa2d63B7972","deadline": 1710335001}',
    ],
    value: '0',
  },
]

const structAbiDefinition = {
  inputs: [
    {
      components: [
        {
          internalType: 'address',
          name: 'token0',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'token1',
          type: 'address',
        },
        {
          internalType: 'uint24',
          name: 'fee',
          type: 'uint24',
        },
        {
          internalType: 'int24',
          name: 'tickLower',
          type: 'int24',
        },
        {
          internalType: 'int24',
          name: 'tickUpper',
          type: 'int24',
        },
        {
          internalType: 'uint256',
          name: 'amount0Desired',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'amount1Desired',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'amount0Min',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'amount1Min',
          type: 'uint256',
        },
        {
          internalType: 'address',
          name: 'recipient',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'deadline',
          type: 'uint256',
        },
      ],
      internalType: 'struct INonfungiblePositionManager.MintParams',
      name: 'params',
      type: 'tuple',
    },
  ],
  name: 'mint',
  outputs: [
    {
      internalType: 'uint256',
      name: 'tokenId',
      type: 'uint256',
    },
    {
      internalType: 'uint128',
      name: 'liquidity',
      type: 'uint128',
    },
    {
      internalType: 'uint256',
      name: 'amount0',
      type: 'uint256',
    },
    {
      internalType: 'uint256',
      name: 'amount1',
      type: 'uint256',
    },
  ],
  stateMutability: 'payable',
  type: 'function',
}

testWithGanache('governance:propose cmd', (web3: Web3) => {
  let governance: GovernanceWrapper
  let goldToken: GoldTokenWrapper

  const expConfig = NetworkConfig.governance

  const minDeposit = web3.utils.toWei(expConfig.minDeposit.toString(), 'ether')
  const kit = newKitFromWeb3(web3)

  let accounts: StrongAddress[] = []
  let multisigs: StrongAddress[] = []

  beforeEach(async () => {
    accounts = (await web3.eth.getAccounts()) as StrongAddress[]
    kit.defaultAccount = accounts[0]
    governance = await kit.contracts.getGovernance()
    goldToken = await kit.contracts.getGoldToken()
  })

  beforeAll(async () => {
    accounts = (await web3.eth.getAccounts()) as StrongAddress[]
    kit.defaultAccount = accounts[0]

    multisigs[0] = await createMultisig(kit, [accounts[0]], 1, 1)
    multisigs[1] = await createMultisig(kit, [accounts[0], accounts[1]], 2, 2)
  })

  test(
    'will successfully create proposal based on Core contract',
    async () => {
      const transactionsToBeSaved = JSON.stringify(transactions)
      fs.writeFileSync('transactions.json', transactionsToBeSaved, { flag: 'w' })

      await (
        await kit.sendTransaction({
          to: governance.address,
          from: accounts[0],
          value: web3.utils.toWei('1', 'ether'),
        })
      ).waitReceipt()

      const proposalBefore = await governance.getProposal(1)
      expect(proposalBefore).toEqual([])

      await testLocally(Propose, [
        '--jsonTransactions',
        'transactions.json',
        '--deposit',
        '1000000000000000000',
        '--from',
        accounts[0],
        '--descriptionURL',
        'https://dummyurl.com',
      ])

      const proposal = await governance.getProposal(1)
      expect(proposal.length).toEqual(transactions.length)
      expect(proposal[0].to).toEqual(goldToken.address)
      expect(proposal[0].value).toEqual(transactions[0].value)
      const expectedInput = goldToken['contract'].methods['transfer'](
        transactions[0].args[0],
        transactions[0].args[1]
      ).encodeABI()
      expect(proposal[0].input).toEqual(expectedInput)
    },
    EXTRA_LONG_TIMEOUT_MS
  )

  test(
    'will successfully create proposal based on Core contract with multisig (1 signer)',
    async () => {
      const transactionsToBeSaved = JSON.stringify(transactions)
      fs.writeFileSync('transactions.json', transactionsToBeSaved, { flag: 'w' })

      await (
        await kit.sendTransaction({
          from: accounts[0],
          to: governance.address,
          value: web3.utils.toWei('1', 'ether'),
        })
      ).waitReceipt()

      /**
       * Faucet the multisig with 20,000 CELO so it has more than sufficient CELO
       * to submit governance proposals (2x minDeposit in this case).
       * In practice, `minDeposit` is currently 1 CELO on the devchain, so practically 20,000 CELO
       * is too much. But I'm leaving this in case we update the devchain to match
       * Alfajores or Mainnet parameters in the future.
       */
      await (
        await kit.sendTransaction({
          from: accounts[2],
          to: multisigs[0],
          value: web3.utils.toWei('20000', 'ether'), // 2x min deposit on Mainnet
        })
      ).waitReceipt()

      const proposalBefore = await governance.getProposal(1)
      expect(proposalBefore).toEqual([])

      await testLocally(Propose, [
        '--jsonTransactions',
        'transactions.json',
        '--deposit',
        '10000e18',
        '--from',
        accounts[0],
        '--useMultiSig',
        '--for',
        multisigs[0],
        '--descriptionURL',
        'https://dummyurl.com',
      ])

      const proposal = await governance.getProposal(1)
      expect(proposal.length).toEqual(transactions.length)
      expect(proposal[0].to).toEqual(goldToken.address)
      expect(proposal[0].value).toEqual(transactions[0].value)
      const expectedInput = goldToken['contract'].methods['transfer'](
        transactions[0].args[0],
        transactions[0].args[1]
      ).encodeABI()
      expect(proposal[0].input).toEqual(expectedInput)
    },
    EXTRA_LONG_TIMEOUT_MS
  )

  test(
    'will successfully create proposal based on Core contract with multisig (2 signers)',
    async () => {
      const transactionsToBeSaved = JSON.stringify(transactions)
      fs.writeFileSync('transactions.json', transactionsToBeSaved, { flag: 'w' })

      await (
        await kit.sendTransaction({
          to: governance.address,
          from: accounts[0],
          value: web3.utils.toWei('1', 'ether'),
        })
      ).waitReceipt()

      /**
       * Faucet the multisig with 20,000 CELO so it has more than sufficient CELO
       * to submit governance proposals (2x minDeposit in this case).
       * In practice, `minDeposit` is currently 1 CELO on the devchain, so practically 20,000 CELO
       * is too much. But I'm leaving this in case we update the devchain to match
       * Alfajores or Mainnet parameters in the future.
       */
      await (
        await kit.sendTransaction({
          from: accounts[2],
          to: multisigs[1],
          value: web3.utils.toWei('20000', 'ether'), // 2x min deposit on Mainnet
        })
      ).waitReceipt()

      const proposalBefore = await governance.getProposal(1)
      expect(proposalBefore).toEqual([])

      // Submit proposal from signer A
      await testLocally(Propose, [
        '--jsonTransactions',
        'transactions.json',
        '--deposit',
        '10000e18',
        '--from',
        accounts[0],
        '--useMultiSig',
        '--for',
        multisigs[1],
        '--descriptionURL',
        'https://dummyurl.com',
      ])

      const proposalBetween = await governance.getProposal(1)
      expect(proposalBetween).toEqual([])

      // Approve proposal from signer B
      await testLocally(Approve, ['--from', accounts[1], '--for', multisigs[1], '--tx', '0'])

      const proposal = await governance.getProposal(1)
      expect(proposal.length).toEqual(transactions.length)
      expect(proposal[0].to).toEqual(goldToken.address)
      expect(proposal[0].value).toEqual(transactions[0].value)
      const expectedInput = goldToken['contract'].methods['transfer'](
        transactions[0].args[0],
        transactions[0].args[1]
      ).encodeABI()
      expect(proposal[0].input).toEqual(expectedInput)
    },
    EXTRA_LONG_TIMEOUT_MS
  )

  test(
    'will successfully create proposal with random contract',
    async () => {
      const transactionsToBeSaved = JSON.stringify(transactionsUnknownAddress)
      fs.writeFileSync('transactions.json', transactionsToBeSaved, { flag: 'w' })

      await (
        await kit.sendTransaction({
          to: governance.address,
          from: accounts[0],
          value: web3.utils.toWei('1', 'ether'),
        })
      ).waitReceipt()

      const proposalBefore = await governance.getProposal(1)
      expect(proposalBefore).toEqual([])

      await testLocally(Propose, [
        '--jsonTransactions',
        'transactions.json',
        '--deposit',
        '1000000000000000000',
        '--from',
        accounts[0],
        '--descriptionURL',
        'https://dummyurl.com',
        '--force',
        '--noInfo',
      ])

      const proposal = await governance.getProposal(1)
      expect(proposal.length).toEqual(transactions.length)
      expect(proposal[0].to).toEqual(randomAddress)
      expect(proposal[0].value).toEqual(transactions[0].value)
      const expectedInput = goldToken['contract'].methods['transfer'](
        transactions[0].args[0],
        transactions[0].args[1]
      ).encodeABI()
      expect(proposal[0].input).toEqual(expectedInput)
    },
    EXTRA_LONG_TIMEOUT_MS
  )

  test(
    'will successfully create proposal with struct as input',
    async () => {
      const transactionsToBeSaved = JSON.stringify(transactionsWithStruct)
      fs.writeFileSync('transactions.json', transactionsToBeSaved, { flag: 'w' })

      await (
        await kit.sendTransaction({
          to: governance.address,
          from: accounts[0],
          value: web3.utils.toWei('1', 'ether'),
        })
      ).waitReceipt()

      const proposalBefore = await governance.getProposal(1)
      expect(proposalBefore).toEqual([])

      await testLocally(Propose, [
        '--jsonTransactions',
        'transactions.json',
        '--deposit',
        '1000000000000000000',
        '--from',
        accounts[0],
        '--descriptionURL',
        'https://dummyurl.com',
        '--force',
        '--noInfo',
      ])

      const proposal = await governance.getProposal(1)
      expect(proposal.length).toEqual(transactions.length)
      expect(proposal[0].to).toEqual('0x3d79EdAaBC0EaB6F08ED885C05Fc0B014290D95A')
      expect(proposal[0].value).toEqual(transactions[0].value)

      const expectedInput = kit.connection
        .getAbiCoder()
        .encodeFunctionCall(structAbiDefinition, [JSON.parse(transactionsWithStruct[0].args[0])])

      expect(proposal[0].input).toEqual(expectedInput)
    },
    EXTRA_LONG_TIMEOUT_MS
  )

  test(
    'fails when descriptionURl is missing',
    async () => {
      await expect(
        testLocally(Propose, [
          '--from',
          accounts[0],
          '--deposit',
          '0',
          '--jsonTransactions',
          './exampleProposal.json',
        ])
      ).rejects.toThrow('Missing required flag descriptionURL')
    },
    EXTRA_LONG_TIMEOUT_MS
  )

  test(
    'can submit empty proposal',
    async () => {
      await testLocally(Propose, [
        '--from',
        accounts[0],
        '--deposit',
        minDeposit,
        '--jsonTransactions',
        './exampleProposal.json',
        '--descriptionURL',
        'https://example.com',
      ])
    },
    EXTRA_LONG_TIMEOUT_MS
  )

  test(
    'can submit proposal using e notion for deposit',
    async () => {
      const spyStart = jest.spyOn(ux.action, 'start')
      const spyStop = jest.spyOn(ux.action, 'stop')
      await testLocally(Propose, [
        '--from',
        accounts[0],
        '--deposit',
        '10000e18',
        '--jsonTransactions',
        './exampleProposal.json',
        '--descriptionURL',
        'https://example.com',
      ])
      expect(spyStart).toHaveBeenCalledWith('Sending Transaction: proposeTx')
      expect(spyStop).toHaveBeenCalled()
    },
    EXTRA_LONG_TIMEOUT_MS
  )

  test(
    'when deposit is 10K it succeeds',
    async () => {
      const spyStart = jest.spyOn(ux.action, 'start')
      const spyStop = jest.spyOn(ux.action, 'stop')

      await testLocally(Propose, [
        '--from',
        accounts[0],
        '--deposit',
        '10000000000000000000000',
        '--jsonTransactions',
        './exampleProposal.json',
        '--descriptionURL',
        'https://example.com',
      ])
      expect(spyStart).toHaveBeenCalledWith('Sending Transaction: proposeTx')
      expect(spyStop).toHaveBeenCalled()
    },
    EXTRA_LONG_TIMEOUT_MS
  )
})
