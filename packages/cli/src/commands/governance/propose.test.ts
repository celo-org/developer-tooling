import { Address } from '@celo/connect'
import { newKitFromWeb3 } from '@celo/contractkit'
import { GoldTokenWrapper } from '@celo/contractkit/lib/wrappers/GoldTokenWrapper'
import { GovernanceWrapper } from '@celo/contractkit/lib/wrappers/Governance'
import { testWithGanache } from '@celo/dev-utils/lib/ganache-test'
import * as fs from 'fs'
import Web3 from 'web3'
import { testLocally } from '../../test-utils/cliUtils'
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
  const kit = newKitFromWeb3(web3)

  let accounts: Address[] = []
  let governance: GovernanceWrapper
  let goldToken: GoldTokenWrapper

  beforeEach(async () => {
    accounts = await web3.eth.getAccounts()
    kit.defaultAccount = accounts[0]
    governance = await kit.contracts.getGovernance()
    goldToken = await kit.contracts.getGoldToken()
  })

  test('will successfully create proposal based on Core contract', async () => {
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
  })

  test('will successfully create proposal with random contract', async () => {
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
      '--noinfo',
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
  })

  test('will successfully create proposal with struct as input', async () => {
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
  })
})
