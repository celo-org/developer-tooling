import { newKitFromWeb3 } from '@celo/contractkit'
import { AccountsWrapper } from '@celo/contractkit/lib/wrappers/Accounts'
import { setBalance, testWithAnvilL2, withImpersonatedAccount } from '@celo/dev-utils/anvil-test'
import { ClaimTypes, IdentityMetadataWrapper } from '@celo/metadata-claims'
import { ux } from '@oclif/core'
import { Address, parseEther } from 'viem'
import {
  MIN_PRACTICAL_LOCKED_CELO_VALUE,
  setupGroupAndAffiliateValidator,
  setupValidator,
} from '../../test-utils/chain-setup'
import { stripAnsiCodesAndTxHashes, testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import RpcUrls from './rpc-urls'

testWithAnvilL2('validatorgroup:rpc-urls cmd', async (web3) => {
  jest.spyOn(IdentityMetadataWrapper, 'fetchFromURL').mockImplementation(async (_, url) => {
    const validatorAddress = url.split('/').pop()

    if (validatorAddress === VALIDATOR_WITH_FETCH_ERROR) {
      throw new Error('Mock fetch error')
    }

    return new IdentityMetadataWrapper({
      claims: [
        {
          type: ClaimTypes.RPC_URL,
          timestamp: Date.now(),
          rpcUrl: `https://example.com:8545/${validatorAddress}`,
        },
        {
          type: ClaimTypes.ATTESTATION_SERVICE_URL,
          timestamp: Date.now(),
          url: `https://attestations.example.com:8545/${validatorAddress}`,
        },
      ],
    } as any) // that data is enough
  })

  const setMetadataUrlForValidator = async (
    accountsWrapper: AccountsWrapper,
    validator: string
  ) => {
    await withImpersonatedAccount(
      web3,
      validator,
      async () => {
        await accountsWrapper
          .setMetadataURL(`https://example.com/metadata/${validator}`)
          .sendAndWaitForReceipt({
            from: validator,
          })
      },
      parseEther('10000000')
    )
  }

  // For that validator fetch() mock call will fail
  const VALIDATOR_WITH_FETCH_ERROR = '0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc'
  const EXISTING_VALIDATORS = [
    '0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65',
    VALIDATOR_WITH_FETCH_ERROR,
    '0x976EA74026E726554dB657fA54763abd0C3a0aa9',
  ]

  beforeEach(async () => {
    const kit = newKitFromWeb3(web3)
    const accountsWrapper = await kit.contracts.getAccounts()

    const [nonElectedGroupAddress, validatorAddress, nonAffilatedValidatorAddress] =
      await web3.eth.getAccounts()

    await setBalance(web3, nonAffilatedValidatorAddress as Address, MIN_PRACTICAL_LOCKED_CELO_VALUE)
    await setupValidator(kit, nonAffilatedValidatorAddress)
    await setBalance(web3, nonElectedGroupAddress as Address, MIN_PRACTICAL_LOCKED_CELO_VALUE)
    await setBalance(web3, validatorAddress as Address, MIN_PRACTICAL_LOCKED_CELO_VALUE)
    await setupGroupAndAffiliateValidator(kit, nonElectedGroupAddress, validatorAddress)

    await accountsWrapper
      .setName('Test group')
      .sendAndWaitForReceipt({ from: nonElectedGroupAddress })
    for (const validator of [
      ...EXISTING_VALIDATORS,
      validatorAddress,
      nonAffilatedValidatorAddress,
    ]) {
      await setBalance(web3, validator as Address, MIN_PRACTICAL_LOCKED_CELO_VALUE)
      try {
        await setMetadataUrlForValidator(accountsWrapper, validator)
      } catch (error) {
        process.stderr.write(`Failed to set metadata URL for ${validator}: ${error}\n`)
      }
    }
  })

  it('shows the RPC URLs of the elected validator groups', async () => {
    const logMock = jest.spyOn(console, 'log')
    const writeMock = jest.spyOn(ux.write, 'stdout')

    await testLocallyWithWeb3Node(RpcUrls, ['--csv'], web3)

    expect(
      writeMock.mock.calls.map((args) => args.map(stripAnsiCodesAndTxHashes))
    ).toMatchInlineSnapshot(`
      [
        [
          "Validator Group Name,RPC URL,Validator Address
      ",
        ],
        [
          "cLabs,https://example.com:8545/0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65,0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65
      ",
        ],
        [
          "cLabs,https://example.com:8545/0x976EA74026E726554dB657fA54763abd0C3a0aa9,0x976EA74026E726554dB657fA54763abd0C3a0aa9
      ",
        ],
      ]
    `)
    expect(
      logMock.mock.calls.map((args) => args.map(stripAnsiCodesAndTxHashes))
    ).toMatchInlineSnapshot(`[]`)
  })

  it('shows all the RPC URLs (including non-affilated validator)', async () => {
    const logMock = jest.spyOn(console, 'log')
    const writeMock = jest.spyOn(ux.write, 'stdout')

    await testLocallyWithWeb3Node(RpcUrls, ['--all', '--csv'], web3)

    expect(
      writeMock.mock.calls.map((args) => args.map(stripAnsiCodesAndTxHashes))
    ).toMatchInlineSnapshot(`
      [
        [
          "Validator Group Name,RPC URL,Validator Address
      ",
        ],
        [
          "cLabs,https://example.com:8545/0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65,0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65
      ",
        ],
        [
          "cLabs,https://example.com:8545/0x976EA74026E726554dB657fA54763abd0C3a0aa9,0x976EA74026E726554dB657fA54763abd0C3a0aa9
      ",
        ],
        [
          ",https://example.com:8545/0xE36Ea790bc9d7AB70C55260C66D52b1eca985f84,0xE36Ea790bc9d7AB70C55260C66D52b1eca985f84
      ",
        ],
        [
          "Test group,https://example.com:8545/0x6Ecbe1DB9EF729CBe972C83Fb886247691Fb6beb,0x6Ecbe1DB9EF729CBe972C83Fb886247691Fb6beb
      ",
        ],
      ]
    `)
    expect(
      logMock.mock.calls.map((args) => args.map(stripAnsiCodesAndTxHashes))
    ).toMatchInlineSnapshot(`[]`)
  })
})
