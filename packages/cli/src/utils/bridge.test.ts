import { validateNetwork, BRIDGE_CONFIG, WITHDRAWAL_STATUS_LABELS, getL2OpChain } from './bridge'

describe('bridge utils', () => {
  describe('validateNetwork', () => {
    it('accepts mainnet', () => {
      expect(validateNetwork('mainnet')).toBe('mainnet')
    })

    it('accepts sepolia', () => {
      expect(validateNetwork('sepolia')).toBe('sepolia')
    })

    it('rejects invalid network', () => {
      expect(() => validateNetwork('goerli')).toThrow('Invalid network: goerli')
    })

    it('rejects empty string', () => {
      expect(() => validateNetwork('')).toThrow('Invalid network')
    })
  })

  describe('BRIDGE_CONFIG', () => {
    it('has mainnet config with correct addresses', () => {
      const config = BRIDGE_CONFIG.mainnet
      expect(config.systemConfig).toBe('0x89E31965D844a309231B1f17759Ccaf1b7c09861')
      expect(config.optimismPortal).toBe('0xc5c5D157928BDBD2ACf6d0777626b6C75a9EAEDC')
      expect(config.l2L1MessagePasser).toBe('0x4200000000000000000000000000000000000016')
    })

    it('has sepolia config with correct addresses', () => {
      const config = BRIDGE_CONFIG.sepolia
      expect(config.systemConfig).toBe('0x760a5f022c9940f4a074e0030be682f560d29818')
      expect(config.optimismPortal).toBe('0x44ae3d41a335a7d05eb533029917aad35662dcc2')
      expect(config.l2L1MessagePasser).toBe('0x4200000000000000000000000000000000000016')
    })
  })

  describe('getL2OpChain', () => {
    it('returns Celo mainnet chain for mainnet', () => {
      const chain = getL2OpChain('mainnet')
      expect(chain.id).toBe(42220)
      expect(chain.name).toBe('Celo')
    })

    it('returns Celo Sepolia chain for sepolia', () => {
      const chain = getL2OpChain('sepolia')
      expect(chain.id).toBe(11142220)
      expect(chain.name).toBe('Celo Sepolia Testnet')
    })
  })

  describe('WITHDRAWAL_STATUS_LABELS', () => {
    it('has labels for all statuses', () => {
      expect(WITHDRAWAL_STATUS_LABELS['waiting-to-prove']).toBeDefined()
      expect(WITHDRAWAL_STATUS_LABELS['ready-to-prove']).toBeDefined()
      expect(WITHDRAWAL_STATUS_LABELS['waiting-to-finalize']).toBeDefined()
      expect(WITHDRAWAL_STATUS_LABELS['ready-to-finalize']).toBeDefined()
      expect(WITHDRAWAL_STATUS_LABELS['finalized']).toBeDefined()
    })

    it('each status has label and description', () => {
      Object.values(WITHDRAWAL_STATUS_LABELS).forEach((status) => {
        expect(status.label).toBeTruthy()
        expect(status.description).toBeTruthy()
      })
    })
  })
})
