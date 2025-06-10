import { newKitFromWeb3 } from '@celo/contractkit'
import { setBalance, testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import { ux } from '@oclif/core'
import BigNumber from 'bignumber.js'
import { generatePrivateKey, privateKeyToAccount, toAccount } from 'viem/accounts'
import { celo, celoAlfajores } from 'viem/chains'
import Web3 from 'web3'
import {
  MIN_LOCKED_CELO_VALUE,
  registerAccount,
  registerAccountWithLockedGold,
  setupGroupAndAffiliateValidator,
  voteForGroupFrom,
} from '../../test-utils/chain-setup'
import {
  extractHostFromWeb3,
  stripAnsiCodesAndTxHashes,
  stripAnsiCodesFromNestedArray,
  testLocallyWithWeb3Node,
} from '../../test-utils/cliUtils'
import { deployMultiCall } from '../../test-utils/multicall'
import Switch from '../epochs/switch'
import ElectionActivate from './activate'

import { StrongAddress } from '@celo/base'
import { addressToPublicKey } from '@celo/utils/lib/signatureUtils'
import * as ViemLedger from '@celo/viem-account-ledger'
import { createWalletClient, Hex, http } from 'viem'
import { mockRpcFetch } from '../../test-utils/mockRpc'

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

    const timers: ReturnType<typeof setTimeout>[] = []

    afterEach(async () => {
      jest.clearAllMocks()
      timers.forEach((timer) => {
        timer.unref()
      })
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
          const timer = setTimeout(async () => {
            // switch with a different account
            await testLocallyWithWeb3Node(Switch, ['--from', otherUserAddress], web3)
            resolve()
          }, 1000)
          timers.push(timer)
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

      await setBalance(web3, newAccount.address, MIN_LOCKED_CELO_VALUE)
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
          const timer = setTimeout(async () => {
            // switch with a different account
            await testLocallyWithWeb3Node(Switch, ['--from', yetAnotherAddress], web3)
            resolve()
          }, 1000)
          timers.push(timer)
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

    describe('activate votes with the --useLedger flag', () => {
      let signTransactionSpy: jest.Mock
      beforeEach(async () => {
        signTransactionSpy = jest.fn().mockResolvedValue('0xtxhash')
        const [userAddress] = await web3.eth.getAccounts()

        jest.spyOn(ViemLedger, 'ledgerToWalletClient').mockImplementation(async () => {
          const accounts = [
            {
              ...toAccount({
                address: userAddress as StrongAddress,
                signTransaction: signTransactionSpy,
                signMessage: jest.fn(),
                signTypedData: jest.fn(),
              }),
              publicKey: (await addressToPublicKey(userAddress, web3.eth.sign)) as Hex,
              source: 'ledger' as const,
            },
          ]

          return {
            ...createWalletClient({
              chain: celo,
              transport: http(extractHostFromWeb3(web3)),
              account: accounts[0],
            }),
            getAddresses: async () => accounts.map((account) => account.address),
            accounts,
          }
        })
      })

      it('send the transactions to ledger for signing', async () => {
        const kit = newKitFromWeb3(web3)
        const activateAmount = 1234
        const [userAddress, groupAddress, validatorAddress] = await web3.eth.getAccounts()
        await setupGroupAndAffiliateValidator(kit, groupAddress, validatorAddress)
        await registerAccountWithLockedGold(kit, userAddress)

        await voteForGroupFrom(kit, userAddress, groupAddress, new BigNumber(activateAmount))

        await testLocallyWithWeb3Node(Switch, ['--from', userAddress], web3)

        jest.spyOn(console, 'log')
        const writeMock = jest.spyOn(ux.write, 'stdout')
        const web3Spy = jest.spyOn(ElectionActivate.prototype, 'getWeb3')
        const walletSpy = jest.spyOn(ElectionActivate.prototype, 'getWalletClient')

        const unmock = mockRpcFetch({
          method: [
            'eth_sendRawTransaction',
            'eth_getTransactionReceipt',
            'eth_getTransactionByHash',
          ],
          result: {
            transactionHash: '0x45b49a4d6a6be7267d4e2fae9126f1bb69847349091dd9f0a59838d4d094af1d',
          },
        })

        await testLocallyWithWeb3Node(
          ElectionActivate,
          ['--from', userAddress, '--useLedger'],
          web3
        )
        expect(ViemLedger.ledgerToWalletClient).toHaveBeenCalledWith(
          expect.objectContaining({
            account: userAddress,
            baseDerivationPath: "m/44'/60'/0'",
            changeIndexes: [0],
            derivationPathIndexes: [0],
            ledgerAddressValidation: 3,
            walletClientOptions: expect.objectContaining({
              chain: celo,
            }),
          })
        )
        expect(writeMock.mock.calls).toMatchInlineSnapshot(`[]`)

        expect(web3Spy).not.toHaveBeenCalled()
        expect(walletSpy).toHaveBeenCalled()
        expect(signTransactionSpy).toHaveBeenCalledWith(
          expect.objectContaining({
            account: expect.objectContaining({
              address: userAddress,
            }),
            data: expect.stringMatching(/0x[0-9A-F].+/i),
            to: (await kit.contracts.getElection()).address,
          }),
          { serializer: expect.anything() }
        )
        unmock()
      }, 15_000)
    })
  },
  { chainId: 42220 }
)
