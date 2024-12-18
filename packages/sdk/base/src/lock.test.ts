import { EventEmitter } from 'stream'
import { sleep } from './async'
import { Lock } from './lock'

async function pause() {
  await sleep(Math.floor(Math.random() * 10))
}

const CONCURRENT_CALLS = 100

test('lock', async () => {
  let canary: number | undefined
  const lock = new Lock()

  // Increase the default limit of listeners to avoid warnings.
  EventEmitter.defaultMaxListeners = CONCURRENT_CALLS

  const race = jest.fn(async (id: number) => {
    await pause()
    await lock.acquire()
    canary = id
    await pause()
    expect(canary).toBe(id)
    lock.release()
  })

  const promises: Promise<void>[] = []

  for (let i = 0; i < CONCURRENT_CALLS; i++) {
    promises.push(race(i))
  }
  await Promise.all(promises)
  expect(race).toHaveBeenCalledTimes(CONCURRENT_CALLS)
  expect(lock.tryAcquire()).toBe(true)
})
