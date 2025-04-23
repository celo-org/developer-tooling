import { testWithAnvilL2 } from '@celo/dev-utils/lib/anvil-test'
import { ux } from '@oclif/core'
import Web3 from 'web3'
import { stripAnsiCodesAndTxHashes, testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
import Run from './run'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('election:run', (web3: Web3) => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  // Currently there are validators by default in the devchain
  it.skip('warns when there are no validators', async () => {
    const logMock = jest.spyOn(console, 'log')
    const warnMock = jest.spyOn(console, 'warn')
    const writeMock = jest.spyOn(ux.write, 'stdout')

    await testLocallyWithWeb3Node(Run, ['--csv'], web3)

    expect(writeMock.mock.calls).toMatchInlineSnapshot(`
      [
        [
          "Address,Name,Affiliation,Score,Ecdsapublickey,Blspublickey,Signer
      ",
        ],
      ]
    `)
    expect(
      logMock.mock.calls.map((args) => args.map(stripAnsiCodesAndTxHashes))
    ).toMatchInlineSnapshot(`[]`)
    expect(warnMock.mock.calls.map((args) => args.map(stripAnsiCodesAndTxHashes)))
      .toMatchInlineSnapshot(`
      [
        [
          "Warning: error running actual elections, retrying with minimum validators at 0",
        ],
      ]
    `)
  })

  it('runs election', async () => {
    const logMock = jest.spyOn(console, 'log')
    const warnMock = jest.spyOn(console, 'warn')
    const writeMock = jest.spyOn(ux.write, 'stdout')

    await testLocallyWithWeb3Node(Run, ['--csv'], web3)

    expect(writeMock.mock.calls).toMatchInlineSnapshot(`
      [
        [
          "Address,Name,Affiliation,Score,Ecdsapublickey,Signer
      ",
        ],
        [
          "0x14dC79964da2C08b23698B3D3cc7Ca32193d9955,,0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC,0,0x01f2bf1fa920e77a43c7aec2587d0b3814093420cc59a9b3ad66dd5734dda7be6f8b7de790eac3a720fd8e4bcb9eae9434f843d3cec111d9e07adeddeae090f2,0x14dC79964da2C08b23698B3D3cc7Ca32193d9955
      ",
        ],
        [
          "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65,,0x70997970C51812dc3A010C7d01b50e0d17dc79C8,0,0xbf6ee64a8d2fdc551ec8bb9ef862ef6b4bcb1805cdc520c3aa5866c0575fd3b514c5562c3caae7aec5cd6f144b57135c75b6f6cea059c3d08d1f39a9c227219d,0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65
      ",
        ],
        [
          "0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f,,0x90F79bf6EB2c4f870365E785982E1f101E93b906,0,0x931e7fda8da226f799f791eefc9afebcd7ae2b1b19a03c5eaa8d72122d9fe74d887a3962ff861190b531ab31ee82f0d7f255dfe3ab73ca627bd70ab3d1cbb417,0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f
      ",
        ],
        [
          "0x976EA74026E726554dB657fA54763abd0C3a0aa9,,0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC,0,0x9a4ab212cb92775d227af4237c20b81f4221e9361d29007dfc16c79186b577cb6ba3f1b582ad0b5572c93f47e7506d66df7f2af05fa1828de0e511aac7b97828,0x976EA74026E726554dB657fA54763abd0C3a0aa9
      ",
        ],
        [
          "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc,,0x70997970C51812dc3A010C7d01b50e0d17dc79C8,0,0x37b84de6947b243626cc8b977bb1f1632610614842468dfa8f35dcbbc55a515e47f6fe259cffc671a719eaef444a0d689b16a90051985a13661840cf5e221503,0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc
      ",
        ],
        [
          "0xa0Ee7A142d267C1f36714E4a8F75612F20a79720,,0x90F79bf6EB2c4f870365E785982E1f101E93b906,0,0x3255458e24278e31d5940f304b16300fdff3f6efd3e2a030b5818310ac67af45e28d057e6a332d07e0c5ab09d6947fd4eed1a646edbf224e2d2fec6f49f90abc,0xa0Ee7A142d267C1f36714E4a8F75612F20a79720
      ",
        ],
      ]
    `)
    expect(
      logMock.mock.calls.map((args) => args.map(stripAnsiCodesAndTxHashes))
    ).toMatchInlineSnapshot(`[]`)
    expect(
      warnMock.mock.calls.map((args) => args.map(stripAnsiCodesAndTxHashes))
    ).toMatchInlineSnapshot(`[]`)
  })
})
