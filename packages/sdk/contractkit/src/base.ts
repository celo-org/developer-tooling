export enum CeloContract {
  Accounts = 'Accounts',
  Attestations = 'Attestations',
  BlockchainParameters = 'BlockchainParameters',
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
  FeeCurrencyWhitelist = 'FeeCurrencyWhitelist',
  FeeHandler = 'FeeHandler',
  Freezer = 'Freezer',
  GasPriceMinimum = 'GasPriceMinimum',
  GoldToken = 'GoldToken',
  Governance = 'Governance',
  GovernanceSlasher = 'GovernanceSlasher',
  LockedGold = 'LockedGold',
  MentoFeeHandlerSeller = 'MentoFeeHandlerSeller',
  UniswapFeeHandlerSeller = 'UniswapFeeHandlerSeller',
  MultiSig = 'MultiSig',
  OdisPayments = 'OdisPayments',
  Random = 'Random',
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

export type CeloTokenContract = StableTokenContract | CeloContract.GoldToken
/**
 * Deprecated alias for CeloTokenContract.
 * @deprecated Use CeloTokenContract instead
 */
export type CeloToken = CeloTokenContract

export const AllContracts = Object.keys(CeloContract) as CeloContract[]
const AuxiliaryContracts = [CeloContract.MultiSig, CeloContract.ERC20]
export const RegisteredContracts = AllContracts.filter((v) => !AuxiliaryContracts.includes(v))

/** @internal */
export const stripProxy = (contract: CeloContract) => contract.replace('Proxy', '') as CeloContract

/** @internal */
export const suffixProxy = (contract: CeloContract) =>
  contract.endsWith('Proxy') ? contract : (`${contract}Proxy` as CeloContract)

export const ProxyContracts = AllContracts.map((c) => suffixProxy(c))
