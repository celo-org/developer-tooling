import BridgeDeposit from './deposit'

// Inline testLocally to avoid importing cliUtils which pulls in @celo/dev-utils
async function testLocally(command: any, argv: string[]) {
  if (argv.includes('--node')) {
    return command.run(argv)
  }
  const extendedArgv = command.flags?.node ? [...argv, '--node', 'local'] : argv
  return command.run(extendedArgv)
}

process.env.NO_SYNCCHECK = 'true'

jest.setTimeout(15000)

describe('bridge:deposit', () => {
  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {})
    jest.spyOn(console, 'error').mockImplementation(() => {})
    jest.spyOn(console, 'info').mockImplementation(() => {})
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('requires --from flag', async () => {
    await expect(
      testLocally(BridgeDeposit, [
        '--value', '1000000000000000000',
        '--network', 'sepolia',
        '--l1RpcUrl', 'https://eth-sepolia.example.com',
        '-k', '0x' + '1'.repeat(64),
      ])
    ).rejects.toThrow()
  })

  it('requires --value flag', async () => {
    await expect(
      testLocally(BridgeDeposit, [
        '--from', '0x5409ED021D9299bf6814279A6A1411A7e866A631',
        '--network', 'sepolia',
        '--l1RpcUrl', 'https://eth-sepolia.example.com',
        '-k', '0x' + '1'.repeat(64),
      ])
    ).rejects.toThrow()
  })

  it('requires --network flag', async () => {
    await expect(
      testLocally(BridgeDeposit, [
        '--from', '0x5409ED021D9299bf6814279A6A1411A7e866A631',
        '--value', '1000000000000000000',
        '--l1RpcUrl', 'https://eth-sepolia.example.com',
        '-k', '0x' + '1'.repeat(64),
      ])
    ).rejects.toThrow()
  })

  it('requires --l1RpcUrl flag', async () => {
    await expect(
      testLocally(BridgeDeposit, [
        '--from', '0x5409ED021D9299bf6814279A6A1411A7e866A631',
        '--value', '1000000000000000000',
        '--network', 'sepolia',
        '-k', '0x' + '1'.repeat(64),
      ])
    ).rejects.toThrow()
  })

  it('rejects invalid network value', async () => {
    await expect(
      testLocally(BridgeDeposit, [
        '--from', '0x5409ED021D9299bf6814279A6A1411A7e866A631',
        '--value', '1000000000000000000',
        '--network', 'goerli',
        '--l1RpcUrl', 'https://eth-sepolia.example.com',
        '-k', '0x' + '1'.repeat(64),
      ])
    ).rejects.toThrow()
  })

  it('rejects invalid address format', async () => {
    await expect(
      testLocally(BridgeDeposit, [
        '--from', 'not-an-address',
        '--value', '1000000000000000000',
        '--network', 'sepolia',
        '--l1RpcUrl', 'https://eth-sepolia.example.com',
        '-k', '0x' + '1'.repeat(64),
      ])
    ).rejects.toThrow('is not a valid address')
  })

  it('requires signing method (privateKey or useLedger)', async () => {
    await expect(
      testLocally(BridgeDeposit, [
        '--from', '0x5409ED021D9299bf6814279A6A1411A7e866A631',
        '--value', '1000000000000000000',
        '--network', 'sepolia',
        '--l1RpcUrl', 'https://eth-sepolia.example.com',
      ])
    ).rejects.toThrow()
  })
})
