import { ElectionWrapper, ValidatorGroupVote } from '@celo/contractkit/lib/wrappers/Election'
import { ux } from '@oclif/core'
import BigNumber from 'bignumber.js'
import { testLocally } from '../../test-utils/cliUtils'
import List from './list'

process.env.NO_SYNCCHECK = 'true'

describe('election:list cmd', () => {
  test('shows list when no arguments provided', async () => {
    const getValidatorGroupsVotesMock = jest.spyOn(
      ElectionWrapper.prototype,
      'getValidatorGroupsVotes'
    )
    getValidatorGroupsVotesMock.mockImplementation(async () => {
      return [
        {
          address: '0x1000000000000000000000000000000000000001',
          capacity: new BigNumber(3879657093998775988268146),
          eligible: true,
          name: 'Eligible group',
          votes: new BigNumber(3481303474410894544646170),
        },
        {
          address: '0x2000000000000000000000000000000000000002',
          capacity: new BigNumber(2779657093998775988268146),
          eligible: false,
          name: 'Non-eligible group',
          votes: new BigNumber(3381303474410894544646170),
        },
      ] as ValidatorGroupVote[]
    })

    const writeMock = jest.spyOn(ux.write, 'stdout')

    await testLocally(List, ['--csv'])

    expect(getValidatorGroupsVotesMock).toHaveBeenCalled()
    expect(writeMock.mock.calls).toMatchInlineSnapshot(`
      [
        [
          "Address,Name,Votes,Capacity,Eligible
      ",
        ],
        [
          "0x1000000000000000000000000000000000000001,Eligible group,3481303474410894600000000,3879657093998776000000000,true
      ",
        ],
        [
          "0x2000000000000000000000000000000000000002,Non-eligible group,3381303474410894500000000,2779657093998776000000000,false
      ",
        ],
      ]
    `)
  })
})
