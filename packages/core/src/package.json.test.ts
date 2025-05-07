import { readFileSync } from 'fs'
import { describe, expect, it } from 'vitest'

const packageJson = JSON.parse(readFileSync('./package.json', 'utf-8'))

describe('Core package', () => {
  // @celo/core is built on the premise of having absolutely no dependencies, no exceptions made
  it('Should have an explicitly defined empty dependencies property', () => {
    expect(packageJson).toBeInstanceOf(Object)
    expect(packageJson).not.toHaveProperty('dependencies')
  })
})
