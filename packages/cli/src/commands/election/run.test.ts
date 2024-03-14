import { newKitFromWeb3 } from '@celo/contractkit'
import { ElectionWrapper } from '@celo/contractkit/lib/wrappers/Election'
import { ValidatorsWrapper } from '@celo/contractkit/lib/wrappers/Validators'
import { testWithGanache } from '@celo/dev-utils/lib/ganache-test'
import { ux } from '@oclif/core'
import BigNumber from 'bignumber.js'
import Web3 from 'web3'
import { setupGroupAndAffiliateValidator } from '../../test-utils/chain-setup'
import { stripAnsiCodes, testLocally } from '../../test-utils/cliUtils'
import Run from './run'

process.env.NO_SYNCCHECK = 'true'

testWithGanache('election:run', (web3: Web3) => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('warns when there are no validators', async () => {
    const logMock = jest.spyOn(console, 'log')
    const warnMock = jest.spyOn(console, 'warn')
    const writeMock = jest.spyOn(ux.write, 'stdout')

    await testLocally(Run, ['--csv'])

    expect(writeMock.mock.calls).toMatchInlineSnapshot(`
      [
        [
          "Address,Name,Affiliation,Score,Ecdsapublickey,Blspublickey,Signer
      ",
        ],
      ]
    `)
    expect(logMock.mock.calls.map((args) => args.map(stripAnsiCodes))).toMatchInlineSnapshot(`[]`)
    expect(warnMock.mock.calls.map((args) => args.map(stripAnsiCodes))).toMatchInlineSnapshot(`
      [
        [
          "Warning: error running actual elections, retrying with minimum validators at 0",
        ],
      ]
    `)
  })

  it('runs election', async () => {
    const kit = newKitFromWeb3(web3)
    const logMock = jest.spyOn(console, 'log')
    const warnMock = jest.spyOn(console, 'warn')
    const writeMock = jest.spyOn(ux.write, 'stdout')
    const [
      validatorAddress,
      anotherValidatorAddress,
      groupAddress,
      anotherGroupAddress,
      signerAddress,
      anotherSignerAddress,
    ] = await web3.eth.getAccounts()

    await setupGroupAndAffiliateValidator(kit, groupAddress, validatorAddress)
    await setupGroupAndAffiliateValidator(kit, anotherGroupAddress, anotherValidatorAddress)

    const electValidatorSignersMock = jest.spyOn(ElectionWrapper.prototype, 'electValidatorSigners')
    const getValidatorMock = jest.spyOn(ValidatorsWrapper.prototype, 'getValidator')

    electValidatorSignersMock.mockImplementation(async () => [
      validatorAddress,
      anotherValidatorAddress,
    ])

    getValidatorMock
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

    await testLocally(Run, ['--csv'])

    expect(writeMock.mock.calls).toMatchInlineSnapshot(`
      [
        [
          "Address,Name,Affiliation,Score,Ecdsapublickey,Blspublickey,Signer
      ",
        ],
        [
          "0x5409ED021D9299bf6814279A6A1411A7e866A631,Validator #1,0xE36Ea790bc9d7AB70C55260C66D52b1eca985f84,85,0x-ecdsa-public-key-1,0x-bls-public-key-1,0x78dc5D2D739606d31509C31d654056A45185ECb6
      ",
        ],
        [
          "0x6Ecbe1DB9EF729CBe972C83Fb886247691Fb6beb,Validator #2,0xE834EC434DABA538cd1b9Fe1582052B880BD7e63,100,0x-ecdsa-public-key-2,0x-bls-public-key-2,0xA8dDa8d7F5310E4A9E24F8eBA77E091Ac264f872
      ",
        ],
      ]
    `)
    expect(logMock.mock.calls.map((args) => args.map(stripAnsiCodes))).toMatchInlineSnapshot(`[]`)
    expect(warnMock.mock.calls.map((args) => args.map(stripAnsiCodes))).toMatchInlineSnapshot(`[]`)
  })
})
