import { newReleaseGold } from '@celo/abis/web3/ReleaseGold'
import { StrongAddress } from '@celo/base'
import { ContractKit, newKitFromWeb3 } from '@celo/contractkit'
import { ReleaseGoldWrapper } from '@celo/contractkit/lib/wrappers/ReleaseGold'
import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import Web3 from 'web3'
import { testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import { createMultisig } from '../../test-utils/multisigUtils'
import { deployReleaseGoldContract } from '../../test-utils/release-gold'
import SetBeneficiary from './set-beneficiary'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('releasegold:set-beneficiary cmd', (web3: Web3) => {
  let contractAddress: any
  let kit: ContractKit
  let releaseGoldWrapper: ReleaseGoldWrapper
  let releaseGoldMultiSig: any
  let releaseOwner: StrongAddress
  let beneficiary: StrongAddress
  let newBeneficiary: StrongAddress
  let otherAccount: StrongAddress
  let refundAddress: StrongAddress

  beforeEach(async () => {
    kit = newKitFromWeb3(web3)
    const accounts = await web3.eth.getAccounts()

    releaseOwner = accounts[0] as StrongAddress
    beneficiary = accounts[1] as StrongAddress
    newBeneficiary = accounts[2] as StrongAddress
    otherAccount = accounts[3] as StrongAddress
    refundAddress = accounts[4] as StrongAddress

    contractAddress = await deployReleaseGoldContract(
      web3,
      await createMultisig(kit, [accounts[0], accounts[1]] as StrongAddress[], 2, 2),
      beneficiary,
      releaseOwner,
      refundAddress
    )

    releaseGoldWrapper = new ReleaseGoldWrapper(
      kit.connection,
      newReleaseGold(web3, contractAddress),
      kit.contracts
    )
    beneficiary = await releaseGoldWrapper.getBeneficiary()
    const owner = await releaseGoldWrapper.getOwner()
    releaseGoldMultiSig = await kit.contracts.getMultiSig(owner)
  })

  test('can change beneficiary', async () => {
    // First submit the tx from the release owner (accounts[0])
    await testLocallyWithWeb3Node(
      SetBeneficiary,
      [
        '--contract',
        contractAddress,
        '--from',
        releaseOwner,
        '--beneficiary',
        newBeneficiary,
        '--yesreally',
      ],
      web3
    )
    // The multisig tx should not confirm until both parties submit
    expect(await releaseGoldWrapper.getBeneficiary()).toEqual(beneficiary)
    await testLocallyWithWeb3Node(
      SetBeneficiary,
      [
        '--contract',
        contractAddress,
        '--from',
        beneficiary,
        '--beneficiary',
        newBeneficiary,
        '--yesreally',
      ],
      web3
    )
    expect(await releaseGoldWrapper.getBeneficiary()).toEqual(newBeneficiary)
    // It should also update the multisig owners
    expect(await releaseGoldMultiSig.getOwners()).toEqual([releaseOwner, newBeneficiary])
  })

  test('if called by a different account, it should fail', async () => {
    await expect(
      testLocallyWithWeb3Node(
        SetBeneficiary,
        [
          '--contract',
          contractAddress,
          '--from',
          otherAccount,
          '--beneficiary',
          newBeneficiary,
          '--yesreally',
        ],
        web3
      )
    ).rejects.toThrow()
  })

  test('if the owners submit different txs, nothing on the ReleaseGold contract should change', async () => {
    // ReleaseOwner tries to change the beneficiary to `newBeneficiary` while the beneficiary
    // tries to change to `otherAccount`. Nothing should change on the RG contract.
    await testLocallyWithWeb3Node(
      SetBeneficiary,
      [
        '--contract',
        contractAddress,
        '--from',
        releaseOwner,
        '--beneficiary',
        newBeneficiary,
        '--yesreally',
      ],
      web3
    )
    await testLocallyWithWeb3Node(
      SetBeneficiary,
      [
        '--contract',
        contractAddress,
        '--from',
        beneficiary,
        '--beneficiary',
        otherAccount,
        '--yesreally',
      ],
      web3
    )
    expect(await releaseGoldWrapper.getBeneficiary()).toEqual(beneficiary)
    expect(await releaseGoldMultiSig.getOwners()).toEqual([releaseOwner, beneficiary])
  })
})
