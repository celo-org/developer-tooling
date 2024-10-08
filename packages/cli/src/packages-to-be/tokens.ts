import { CeloTokenType, StableToken, Token } from '@celo/base'
import { CeloContract, CeloTokenContract, StableTokenContract } from './contracts'

export { CeloTokenType, StableToken, Token } from '@celo/base'

export type EachCeloToken<T> = {
  [key in CeloTokenType]?: T
}

export interface CeloTokenInfo {
  contract: CeloTokenContract
  symbol: CeloTokenType
}

export interface StableTokenInfo extends CeloTokenInfo {
  contract: StableTokenContract
}

/** Basic info for each stable token */
export const stableTokenInfos: {
  [key in StableToken]: StableTokenInfo
} = {
  [StableToken.cUSD]: {
    contract: CeloContract.StableToken,
    symbol: StableToken.cUSD,
  },
  [StableToken.cEUR]: {
    contract: CeloContract.StableTokenEUR,
    symbol: StableToken.cEUR,
  },
  [StableToken.cREAL]: {
    contract: CeloContract.StableTokenBRL,
    symbol: StableToken.cREAL,
  },
}

/** Basic info for each supported celo token, including stable tokens */
export const celoTokenInfos: {
  [key in CeloTokenType]: CeloTokenInfo
} = {
  [Token.CELO]: {
    contract: CeloContract.GoldToken,
    symbol: Token.CELO,
  },
  ...stableTokenInfos,
}
