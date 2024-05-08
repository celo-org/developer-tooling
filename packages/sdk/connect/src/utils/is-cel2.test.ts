import Web3 from 'web3'
import { PROXY_ADMIN_ADDRESS, isCel2 } from './is-cel2'

describe('isCel2', () => {
  it('recognizes cel2', async () => {
    const getCodeMock = jest.fn()
    const web3Mock = {
      eth: {
        getCode: getCodeMock,
      },
    }

    getCodeMock.mockReturnValue('0xbytecode')

    expect(await isCel2(web3Mock as unknown as Web3)).toBe(true)
    expect(getCodeMock).toHaveBeenCalledWith(PROXY_ADMIN_ADDRESS)
  })

  it('does not recognize cel2 when 0x returned', async () => {
    const getCodeMock = jest.fn()
    const web3Mock = {
      eth: {
        getCode: getCodeMock,
      },
    }

    getCodeMock.mockReturnValue('0x')

    expect(await isCel2(web3Mock as unknown as Web3)).toBe(false)
    expect(getCodeMock).toHaveBeenCalledWith(PROXY_ADMIN_ADDRESS)
  })

  it('does not recognize cel2 when not 0x returned', async () => {
    const getCodeMock = jest.fn()
    const web3Mock = {
      eth: {
        getCode: getCodeMock,
      },
    }

    getCodeMock.mockReturnValue(undefined)

    expect(await isCel2(web3Mock as unknown as Web3)).toBe(false)
    expect(getCodeMock).toHaveBeenCalledWith(PROXY_ADMIN_ADDRESS)
  })
})
