import { multiSigABI, proxyABI } from '@celo/abis'
import { StrongAddress } from '@celo/base'
import { ContractKit } from '@celo/contractkit'
import { setCode } from '@celo/dev-utils/lib/anvil-test'
import Web3 from 'web3'
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

export async function createMultisig(
  kit: ContractKit,
  owners: StrongAddress[],
  requiredSignatures: number,
  requiredInternalSignatures: number
): Promise<StrongAddress> {
  const accounts = (await kit.web3.eth.getAccounts()) as StrongAddress[]
  kit.defaultAccount = accounts[0]

  // Deploy Proxy contract
  const proxyDeploymentTx = await kit.sendTransaction({
    data: proxyBytecode,
  })
  const { contractAddress: proxyAddress } = await proxyDeploymentTx.waitReceipt()
  // Deploy MultiSig contract
  const multisigDeploymentTx = await kit.sendTransaction({
    data: multiSigBytecode,
  })
  const { contractAddress: multiSigAddress } = await multisigDeploymentTx.waitReceipt()

  // Configure and initialize MultiSig
  const initializerAbi = multiSigABI.find(
    (abi) => abi.type === 'function' && abi.name === 'initialize'
  )
  const proxy = new kit.web3.eth.Contract(proxyABI as any, proxyAddress)
  const baseFee = await kit.web3.eth.getBlock('latest').then((block: any) => block.baseFeePerGas)
  const priorityFee = kit.web3.utils.toWei('2', 'gwei')
  const initMethod = proxy.methods._setAndInitializeImplementation
  const callData = kit.web3.eth.abi.encodeFunctionCall(initializerAbi as any, [
    owners as any,
    requiredSignatures as any,
    requiredInternalSignatures as any,
  ])
  const initTx = initMethod(multiSigAddress, callData)
  await initTx.send({
    from: kit.defaultAccount,
    gas: await initTx.estimateGas({ from: kit.defaultAccount }),
    maxPriorityFeePerGas: priorityFee,
    maxFeePerGas: (BigInt(baseFee) + BigInt(priorityFee)).toString(),
  })
  const transferOwnershipMethod = proxy.methods._transferOwnership
  const changeOwnerTx = transferOwnershipMethod(proxyAddress)
  await changeOwnerTx.send({
    from: kit.defaultAccount,
    gas: await changeOwnerTx.estimateGas({ from: kit.defaultAccount }),
    maxPriorityFeePerGas: priorityFee,
    maxFeePerGas: (BigInt(baseFee) + BigInt(priorityFee)).toString(),
  })

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
export const setupSafeContracts = async (web3: Web3) => {
  // Set up safe 1.3.0 in devchain
  await setCode(web3, SAFE_MULTISEND_ADDRESS, SAFE_MULTISEND_CODE)
  await setCode(web3, SAFE_MULTISEND_CALL_ONLY_ADDRESS, SAFE_MULTISEND_CALL_ONLY_CODE)
  await setCode(web3, SAFE_PROXY_FACTORY_ADDRESS, SAFE_PROXY_FACTORY_CODE)
  await setCode(web3, SAFE_PROXY_ADDRESS, SAFE_PROXY_CODE)
  await setCode(web3, SAFE_FALLBACK_HANDLER_ADDRESS, SAFE_FALLBACK_HANDLER_CODE)
}
