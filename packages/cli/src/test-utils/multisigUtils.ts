import { multiSigABI, proxyABI } from '@celo/abis'
import { StrongAddress } from '@celo/base'
import { AbiItem, Provider } from '@celo/connect'
import { ContractKit } from '@celo/contractkit'
import { setCode } from '@celo/dev-utils/anvil-test'
import { TEST_GAS_PRICE } from '@celo/dev-utils/test-utils'
import { encodeFunctionData, parseUnits } from 'viem'
import { waitForTransactionReceipt } from 'viem/actions'
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
  const proxyHash = await kit.sendTransaction({
    data: proxyBytecode,
    maxFeePerGas: TEST_GAS_PRICE,
  })
  const proxyReceipt = await waitForTransactionReceipt(kit.connection.viemClient, {
    hash: proxyHash,
  })
  const { contractAddress: proxyAddress } = proxyReceipt
  // Deploy MultiSig contract
  const multisigHash = await kit.sendTransaction({
    data: multiSigBytecode,
    maxFeePerGas: TEST_GAS_PRICE,
  })
  const multisigReceipt = await waitForTransactionReceipt(kit.connection.viemClient, {
    hash: multisigHash,
  })
  const { contractAddress: multiSigAddress } = multisigReceipt

  // Configure and initialize MultiSig
  const initializerAbi = multiSigABI.find(
    (abi) => abi.type === 'function' && abi.name === 'initialize'
  )
  const proxy = kit.connection.getCeloContract(proxyABI as unknown as AbiItem[], proxyAddress!)
  const blockResp = await kit.connection.viemClient.request({
    method: 'eth_getBlockByNumber',
    params: ['latest', false],
  })
  const baseFee = (blockResp as RpcBlockResponse).baseFeePerGas
  const priorityFee = parseUnits('25', 9).toString()
  const callData = encodeFunctionData({
    abi: [initializerAbi] as any,
    args: [owners, requiredSignatures, requiredInternalSignatures] as any,
  })
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
  await kit.connection.sendTransaction({
    from: kit.defaultAccount,
    to: proxy.address,
    data: initData,
    gas: initGas,
    maxPriorityFeePerGas: priorityFee,
    maxFeePerGas: (BigInt(baseFee) + BigInt(priorityFee)).toString(),
  })
  // Hash is returned directly from sendTransaction
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
  await kit.connection.sendTransaction({
    from: kit.defaultAccount,
    to: proxy.address,
    data: changeOwnerData,
    gas: changeOwnerGas,
    maxPriorityFeePerGas: priorityFee,
    maxFeePerGas: (BigInt(baseFee) + BigInt(priorityFee)).toString(),
  })
  // Hash is returned directly from sendTransaction

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
