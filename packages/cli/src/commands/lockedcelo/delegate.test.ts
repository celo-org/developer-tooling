import { serializeSignature, StrongAddress } from '@celo/base'
import { newKitFromWeb3 } from '@celo/contractkit'
import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import Web3 from 'web3'
import { stripAnsiCodesFromNestedArray, testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import { deployReleaseGoldContract } from '../../test-utils/release-gold'
import Register from '../account/register'
import Authorize from '../releasecelo/authorize'
import CreateAccount from '../releasecelo/create-account'
import Delegate from './delegate'
import Lock from './lock'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('lockedgold:delegate cmd', (web3: Web3) => {
  it('can not delegate when not an account or a vote signer', async () => {
    const [delegator, delegatee] = await web3.eth.getAccounts()
    const kit = newKitFromWeb3(web3)
    const lockedGold = await kit.contracts.getLockedGold()

    await testLocallyWithWeb3Node(Register, ['--from', delegatee], web3)

    const delegateeVotingPower = await lockedGold.getAccountTotalGovernanceVotingPower(delegatee)

    // Sanity check
    expect(delegateeVotingPower.toFixed()).toBe('0')

    const logMock = jest.spyOn(console, 'log')

    await expect(
      testLocallyWithWeb3Node(
        Delegate,
        ['--from', delegator, '--to', delegatee, '--percent', '45'],
        web3
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
    const accounts = await web3.eth.getAccounts()
    const account = accounts[0]
    const account2 = accounts[1]
    const kit = newKitFromWeb3(web3)
    const lockedGold = await kit.contracts.getLockedGold()
    await testLocallyWithWeb3Node(Register, ['--from', account], web3)
    await testLocallyWithWeb3Node(Register, ['--from', account2], web3)
    await testLocallyWithWeb3Node(Lock, ['--from', account, '--value', '200'], web3)

    const account2OriginalVotingPower = await lockedGold.getAccountTotalGovernanceVotingPower(
      account2
    )
    expect(account2OriginalVotingPower.toFixed()).toBe('0')

    await testLocallyWithWeb3Node(
      Delegate,
      ['--from', account, '--to', account2, '--percent', '100'],
      web3
    )

    const account2VotingPower = await lockedGold.getAccountTotalGovernanceVotingPower(account2)
    expect(account2VotingPower.toFixed()).toBe('200')
  })

  it('can delegate as a vote signer for releasecelo contract', async () => {
    const [beneficiary, owner, voteSigner, refundAddress, delegateeAddress] =
      (await web3.eth.getAccounts()) as StrongAddress[]
    const kit = newKitFromWeb3(web3)
    const accountsWrapper = await kit.contracts.getAccounts()
    const releaseGoldContractAddress = await deployReleaseGoldContract(
      web3,
      owner,
      beneficiary,
      owner,
      refundAddress
    )

    await testLocallyWithWeb3Node(CreateAccount, ['--contract', releaseGoldContractAddress], web3)
    await testLocallyWithWeb3Node(
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
      web3
    )
    await testLocallyWithWeb3Node(Lock, ['--from', beneficiary, '--value', '100'], web3)

    const createAccountTx = await accountsWrapper.createAccount().send({ from: delegateeAddress })
    await createAccountTx.waitReceipt()

    await testLocallyWithWeb3Node(
      Delegate,
      ['--from', voteSigner, '--to', delegateeAddress, '--percent', '100'],
      web3
    )

    const lockedGold = await kit.contracts.getLockedGold()
    const delegateInfo = await lockedGold.getDelegateInfo(releaseGoldContractAddress)

    expect(delegateInfo.delegatees).toContain(delegateeAddress)
  })
})
