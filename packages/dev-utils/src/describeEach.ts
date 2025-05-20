import { type describe } from 'vitest'

export interface TestCase {
  label: string
}

export function describeEach<T extends TestCase>(testCases: T[], fn: (testCase: T) => void) {
  for (const testCase of testCases) {
    // @ts-expect-error
    global.describe(testCase.label, () => fn(testCase))
  }
}
