import { StrongAddress } from '@celo/base'
import { Web3 } from '@celo/connect'
import AttestationsArtifacts from '@celo/celo-devchain/contracts/contracts-0.5/Attestations.json'
import { LinkedLibraryAddress } from './anvil-test'

export const deployAttestationsContract = async (
  client: Web3,
  owner: StrongAddress
): Promise<StrongAddress> => {
  const contract = new client.eth.Contract(AttestationsArtifacts.abi)

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

  return (txResult as any).options.address as StrongAddress
}
