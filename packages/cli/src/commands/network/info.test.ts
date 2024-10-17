// import { testWithAnvilL1 } from '@celo/dev-utils/lib/anvil-test'
// import { stripAnsiCodesFromNestedArray, testLocallyWithWeb3Node } from '../../test-utils/cliUtils'
// import Info from './info'
// process.env.NO_SYNCCHECK = 'true'

// testWithAnvilL1('network:info', (web3) => {
//   it('runs for latest epoch', async () => {
//     const spy = jest.spyOn(console, 'log')
//     await testLocallyWithWeb3Node(Info, [], web3)

//     expect(stripAnsiCodesFromNestedArray(spy.mock.calls)).toMatchInlineSnapshot(`
//       [
//         [
//           "blockNumber: 349
//       epochs:
//         end: 400
//         number: 4
//         start: 301
//       epochSize: 100",
//         ],
//       ]
//     `)
//   })

//   it('runs for last 3 epochs', async () => {
//     const spy = jest.spyOn(console, 'log')

//     await testLocallyWithWeb3Node(Info, ['--lastN', '3'], web3)

//     expect(stripAnsiCodesFromNestedArray(spy.mock.calls)).toMatchInlineSnapshot(`
//       [
//         [
//           "blockNumber: 349
//       epochs:
//         0:
//           end: 400
//           number: 4
//           start: 301
//         1:
//           end: 300
//           number: 3
//           start: 201
//         2:
//           end: 200
//           number: 2
//           start: 101
//       epochSize: 100",
//         ],
//       ]
//     `)
//   })

//   it('runs for last 100 epochs, but displays only epoch that exist', async () => {
//     const spy = jest.spyOn(console, 'log')

//     await testLocallyWithWeb3Node(Info, ['--lastN', '100'], web3)

//     expect(stripAnsiCodesFromNestedArray(spy.mock.calls)).toMatchInlineSnapshot(`
//       [
//         [
//           "blockNumber: 349
//       epochs:
//         0:
//           end: 400
//           number: 4
//           start: 301
//         1:
//           end: 300
//           number: 3
//           start: 201
//         2:
//           end: 200
//           number: 2
//           start: 101
//         3:
//           end: 100
//           number: 1
//           start: 1
//       epochSize: 100",
//         ],
//       ]
//     `)
//   })
// })
