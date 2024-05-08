import Web3 from 'web3'

export const PROXY_ADMIN_ADDRESS = '0x4200000000000000000000000000000000000018'

export const isCel2 = async (web3: Web3) => {
  const code = await web3.eth.getCode(PROXY_ADMIN_ADDRESS)

  if (typeof code === 'string') {
    return code != '0x' && code.length > 2
  }

  return false
}
