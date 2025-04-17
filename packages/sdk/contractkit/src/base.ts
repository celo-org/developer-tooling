export enum CeloContract {
  Accounts = 'Accounts',
  Attestations = 'Attestations',
  CeloUnreleasedTreasury = 'CeloUnreleasedTreasury',
  DoubleSigningSlasher = 'DoubleSigningSlasher',
  DowntimeSlasher = 'DowntimeSlasher',
  Election = 'Election',
  EpochRewards = 'EpochRewards',
  ERC20 = 'ERC20',
  Escrow = 'Escrow',
  EpochManager = 'EpochManager',
  EpochManagerEnabler = 'EpochManagerEnabler',
  FederatedAttestations = 'FederatedAttestations',
  FeeCurrencyDirectory = 'FeeCurrencyDirectory',
  FeeHandler = 'FeeHandler',
  Freezer = 'Freezer',
  /* @deprecated use CeloToken */
  GoldToken = 'GoldToken',
  CeloToken = 'CeloToken',
  Governance = 'Governance',
  GovernanceSlasher = 'GovernanceSlasher',
  /* @deprecated use LockedCelo */
  LockedGold = 'LockedGold',
  LockedCelo = 'LockedCelo',
  MentoFeeHandlerSeller = 'MentoFeeHandlerSeller',
  UniswapFeeHandlerSeller = 'UniswapFeeHandlerSeller',
  MultiSig = 'MultiSig',
  OdisPayments = 'OdisPayments',
  Registry = 'Registry',
  Reserve = 'Reserve',
  ScoreManager = 'ScoreManager',
  SortedOracles = 'SortedOracles',
  StableToken = 'StableToken',
  StableTokenEUR = 'StableTokenEUR',
  StableTokenBRL = 'StableTokenBRL',
  Validators = 'Validators',
}

export type StableTokenContract =
  | CeloContract.StableToken
  | CeloContract.StableTokenEUR
  | CeloContract.StableTokenBRL

export type CeloTokenContract =
  | StableTokenContract
  | CeloContract.CeloToken
  | CeloContract.GoldToken
/**
 * Deprecated alias for CeloTokenContract.
 * @deprecated Use CeloTokenContract instead
 */
export type CeloToken = CeloTokenContract

export const AllContracts = Object.values(CeloContract) as CeloContract[]
const AuxiliaryContracts = [CeloContract.MultiSig, CeloContract.ERC20]
export const RegisteredContracts = AllContracts.filter((v) => !AuxiliaryContracts.includes(v))

/** @internal */
export const stripProxy = (contract: CeloContract) => contract.replace('Proxy', '') as CeloContract

/** @internal */
export const suffixProxy = (contract: CeloContract) =>
  contract.endsWith('Proxy') ? contract : (`${contract}Proxy` as CeloContract)

export const ProxyContracts = AllContracts.map((c) => suffixProxy(c))
