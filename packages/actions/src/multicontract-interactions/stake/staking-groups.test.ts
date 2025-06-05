import { viem_testWithAnvil } from '@celo/dev-utils/viem/anvil-test'
import { expect, it } from 'vitest'
import { PublicCeloClient } from '../../client'
import { getRegisteredStakingGroups } from './staking-groups'

viem_testWithAnvil('getRegisteredStakingGroups', (client) => {
  it('returns registered staking groups with addresses and members', async () => {
    const groups = await getRegisteredStakingGroups(client as PublicCeloClient)
    expect(Array.isArray(groups)).toBe(true)
    for (const group of groups as any[]) {
      expect(typeof group.address).toBe('string')
      expect(Array.isArray(group.members)).toBe(true)
      expect(group.commission).toBeDefined()
      expect(group.name).toBeUndefined()
    }
    expect(groups).toMatchInlineSnapshot(`
      [
        {
          "address": "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
          "commission": 100000000000000000000000n,
          "members": [
            "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
            "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc",
          ],
          "name": undefined,
        },
        {
          "address": "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
          "commission": 100000000000000000000000n,
          "members": [
            "0x976EA74026E726554dB657fA54763abd0C3a0aa9",
            "0x14dC79964da2C08b23698B3D3cc7Ca32193d9955",
          ],
          "name": undefined,
        },
        {
          "address": "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
          "commission": 100000000000000000000000n,
          "members": [
            "0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f",
            "0xa0Ee7A142d267C1f36714E4a8F75612F20a79720",
          ],
          "name": undefined,
        },
      ]
    `)
  }, 30_000)

  it('returns registered staking groups with names when withNames is true', async () => {
    const groups = await getRegisteredStakingGroups(client as PublicCeloClient, { withNames: true })
    expect(Array.isArray(groups)).toBe(true)
    for (const group of groups as any[]) {
      expect(typeof group.address).toBe('string')
      expect(Array.isArray(group.members)).toBe(true)
      expect(group.commission).toBeDefined()
      // Name can be empty string if not set, but should be defined
      expect(group.name).not.toBeUndefined()
    }
    expect(groups).toMatchInlineSnapshot(`
      [
        {
          "address": "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
          "commission": 100000000000000000000000n,
          "members": [
            "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
            "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc",
          ],
          "name": "cLabs",
        },
        {
          "address": "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
          "commission": 100000000000000000000000n,
          "members": [
            "0x976EA74026E726554dB657fA54763abd0C3a0aa9",
            "0x14dC79964da2C08b23698B3D3cc7Ca32193d9955",
          ],
          "name": "cLabs",
        },
        {
          "address": "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
          "commission": 100000000000000000000000n,
          "members": [
            "0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f",
            "0xa0Ee7A142d267C1f36714E4a8F75612F20a79720",
          ],
          "name": "cLabs",
        },
      ]
    `)
  }, 30_000)
})
