import { ensureLeading0x } from '@celo/base/lib/address'
import { AbiCoder, ABIDefinition, AbiItem, DecodedParamsObject } from '../abi-types'

/** @internal */
export const getAbiByName = (abi: AbiItem[], methodName: string) =>
  abi.find((entry) => entry.name! === methodName)!

/** @internal */
export const parseDecodedParams = (params: DecodedParamsObject) => {
  const args = new Array(params.__length__)
  Object.keys(params).forEach((key) => {
    if (key === '__length__') {
      return
    }
    const argIndex = parseInt(key, 10)
    if (argIndex >= 0) {
      args[argIndex] = params[key]
      delete params[key]
    }
  })
  return { args, params }
}

/**
 * Parses solidity function signature
 * @dev
 * example of input function signature: transfer(address,uint256)
 * example of output structure can be found in propose.test.ts variable `structAbiDefinition`
 * supports tuples eg. mint(uint256, (uint256, uint256))
 * and structs eg. mint(uint256, (uint256 a, uint256 b))
 * @param fnSignature The function signature
 * @returns AbiItem structure that can be used to encode/decode
 */
export const signatureToAbiDefinition = (fnSignature: string): ABIDefinition => {
  const matches = /(?<method>[^\(]+)\((?<args>.*)\)/.exec(fnSignature)
  if (matches == null) {
    throw new Error(`${fnSignature} is malformed`)
  }
  const method = matches.groups!.method

  const argRegex = /\(((?:[^()]+|\((?:[^()]+|\([^()]*\))*\))*)\)|(\b\w+\b(?:(?:\s+\w+)?))/g
  const args = [...matches.groups!.args.matchAll(argRegex)].map((match) =>
    match[1] ? `(${match[1]})` : match[2]
  )

  const inputs = args.map((arg, index) => {
    if (arg.indexOf('(') == 0) {
      // tuple or struct
      const tupleArgs = arg
        .substring(1, arg.length - 1)
        .split(',')
        .map((a) => a.trim())

      const components = tupleArgs.map((type, tupleIndex) => {
        const parts = type
          .trim()
          .split(' ')
          .map((p) => p.trim())
        if (parts.length > 2) {
          throw new Error(`${fnSignature} is malformed`)
        }

        return {
          type: parts[0],
          name: parts[1] ?? `a${index}-${tupleIndex}`,
        }
      })

      return {
        name: 'params',
        type: 'tuple',
        components: components,
      }
    } else {
      const parts = arg
        .trim()
        .split(' ')
        .map((p) => p.trim())
      if (parts.length > 2) {
        throw new Error(`${fnSignature} is malformed`)
      }
      return {
        type: parts[0],
        name: parts[1] ?? `a${index}`,
      }
    }
  })

  return {
    name: method,
    signature: fnSignature,
    type: 'function',
    inputs,
  }
}

/** @internal */
export const decodeStringParameter = (ethAbi: AbiCoder, str: string) =>
  ethAbi.decodeParameter('string', ensureLeading0x(str))
