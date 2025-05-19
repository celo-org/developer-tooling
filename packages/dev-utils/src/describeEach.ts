import * as vitest from 'vitest'
export interface TestCase {
  label: string
}

let describeFn = global.describe
if (typeof describeFn === 'undefined') {
  describeFn = vitest.describe
}

export function describeEach<T extends TestCase>(testCases: T[], fn: (testCase: T) => void) {
  for (const testCase of testCases) {
    describeFn(testCase.label, () => fn(testCase))
  }
}
