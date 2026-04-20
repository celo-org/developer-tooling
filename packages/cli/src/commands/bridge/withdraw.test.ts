import BridgeWithdrawInit from './withdraw-init'
import BridgeWithdrawProve from './withdraw-prove'
import BridgeWithdrawStatus from './withdraw-status'
import BridgeWithdrawFinalize from './withdraw-finalize'

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

describe('bridge:withdraw-init', () => {
  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {
      // noop
    })
    jest.spyOn(console, 'error').mockImplementation(() => {
      // noop
    })
    jest.spyOn(console, 'info').mockImplementation(() => {
      // noop
    })
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('requires --from flag', async () => {
    await expect(
      testLocally(BridgeWithdrawInit, [
        '--value', '1000000000000000000',
        '--network', 'sepolia',
        '--node', 'celo-sepolia',
      ])
    ).rejects.toThrow()
  })

  it('requires --value flag', async () => {
    await expect(
      testLocally(BridgeWithdrawInit, [
        '--from', '0x5409ED021D9299bf6814279A6A1411A7e866A631',
        '--network', 'sepolia',
        '--node', 'celo-sepolia',
      ])
    ).rejects.toThrow()
  })

  it('requires --network flag', async () => {
    await expect(
      testLocally(BridgeWithdrawInit, [
        '--from', '0x5409ED021D9299bf6814279A6A1411A7e866A631',
        '--value', '1000000000000000000',
        '--node', 'celo-sepolia',
      ])
    ).rejects.toThrow()
  })

  it('rejects invalid network', async () => {
    await expect(
      testLocally(BridgeWithdrawInit, [
        '--from', '0x5409ED021D9299bf6814279A6A1411A7e866A631',
        '--value', '1000000000000000000',
        '--network', 'goerli',
        '--node', 'celo-sepolia',
        '-k', '0x' + '1'.repeat(64),
      ])
    ).rejects.toThrow()
  })

  it('rejects invalid from address', async () => {
    await expect(
      testLocally(BridgeWithdrawInit, [
        '--from', 'not-an-address',
        '--value', '1000000000000000000',
        '--network', 'sepolia',
        '--node', 'celo-sepolia',
      ])
    ).rejects.toThrow('is not a valid address')
  })
})

describe('bridge:withdraw-prove', () => {
  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {
      // noop
    })
    jest.spyOn(console, 'error').mockImplementation(() => {
      // noop
    })
    jest.spyOn(console, 'info').mockImplementation(() => {
      // noop
    })
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('requires --txHash flag', async () => {
    await expect(
      testLocally(BridgeWithdrawProve, [
        '--from', '0x5409ED021D9299bf6814279A6A1411A7e866A631',
        '--network', 'sepolia',
        '--l1RpcUrl', 'https://eth-sepolia.example.com',
        '--node', 'celo-sepolia',
        '-k', '0x' + '1'.repeat(64),
      ])
    ).rejects.toThrow()
  })

  it('requires --from flag', async () => {
    await expect(
      testLocally(BridgeWithdrawProve, [
        '--txHash', '0x' + 'a'.repeat(64),
        '--network', 'sepolia',
        '--l1RpcUrl', 'https://eth-sepolia.example.com',
        '--node', 'celo-sepolia',
        '-k', '0x' + '1'.repeat(64),
      ])
    ).rejects.toThrow()
  })

  it('requires --l1RpcUrl flag', async () => {
    await expect(
      testLocally(BridgeWithdrawProve, [
        '--txHash', '0x' + 'a'.repeat(64),
        '--from', '0x5409ED021D9299bf6814279A6A1411A7e866A631',
        '--network', 'sepolia',
        '--node', 'celo-sepolia',
        '-k', '0x' + '1'.repeat(64),
      ])
    ).rejects.toThrow()
  })

  it('rejects invalid txHash format', async () => {
    await expect(
      testLocally(BridgeWithdrawProve, [
        '--txHash', 'not-a-hash',
        '--from', '0x5409ED021D9299bf6814279A6A1411A7e866A631',
        '--network', 'sepolia',
        '--l1RpcUrl', 'https://eth-sepolia.example.com',
        '--node', 'celo-sepolia',
        '-k', '0x' + '1'.repeat(64),
      ])
    ).rejects.toThrow()
  })
})

describe('bridge:withdraw-status', () => {
  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {
      // noop
    })
    jest.spyOn(console, 'error').mockImplementation(() => {
      // noop
    })
    jest.spyOn(console, 'info').mockImplementation(() => {
      // noop
    })
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('requires --txHash flag', async () => {
    await expect(
      testLocally(BridgeWithdrawStatus, [
        '--network', 'sepolia',
        '--l1RpcUrl', 'https://eth-sepolia.example.com',
        '--node', 'celo-sepolia',
      ])
    ).rejects.toThrow()
  })

  it('requires --l1RpcUrl flag', async () => {
    await expect(
      testLocally(BridgeWithdrawStatus, [
        '--txHash', '0x' + 'a'.repeat(64),
        '--network', 'sepolia',
        '--node', 'celo-sepolia',
      ])
    ).rejects.toThrow()
  })

  it('rejects invalid network', async () => {
    await expect(
      testLocally(BridgeWithdrawStatus, [
        '--txHash', '0x' + 'a'.repeat(64),
        '--network', 'goerli',
        '--l1RpcUrl', 'https://eth-sepolia.example.com',
        '--node', 'celo-sepolia',
      ])
    ).rejects.toThrow()
  })
})

describe('bridge:withdraw-finalize', () => {
  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {
      // noop
    })
    jest.spyOn(console, 'error').mockImplementation(() => {
      // noop
    })
    jest.spyOn(console, 'info').mockImplementation(() => {
      // noop
    })
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('requires --txHash flag', async () => {
    await expect(
      testLocally(BridgeWithdrawFinalize, [
        '--from', '0x5409ED021D9299bf6814279A6A1411A7e866A631',
        '--network', 'sepolia',
        '--l1RpcUrl', 'https://eth-sepolia.example.com',
        '--node', 'celo-sepolia',
        '-k', '0x' + '1'.repeat(64),
      ])
    ).rejects.toThrow()
  })

  it('requires --from flag', async () => {
    await expect(
      testLocally(BridgeWithdrawFinalize, [
        '--txHash', '0x' + 'a'.repeat(64),
        '--network', 'sepolia',
        '--l1RpcUrl', 'https://eth-sepolia.example.com',
        '--node', 'celo-sepolia',
        '-k', '0x' + '1'.repeat(64),
      ])
    ).rejects.toThrow()
  })

  it('rejects invalid network', async () => {
    await expect(
      testLocally(BridgeWithdrawFinalize, [
        '--txHash', '0x' + 'a'.repeat(64),
        '--from', '0x5409ED021D9299bf6814279A6A1411A7e866A631',
        '--network', 'goerli',
        '--l1RpcUrl', 'https://eth-sepolia.example.com',
        '--node', 'celo-sepolia',
        '-k', '0x' + '1'.repeat(64),
      ])
    ).rejects.toThrow()
  })
})
