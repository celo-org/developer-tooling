import {
  concurrentMap,
  retryAsync,
  retryAsyncWithBackOffAndTimeout,
  selectiveRetryAsyncWithBackOff,
  sleep,
  timeout,
} from './async'

describe('retryAsync()', () => {
  test('tries once if it works', async () => {
    const mockFunction = jest.fn()
    await retryAsync(mockFunction, 3, [], 1)
    expect(mockFunction).toHaveBeenCalledTimes(1)
  })

  test('retries n times', async () => {
    const mockFunction = jest.fn(() => {
      throw new Error('error')
    })

    try {
      await retryAsync(mockFunction, 3, [], 1)
      expect(false).toBeTruthy()
    } catch (error) {
      // should never happen
    }

    expect(mockFunction).toHaveBeenCalledTimes(3)
  })
})

describe('selectiveRetryAsyncWithBackOff()', () => {
  test('tries only once if error is in dontRetry array', async () => {
    const mockFunction = jest.fn()
    mockFunction.mockImplementation(() => {
      throw new Error('test error 400')
    })
    let didThrowError = false
    try {
      await selectiveRetryAsyncWithBackOff(mockFunction, 3, ['test error'], [])
    } catch {
      didThrowError = true
    }
    expect(mockFunction).toHaveBeenCalledTimes(1)
    expect(didThrowError).toBeTruthy()
  })
})

describe('retryAsyncWithBackOffAndTimeout()', () => {
  test('tries once if it works', async () => {
    const mockFunction = jest.fn(async () => {
      await sleep(10)
      return true
    })
    const result: boolean = await retryAsyncWithBackOffAndTimeout<void[], boolean>(
      mockFunction,
      3,
      [],
      1
    )
    expect(result).toBeTruthy()
    expect(mockFunction).toHaveBeenCalledTimes(1)
  })

  test('retries n times on failure', async () => {
    const mockFunction = jest.fn(() => {
      throw new Error('forced error')
    })

    try {
      await retryAsyncWithBackOffAndTimeout(mockFunction, 3, [], 1, 1, 100)
      expect(false).toBeTruthy()
    } catch (error: any) {
      expect(error.message).toContain('forced error')
    }
    expect(mockFunction).toHaveBeenCalledTimes(3)
  })

  test('fails on timeout', async () => {
    const mockFunction = jest.fn(async () => {
      await sleep(1000)
    })

    try {
      await retryAsyncWithBackOffAndTimeout(mockFunction, 3, [], 1, 1, 100)
      expect(false).toBeTruthy()
    } catch (error: any) {
      expect(error.message).toContain('Timed out')
    }

    expect(mockFunction).toHaveBeenCalledTimes(1)
  })
})

const counter = () => {
  let value = 0

  return {
    val: () => value,
    inc: async (x: number) => {
      await sleep(5)
      value++
      return x * x
    },
  }
}

describe('concurrentMap()', () => {
  it('should be equivalent to Promise.all(xs.map())', async () => {
    const fn = async (x: number) => x * x

    const xs = [1, 3, 4, 5, 6, 23, 90]
    const expected = await Promise.all(xs.map(fn))
    const result = await concurrentMap(3, xs, fn)
    expect(result).toEqual(expected)
  })

  // TODO this test is flaky, disabling for now
  it.skip('should respect the concurrency level', async () => {
    const c1 = counter()
    const c2 = counter()

    const xs = [1, 3, 4, 5, 6, 23, 90]

    // launch both task, but don't wait for them
    const p1 = Promise.all(xs.map(c1.inc))
    const p2 = concurrentMap(2, xs, c2.inc)

    // sleep enough for Promise.all to finish
    await sleep(7)
    expect(c1.val()).toEqual(xs.length)
    expect(c1.val()).not.toEqual(c2.val())

    await sleep(20)
    expect(c1.val()).toEqual(c2.val())

    await p1
    await p2
  })

  it('should allow concurrency level > than length', async () => {
    const c = counter()
    const xs = [1, 3, 4]
    const p = concurrentMap(5, xs, c.inc)
    await sleep(7)
    expect(c.val()).toEqual(xs.length)
    await p
  })
})

describe('timeout()', () => {
  test('fails on timeout', async () => {
    const mockFunction = jest.fn(async () => {
      await sleep(1000)
    })

    const timeoutError = Symbol()
    try {
      await timeout(mockFunction, [], 900, timeoutError)
      expect(false).toBeTruthy()
    } catch (error) {
      expect(error).toBe(timeoutError)
    }

    expect(mockFunction).toHaveBeenCalledTimes(1)
  })
})
