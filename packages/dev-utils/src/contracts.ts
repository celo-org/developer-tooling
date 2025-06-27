import { StrongAddress } from '@celo/base'
import AttestationsArtifacts from '@celo/celo-devchain/contracts/contracts-0.5/Attestations.json'
import Web3 from 'web3'
import { LinkedLibraryAddress } from './anvil-test'
import type { AbiItem } from 'web3-utils'

export const deployAttestationsContract = async (
  web3: Web3,
  owner: StrongAddress
): Promise<StrongAddress> => {
  const contract = new web3.eth.Contract(AttestationsArtifacts.abi as AbiItem[])

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

  return txResult.options.address as StrongAddress
}
