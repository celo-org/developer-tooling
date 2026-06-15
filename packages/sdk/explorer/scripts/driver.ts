import { newKit } from '@celo/contractkit'
import { newBlockExplorer } from '../src/block-explorer'

const kit = newKit('ws://localhost:8545')

export function listenFor(subscription: any, seconds: number) {
  console.log(subscription)

  return new Promise((resolve, reject) => {
    const accumulator: any[] = []

    subscription.on('data', (data: any) => {
      accumulator.push(data)
    })
    setTimeout(() => {
      subscription.unsubscribe()
      resolve(accumulator)
    }, seconds * 1000)

    subscription.on('error', (err: any) => {
      reject(err)
    })
  })
}

const printJSON = (x: any) => console.log(JSON.stringify(x, null, 2))

async function main() {
  const blockExplorer = await newBlockExplorer(kit)

  const blocks = await blockExplorer.fetchBlockRange(15, 50)

  blocks.forEach((block) => {
    console.log('Block', block.number)
    printJSON(blockExplorer.parseBlock(block))
  })

  kit.connection.stop()
}

main().catch((err) => {
  console.error(err)
})
