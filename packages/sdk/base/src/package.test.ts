import { readFileSync } from 'fs'

const packageJson = JSON.parse(readFileSync('./package.json', 'utf-8'))

describe('Base package', () => {
  // @celo/base is built on the premise of having absolutely no dependencies, no exceptions made
  it('Should have an explicitly defined empty dependencies property', () => {
    expect(packageJson).toBeInstanceOf(Object)
    expect(packageJson).not.toHaveProperty('dependencies')
  })
})
