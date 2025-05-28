import {
  Abi,
  Account,
  Chain,
  Client,
  ContractFunctionArgs,
  ContractFunctionName,
  encodeFunctionData,
  EncodeFunctionDataParameters,
  SignTransactionParameters,
  Transport,
  WriteContractParameters,
} from 'viem'
import { parseAccount } from 'viem/utils'

// NOTE: **HEAVILY** inspired/copied from https://github.com/wevm/viem/blob/main/src/actions/wallet/writeContract.ts
export function encodeWriteContractCall<
  chain extends Chain | undefined,
  account extends Account | undefined,
  const abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, 'nonpayable' | 'payable'>,
  args extends ContractFunctionArgs<abi, 'nonpayable' | 'payable', functionName>,
  chainOverride extends Chain | undefined
>(
  client: Client<Transport, chain, account>,
  parameters: WriteContractParameters<abi, functionName, args, chain, account, chainOverride>
) {
  const {
    abi,
    account: account_ = client.account,
    address,
    args,
    dataSuffix,
    functionName,
    ...request
  } = parameters as WriteContractParameters
  const account = account_ ? parseAccount(account_) : null

  const data = encodeFunctionData({
    abi,
    args,
    functionName,
  } as EncodeFunctionDataParameters)

  return {
    data: `${data}${dataSuffix ? dataSuffix.replace('0x', '') : ''}`,
    to: address,
    account,
    ...request,
  } as SignTransactionParameters<chain, account>
}
