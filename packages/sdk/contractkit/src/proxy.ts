import {
  accountsABI,
  attestationsABI,
  celoUnreleasedTreasuryABI,
  doubleSigningSlasherABI,
  downtimeSlasherABI,
  electionABI,
  epochManagerABI,
  epochManagerEnablerABI,
  epochRewardsABI,
  escrowABI,
  federatedAttestationsABI,
  feeCurrencyDirectoryABI,
  feeCurrencyWhitelistABI,
  feeHandlerABI,
  freezerABI,
  goldTokenABI,
  governanceABI,
  lockedGoldABI,
  mentoFeeHandlerSellerABI,
  multiSigABI,
  odisPaymentsABI,
  proxyABI as proxyContractABI,
  registryABI,
  reserveABI,
  scoreManagerABI,
  sortedOraclesABI,
  stableTokenABI,
  uniswapFeeHandlerSellerABI,
  validatorsABI,
} from '@celo/abis'
import { ABIDefinition, AbiItem, Connection, createViemTxObject } from '@celo/connect'

export const GET_IMPLEMENTATION_ABI: ABIDefinition = {
  constant: true,
  inputs: [],
  name: '_getImplementation',
  outputs: [
    {
      name: 'implementation',
      type: 'address',
    },
  ],
  payable: false,
  stateMutability: 'view',
  type: 'function',
  signature: '0x42404e07',
}

export const SET_IMPLEMENTATION_ABI: ABIDefinition = {
  constant: false,
  inputs: [
    {
      name: 'implementation',
      type: 'address',
    },
  ],
  name: '_setImplementation',
  outputs: [],
  payable: false,
  stateMutability: 'nonpayable',
  type: 'function',
  signature: '0xbb913f41',
}

export const SET_AND_INITIALIZE_IMPLEMENTATION_ABI: ABIDefinition = {
  constant: false,
  inputs: [
    {
      name: 'implementation',
      type: 'address',
    },
    {
      name: 'callbackData',
      type: 'bytes',
    },
  ],
  name: '_setAndInitializeImplementation',
  outputs: [],
  payable: true,
  stateMutability: 'payable',
  type: 'function',
  signature: '0x03386ba3',
}

export const TRANSFER_OWNERSHIP_ABI: ABIDefinition = {
  constant: false,
  inputs: [
    {
      name: 'newOwner',
      type: 'address',
    },
  ],
  name: '_transferOwnership',
  outputs: [],
  payable: false,
  stateMutability: 'nonpayable',
  type: 'function',
  signature: '0xd29d44ee',
}

export const PROXY_ABI: ABIDefinition[] = [
  GET_IMPLEMENTATION_ABI,
  SET_IMPLEMENTATION_ABI,
  SET_AND_INITIALIZE_IMPLEMENTATION_ABI,
  TRANSFER_OWNERSHIP_ABI,
]

export const PROXY_SET_IMPLEMENTATION_SIGNATURE = SET_IMPLEMENTATION_ABI.signature
export const PROXY_SET_AND_INITIALIZE_IMPLEMENTATION_SIGNATURE =
  SET_AND_INITIALIZE_IMPLEMENTATION_ABI.signature

const findInitializeAbi = (items: readonly any[]) =>
  items.find((item: AbiItem) => item.name === 'initialize') as AbiItem | undefined

const initializeAbiMap = {
  AccountsProxy: findInitializeAbi(accountsABI),
  AttestationsProxy: findInitializeAbi(attestationsABI),
  CeloUnreleasedTreasuryProxy: findInitializeAbi(celoUnreleasedTreasuryABI),
  DoubleSigningSlasherProxy: findInitializeAbi(doubleSigningSlasherABI),
  DowntimeSlasherProxy: findInitializeAbi(downtimeSlasherABI),
  ElectionProxy: findInitializeAbi(electionABI),
  EpochManagerProxy: findInitializeAbi(epochManagerABI),
  EpochManagerEnablerProxy: findInitializeAbi(epochManagerEnablerABI),
  EpochRewardsProxy: findInitializeAbi(epochRewardsABI),
  EscrowProxy: findInitializeAbi(escrowABI),
  FederatedAttestationsProxy: findInitializeAbi(federatedAttestationsABI),
  FeeCurrencyDirectoryProxy: findInitializeAbi(feeCurrencyDirectoryABI),
  FeeCurrencyWhitelistProxy: findInitializeAbi(feeCurrencyWhitelistABI),
  FeeHandlerProxy: findInitializeAbi(feeHandlerABI),
  MentoFeeHandlerSellerProxy: findInitializeAbi(mentoFeeHandlerSellerABI),
  UniswapFeeHandlerSellerProxy: findInitializeAbi(uniswapFeeHandlerSellerABI),
  FreezerProxy: findInitializeAbi(freezerABI),
  GoldTokenProxy: findInitializeAbi(goldTokenABI),
  GovernanceProxy: findInitializeAbi(governanceABI),
  LockedGoldProxy: findInitializeAbi(lockedGoldABI),
  MultiSigProxy: findInitializeAbi(multiSigABI),
  OdisPaymentsProxy: findInitializeAbi(odisPaymentsABI),
  ProxyProxy: findInitializeAbi(proxyContractABI),
  RegistryProxy: findInitializeAbi(registryABI),
  ReserveProxy: findInitializeAbi(reserveABI),
  ScoreManagerProxy: findInitializeAbi(scoreManagerABI),
  SortedOraclesProxy: findInitializeAbi(sortedOraclesABI),
  StableTokenProxy: findInitializeAbi(stableTokenABI),
  StableTokenEURProxy: findInitializeAbi(stableTokenABI),
  StableTokenBRLProxy: findInitializeAbi(stableTokenABI),
  ValidatorsProxy: findInitializeAbi(validatorsABI),
}

export const getInitializeAbiOfImplementation = (
  proxyContractName: keyof typeof initializeAbiMap
) => {
  const initializeAbi = initializeAbiMap[proxyContractName]
  if (!initializeAbi) {
    throw new Error(`Initialize method not found on implementation of ${proxyContractName}`)
  }
  return initializeAbi
}

export const setImplementationOnProxy = (address: string, connection: Connection) => {
  const proxyContract = connection.getViemContract(PROXY_ABI, '')
  return createViemTxObject(connection, proxyContract, '_setImplementation', [address])
}
