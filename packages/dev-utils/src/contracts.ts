import { StrongAddress } from '@celo/base'
import { AbiItem, Connection, Provider } from '@celo/connect'
import AttestationsArtifacts from '@celo/celo-devchain/contracts/contracts-0.5/Attestations.json'
import { LinkedLibraryAddress } from './anvil-test'

export const deployAttestationsContract = async (
  provider: Provider,
  owner: StrongAddress
): Promise<StrongAddress> => {
  const conn = new Connection(provider)
  const contract = conn.createContract(AttestationsArtifacts.abi as AbiItem[])

  const deployTx = contract.deploy({
    data: AttestationsArtifacts.bytecode.replace(
      /__Signatures____________________________/g,
      LinkedLibraryAddress.Signatures.replace('0x', '')
    ),
    // By providing true to the contract constructor
    // we don't need to call initialize() on the contract
    arguments: [true],
  })

  const txResult = await deployTx.send({ from: owner })

  return (txResult as unknown as { options: { address: StrongAddress } }).options.address
}
