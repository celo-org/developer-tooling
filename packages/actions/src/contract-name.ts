// When we need more contracts here we can either list them or fetch all values of an Enum,
// but by abstracting the type we have flexibility and single point of change

export type ContractName =
  | 'Accounts'
  | 'Governance'
  | 'LockedGold'
  | 'Validators'
  | 'EpochManager'
  | 'Election'
  | 'GoldToken'
  | 'StableToken'
  | 'StableTokenEUR'
  | 'StableTokenBRL'
  | 'FeeCurrencyDirectory'
