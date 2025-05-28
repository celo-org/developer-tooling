import { newKitFromWeb3 } from '@celo/contractkit'
import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import { ux } from '@oclif/core'
import BigNumber from 'bignumber.js'
import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts'
import { celoAlfajores } from 'viem/chains'
import Web3 from 'web3'
import {
  registerAccount,
  registerAccountWithLockedGold,
  setupGroupAndAffiliateValidator,
  voteForGroupFrom,
} from '../../test-utils/chain-setup'
import {
  stripAnsiCodesAndTxHashes,
  stripAnsiCodesFromNestedArray,
  testLocallyWithWeb3Node,
} from '../../test-utils/cliUtils'
import { deployMultiCall } from '../../test-utils/multicall'
import Switch from '../epochs/switch'
import ElectionActivate from './activate'
jest.mock('@celo/hw-app-eth')
jest.mock('@celo/viem-account-ledger')
process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2(
  'election:activate',
  (web3: Web3) => {
    beforeEach(async () => {
      // need to set multical deployment on the address it is found on alfajores
      // since this test impersonates alfajores chain id
      await deployMultiCall(web3, celoAlfajores.contracts.multicall3.address)
    })

    afterEach(async () => {
      jest.clearAllMocks()
    })

    it('fails when no flags are provided', async () => {
      await expect(testLocallyWithWeb3Node(ElectionActivate, [], web3)).rejects.toThrow(
        'Missing required flag from'
      )
    })

    it('shows no pending votes', async () => {
      const kit = newKitFromWeb3(web3)
      const [userAddress] = await web3.eth.getAccounts()
      const writeMock = jest.spyOn(ux.write, 'stdout')

      await registerAccount(kit, userAddress)

      await testLocallyWithWeb3Node(ElectionActivate, ['--from', userAddress], web3)

      expect(writeMock.mock.calls).toMatchInlineSnapshot(`
              [
                [
                  "No pending votes to activate
              ",
                ],
              ]
          `)
    })

    it('shows no activatable votes yet', async () => {
      const kit = newKitFromWeb3(web3)
      const [groupAddress, validatorAddress, userAddress] = await web3.eth.getAccounts()

      const writeMock = jest.spyOn(ux.write, 'stdout')

      await setupGroupAndAffiliateValidator(kit, groupAddress, validatorAddress)
      await registerAccountWithLockedGold(kit, userAddress)

      await voteForGroupFrom(kit, userAddress, groupAddress, new BigNumber(10))
      await testLocallyWithWeb3Node(ElectionActivate, ['--from', userAddress], web3)

      expect(writeMock.mock.calls).toMatchInlineSnapshot(`
              [
                [
                  "Pending votes not yet activatable. Consider using the --wait flag.
              ",
                ],
              ]
          `)
    })

    it('activate votes', async () => {
      const kit = newKitFromWeb3(web3)
      const [groupAddress, validatorAddress, userAddress] = await web3.eth.getAccounts()
      const election = await kit.contracts.getElection()
      const writeMock = jest.spyOn(ux.write, 'stdout')
      const activateAmount = 12345

      await setupGroupAndAffiliateValidator(kit, groupAddress, validatorAddress)
      await registerAccountWithLockedGold(kit, userAddress)

      await voteForGroupFrom(kit, userAddress, groupAddress, new BigNumber(activateAmount))

      await testLocallyWithWeb3Node(Switch, ['--from', userAddress], web3)

      expect((await election.getVotesForGroupByAccount(userAddress, groupAddress)).active).toEqual(
        new BigNumber(0)
      )

      await testLocallyWithWeb3Node(ElectionActivate, ['--from', userAddress], web3)

      expect(writeMock.mock.calls).toMatchInlineSnapshot(`[]`)
      expect((await election.getVotesForGroupByAccount(userAddress, groupAddress)).active).toEqual(
        new BigNumber(activateAmount)
      )
    })

    // describe(' activate votes with the --useLedger flag', () => {
    //     let signTransactionSpy: jest.Mock
    //     beforeEach(() => {
    //       signTransactionSpy = jest.fn().mockResolvedValue('0xtxhash')
    //       jest.spyOn(ViemLedger, 'ledgerToAccount').mockImplementation(() => {
    //         return  Promise.resolve({
    //           address: userAddress as StrongAddress,
    //           type: 'local',
    //           publicKey: generatePrivateKey(),
    //           signTransaction: signTransactionSpy,
    //           signMessage: jest.fn(),
    //           signTypedData: jest.fn(),
    //           source: 'ledger',
    //         })
    //       })
    //     })
    //     it('send the transactions to ledger for signing', async () => {
    //       const signSpy = jest.spyOn(Eth.prototype, 'signTransaction')
    //       const web3Spy = jest.spyOn(ElectionActivate.prototype, 'getWeb3')
    //       const walletSpy = jest.spyOn(ElectionActivate.prototype, 'getWalletClient')

    //       await testLocallyWithWeb3Node(
    //         ElectionActivate,
    //         ['--from', userAddress, '--useLedger'],
    //         web3
    //       )
    //       expect(ViemLedger.ledgerToAccount).toHaveBeenCalledWith()
    //       expect(signTransactionSpy).toHaveBeenCalledWith()
    //       expect(writeMock.mock.calls).toMatchInlineSnapshot(`[]`)

    //       expect(web3Spy).not.toHaveBeenCalled()
    //       expect(walletSpy).toHaveBeenCalled()
    //       expect(signSpy).toHaveBeenCalledWith({})
    //     })
    //   })

    it('activate votes with --wait flag', async () => {
      const kit = newKitFromWeb3(web3)
      const [groupAddress, validatorAddress, userAddress, otherUserAddress] =
        await web3.eth.getAccounts()
      const election = await kit.contracts.getElection()
      const writeMock = jest.spyOn(ux.write, 'stdout')
      const activateAmount = 12345
      const logMock = jest.spyOn(console, 'log')

      await setupGroupAndAffiliateValidator(kit, groupAddress, validatorAddress)
      await registerAccountWithLockedGold(kit, userAddress)

      await voteForGroupFrom(kit, userAddress, groupAddress, new BigNumber(activateAmount))

      expect((await election.getVotesForGroupByAccount(userAddress, groupAddress)).active).toEqual(
        new BigNumber(0)
      )

      await Promise.all([
        testLocallyWithWeb3Node(ElectionActivate, ['--from', userAddress, '--wait'], web3),
        new Promise<void>((resolve) => {
          // at least the amount the --wait flag waits in the check
          setTimeout(async () => {
            // switch with a different account
            testLocallyWithWeb3Node(Switch, ['--from', otherUserAddress], web3)
            resolve()
          }, 1000)
        }),
      ])

      expect(logMock.mock.calls.map((args) => args.map(stripAnsiCodesAndTxHashes)))
        .toMatchInlineSnapshot(`
              [
                [
                  "Running Checks:",
                ],
                [
                  "   ✔  0xE36Ea790bc9d7AB70C55260C66D52b1eca985f84 is Signer or registered Account ",
                ],
                [
                  "All checks passed",
                ],
                [
                  "SendTransaction: startNextEpoch",
                ],
                [
                  "txHash: 0xtxhash",
                ],
                [
                  "SendTransaction: finishNextEpoch",
                ],
                [
                  "txHash: 0xtxhash",
                ],
                [
                  "SendTransaction: activate",
                ],
                [
                  "txHash: 0xtxhash",
                ],
              ]
          `)
      expect(writeMock.mock.calls).toMatchInlineSnapshot(`[]`)
      expect((await election.getVotesForGroupByAccount(userAddress, groupAddress)).active).toEqual(
        new BigNumber(activateAmount)
      )
    })

    it('activate votes for other address', async () => {
      const kit = newKitFromWeb3(web3)
      const [groupAddress, validatorAddress, userAddress, otherUserAddress] =
        await web3.eth.getAccounts()
      const election = await kit.contracts.getElection()
      const writeMock = jest.spyOn(ux.write, 'stdout')
      const activateAmount = 54321

      await setupGroupAndAffiliateValidator(kit, groupAddress, validatorAddress)
      await registerAccountWithLockedGold(kit, userAddress)

      await voteForGroupFrom(kit, userAddress, groupAddress, new BigNumber(activateAmount))

      await testLocallyWithWeb3Node(Switch, ['--from', userAddress], web3)

      expect((await election.getVotesForGroupByAccount(userAddress, groupAddress)).active).toEqual(
        new BigNumber(0)
      )
      expect(
        (await election.getVotesForGroupByAccount(otherUserAddress, groupAddress)).active
      ).toEqual(new BigNumber(0))

      await testLocallyWithWeb3Node(
        ElectionActivate,
        ['--from', otherUserAddress, '--for', userAddress],
        web3
      )

      expect(writeMock.mock.calls).toMatchInlineSnapshot(`[]`)
      expect((await election.getVotesForGroupByAccount(userAddress, groupAddress)).active).toEqual(
        new BigNumber(activateAmount)
      )
      expect(
        (await election.getVotesForGroupByAccount(otherUserAddress, groupAddress)).active
      ).toEqual(new BigNumber(0))
    })

    it('activate votes for other address with --wait flag', async () => {
      const privKey = generatePrivateKey()
      const newAccount = privateKeyToAccount(privKey)
      const kit = newKitFromWeb3(web3)

      const [
        groupAddress,
        validatorAddress,
        userAddress,
        yetAnotherAddress,
        secondGroupAddress,
        secondValidatorAddress,
      ] = await web3.eth.getAccounts()

      const election = await kit.contracts.getElection()
      const writeMock = jest.spyOn(ux.write, 'stdout')
      const activateAmount = 54321
      const activateAmountGroupTwo = 12345
      const logMock = jest.spyOn(console, 'log')

      await setupGroupAndAffiliateValidator(kit, groupAddress, validatorAddress)
      await setupGroupAndAffiliateValidator(kit, secondGroupAddress, secondValidatorAddress)
      await registerAccountWithLockedGold(kit, userAddress)

      await voteForGroupFrom(kit, userAddress, groupAddress, new BigNumber(activateAmount))
      await voteForGroupFrom(
        kit,
        userAddress,
        secondGroupAddress,
        new BigNumber(activateAmountGroupTwo)
      )

      expect((await election.getVotesForGroupByAccount(userAddress, groupAddress)).active).toEqual(
        new BigNumber(0)
      )
      expect(
        (await election.getVotesForGroupByAccount(newAccount.address, groupAddress)).active
      ).toEqual(new BigNumber(0))

      await Promise.all([
        testLocallyWithWeb3Node(
          ElectionActivate,
          ['--from', newAccount.address, '--for', userAddress, '--wait', '-k', privKey],
          web3
        ),
        new Promise<void>((resolve) => {
          // at least the amount the --wait flag waits in the check
          setTimeout(async () => {
            // switch with a different account
            testLocallyWithWeb3Node(Switch, ['--from', yetAnotherAddress], web3)
            resolve()
          }, 1000)
        }),
      ])

      expect(stripAnsiCodesFromNestedArray(logMock.mock.calls)).toMatchInlineSnapshot(`
        [
          [
            "Running Checks:",
          ],
          [
            "   ✔  0xE36Ea790bc9d7AB70C55260C66D52b1eca985f84 is Signer or registered Account ",
          ],
          [
            "All checks passed",
          ],
          [
            "SendTransaction: startNextEpoch",
          ],
          [
            "txHash: 0xtxhash",
          ],
          [
            "SendTransaction: finishNextEpoch",
          ],
          [
            "txHash: 0xtxhash",
          ],
          [
            "SendTransaction: activate",
          ],
          [
            "txHash: 0xtxhash",
          ],
          [
            "SendTransaction: activate",
          ],
          [
            "txHash: 0xtxhash",
          ],
        ]
      `)

      expect(writeMock.mock.calls).toMatchInlineSnapshot(`[]`)
      expect((await election.getVotesForGroupByAccount(userAddress, groupAddress)).active).toEqual(
        new BigNumber(activateAmount)
      )
      expect(
        (await election.getVotesForGroupByAccount(userAddress, secondGroupAddress)).active
      ).toEqual(new BigNumber(activateAmountGroupTwo))
      expect(
        (await election.getVotesForGroupByAccount(newAccount.address, groupAddress)).active
      ).toEqual(new BigNumber(0))
      expect(
        (await election.getVotesForGroupByAccount(newAccount.address, secondGroupAddress)).active
      ).toEqual(new BigNumber(0))
    })
  },
  { chainId: 42220 }
)
