import { newKitFromProvider } from '@celo/contractkit'
import { testWithAnvilL2 } from '@celo/dev-utils/anvil-test'
import { ux } from '@oclif/core'
import { stripAnsiCodesFromNestedArray, testLocallyWithNode } from '../../test-utils/cliUtils'
import AccountRegister from '../account/register'
import Lock from '../lockedcelo/lock'
import List from './list'
import ValidatorGroupRegister from './register'
process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('validatorgroup:list cmd', (client) => {
  const writeMock = jest.spyOn(ux.write, 'stdout')

  afterAll(() => {
    jest.clearAllMocks()
  })

  const registerValidatorGroup = async () => {
    const kit = newKitFromProvider(client.currentProvider)
    const accounts = await kit.connection.getAccounts()

    await testLocallyWithNode(AccountRegister, ['--from', accounts[0]], client)
    await testLocallyWithNode(
      Lock,
      ['--from', accounts[0], '--value', '10000000000000000000000'],
      client
    )
    await testLocallyWithNode(
      ValidatorGroupRegister,
      ['--from', accounts[0], '--commission', '0.1', '--yes'],
      client
    )
  }

  it('outputs the current validator groups', async () => {
    await registerValidatorGroup()
    await testLocallyWithNode(List, [], client)
    expect(stripAnsiCodesFromNestedArray(writeMock.mock.calls)).toMatchInlineSnapshot(`
      [
        [
          " Address                                    Name  Commission Members Score 
      ",
        ],
        [
          " ────────────────────────────────────────── ───── ────────── ─────── ───── 
      ",
        ],
        [
          " 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 cLabs 0.1        2       1.0   
      ",
        ],
        [
          " 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC cLabs 0.1        2       1.0   
      ",
        ],
        [
          " 0x90F79bf6EB2c4f870365E785982E1f101E93b906 cLabs 0.1        2       1.0   
      ",
        ],
        [
          " 0x5409ED021D9299bf6814279A6A1411A7e866A631       0.1        0       1.0   
      ",
        ],
      ]
    `)
  })
})
