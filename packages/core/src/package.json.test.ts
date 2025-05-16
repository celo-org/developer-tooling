import { readFileSync } from 'fs'
import { describe, expect, it } from 'vitest'

const packageJson = JSON.parse(readFileSync('./package.json', 'utf-8'))

describe('Core package', () => {
  // @celo/core is built on the premise of having only one  dependency, no exceptions made
  it('Should have an explicitly defined empty dependencies property', () => {
    expect(packageJson).toBeInstanceOf(Object)
    expect(packageJson.dependencies).toHaveProperty('@celo/base')
    expect(Object.keys(packageJson.dependencies)).toHaveLength(1)
  })
})
