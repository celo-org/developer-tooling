import { erc20Abi } from 'viem'

// Celo stable tokens (USDm/EURm/BRLm) expose the ERC20 surface plus a few
// Celo-specific methods. We compose viem's generic erc20Abi with the Celo
// extras here so contractkit no longer depends on the Mento StableToken ABI
// (which @celo/abis is dropping). transferWithComment comes from ICeloToken;
// owner/mint/burn/increase|decreaseAllowance/initialize are the StableToken
// admin + proxy-init methods, inlined verbatim from the generated ABI.
const celoStableExtrasAbi = [
  {
    constant: false,
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    name: 'transferWithComment',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: '_name',
        internalType: 'string',
        type: 'string',
      },
      {
        name: '_symbol',
        internalType: 'string',
        type: 'string',
      },
      {
        name: '_decimals',
        internalType: 'uint8',
        type: 'uint8',
      },
      {
        name: 'registryAddress',
        internalType: 'address',
        type: 'address',
      },
      {
        name: 'inflationRate',
        internalType: 'uint256',
        type: 'uint256',
      },
      {
        name: 'inflationFactorUpdatePeriod',
        internalType: 'uint256',
        type: 'uint256',
      },
      {
        name: 'initialBalanceAddresses',
        internalType: 'address[]',
        type: 'address[]',
      },
      {
        name: 'initialBalanceValues',
        internalType: 'uint256[]',
        type: 'uint256[]',
      },
      {
        name: 'exchangeIdentifier',
        internalType: 'string',
        type: 'string',
      },
    ],
    name: 'initialize',
    outputs: [],
  },
  {
    constant: true,
    payable: false,
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [
      {
        name: '',
        internalType: 'address',
        type: 'address',
      },
    ],
  },
  {
    constant: false,
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
      },
    ],
    name: 'increaseAllowance',
    outputs: [
      {
        name: '',
        internalType: 'bool',
        type: 'bool',
      },
    ],
  },
  {
    constant: false,
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
      },
    ],
    name: 'decreaseAllowance',
    outputs: [
      {
        name: '',
        internalType: 'bool',
        type: 'bool',
      },
    ],
  },
  {
    constant: false,
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: 'to',
        internalType: 'address',
        type: 'address',
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
      },
    ],
    name: 'mint',
    outputs: [
      {
        name: '',
        internalType: 'bool',
        type: 'bool',
      },
    ],
  },
  {
    constant: false,
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
      },
    ],
    name: 'burn',
    outputs: [
      {
        name: '',
        internalType: 'bool',
        type: 'bool',
      },
    ],
  },
] as const

export const stableTokenViemAbi = [...erc20Abi, ...celoStableExtrasAbi] as const
