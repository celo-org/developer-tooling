// When we need more contracts here we can either list them or fetch all values of an Enum,
// but by abstracting the type we have flexibility and single point of change

export type ContractName =
  | 'Accounts'
  | 'EpochManager'
  | 'Election'
  | 'FeeCurrencyDirectory'
  | 'Governance'
  | 'GoldToken'
  | 'LockedGold'
  | 'Reserve'
  | 'ScoreManager'
  | 'SortedOracles'
  | 'StableToken'
  | 'StableTokenEUR'
  | 'StableTokenBRL'
  | 'Validators'
