import { StrongAddress } from '@celo/base'
import { newKitFromWeb3 } from '@celo/contractkit'
import { GoldTokenWrapper } from '@celo/contractkit/lib/wrappers/GoldTokenWrapper'
import { GovernanceWrapper } from '@celo/contractkit/lib/wrappers/Governance'
import { NetworkConfig, testWithGanache } from '@celo/dev-utils/lib/ganache-test'
import { ux } from '@oclif/core'
import * as fs from 'fs'
import Web3 from 'web3'
import { EXTRA_LONG_TIMEOUT_MS, testLocally } from '../../test-utils/cliUtils'
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

  beforeEach(async () => {
    fetchMock.reset()
    fetchMock.catch(404)
    accounts = (await web3.eth.getAccounts()) as StrongAddress[]
    kit.defaultAccount = accounts[0]
    governance = await kit.contracts.getGovernance()
    goldToken = await kit.contracts.getGoldToken()
  })

  test(
    'will successfully create proposal based on Core contract',
    async () => {
      fetchMock
        .get(
          'https://repo.sourcify.dev/contracts/full_match/1101/0x8726C7414ac023D23348326B47AF3205185Fd035/metadata.json',
          400
        )
        .get(
          'https://repo.sourcify.dev/contracts/partial_match/1101/0x8726C7414ac023D23348326B47AF3205185Fd035/metadata.json',
          400
        )
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
        'https://example.com',
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
        'https://example.com',
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
        'https://example.com',
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

  const transactionsForContractsVerifiedOnCeloScan = [
    {
      contract: 'Vyper_contract',
      address: '0xf4cab10dC19695AaCe14b7A16d7705b600ad5F73',
      function: 'transfer(address,uint256)',
      args: ['0x87647780180B8f55980C7D3fFeFe08a9B29e9aE1', '20001239154911011864219072'],
      value: '0',
    },
  ]

  test(
    'when proposal contains transactions for contracts not verified',
    async () => {
      fetchMock
        .get(
          'https://repo.sourcify.dev/contracts/full_match/1101/0x37f750B7cC259A2f741AF45294f6a16572CF5cAd/metadata.json',
          404
        )
        .get(
          'https://repo.sourcify.dev/contracts/partial_match/1101/0x37f750B7cC259A2f741AF45294f6a16572CF5cAd/metadata.json',
          404
        )
        .get(
          'https://api.celoscan.io/api?module=contract&action=getsourcecode&address=0x37f750B7cC259A2f741AF45294f6a16572CF5cAd',
          {
            status: '0',
            message: 'NOTOK',
          }
        )
      const transactionsForUnverifiedContracts = [
        {
          contract: '0x552b9AA0eEe500c60f09456e49FBc1096322714C',
          address: '0x37f750B7cC259A2f741AF45294f6a16572CF5cAd',
          function: 'approve(address,uint256)',
          args: ['0xFa3df877F98ac5ecd87456a7AcCaa948462412f0', '10000000000000000000000000'],
          value: '0',
        },
      ]
      const transactionsToBeSaved = JSON.stringify(transactionsForUnverifiedContracts)
      fs.writeFileSync('transactions.json', transactionsToBeSaved, { flag: 'w' })
      await expect(
        testLocally(Propose, [
          '--jsonTransactions',
          'transactions.json',
          '--deposit',
          '1000000000000000000',
          '--from',
          accounts[0] as StrongAddress,
          '--descriptionURL',
          'https://example.com',
        ])
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        `"Unable to parse {"input":"0x095ea7b3000000000000000000000000fa3df877f98ac5ecd87456a7accaa948462412f0000000000000000000000000000000000000000000084595161401484a000000","to":"0x37f750B7cC259A2f741AF45294f6a16572CF5cAd","value":"0"} with block explorer"`
      )
    },
    EXTRA_LONG_TIMEOUT_MS
  )

  test(
    'succeeds when proposal contains transactions for contracts verified on celoScan',
    async () => {
      fetchMock
        .get(
          'https://repo.sourcify.dev/contracts/full_match/1101/0xf4cab10dC19695AaCe14b7A16d7705b600ad5F73/metadata.json',
          404
        )
        .get(
          'https://api.celoscan.io/api?module=contract&action=getsourcecode&address=0xf4cab10dC19695AaCe14b7A16d7705b600ad5F73',
          VIBER_CONTRACT
        )
      const transactionsToBeSaved = JSON.stringify(transactionsForContractsVerifiedOnCeloScan)
      fs.writeFileSync('transactions2.json', transactionsToBeSaved, { flag: 'w' })
      await testLocally(Propose, [
        '--jsonTransactions',
        'transactions2.json',
        '--deposit',
        '1000000000000000000',
        '--from',
        accounts[0],
        '--descriptionURL',
        'https://example.com',
      ])
      const proposal = await governance.getProposal(1)
      expect(proposal.length).toEqual(transactionsForContractsVerifiedOnCeloScan.length)
      expect(proposal[0].to).toEqual('0xf4cab10dC19695AaCe14b7A16d7705b600ad5F73')
      expect(proposal[0].value).toEqual(transactionsForContractsVerifiedOnCeloScan[0].value)
      expect(proposal).toMatchInlineSnapshot(`
        [
          {
            "input": "0xa9059cbb00000000000000000000000087647780180b8f55980c7d3ffefe08a9b29e9ae1000000000000000000000000000000000000000000108b6d58e29cce52f28dc0",
            "to": "0xf4cab10dC19695AaCe14b7A16d7705b600ad5F73",
            "value": "0",
          },
        ]
      `)
    },
    EXTRA_LONG_TIMEOUT_MS
  )
})

const VIBER_CONTRACT = {
  status: '1',
  message: 'OK',
  result: [
    {
      SourceCode: '',
      ABI: '[{"name":"Transfer","inputs":[{"name":"sender","type":"address","indexed":true},{"name":"receiver","type":"address","indexed":true},{"name":"value","type":"uint256","indexed":false}],"anonymous":false,"type":"event"},{"name":"Approval","inputs":[{"name":"owner","type":"address","indexed":true},{"name":"spender","type":"address","indexed":true},{"name":"value","type":"uint256","indexed":false}],"anonymous":false,"type":"event"},{"name":"TokenExchange","inputs":[{"name":"buyer","type":"address","indexed":true},{"name":"sold_id","type":"int128","indexed":false},{"name":"tokens_sold","type":"uint256","indexed":false},{"name":"bought_id","type":"int128","indexed":false},{"name":"tokens_bought","type":"uint256","indexed":false}],"anonymous":false,"type":"event"},{"name":"AddLiquidity","inputs":[{"name":"provider","type":"address","indexed":true},{"name":"token_amounts","type":"uint256[2]","indexed":false},{"name":"fees","type":"uint256[2]","indexed":false},{"name":"invariant","type":"uint256","indexed":false},{"name":"token_supply","type":"uint256","indexed":false}],"anonymous":false,"type":"event"},{"name":"RemoveLiquidity","inputs":[{"name":"provider","type":"address","indexed":true},{"name":"token_amounts","type":"uint256[2]","indexed":false},{"name":"fees","type":"uint256[2]","indexed":false},{"name":"token_supply","type":"uint256","indexed":false}],"anonymous":false,"type":"event"},{"name":"RemoveLiquidityOne","inputs":[{"name":"provider","type":"address","indexed":true},{"name":"token_amount","type":"uint256","indexed":false},{"name":"coin_amount","type":"uint256","indexed":false},{"name":"token_supply","type":"uint256","indexed":false}],"anonymous":false,"type":"event"},{"name":"RemoveLiquidityImbalance","inputs":[{"name":"provider","type":"address","indexed":true},{"name":"token_amounts","type":"uint256[2]","indexed":false},{"name":"fees","type":"uint256[2]","indexed":false},{"name":"invariant","type":"uint256","indexed":false},{"name":"token_supply","type":"uint256","indexed":false}],"anonymous":false,"type":"event"},{"name":"RampA","inputs":[{"name":"old_A","type":"uint256","indexed":false},{"name":"new_A","type":"uint256","indexed":false},{"name":"initial_time","type":"uint256","indexed":false},{"name":"future_time","type":"uint256","indexed":false}],"anonymous":false,"type":"event"},{"name":"StopRampA","inputs":[{"name":"A","type":"uint256","indexed":false},{"name":"t","type":"uint256","indexed":false}],"anonymous":false,"type":"event"},{"stateMutability":"nonpayable","type":"constructor","inputs":[],"outputs":[]},{"stateMutability":"nonpayable","type":"function","name":"initialize","inputs":[{"name":"_name","type":"string"},{"name":"_symbol","type":"string"},{"name":"_coins","type":"address[4]"},{"name":"_rate_multipliers","type":"uint256[4]"},{"name":"_A","type":"uint256"},{"name":"_fee","type":"uint256"}],"outputs":[],"gas":516829},{"stateMutability":"view","type":"function","name":"decimals","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":390},{"stateMutability":"nonpayable","type":"function","name":"transfer","inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"outputs":[{"name":"","type":"bool"}],"gas":79005},{"stateMutability":"nonpayable","type":"function","name":"transferFrom","inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"outputs":[{"name":"","type":"bool"}],"gas":116985},{"stateMutability":"nonpayable","type":"function","name":"approve","inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"outputs":[{"name":"","type":"bool"}],"gas":39211},{"stateMutability":"nonpayable","type":"function","name":"permit","inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"},{"name":"_deadline","type":"uint256"},{"name":"_v","type":"uint8"},{"name":"_r","type":"bytes32"},{"name":"_s","type":"bytes32"}],"outputs":[{"name":"","type":"bool"}],"gas":102281},{"stateMutability":"view","type":"function","name":"get_balances","inputs":[],"outputs":[{"name":"","type":"uint256[2]"}],"gas":4782},{"stateMutability":"view","type":"function","name":"admin_fee","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":570},{"stateMutability":"view","type":"function","name":"A","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":10508},{"stateMutability":"view","type":"function","name":"A_precise","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":10508},{"stateMutability":"view","type":"function","name":"get_virtual_price","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":649135},{"stateMutability":"view","type":"function","name":"calc_token_amount","inputs":[{"name":"_amounts","type":"uint256[2]"},{"name":"_is_deposit","type":"bool"}],"outputs":[{"name":"","type":"uint256"}],"gas":1284256},{"stateMutability":"nonpayable","type":"function","name":"add_liquidity","inputs":[{"name":"_amounts","type":"uint256[2]"},{"name":"_min_mint_amount","type":"uint256"}],"outputs":[{"name":"","type":"uint256"}],"gas":2144257},{"stateMutability":"nonpayable","type":"function","name":"add_liquidity","inputs":[{"name":"_amounts","type":"uint256[2]"},{"name":"_min_mint_amount","type":"uint256"},{"name":"_receiver","type":"address"}],"outputs":[{"name":"","type":"uint256"}],"gas":2144257},{"stateMutability":"view","type":"function","name":"get_dy","inputs":[{"name":"i","type":"int128"},{"name":"j","type":"int128"},{"name":"dx","type":"uint256"}],"outputs":[{"name":"","type":"uint256"}],"gas":995830},{"stateMutability":"nonpayable","type":"function","name":"exchange","inputs":[{"name":"i","type":"int128"},{"name":"j","type":"int128"},{"name":"_dx","type":"uint256"},{"name":"_min_dy","type":"uint256"}],"outputs":[{"name":"","type":"uint256"}],"gas":1150187},{"stateMutability":"nonpayable","type":"function","name":"exchange","inputs":[{"name":"i","type":"int128"},{"name":"j","type":"int128"},{"name":"_dx","type":"uint256"},{"name":"_min_dy","type":"uint256"},{"name":"_receiver","type":"address"}],"outputs":[{"name":"","type":"uint256"}],"gas":1150187},{"stateMutability":"nonpayable","type":"function","name":"remove_liquidity","inputs":[{"name":"_burn_amount","type":"uint256"},{"name":"_min_amounts","type":"uint256[2]"}],"outputs":[{"name":"","type":"uint256[2]"}],"gas":241198},{"stateMutability":"nonpayable","type":"function","name":"remove_liquidity","inputs":[{"name":"_burn_amount","type":"uint256"},{"name":"_min_amounts","type":"uint256[2]"},{"name":"_receiver","type":"address"}],"outputs":[{"name":"","type":"uint256[2]"}],"gas":241198},{"stateMutability":"nonpayable","type":"function","name":"remove_liquidity_imbalance","inputs":[{"name":"_amounts","type":"uint256[2]"},{"name":"_max_burn_amount","type":"uint256"}],"outputs":[{"name":"","type":"uint256"}],"gas":2144337},{"stateMutability":"nonpayable","type":"function","name":"remove_liquidity_imbalance","inputs":[{"name":"_amounts","type":"uint256[2]"},{"name":"_max_burn_amount","type":"uint256"},{"name":"_receiver","type":"address"}],"outputs":[{"name":"","type":"uint256"}],"gas":2144337},{"stateMutability":"view","type":"function","name":"calc_withdraw_one_coin","inputs":[{"name":"_burn_amount","type":"uint256"},{"name":"i","type":"int128"}],"outputs":[{"name":"","type":"uint256"}],"gas":1229},{"stateMutability":"nonpayable","type":"function","name":"remove_liquidity_one_coin","inputs":[{"name":"_burn_amount","type":"uint256"},{"name":"i","type":"int128"},{"name":"_min_received","type":"uint256"}],"outputs":[{"name":"","type":"uint256"}],"gas":1535032},{"stateMutability":"nonpayable","type":"function","name":"remove_liquidity_one_coin","inputs":[{"name":"_burn_amount","type":"uint256"},{"name":"i","type":"int128"},{"name":"_min_received","type":"uint256"},{"name":"_receiver","type":"address"}],"outputs":[{"name":"","type":"uint256"}],"gas":1535032},{"stateMutability":"nonpayable","type":"function","name":"ramp_A","inputs":[{"name":"_future_A","type":"uint256"},{"name":"_future_time","type":"uint256"}],"outputs":[],"gas":161164},{"stateMutability":"nonpayable","type":"function","name":"stop_ramp_A","inputs":[],"outputs":[],"gas":157387},{"stateMutability":"view","type":"function","name":"admin_balances","inputs":[{"name":"i","type":"uint256"}],"outputs":[{"name":"","type":"uint256"}],"gas":7829},{"stateMutability":"nonpayable","type":"function","name":"withdraw_admin_fees","inputs":[],"outputs":[],"gas":28911},{"stateMutability":"pure","type":"function","name":"version","inputs":[],"outputs":[{"name":"","type":"string"}],"gas":6677},{"stateMutability":"view","type":"function","name":"coins","inputs":[{"name":"arg0","type":"uint256"}],"outputs":[{"name":"","type":"address"}],"gas":3225},{"stateMutability":"view","type":"function","name":"balances","inputs":[{"name":"arg0","type":"uint256"}],"outputs":[{"name":"","type":"uint256"}],"gas":3255},{"stateMutability":"view","type":"function","name":"fee","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":3240},{"stateMutability":"view","type":"function","name":"initial_A","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":3270},{"stateMutability":"view","type":"function","name":"future_A","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":3300},{"stateMutability":"view","type":"function","name":"initial_A_time","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":3330},{"stateMutability":"view","type":"function","name":"future_A_time","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":3360},{"stateMutability":"view","type":"function","name":"name","inputs":[],"outputs":[{"name":"","type":"string"}],"gas":13679},{"stateMutability":"view","type":"function","name":"symbol","inputs":[],"outputs":[{"name":"","type":"string"}],"gas":11438},{"stateMutability":"view","type":"function","name":"balanceOf","inputs":[{"name":"arg0","type":"address"}],"outputs":[{"name":"","type":"uint256"}],"gas":3716},{"stateMutability":"view","type":"function","name":"allowance","inputs":[{"name":"arg0","type":"address"},{"name":"arg1","type":"address"}],"outputs":[{"name":"","type":"uint256"}],"gas":4012},{"stateMutability":"view","type":"function","name":"totalSupply","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":3510},{"stateMutability":"view","type":"function","name":"DOMAIN_SEPARATOR","inputs":[],"outputs":[{"name":"","type":"bytes32"}],"gas":3540},{"stateMutability":"view","type":"function","name":"nonces","inputs":[{"name":"arg0","type":"address"}],"outputs":[{"name":"","type":"uint256"}],"gas":3836}]',
      ContractName: 'Vyper_contract',
      CompilerVersion: 'vyper:0.3.1',
      OptimizationUsed: '0',
      Runs: '0',
      ConstructorArguments: '',
      EVMVersion: 'Default',
      Library: '',
      LicenseType: 'None',
      Proxy: '0',
      Implementation: '',
      SwarmSource: '',
    },
  ],
}
