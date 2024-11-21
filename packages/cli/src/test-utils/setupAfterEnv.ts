import { ux } from '@oclif/core'

afterEach(() => {
  jest.clearAllTimers()
  jest.clearAllMocks()
})
beforeEach(() => {
  jest.spyOn(console, 'info').mockImplementation(() => undefined)
  jest.spyOn(console, 'log').mockImplementation(() => undefined)
  jest.spyOn(console, 'error').mockImplementation(() => undefined)
  jest.spyOn(console, 'warn').mockImplementation(() => undefined)
  jest.spyOn(ux.write, 'stdout').mockImplementation(() => undefined)
})
