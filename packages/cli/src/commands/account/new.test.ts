import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import fs from 'node:fs'
import path from 'node:path'
import Web3 from 'web3'
import {
  stripAnsiCodesAndTxHashes,
  stripAnsiCodesFromNestedArray,
  testLocallyWithWeb3Node,
} from '../../test-utils/cliUtils'
import NewAccount from './new'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('account:new cmd', (web3: Web3) => {
  const writeMock = jest.spyOn(NewAccount.prototype, 'log').mockImplementation(() => {
    // noop
  })
  const consoleMock = jest.spyOn(console, 'log').mockImplementation(() => {
    // noop
  })

  beforeEach(() => {
    writeMock.mockClear()
    consoleMock.mockClear()
  })
  it('generates mnemonic and lets people know which derivation path is being used when called with no flags', async () => {
    await testLocallyWithWeb3Node(NewAccount, [], web3)

    expect(stripAnsiCodesFromNestedArray(writeMock.mock.calls)).toMatchInlineSnapshot(`
      [
        [
          "
      This is not being stored anywhere. Save the mnemonic somewhere to use this account at a later point.
      ",
        ],
      ]
    `)

    expect(deRandomize(consoleMock.mock.lastCall?.[0])).toMatchInlineSnapshot(`
      "mnemonic: *** *** 
      derivationPath: m/44'/60'/0'/0/0
      privateKey: PUBLIC_KEY
      publicKey: PRIVATE_KEY
      address: ADDRESS"
    `)
  })

  it("when called with --derivationPath eth it generates mnemonic using m/44'/60'/0'", async () => {
    await testLocallyWithWeb3Node(NewAccount, ['--derivationPath', 'eth'], web3)

    expect(deRandomize(consoleMock.mock.lastCall?.[0])).toMatchInlineSnapshot(`
      "mnemonic: *** *** 
      derivationPath: m/44'/60'/0'/0/0
      privateKey: PUBLIC_KEY
      publicKey: PRIVATE_KEY
      address: ADDRESS"
    `)
  })

  it(`when called with --derivationPath celoLegacy it generates with "m/44'/52752'/0'"`, async () => {
    await testLocallyWithWeb3Node(NewAccount, ['--derivationPath', 'celoLegacy'], web3)

    expect(deRandomize(consoleMock.mock.lastCall?.[0])).toMatchInlineSnapshot(`
      "mnemonic: *** *** 
      derivationPath: m/44'/52752'/0'/0/0
      privateKey: PUBLIC_KEY
      publicKey: PRIVATE_KEY
      address: ADDRESS"
    `)
  })

  describe('bad data --derivationPath', () => {
    it(`with invalid alias "notARealPath"  throws"`, async () => {
      await expect(
        testLocallyWithWeb3Node(NewAccount, ['--derivationPath', 'notARealPath'], web3)
      ).rejects.toThrowErrorMatchingInlineSnapshot(`
        "Parsing --derivationPath 
        	Invalid derivationPath: notARealPath. should be in format  "m / 44' / coin_type' / account'"
        See more help with --help"
      `)
    })
    it(`with invalid bip44 throws"`, async () => {
      await expect(
        testLocallyWithWeb3Node(NewAccount, ['--derivationPath', 'm/44/1/1/2/10'], web3)
      ).rejects.toThrowErrorMatchingInlineSnapshot(`
        "Parsing --derivationPath 
        	Invalid derivationPath: m/44/1/1/2/10. should be in format  "m / 44' / coin_type' / account'"
        See more help with --help"
      `)
    })
    it('with bip44 with changeIndex 4 throws', async () => {
      await expect(
        testLocallyWithWeb3Node(NewAccount, ['--derivationPath', "m/44'/52752'/0/0'"], web3)
      ).rejects.toThrowErrorMatchingInlineSnapshot(`
        "Parsing --derivationPath 
        	Invalid derivationPath: m/44'/52752'/0/0'. should be in format  "m / 44' / coin_type' / account'"
        See more help with --help"
      `)
    })
    it('with bip44 including changeIndex 4 and addressIndex 5 throws', async () => {
      await expect(
        testLocallyWithWeb3Node(NewAccount, ['--derivationPath', "m/44'/52752'/0/0/0'"], web3)
      ).rejects.toThrowErrorMatchingInlineSnapshot(`
        "Parsing --derivationPath 
        	Invalid derivationPath: m/44'/52752'/0/0/0'. should be in format  "m / 44' / coin_type' / account'"
        See more help with --help"
      `)
    })
    it(`with path ending in "/" removes the slash`, async () => {
      await testLocallyWithWeb3Node(NewAccount, ['--derivationPath', "m/44'/60'/0'/"], web3)

      expect(deRandomize(consoleMock.mock.lastCall?.[0])).toMatchInlineSnapshot(`
        "mnemonic: *** *** 
        derivationPath: m/44'/60'/0'/0/0
        privateKey: PUBLIC_KEY
        publicKey: PRIVATE_KEY
        address: ADDRESS"
      `)
    })
  })

  describe('when called with --mnemonicPath', () => {
    const MNEMONIC_PATH = path.join(__dirname, 'public_mnemonic')
    const TEST_mnemonic =
      'hamster label near volume denial spawn stable orbit trade only crawl learn forest fire test feel bubble found angle also olympic obscure fork venue'
    beforeEach(() => {
      fs.writeFileSync(MNEMONIC_PATH, TEST_mnemonic, {
        flag: 'w',
      })
    })
    afterEach(async () => {
      fs.rmSync(MNEMONIC_PATH)
    })

    it('generates using eth derivation path', async () => {
      await testLocallyWithWeb3Node(NewAccount, [`--mnemonicPath`, MNEMONIC_PATH], web3)

      expect(stripAnsiCodesAndTxHashes(consoleMock.mock.lastCall?.[0])).toMatchInlineSnapshot(`
        "mnemonic: hamster label near volume denial spawn stable orbit trade only crawl learn forest fire test feel bubble found angle also olympic obscure fork venue
        derivationPath: m/44'/60'/0'/0/0
        privateKey: e4816cbb93346760921264ea38a7fc54903f4dd688ae0923fefd89a43c5f58cc
        publicKey: 034b3036d657a6dc2f322db52cca29ae72101a9cf56de4765d17b0507ea1e87b7c
        address: 0x35A4d54B541fc7b2047fb5357cC706191E105cd3"
      `)
    })

    it('and "--derivationPath celoLegacy" generates using celo-legacy derivation path', async () => {
      await testLocallyWithWeb3Node(
        NewAccount,
        ['--derivationPath', 'celoLegacy', `--mnemonicPath`, MNEMONIC_PATH],
        web3
      )

      expect(stripAnsiCodesAndTxHashes(consoleMock.mock.lastCall?.[0])).toMatchInlineSnapshot(`
        "mnemonic: hamster label near volume denial spawn stable orbit trade only crawl learn forest fire test feel bubble found angle also olympic obscure fork venue
        derivationPath: m/44'/52752'/0'/0/0
        privateKey: 6346d0cd7cfdb7904f08df48e442169d3333643de0351682f8b79cf714395471
        publicKey: 02269b3efc9c4c6b81037d06e73e936078e625fb0f12b9ea1e0fd14d2cd45775f2
        address: 0x0a85BeCD036C86faD4Db5519634904be2021fb7d"
      `)
    })

    it("and --derivationPath m/44'/60'/0' generates using eth derivation path", async () => {
      await testLocallyWithWeb3Node(
        NewAccount,
        [`--mnemonicPath`, MNEMONIC_PATH, '--derivationPath', "m/44'/60'/0'"],
        web3
      )

      expect(stripAnsiCodesAndTxHashes(consoleMock.mock.lastCall?.[0])).toMatchInlineSnapshot(`
        "mnemonic: hamster label near volume denial spawn stable orbit trade only crawl learn forest fire test feel bubble found angle also olympic obscure fork venue
        derivationPath: m/44'/60'/0'/0/0
        privateKey: e4816cbb93346760921264ea38a7fc54903f4dd688ae0923fefd89a43c5f58cc
        publicKey: 034b3036d657a6dc2f322db52cca29ae72101a9cf56de4765d17b0507ea1e87b7c
        address: 0x35A4d54B541fc7b2047fb5357cC706191E105cd3"
      `)
    })
    it("and --derivationPath m/44'/60'/0' and --changeIndex generates using eth derivation path", async () => {
      await testLocallyWithWeb3Node(
        NewAccount,
        [`--mnemonicPath`, MNEMONIC_PATH, '--derivationPath', 'eth', '--changeIndex', '2'],
        web3
      )

      expect(stripAnsiCodesAndTxHashes(consoleMock.mock.lastCall?.[0])).toMatchInlineSnapshot(`
        "mnemonic: hamster label near volume denial spawn stable orbit trade only crawl learn forest fire test feel bubble found angle also olympic obscure fork venue
        derivationPath: m/44'/60'/0'/2/0
        privateKey: 3abc861ef3e9e31a6a7dc23e5903e41b3fe4a381d4fbb8f9db14e6730abd1c43
        publicKey: 0280df4d09cf8ebcad418327287be3f4ba0054112544ffa290ab3cc0a87949b32a
        address: 0xb3492799c55141e0B3507302F241f1c34c08E1e2"
      `)
    })
    it('and --derivationPath eth and --addressIndex generates using eth derivation path', async () => {
      await testLocallyWithWeb3Node(
        NewAccount,
        [`--mnemonicPath`, MNEMONIC_PATH, '--derivationPath', 'eth', '--addressIndex', '3'],
        web3
      )

      expect(stripAnsiCodesAndTxHashes(consoleMock.mock.lastCall?.[0])).toMatchInlineSnapshot(`
        "mnemonic: hamster label near volume denial spawn stable orbit trade only crawl learn forest fire test feel bubble found angle also olympic obscure fork venue
        derivationPath: m/44'/60'/0'/0/3
        privateKey: aa324b2efd0ebe6387c3bcf03387c78047d82a1d2e8b4e132e9e1b9fb93529d0
        publicKey: 0394cc7cc524079c545aef2067c9ea7e69decb4815004afecf215ea1e6f370ce6c
        address: 0x336E523118B6091e033F9715257e2E793002964c"
      `)
    })
  })
})

function deRandomize(rawOutput: string) {
  return stripAnsiCodesAndTxHashes(rawOutput)
    .replace(/0x[A-Fa-f0-9]{40}/g, 'ADDRESS')
    .replace(/ [A-Fa-f0-9]{66}/g, ' PRIVATE_KEY')
    .replace(/ [A-Fa-f0-9]{64}/g, ' PUBLIC_KEY')
    .replace(/mnemonic: ([a-z]+\s)+/, 'mnemonic: *** *** \n')
}
