import {
  Address,
  Callback,
  Connection,
  JsonRpcPayload,
  JsonRpcResponse,
  Provider,
} from '@celo/connect'
import Web3 from 'web3'
import { Metadata, fetchMetadata, tryGetProxyImplementation } from './sourcify'

// This is taken from protocol/contracts/build/Account.json
const CONTRACT_METADATA = require('../fixtures/contract.metadata.json')

describe('sourcify helpers', () => {
  let connection: Connection
  const web3: Web3 = new Web3()
  const address: Address = web3.utils.randomHex(20)
  const proxyAddress: Address = web3.utils.randomHex(20)
  const implAddress: Address = web3.utils.randomHex(20)
  const chainId: number = 42220

  const mockProvider: Provider = {
    send: (payload: JsonRpcPayload, callback: Callback<JsonRpcResponse>): void => {
      if (payload.params[0].to === proxyAddress) {
        callback(null, {
          jsonrpc: payload.jsonrpc,
          id: Number(payload.id),
          result: `0x000000000000000000000000${implAddress}`,
        })
      } else {
        callback(new Error('revert'))
      }
    },
  }

  beforeEach(() => {
    fetchMock.reset()
    web3.setProvider(mockProvider as any)
    connection = new Connection(web3)
    connection.chainId = jest.fn().mockImplementation(async () => {
      return chainId
    })
  })

  describe('fetchMetadata()', () => {
    describe('when a full match exists', () => {
      it('returns the metadata from the full match', async () => {
        fetchMock.get(
          `https://repo.sourcify.dev/contracts/full_match/42220/${address}/metadata.json`,
          {}
        )
        const metadata = await fetchMetadata(connection, address)
        expect(metadata).toBeInstanceOf(Metadata)
      })
    })

    describe('when a full match does not exist', () => {
      describe('when contract has been verified on celoscan', () => {
        it('returns the metadata from celoscan', async () => {
          fetchMock
            .get(
              `https://repo.sourcify.dev/contracts/full_match/42220/${address}/metadata.json`,
              400
            )
            .get(
              `https://api.celoscan.io/api?module=contract&action=getabi&address=${address}`,
              CONTRACT_VIA_CELLOSCAN
            )
          const result = await fetchMetadata(connection, address)
          expect(result).toBeInstanceOf(Metadata)
          expect(result?.abi).toBeDefined()
        })
      })
      describe('but a partial match exists', () => {
        it('returns the metadata from the partial match', async () => {
          fetchMock
            .get(
              `https://repo.sourcify.dev/contracts/full_match/42220/${address}/metadata.json`,
              400
            )
            .get(
              `https://repo.sourcify.dev/contracts/partial_match/42220/${address}/metadata.json`,
              {}
            )
            .get(`https://api.celoscan.io/api?module=contract&action=getabi&address=${address}`, {
              status: '0',
              message: 'NOTOK',
            })

          const metadata = await fetchMetadata(connection, address)
          expect(metadata).toBeInstanceOf(Metadata)
        })
      })

      describe('and a partial match does not exist', () => {
        it('is null', async () => {
          fetchMock
            .get(
              `https://repo.sourcify.dev/contracts/full_match/42220/${address}/metadata.json`,
              400
            )
            .get(
              `https://repo.sourcify.dev/contracts/partial_match/42220/${address}/metadata.json`,
              400
            )
            .get(`https://api.celoscan.io/api?module=contract&action=getabi&address=${address}`, {
              status: '0',
              message: 'NOTOK',
            })
          const metadata = await fetchMetadata(connection, address)
          expect(metadata).toEqual(null)
        })
      })
    })
  })

  describe('Metadata', () => {
    describe('get abi', () => {
      it('returns the abi when it finds it', () => {
        // @ts-expect-error -- test is purposefully incorrect
        const metadata = new Metadata(connection, address, { output: { abi: [{}] } })
        const abi = metadata.abi
        expect(abi).not.toBeNull()
        expect(abi).toEqual([{}])
      })

      it('returns null when there is no abi', () => {
        // @ts-expect-error -- test is purposefully incorrect
        const metadata = new Metadata(connection, address, { output: { other: [{}] } })
        const abi = metadata.abi
        expect(abi).toBeNull()
      })
    })

    describe('get contractName', () => {
      describe('when the structure does not contain it', () => {
        it('returns null', () => {
          // @ts-expect-error -- test is purposefully incorrect
          const metadata = new Metadata(connection, address, { output: { abi: [{}] } })
          const name = metadata.contractName
          expect(name).toBeNull()
        })
      })

      describe('when the structure contains multiple compilation targets', () => {
        it('returns the first', () => {
          const metadata = new Metadata(connection, address, {
            settings: {
              compilationTarget: {
                'somefile.sol': 'SomeContract',
                'otherfile.sol': 'OtherContract',
              },
            },
          })
          const name = metadata.contractName
          expect(name).toEqual('SomeContract')
        })
      })

      describe('when the structure contains one compilation targets', () => {
        it('returns it', () => {
          const metadata = new Metadata(connection, address, {
            settings: {
              compilationTarget: {
                'otherfile.sol': 'OtherContract',
              },
            },
          })
          const name = metadata.contractName
          expect(name).toEqual('OtherContract')
        })
      })
    })

    describe('abiForMethod', () => {
      let contractMetadata: Metadata

      beforeEach(() => {
        contractMetadata = new Metadata(connection, address, CONTRACT_METADATA)
      })

      describe('with full signature', () => {
        it('finds one ABI item when it exists', async () => {
          const results = contractMetadata.abiForMethod('isLegacyRole(bytes32,bytes32)')
          expect(results.length).toEqual(1)
          expect(results[0]).toMatchObject({
            name: 'isLegacyRole',
            inputs: [{ name: 'role' }, { name: 'otherRole' }],
          })
        })

        it('returns an empty array when none exists', async () => {
          const results = contractMetadata.abiForMethod('randomFunction(bytes32,bytes32')
          expect(results.length).toEqual(0)
        })
      })

      describe('with method name', () => {
        it('finds one ABI item when one exists', async () => {
          const results = contractMetadata.abiForMethod('isLegacySigner')
          expect(results.length).toEqual(1)
          expect(results[0]).toMatchObject({
            name: 'isLegacySigner',
          })
        })

        it('finds multiple ABI items when they exist', async () => {
          const results = contractMetadata.abiForMethod('isLegacyRole')
          expect(results.length).toEqual(2)
        })

        it('returns an empty array when none exists', async () => {
          const results = contractMetadata.abiForMethod('randomFunction')
          expect(results.length).toEqual(0)
        })
      })
    })

    describe('abiForSignature', () => {
      let contractMetadata: Metadata

      beforeEach(() => {
        contractMetadata = new Metadata(connection, address, CONTRACT_METADATA)
      })

      describe('when the function exists', () => {
        it('returns the ABI', async () => {
          const callSignature = connection
            .getAbiCoder()
            .encodeFunctionSignature('authorizedBy(address)')
          const abi = contractMetadata.abiForSelector(callSignature)
          expect(abi).toMatchObject({
            constant: true,
            inputs: [
              {
                internalType: 'address',
                name: '',
                type: 'address',
              },
            ],
            name: 'authorizedBy',
            outputs: [
              {
                internalType: 'address',
                name: '',
                type: 'address',
              },
            ],
            payable: false,
            stateMutability: 'view',
            type: 'function',
          })
        })
      })

      describe("when the function doesn't exist", () => {
        it('returns null', () => {
          const abi = contractMetadata.abiForSelector('0x0')
          expect(abi).toBeNull()
        })
      })
    })

    describe('tryGetProxyImplementation', () => {
      describe('with a cLabs proxy', () => {
        it('fetches the implementation', async () => {
          const result = await tryGetProxyImplementation(connection, proxyAddress)
          expect(result?.toLocaleLowerCase()).toEqual(implAddress.toLocaleLowerCase())
        })
      })

      describe('with a non-proxy', () => {
        it('returns null', async () => {
          const result = await tryGetProxyImplementation(connection, address)
          expect(result).toBeUndefined()
        })
      })
    })
  })
})

const CONTRACT_VIA_CELLOSCAN = {
  status: '1',
  message: 'OK',
  result:
    '[{"name":"Transfer","inputs":[{"name":"sender","type":"address","indexed":true},{"name":"receiver","type":"address","indexed":true},{"name":"value","type":"uint256","indexed":false}],"anonymous":false,"type":"event"},{"name":"Approval","inputs":[{"name":"owner","type":"address","indexed":true},{"name":"spender","type":"address","indexed":true},{"name":"value","type":"uint256","indexed":false}],"anonymous":false,"type":"event"},{"name":"TokenExchange","inputs":[{"name":"buyer","type":"address","indexed":true},{"name":"sold_id","type":"int128","indexed":false},{"name":"tokens_sold","type":"uint256","indexed":false},{"name":"bought_id","type":"int128","indexed":false},{"name":"tokens_bought","type":"uint256","indexed":false}],"anonymous":false,"type":"event"},{"name":"AddLiquidity","inputs":[{"name":"provider","type":"address","indexed":true},{"name":"token_amounts","type":"uint256[2]","indexed":false},{"name":"fees","type":"uint256[2]","indexed":false},{"name":"invariant","type":"uint256","indexed":false},{"name":"token_supply","type":"uint256","indexed":false}],"anonymous":false,"type":"event"},{"name":"RemoveLiquidity","inputs":[{"name":"provider","type":"address","indexed":true},{"name":"token_amounts","type":"uint256[2]","indexed":false},{"name":"fees","type":"uint256[2]","indexed":false},{"name":"token_supply","type":"uint256","indexed":false}],"anonymous":false,"type":"event"},{"name":"RemoveLiquidityOne","inputs":[{"name":"provider","type":"address","indexed":true},{"name":"token_amount","type":"uint256","indexed":false},{"name":"coin_amount","type":"uint256","indexed":false},{"name":"token_supply","type":"uint256","indexed":false}],"anonymous":false,"type":"event"},{"name":"RemoveLiquidityImbalance","inputs":[{"name":"provider","type":"address","indexed":true},{"name":"token_amounts","type":"uint256[2]","indexed":false},{"name":"fees","type":"uint256[2]","indexed":false},{"name":"invariant","type":"uint256","indexed":false},{"name":"token_supply","type":"uint256","indexed":false}],"anonymous":false,"type":"event"},{"name":"RampA","inputs":[{"name":"old_A","type":"uint256","indexed":false},{"name":"new_A","type":"uint256","indexed":false},{"name":"initial_time","type":"uint256","indexed":false},{"name":"future_time","type":"uint256","indexed":false}],"anonymous":false,"type":"event"},{"name":"StopRampA","inputs":[{"name":"A","type":"uint256","indexed":false},{"name":"t","type":"uint256","indexed":false}],"anonymous":false,"type":"event"},{"stateMutability":"nonpayable","type":"constructor","inputs":[],"outputs":[]},{"stateMutability":"nonpayable","type":"function","name":"initialize","inputs":[{"name":"_name","type":"string"},{"name":"_symbol","type":"string"},{"name":"_coins","type":"address[4]"},{"name":"_rate_multipliers","type":"uint256[4]"},{"name":"_A","type":"uint256"},{"name":"_fee","type":"uint256"}],"outputs":[],"gas":516829},{"stateMutability":"view","type":"function","name":"decimals","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":390},{"stateMutability":"nonpayable","type":"function","name":"transfer","inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"outputs":[{"name":"","type":"bool"}],"gas":79005},{"stateMutability":"nonpayable","type":"function","name":"transferFrom","inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"outputs":[{"name":"","type":"bool"}],"gas":116985},{"stateMutability":"nonpayable","type":"function","name":"approve","inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"outputs":[{"name":"","type":"bool"}],"gas":39211},{"stateMutability":"nonpayable","type":"function","name":"permit","inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"},{"name":"_deadline","type":"uint256"},{"name":"_v","type":"uint8"},{"name":"_r","type":"bytes32"},{"name":"_s","type":"bytes32"}],"outputs":[{"name":"","type":"bool"}],"gas":102281},{"stateMutability":"view","type":"function","name":"get_balances","inputs":[],"outputs":[{"name":"","type":"uint256[2]"}],"gas":4782},{"stateMutability":"view","type":"function","name":"admin_fee","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":570},{"stateMutability":"view","type":"function","name":"A","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":10508},{"stateMutability":"view","type":"function","name":"A_precise","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":10508},{"stateMutability":"view","type":"function","name":"get_virtual_price","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":649135},{"stateMutability":"view","type":"function","name":"calc_token_amount","inputs":[{"name":"_amounts","type":"uint256[2]"},{"name":"_is_deposit","type":"bool"}],"outputs":[{"name":"","type":"uint256"}],"gas":1284256},{"stateMutability":"nonpayable","type":"function","name":"add_liquidity","inputs":[{"name":"_amounts","type":"uint256[2]"},{"name":"_min_mint_amount","type":"uint256"}],"outputs":[{"name":"","type":"uint256"}],"gas":2144257},{"stateMutability":"nonpayable","type":"function","name":"add_liquidity","inputs":[{"name":"_amounts","type":"uint256[2]"},{"name":"_min_mint_amount","type":"uint256"},{"name":"_receiver","type":"address"}],"outputs":[{"name":"","type":"uint256"}],"gas":2144257},{"stateMutability":"view","type":"function","name":"get_dy","inputs":[{"name":"i","type":"int128"},{"name":"j","type":"int128"},{"name":"dx","type":"uint256"}],"outputs":[{"name":"","type":"uint256"}],"gas":995830},{"stateMutability":"nonpayable","type":"function","name":"exchange","inputs":[{"name":"i","type":"int128"},{"name":"j","type":"int128"},{"name":"_dx","type":"uint256"},{"name":"_min_dy","type":"uint256"}],"outputs":[{"name":"","type":"uint256"}],"gas":1150187},{"stateMutability":"nonpayable","type":"function","name":"exchange","inputs":[{"name":"i","type":"int128"},{"name":"j","type":"int128"},{"name":"_dx","type":"uint256"},{"name":"_min_dy","type":"uint256"},{"name":"_receiver","type":"address"}],"outputs":[{"name":"","type":"uint256"}],"gas":1150187},{"stateMutability":"nonpayable","type":"function","name":"remove_liquidity","inputs":[{"name":"_burn_amount","type":"uint256"},{"name":"_min_amounts","type":"uint256[2]"}],"outputs":[{"name":"","type":"uint256[2]"}],"gas":241198},{"stateMutability":"nonpayable","type":"function","name":"remove_liquidity","inputs":[{"name":"_burn_amount","type":"uint256"},{"name":"_min_amounts","type":"uint256[2]"},{"name":"_receiver","type":"address"}],"outputs":[{"name":"","type":"uint256[2]"}],"gas":241198},{"stateMutability":"nonpayable","type":"function","name":"remove_liquidity_imbalance","inputs":[{"name":"_amounts","type":"uint256[2]"},{"name":"_max_burn_amount","type":"uint256"}],"outputs":[{"name":"","type":"uint256"}],"gas":2144337},{"stateMutability":"nonpayable","type":"function","name":"remove_liquidity_imbalance","inputs":[{"name":"_amounts","type":"uint256[2]"},{"name":"_max_burn_amount","type":"uint256"},{"name":"_receiver","type":"address"}],"outputs":[{"name":"","type":"uint256"}],"gas":2144337},{"stateMutability":"view","type":"function","name":"calc_withdraw_one_coin","inputs":[{"name":"_burn_amount","type":"uint256"},{"name":"i","type":"int128"}],"outputs":[{"name":"","type":"uint256"}],"gas":1229},{"stateMutability":"nonpayable","type":"function","name":"remove_liquidity_one_coin","inputs":[{"name":"_burn_amount","type":"uint256"},{"name":"i","type":"int128"},{"name":"_min_received","type":"uint256"}],"outputs":[{"name":"","type":"uint256"}],"gas":1535032},{"stateMutability":"nonpayable","type":"function","name":"remove_liquidity_one_coin","inputs":[{"name":"_burn_amount","type":"uint256"},{"name":"i","type":"int128"},{"name":"_min_received","type":"uint256"},{"name":"_receiver","type":"address"}],"outputs":[{"name":"","type":"uint256"}],"gas":1535032},{"stateMutability":"nonpayable","type":"function","name":"ramp_A","inputs":[{"name":"_future_A","type":"uint256"},{"name":"_future_time","type":"uint256"}],"outputs":[],"gas":161164},{"stateMutability":"nonpayable","type":"function","name":"stop_ramp_A","inputs":[],"outputs":[],"gas":157387},{"stateMutability":"view","type":"function","name":"admin_balances","inputs":[{"name":"i","type":"uint256"}],"outputs":[{"name":"","type":"uint256"}],"gas":7829},{"stateMutability":"nonpayable","type":"function","name":"withdraw_admin_fees","inputs":[],"outputs":[],"gas":28911},{"stateMutability":"pure","type":"function","name":"version","inputs":[],"outputs":[{"name":"","type":"string"}],"gas":6677},{"stateMutability":"view","type":"function","name":"coins","inputs":[{"name":"arg0","type":"uint256"}],"outputs":[{"name":"","type":"address"}],"gas":3225},{"stateMutability":"view","type":"function","name":"balances","inputs":[{"name":"arg0","type":"uint256"}],"outputs":[{"name":"","type":"uint256"}],"gas":3255},{"stateMutability":"view","type":"function","name":"fee","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":3240},{"stateMutability":"view","type":"function","name":"initial_A","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":3270},{"stateMutability":"view","type":"function","name":"future_A","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":3300},{"stateMutability":"view","type":"function","name":"initial_A_time","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":3330},{"stateMutability":"view","type":"function","name":"future_A_time","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":3360},{"stateMutability":"view","type":"function","name":"name","inputs":[],"outputs":[{"name":"","type":"string"}],"gas":13679},{"stateMutability":"view","type":"function","name":"symbol","inputs":[],"outputs":[{"name":"","type":"string"}],"gas":11438},{"stateMutability":"view","type":"function","name":"balanceOf","inputs":[{"name":"arg0","type":"address"}],"outputs":[{"name":"","type":"uint256"}],"gas":3716},{"stateMutability":"view","type":"function","name":"allowance","inputs":[{"name":"arg0","type":"address"},{"name":"arg1","type":"address"}],"outputs":[{"name":"","type":"uint256"}],"gas":4012},{"stateMutability":"view","type":"function","name":"totalSupply","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":3510},{"stateMutability":"view","type":"function","name":"DOMAIN_SEPARATOR","inputs":[],"outputs":[{"name":"","type":"bytes32"}],"gas":3540},{"stateMutability":"view","type":"function","name":"nonces","inputs":[{"name":"arg0","type":"address"}],"outputs":[{"name":"","type":"uint256"}],"gas":3836}]',
}
