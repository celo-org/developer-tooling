import Web3 from 'web3'

/*
 * This util checks if we're in L2 context, it's a port of the technique used in
 * https://github.com/celo-org/celo-monorepo/blob/da9b4955c1fdc8631980dc4adf9b05e0524fc228/packages/protocol/contracts-0.8/common/IsL2Check.sol#L17
 */

export const PROXY_ADMIN_ADDRESS = '0x4200000000000000000000000000000000000018'

export const isCel2 = async (web3: Web3) => {
  const code = await web3.eth.getCode(PROXY_ADMIN_ADDRESS)

  if (typeof code === 'string') {
    return code != '0x' && code.length > 2
  }

  return false
}
