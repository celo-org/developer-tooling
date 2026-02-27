import { StrongAddress } from '@celo/base'
import { Connection, Provider } from '@celo/connect'
import AttestationsArtifacts from '@celo/celo-devchain/contracts/contracts-0.5/Attestations.json'
import { encodeDeployData } from 'viem'
import { LinkedLibraryAddress } from './anvil-test'

export const deployAttestationsContract = async (
  provider: Provider,
  owner: StrongAddress
): Promise<StrongAddress> => {
  const conn = new Connection(provider)
  const linkedBytecode = AttestationsArtifacts.bytecode.replace(
    /__Signatures____________________________/g,
    LinkedLibraryAddress.Signatures.replace('0x', '')
  )
  const data = encodeDeployData({
    abi: AttestationsArtifacts.abi,
    bytecode: linkedBytecode as `0x${string}`,
    args: [true],
  })

  const txResult = await conn.sendTransaction({
    from: owner,
    data,
  })
  const receipt = await txResult.waitReceipt()

  return receipt.contractAddress as StrongAddress
}
