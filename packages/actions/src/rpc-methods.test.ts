import { viem_testWithAnvil } from '@celo/dev-utils/lib/viem/anvil-test'
import { describe, expect } from 'vitest'
import { getGasPriceOnCelo } from './rpc-methods'

viem_testWithAnvil('rpc-methods', (client) => {
  describe('getGasPriceOnCelo', async () => {
    await expect(getGasPriceOnCelo(client)).resolves.toMatchInlineSnapshot()
  })
})
