import { serializeSignature, StrongAddress } from '@celo/base'
import { newKitFromProvider } from '@celo/contractkit'
import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import { stripAnsiCodesFromNestedArray, testLocallyWithNode } from '../../test-utils/cliUtils'
import { deployReleaseGoldContract } from '../../test-utils/release-gold'
import Register from '../account/register'
import Authorize from '../releasecelo/authorize'
import CreateAccount from '../releasecelo/create-account'
import Delegate from './delegate'
import Lock from './lock'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('lockedgold:delegate cmd', (providerOwner) => {
  it('can not delegate when not an account or a vote signer', async () => {
    const kit = newKitFromProvider(providerOwner.currentProvider)
    const [delegator, delegatee] = await kit.connection.getAccounts()
    const lockedGold = await kit.contracts.getLockedGold()

    await testLocallyWithNode(Register, ['--from', delegatee], providerOwner)

    const delegateeVotingPower = await lockedGold.getAccountTotalGovernanceVotingPower(delegatee)

    // Sanity check
    expect(delegateeVotingPower.toFixed()).toBe('0')

    const logMock = jest.spyOn(console, 'log')

    await expect(
      testLocallyWithNode(
        Delegate,
        ['--from', delegator, '--to', delegatee, '--percent', '45'],
        providerOwner
      )
    ).rejects.toMatchInlineSnapshot(`[Error: Some checks didn't pass!]`)

    // Make sure nothing has changed
    expect(await lockedGold.getAccountTotalGovernanceVotingPower(delegatee)).toEqual(
      delegateeVotingPower
    )
    expect(stripAnsiCodesFromNestedArray(logMock.mock.calls)).toMatchInlineSnapshot(`
      [
        [
          "Running Checks:",
        ],
        [
          "   ✔  Value [45] is > 0 and <=100 ",
        ],
        [
          "   ✘  0x5409ED021D9299bf6814279A6A1411A7e866A631 is vote signer or registered account ",
        ],
        [
          "   ✔  0x6Ecbe1DB9EF729CBe972C83Fb886247691Fb6beb is a registered Account ",
        ],
      ]
    `)
  })

  test('can delegate', async () => {
    const kit = newKitFromProvider(providerOwner.currentProvider)
    const accounts = await kit.connection.getAccounts()
    const account = accounts[0]
    const account2 = accounts[1]
    const lockedGold = await kit.contracts.getLockedGold()
    await testLocallyWithNode(Register, ['--from', account], providerOwner)
    await testLocallyWithNode(Register, ['--from', account2], providerOwner)
    await testLocallyWithNode(Lock, ['--from', account, '--value', '200'], providerOwner)

    const account2OriginalVotingPower =
      await lockedGold.getAccountTotalGovernanceVotingPower(account2)
    expect(account2OriginalVotingPower.toFixed()).toBe('0')

    await testLocallyWithNode(
      Delegate,
      ['--from', account, '--to', account2, '--percent', '100'],
      providerOwner
    )

    const account2VotingPower = await lockedGold.getAccountTotalGovernanceVotingPower(account2)
    expect(account2VotingPower.toFixed()).toBe('200')
  })

  it('can delegate as a vote signer for releasecelo contract', async () => {
    const kit = newKitFromProvider(providerOwner.currentProvider)
    const [beneficiary, owner, voteSigner, refundAddress, delegateeAddress] =
      (await kit.connection.getAccounts()) as StrongAddress[]
    const accountsWrapper = await kit.contracts.getAccounts()
    const releaseGoldContractAddress = await deployReleaseGoldContract(
      providerOwner,
      owner,
      beneficiary,
      owner,
      refundAddress
    )

    await testLocallyWithNode(
      CreateAccount,
      ['--contract', releaseGoldContractAddress],
      providerOwner
    )
    await testLocallyWithNode(
      Authorize,
      [
        '--contract',
        releaseGoldContractAddress,
        '--role',
        'vote',
        '--signer',
        voteSigner,
        '--signature',
        serializeSignature(
          await accountsWrapper.generateProofOfKeyPossession(releaseGoldContractAddress, voteSigner)
        ),
      ],
      providerOwner
    )
    await testLocallyWithNode(Lock, ['--from', beneficiary, '--value', '100'], providerOwner)

    const createAccountTx = await accountsWrapper.createAccount().send({ from: delegateeAddress })
    await createAccountTx.waitReceipt()

    await testLocallyWithNode(
      Delegate,
      ['--from', voteSigner, '--to', delegateeAddress, '--percent', '100'],
      providerOwner
    )

    const lockedGold = await kit.contracts.getLockedGold()
    const delegateInfo = await lockedGold.getDelegateInfo(releaseGoldContractAddress)

    expect(delegateInfo.delegatees).toContain(delegateeAddress)
  })
})
