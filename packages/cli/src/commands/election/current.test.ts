import { newKitFromWeb3 } from '@celo/contractkit'
import { WrapperCache } from '@celo/contractkit/lib/contract-cache'
import { ElectionWrapper } from '@celo/contractkit/lib/wrappers/Election'
import { ValidatorsWrapper } from '@celo/contractkit/lib/wrappers/Validators'
import { testWithGanache } from '@celo/dev-utils/lib/ganache-test'
import { ux } from '@oclif/core'
import BigNumber from 'bignumber.js'
import Web3 from 'web3'
import { registerAccount, setupGroupAndAffiliateValidator } from '../../test-utils/chain-setup'
import { testLocally } from '../../test-utils/cliUtils'
import Current from './current'

process.env.NO_SYNCCHECK = 'true'

afterEach(async () => {
  jest.clearAllMocks()
  jest.restoreAllMocks()
})

testWithGanache('election:current cmd', async (web3: Web3) => {
  it('shows list with no --valset provided', async () => {
    const kit = newKitFromWeb3(web3)
    const [
      signerAddress,
      anotherSignerAddress,
      groupAddress,
      anotherGroupAddress,
      validatorAddress,
      anotherValidatorAddress,
    ] = await web3.eth.getAccounts()

    // we just need getCurrentValidatorSigners and it cannot be mocked directly
    // on ElectionWrapper.prototype because of the fact that it's implemented as
    // proxyCall and apparently jest cannot mock this type of function declaration
    // which results in an error
    const electionMock = {
      getCurrentValidatorSigners: jest.fn().mockImplementation(async () => {
        return [signerAddress, anotherSignerAddress]
      }),
    }
    const getValidatorFromSignerMock = jest.spyOn(
      ValidatorsWrapper.prototype,
      'getValidatorFromSigner'
    )

    getValidatorFromSignerMock
      .mockImplementationOnce(async () => ({
        address: validatorAddress,
        affiliation: groupAddress,
        blsPublicKey: '0x-bls-public-key-1',
        ecdsaPublicKey: '0x-ecdsa-public-key-1',
        name: 'Validator #1',
        score: new BigNumber(85),
        signer: signerAddress,
      }))
      .mockImplementationOnce(async () => ({
        address: anotherValidatorAddress,
        affiliation: anotherGroupAddress,
        blsPublicKey: '0x-bls-public-key-2',
        ecdsaPublicKey: '0x-ecdsa-public-key-2',
        name: 'Validator #2',
        score: new BigNumber(100),
        signer: anotherSignerAddress,
      }))
    await setupGroupAndAffiliateValidator(kit, groupAddress, validatorAddress)
    await setupGroupAndAffiliateValidator(kit, anotherGroupAddress, anotherValidatorAddress)

    await registerAccount(kit, signerAddress)
    await registerAccount(kit, anotherSignerAddress)

    const getElectionMock = jest.spyOn(WrapperCache.prototype, 'getElection')
    getElectionMock.mockImplementation(async () => electionMock as any as ElectionWrapper)

    const logMock = jest.spyOn(console, 'log')
    const warnMock = jest.spyOn(console, 'warn')
    const writeMock = jest.spyOn(ux.write, 'stdout')

    await testLocally(Current, ['--csv'])

    expect(writeMock.mock.calls).toMatchInlineSnapshot(`
      [
        [
          "Address,Name,Affiliation,Score,Ecdsapublickey,Blspublickey,Signer
      ",
        ],
        [
          "${validatorAddress},Validator #1,${groupAddress},85,0x-ecdsa-public-key-1,0x-bls-public-key-1,${signerAddress}
      ",
        ],
        [
          "${anotherValidatorAddress},Validator #2,${anotherGroupAddress},100,0x-ecdsa-public-key-2,0x-bls-public-key-2,${anotherSignerAddress}
      ",
        ],
      ]
    `)
    expect(logMock.mock.calls).toMatchInlineSnapshot(`[]`)
    expect(warnMock.mock.calls).toMatchInlineSnapshot(`[]`)
  })

  it('shows list with --valset provided', async () => {
    const kit = newKitFromWeb3(web3)
    const [
      signerAddress,
      anotherSignerAddress,
      groupAddress,
      anotherGroupAddress,
      validatorAddress,
      anotherValidatorAddress,
      changingSignerAddress,
    ] = await web3.eth.getAccounts()

    const electionMock = {
      getCurrentValidatorSigners: jest.fn().mockImplementation(async () => {
        return [signerAddress, anotherSignerAddress]
      }),
    }
    const getValidatorFromSignerMock = jest.spyOn(
      ValidatorsWrapper.prototype,
      'getValidatorFromSigner'
    )

    getValidatorFromSignerMock
      .mockImplementationOnce(async () => ({
        address: validatorAddress,
        affiliation: groupAddress,
        blsPublicKey: '0x-bls-public-key-1',
        ecdsaPublicKey: '0x-ecdsa-public-key-1',
        name: 'Validator #1',
        score: new BigNumber(85),
        signer: signerAddress,
      }))
      .mockImplementationOnce(async () => ({
        address: anotherValidatorAddress,
        affiliation: anotherGroupAddress,
        blsPublicKey: '0x-bls-public-key-2',
        ecdsaPublicKey: '0x-ecdsa-public-key-2',
        name: 'Validator #2',
        score: new BigNumber(100),
        // it's not anotherSignerAddress to emulate changing of the signer and get different output
        signer: changingSignerAddress,
      }))
    await setupGroupAndAffiliateValidator(kit, groupAddress, validatorAddress)
    await setupGroupAndAffiliateValidator(kit, anotherGroupAddress, anotherValidatorAddress)

    await registerAccount(kit, signerAddress)
    await registerAccount(kit, anotherSignerAddress)

    const getElectionMock = jest.spyOn(WrapperCache.prototype, 'getElection')
    getElectionMock.mockImplementation(async () => electionMock as any as ElectionWrapper)

    const logMock = jest.spyOn(console, 'log')
    const warnMock = jest.spyOn(console, 'warn')
    const writeMock = jest.spyOn(ux.write, 'stdout')

    await testLocally(Current, ['--csv', '--valset'])

    expect(writeMock.mock.calls).toMatchInlineSnapshot(`
      [
        [
          "Address,Name,Currentsigner,Signer,Changed
      ",
        ],
        [
          "${validatorAddress},Validator #1,${signerAddress},${signerAddress},no
      ",
        ],
        [
          "${anotherValidatorAddress},Validator #2,${anotherSignerAddress},${changingSignerAddress},CHANGING
      ",
        ],
      ]
    `)
    expect(logMock.mock.calls).toMatchInlineSnapshot(`[]`)
    expect(warnMock.mock.calls).toMatchInlineSnapshot(`[]`)
  })
})
