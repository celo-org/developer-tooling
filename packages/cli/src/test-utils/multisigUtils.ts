import { multiSigABI, proxyABI } from '@celo/abis'
import { StrongAddress } from '@celo/base'
import { AbiItem, Provider } from '@celo/connect'
import { ContractKit } from '@celo/contractkit'
import { setCode } from '@celo/dev-utils/anvil-test'
import { TEST_GAS_PRICE } from '@celo/dev-utils/test-utils'
import { encodeFunctionData, parseUnits } from 'viem'
import {
  multiSigBytecode,
  proxyBytecode,
  SAFE_FALLBACK_HANDLER_ADDRESS,
  SAFE_FALLBACK_HANDLER_CODE,
  SAFE_MULTISEND_ADDRESS,
  SAFE_MULTISEND_CALL_ONLY_ADDRESS,
  SAFE_MULTISEND_CALL_ONLY_CODE,
  SAFE_MULTISEND_CODE,
  SAFE_PROXY_ADDRESS,
  SAFE_PROXY_CODE,
  SAFE_PROXY_FACTORY_ADDRESS,
  SAFE_PROXY_FACTORY_CODE,
} from './constants'

interface RpcBlockResponse {
  baseFeePerGas: string
}

export async function createMultisig(
  kit: ContractKit,
  owners: StrongAddress[],
  requiredSignatures: number,
  requiredInternalSignatures: number
): Promise<StrongAddress> {
  const accounts = (await kit.connection.getAccounts()) as StrongAddress[]
  kit.defaultAccount = accounts[0]

  // Deploy Proxy contract
  const proxyDeploymentTx = await kit.sendTransaction({
    data: proxyBytecode,
    maxFeePerGas: TEST_GAS_PRICE,
  })
  const { contractAddress: proxyAddress } = await proxyDeploymentTx.waitReceipt()
  // Deploy MultiSig contract
  const multisigDeploymentTx = await kit.sendTransaction({
    data: multiSigBytecode,
    maxFeePerGas: TEST_GAS_PRICE,
  })
  const { contractAddress: multiSigAddress } = await multisigDeploymentTx.waitReceipt()

  // Configure and initialize MultiSig
  const initializerAbi = multiSigABI.find(
    (abi) => abi.type === 'function' && abi.name === 'initialize'
  )
  const proxy = kit.connection.getCeloContract(proxyABI as unknown as AbiItem[], proxyAddress!)
  const blockResp = await kit.connection.rpcCaller.call('eth_getBlockByNumber', ['latest', false])
  const baseFee = (blockResp.result as RpcBlockResponse).baseFeePerGas
  const priorityFee = parseUnits('25', 9).toString()
  const callData = kit.connection
    .getAbiCoder()
    .encodeFunctionCall(initializerAbi as AbiItem, [
      owners as unknown,
      requiredSignatures as unknown,
      requiredInternalSignatures as unknown,
    ])
  const initData = encodeFunctionData({
    abi: proxy.abi,
    functionName: '_setAndInitializeImplementation',
    args: [multiSigAddress, callData],
  })
  const initGas = await kit.connection.estimateGas({
    from: kit.defaultAccount,
    to: proxy.address,
    data: initData,
  })
  const initResult = await kit.connection.sendTransaction({
    from: kit.defaultAccount,
    to: proxy.address,
    data: initData,
    gas: initGas,
    maxPriorityFeePerGas: priorityFee,
    maxFeePerGas: (BigInt(baseFee) + BigInt(priorityFee)).toString(),
  })
  await initResult.getHash()
  const changeOwnerData = encodeFunctionData({
    abi: proxy.abi,
    functionName: '_transferOwnership',
    args: [proxyAddress],
  })
  const changeOwnerGas = await kit.connection.estimateGas({
    from: kit.defaultAccount,
    to: proxy.address,
    data: changeOwnerData,
  })
  const changeOwnerResult = await kit.connection.sendTransaction({
    from: kit.defaultAccount,
    to: proxy.address,
    data: changeOwnerData,
    gas: changeOwnerGas,
    maxPriorityFeePerGas: priorityFee,
    maxFeePerGas: (BigInt(baseFee) + BigInt(priorityFee)).toString(),
  })
  await changeOwnerResult.getHash()

  return proxyAddress as StrongAddress
}

/**
 *
 * # Warning
 *
 * For future users: safe expects hardcoded/deterministic
 * addresses according to the chainId
 * This means your tests may fail with the following error:
 * > `Invalid multiSend contract address`
 *
 * In that case, please add the additional paramater `{ chainId: 42220 }` to the
 * `testWithAnvil` options (last parameter).
 *
 * A working example can be found in packages/cli/src/commands/governance/approve-l2.test.ts`
 */
export const setupSafeContracts = async (provider: Provider) => {
  // Set up safe 1.3.0 in devchain
  await setCode(provider, SAFE_MULTISEND_ADDRESS, SAFE_MULTISEND_CODE)
  await setCode(provider, SAFE_MULTISEND_CALL_ONLY_ADDRESS, SAFE_MULTISEND_CALL_ONLY_CODE)
  await setCode(provider, SAFE_PROXY_FACTORY_ADDRESS, SAFE_PROXY_FACTORY_CODE)
  await setCode(provider, SAFE_PROXY_ADDRESS, SAFE_PROXY_CODE)
  await setCode(provider, SAFE_FALLBACK_HANDLER_ADDRESS, SAFE_FALLBACK_HANDLER_CODE)
}
