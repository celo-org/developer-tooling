// tslint:disable: ordered-imports
import { ABI as AccountsABI } from '@celo/abis/web3/Accounts'
import { ABI as AttestationsABI } from '@celo/abis/web3/Attestations'
import { ABI as CeloUnreleasedTreasuryABI } from '@celo/abis/web3/CeloUnreleasedTreasury'
import { ABI as DoubleSigningSlasherABI } from '@celo/abis/web3/DoubleSigningSlasher'
import { ABI as DowntimeSlasherABI } from '@celo/abis/web3/DowntimeSlasher'
import { ABI as ElectionABI } from '@celo/abis/web3/Election'
import { ABI as EpochManagerABI } from '@celo/abis/web3/EpochManager'
import { ABI as EpochManagerEnablerABI } from '@celo/abis/web3/EpochManagerEnabler'
import { ABI as EpochRewardsABI } from '@celo/abis/web3/EpochRewards'
import { ABI as EscrowABI } from '@celo/abis/web3/Escrow'
import { ABI as FederatedAttestationsABI } from '@celo/abis/web3/FederatedAttestations'
import { ABI as FeeCurrencyDirectoryABI } from '@celo/abis/web3/FeeCurrencyDirectory'
import { ABI as FeeCurrencyWhitelistABI } from '@celo/abis/web3/FeeCurrencyWhitelist'
import { ABI as FeeHandlerABI } from '@celo/abis/web3/FeeHandler'
import { ABI as FreezerABI } from '@celo/abis/web3/Freezer'
import { ABI as GoldTokenABI } from '@celo/abis/web3/GoldToken'
import { ABI as GovernanceABI } from '@celo/abis/web3/Governance'
import { ABI as LockedGoldABI } from '@celo/abis/web3/LockedGold'
import { ABI as MentoFeeHandlerSellerABI } from '@celo/abis/web3/MentoFeeHandlerSeller'
import { ABI as MultiSigABI } from '@celo/abis/web3/MultiSig'
import { ABI as OdisPaymentsABI } from '@celo/abis/web3/OdisPayments'
import { ABI as ProxyABI } from '@celo/abis/web3/Proxy'
import { ABI as RegistryABI } from '@celo/abis/web3/Registry'
import { ABI as ScoreManagerABI } from '@celo/abis/web3/ScoreManager'
import { ABI as SortedOraclesABI } from '@celo/abis/web3/SortedOracles'
import { ABI as UniswapFeeHandlerSellerABI } from '@celo/abis/web3/UniswapFeeHandlerSeller'
import { ABI as ValidatorsABI } from '@celo/abis/web3/Validators'
import { ABI as ReserveABI } from '@celo/abis/web3/mento/Reserve'
import { ABI as StableTokenABI } from '@celo/abis/web3/mento/StableToken'
import { ABIDefinition, AbiItem } from '@celo/connect'
import Web3 from 'web3'

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

const findInitializeAbi = (items: AbiItem[]) => items.find((item) => item.name === 'initialize')

const initializeAbiMap = {
  AccountsProxy: findInitializeAbi(AccountsABI),
  AttestationsProxy: findInitializeAbi(AttestationsABI),
  CeloUnreleasedTreasuryProxy: findInitializeAbi(CeloUnreleasedTreasuryABI),
  DoubleSigningSlasherProxy: findInitializeAbi(DoubleSigningSlasherABI),
  DowntimeSlasherProxy: findInitializeAbi(DowntimeSlasherABI),
  ElectionProxy: findInitializeAbi(ElectionABI),
  EpochManagerProxy: findInitializeAbi(EpochManagerABI),
  EpochManagerEnablerProxy: findInitializeAbi(EpochManagerEnablerABI),
  EpochRewardsProxy: findInitializeAbi(EpochRewardsABI),
  EscrowProxy: findInitializeAbi(EscrowABI),
  FederatedAttestationsProxy: findInitializeAbi(FederatedAttestationsABI),
  FeeCurrencyDirectoryProxy: findInitializeAbi(FeeCurrencyDirectoryABI),
  FeeCurrencyWhitelistProxy: findInitializeAbi(FeeCurrencyWhitelistABI),
  FeeHandlerProxy: findInitializeAbi(FeeHandlerABI),
  MentoFeeHandlerSellerProxy: findInitializeAbi(MentoFeeHandlerSellerABI),
  UniswapFeeHandlerSellerProxy: findInitializeAbi(UniswapFeeHandlerSellerABI),
  FreezerProxy: findInitializeAbi(FreezerABI),
  GoldTokenProxy: findInitializeAbi(GoldTokenABI),
  GovernanceProxy: findInitializeAbi(GovernanceABI),
  LockedGoldProxy: findInitializeAbi(LockedGoldABI),
  MultiSigProxy: findInitializeAbi(MultiSigABI),
  OdisPaymentsProxy: findInitializeAbi(OdisPaymentsABI),
  ProxyProxy: findInitializeAbi(ProxyABI),
  RegistryProxy: findInitializeAbi(RegistryABI),
  ReserveProxy: findInitializeAbi(ReserveABI),
  ScoreManagerProxy: findInitializeAbi(ScoreManagerABI),
  SortedOraclesProxy: findInitializeAbi(SortedOraclesABI),
  StableTokenProxy: findInitializeAbi(StableTokenABI),
  StableTokenEURProxy: findInitializeAbi(StableTokenABI),
  StableTokenBRLProxy: findInitializeAbi(StableTokenABI),
  ValidatorsProxy: findInitializeAbi(ValidatorsABI),
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

export const setImplementationOnProxy = (address: string, web3: Web3) => {
  const proxyWeb3Contract = new web3.eth.Contract(PROXY_ABI)
  return proxyWeb3Contract.methods._setImplementation(address)
}
