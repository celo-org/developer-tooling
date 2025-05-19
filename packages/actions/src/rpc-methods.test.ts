import { viem_testWithAnvil } from '@celo/dev-utils/viem/anvil-test'
import { expect } from 'vitest'
import { getGasPriceOnCelo } from './rpc-methods'

viem_testWithAnvil('rpc-methods', (client) => {
  describe('getGasPriceOnCelo', () => {
    it('works', async () => {
      const gasPrice = await getGasPriceOnCelo(client)
      expect(gasPrice).toBeTypeOf('bigint')
      expect(gasPrice).toBeGreaterThan(0n)
    })
  })
})
