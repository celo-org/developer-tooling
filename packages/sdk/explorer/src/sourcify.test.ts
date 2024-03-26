import {
  Address,
  Callback,
  Connection,
  JsonRpcPayload,
  JsonRpcResponse,
  Provider,
} from '@celo/connect'
import Web3 from 'web3'
import { Metadata, fetchMetadata, tryGetProxyImplementation } from './sourcify'

// This is taken from protocol/contracts/build/Account.json
const CONTRACT_METADATA = require('../fixtures/contract.metadata.json')

describe('sourcify verified helpers', () => {
  let connection: Connection
  const web3: Web3 = new Web3()
  const address: Address = web3.utils.randomHex(20)
  const proxyAddress: Address = web3.utils.randomHex(20)
  const implAddress: Address = web3.utils.randomHex(20)
  const chainId: number = 42220

  const mockProvider: Provider = {
    send: (payload: JsonRpcPayload, callback: Callback<JsonRpcResponse>): void => {
      if (payload.params[0].to === proxyAddress) {
        callback(null, {
          jsonrpc: payload.jsonrpc,
          id: Number(payload.id),
          result: `0x000000000000000000000000${implAddress}`,
        })
      } else {
        callback(new Error('revert'))
      }
    },
  }

  beforeEach(() => {
    fetchMock.reset()
    web3.setProvider(mockProvider as any)
    connection = new Connection(web3)
    connection.chainId = jest.fn().mockImplementation(async () => {
      return chainId
    })
  })

  describe('fetchMetadata()', () => {
    describe('when a full match exists', () => {
      it('returns the metadata from the full match', async () => {
        fetchMock.get(
          `https://repo.sourcify.dev/contracts/full_match/42220/${address}/metadata.json`,
          {}
        )
        const metadata = await fetchMetadata(connection, address)
        expect(metadata).toBeInstanceOf(Metadata)
      })
    })

    describe('when a full match does not exist', () => {
      describe('when contract has been verified on celoscan', () => {
        it('returns the metadata from celoscan', async () => {
          fetchMock
            .get(
              `https://repo.sourcify.dev/contracts/full_match/42220/${address}/metadata.json`,
              400
            )
            .get(
              `https://api.celoscan.io/api?module=contract&action=getsourcecode&address=${address}`,
              PROX_CONTRACT_VIA_CELLOSCAN
            )
            .get(
              `https://api.celoscan.io/api?module=contract&action=getsourcecode&address=0x796dff6d74f3e27060b71255fe517bfb23c93eed`,
              IMPLEMENATATION_CONTRACT
            )
          const result = await fetchMetadata(connection, address)
          expect(result).toBeInstanceOf(Metadata)
          expect(result?.abi).toBeDefined()
        })
      })
      describe('but a partial match exists', () => {
        it('returns the metadata from the partial match', async () => {
          fetchMock
            .get(
              `https://repo.sourcify.dev/contracts/full_match/42220/${address}/metadata.json`,
              400
            )
            .get(
              `https://repo.sourcify.dev/contracts/partial_match/42220/${address}/metadata.json`,
              {}
            )
            .get(
              `https://api.celoscan.io/api?module=contract&action=getsourcecode&address=${address}`,
              {
                status: '0',
                message: 'NOTOK',
              }
            )

          const metadata = await fetchMetadata(connection, address)
          expect(metadata).toBeInstanceOf(Metadata)
        })
      })

      describe('and a partial match does not exist', () => {
        it('is null', async () => {
          fetchMock
            .get(
              `https://repo.sourcify.dev/contracts/full_match/42220/${address}/metadata.json`,
              400
            )
            .get(
              `https://repo.sourcify.dev/contracts/partial_match/42220/${address}/metadata.json`,
              400
            )
            .get(
              `https://api.celoscan.io/api?module=contract&action=getsourcecode&address=${address}`,
              {
                status: '0',
                message: 'NOTOK',
              }
            )
          const metadata = await fetchMetadata(connection, address)
          expect(metadata).toEqual(null)
        })
      })
    })
  })

  describe('Metadata', () => {
    describe('get abi', () => {
      it('returns the abi when it finds it', () => {
        // @ts-expect-error -- test is purposefully incorrect
        const metadata = new Metadata(connection, address, { output: { abi: [{}] } })
        const abi = metadata.abi
        expect(abi).not.toBeNull()
        expect(abi).toEqual([{}])
      })

      it('returns null when there is no abi', () => {
        // @ts-expect-error -- test is purposefully incorrect
        const metadata = new Metadata(connection, address, { output: { other: [{}] } })
        const abi = metadata.abi
        expect(abi).toBeNull()
      })
    })

    describe('get contractName', () => {
      describe('when name is passed in as setting', () => {
        it('is used', () => {
          const metadata = new Metadata(connection, address, {
            settings: {
              name: 'SpiceContract',
              compilationTarget: {
                'somefile.sol': 'SomeContract',
                'otherfile.sol': 'OtherContract',
              },
            },
          })
          expect(metadata.contractName).toEqual('SpiceContract')
        })
      })
      describe('when the structure does not contain it', () => {
        it('returns null', () => {
          // @ts-expect-error -- test is purposefully incorrect
          const metadata = new Metadata(connection, address, { output: { abi: [{}] } })
          const name = metadata.contractName
          expect(name).toBeNull()
        })
      })

      describe('when the structure contains multiple compilation targets', () => {
        it('returns the first', () => {
          const metadata = new Metadata(connection, address, {
            settings: {
              compilationTarget: {
                'somefile.sol': 'SomeContract',
                'otherfile.sol': 'OtherContract',
              },
            },
          })
          const name = metadata.contractName
          expect(name).toEqual('SomeContract')
        })
      })

      describe('when the structure contains one compilation targets', () => {
        it('returns it', () => {
          const metadata = new Metadata(connection, address, {
            settings: {
              compilationTarget: {
                'otherfile.sol': 'OtherContract',
              },
            },
          })
          const name = metadata.contractName
          expect(name).toEqual('OtherContract')
        })
      })
    })

    describe('abiForMethod', () => {
      let contractMetadata: Metadata

      beforeEach(() => {
        contractMetadata = new Metadata(connection, address, CONTRACT_METADATA)
      })

      describe('with full signature', () => {
        it('finds one ABI item when it exists', async () => {
          const results = contractMetadata.abiForMethod('isLegacyRole(bytes32,bytes32)')
          expect(results.length).toEqual(1)
          expect(results[0]).toMatchObject({
            name: 'isLegacyRole',
            inputs: [{ name: 'role' }, { name: 'otherRole' }],
          })
        })

        it('returns an empty array when none exists', async () => {
          const results = contractMetadata.abiForMethod('randomFunction(bytes32,bytes32')
          expect(results.length).toEqual(0)
        })
      })

      describe('with method name', () => {
        it('finds one ABI item when one exists', async () => {
          const results = contractMetadata.abiForMethod('isLegacySigner')
          expect(results.length).toEqual(1)
          expect(results[0]).toMatchObject({
            name: 'isLegacySigner',
          })
        })

        it('finds multiple ABI items when they exist', async () => {
          const results = contractMetadata.abiForMethod('isLegacyRole')
          expect(results.length).toEqual(2)
        })

        it('returns an empty array when none exists', async () => {
          const results = contractMetadata.abiForMethod('randomFunction')
          expect(results.length).toEqual(0)
        })
      })
    })

    describe('abiForSignature', () => {
      let contractMetadata: Metadata

      beforeEach(() => {
        contractMetadata = new Metadata(connection, address, CONTRACT_METADATA)
      })

      describe('when the function exists', () => {
        it('returns the ABI', async () => {
          const callSignature = connection
            .getAbiCoder()
            .encodeFunctionSignature('authorizedBy(address)')
          const abi = contractMetadata.abiForSelector(callSignature)
          expect(abi).toMatchObject({
            constant: true,
            inputs: [
              {
                internalType: 'address',
                name: '',
                type: 'address',
              },
            ],
            name: 'authorizedBy',
            outputs: [
              {
                internalType: 'address',
                name: '',
                type: 'address',
              },
            ],
            payable: false,
            stateMutability: 'view',
            type: 'function',
          })
        })
      })

      describe("when the function doesn't exist", () => {
        it('returns null', () => {
          const abi = contractMetadata.abiForSelector('0x0')
          expect(abi).toBeNull()
        })
      })
    })

    describe('tryGetProxyImplementation', () => {
      describe('with a cLabs proxy', () => {
        it('fetches the implementation', async () => {
          const result = await tryGetProxyImplementation(connection, proxyAddress)
          expect(result?.toLocaleLowerCase()).toEqual(implAddress.toLocaleLowerCase())
        })
      })

      describe('with a non-proxy', () => {
        it('returns null', async () => {
          const result = await tryGetProxyImplementation(connection, address)
          expect(result).toBeUndefined()
        })
      })
    })
  })
})

const PROX_CONTRACT_VIA_CELLOSCAN = {
  status: '1',
  message: 'OK',
  result: [
    {
      SourceCode:
        '/**\r\n *Submitted for verification at Etherscan.io on 2022-07-08\r\n*/\r\n\r\n// File: @openzeppelin/contracts/proxy/beacon/IBeacon.sol\r\n\r\n// SPDX-License-Identifier: MIT\r\n\r\npragma solidity ^0.8.0;\r\n\r\n/**\r\n * @dev This is the interface that {BeaconProxy} expects of its beacon.\r\n */\r\ninterface IBeacon {\r\n    /**\r\n     * @dev Must return an address that can be used as a delegate call target.\r\n     *\r\n     * {BeaconProxy} will check that this address is a contract.\r\n     */\r\n    function implementation() external view returns (address);\r\n}\r\n\r\n// File: @openzeppelin/contracts/proxy/Proxy.sol\r\n\r\n\r\npragma solidity ^0.8.0;\r\n\r\n/**\r\n * @dev This abstract contract provides a fallback function that delegates all calls to another contract using the EVM\r\n * instruction `delegatecall`. We refer to the second contract as the _implementation_ behind the proxy, and it has to\r\n * be specified by overriding the virtual {_implementation} function.\r\n *\r\n * Additionally, delegation to the implementation can be triggered manually through the {_fallback} function, or to a\r\n * different contract through the {_delegate} function.\r\n *\r\n * The success and return data of the delegated call will be returned back to the caller of the proxy.\r\n */\r\nabstract contract Proxy {\r\n    /**\r\n     * @dev Delegates the current call to `implementation`.\r\n     *\r\n     * This function does not return to its internall call site, it will return directly to the external caller.\r\n     */\r\n    function _delegate(address implementation) internal virtual {\r\n        assembly {\r\n            // Copy msg.data. We take full control of memory in this inline assembly\r\n            // block because it will not return to Solidity code. We overwrite the\r\n            // Solidity scratch pad at memory position 0.\r\n            calldatacopy(0, 0, calldatasize())\r\n\r\n            // Call the implementation.\r\n            // out and outsize are 0 because we don\'t know the size yet.\r\n            let result := delegatecall(gas(), implementation, 0, calldatasize(), 0, 0)\r\n\r\n            // Copy the returned data.\r\n            returndatacopy(0, 0, returndatasize())\r\n\r\n            switch result\r\n            // delegatecall returns 0 on error.\r\n            case 0 {\r\n                revert(0, returndatasize())\r\n            }\r\n            default {\r\n                return(0, returndatasize())\r\n            }\r\n        }\r\n    }\r\n\r\n    /**\r\n     * @dev This is a virtual function that should be overriden so it returns the address to which the fallback function\r\n     * and {_fallback} should delegate.\r\n     */\r\n    function _implementation() internal view virtual returns (address);\r\n\r\n    /**\r\n     * @dev Delegates the current call to the address returned by `_implementation()`.\r\n     *\r\n     * This function does not return to its internall call site, it will return directly to the external caller.\r\n     */\r\n    function _fallback() internal virtual {\r\n        _beforeFallback();\r\n        _delegate(_implementation());\r\n    }\r\n\r\n    /**\r\n     * @dev Fallback function that delegates calls to the address returned by `_implementation()`. Will run if no other\r\n     * function in the contract matches the call data.\r\n     */\r\n    fallback() external payable virtual {\r\n        _fallback();\r\n    }\r\n\r\n    /**\r\n     * @dev Fallback function that delegates calls to the address returned by `_implementation()`. Will run if call data\r\n     * is empty.\r\n     */\r\n    receive() external payable virtual {\r\n        _fallback();\r\n    }\r\n\r\n    /**\r\n     * @dev Hook that is called before falling back to the implementation. Can happen as part of a manual `_fallback`\r\n     * call, or as part of the Solidity `fallback` or `receive` functions.\r\n     *\r\n     * If overriden should call `super._beforeFallback()`.\r\n     */\r\n    function _beforeFallback() internal virtual {}\r\n}\r\n\r\n// File: @openzeppelin/contracts/utils/Address.sol\r\n\r\n\r\npragma solidity ^0.8.0;\r\n\r\n/**\r\n * @dev Collection of functions related to the address type\r\n */\r\nlibrary Address {\r\n    /**\r\n     * @dev Returns true if `account` is a contract.\r\n     *\r\n     * [IMPORTANT]\r\n     * ====\r\n     * It is unsafe to assume that an address for which this function returns\r\n     * false is an externally-owned account (EOA) and not a contract.\r\n     *\r\n     * Among others, `isContract` will return false for the following\r\n     * types of addresses:\r\n     *\r\n     *  - an externally-owned account\r\n     *  - a contract in construction\r\n     *  - an address where a contract will be created\r\n     *  - an address where a contract lived, but was destroyed\r\n     * ====\r\n     */\r\n    function isContract(address account) internal view returns (bool) {\r\n        // This method relies on extcodesize, which returns 0 for contracts in\r\n        // construction, since the code is only stored at the end of the\r\n        // constructor execution.\r\n\r\n        uint256 size;\r\n        assembly {\r\n            size := extcodesize(account)\r\n        }\r\n        return size > 0;\r\n    }\r\n\r\n    /**\r\n     * @dev Replacement for Solidity\'s `transfer`: sends `amount` wei to\r\n     * `recipient`, forwarding all available gas and reverting on errors.\r\n     *\r\n     * https://eips.ethereum.org/EIPS/eip-1884[EIP1884] increases the gas cost\r\n     * of certain opcodes, possibly making contracts go over the 2300 gas limit\r\n     * imposed by `transfer`, making them unable to receive funds via\r\n     * `transfer`. {sendValue} removes this limitation.\r\n     *\r\n     * https://diligence.consensys.net/posts/2019/09/stop-using-soliditys-transfer-now/[Learn more].\r\n     *\r\n     * IMPORTANT: because control is transferred to `recipient`, care must be\r\n     * taken to not create reentrancy vulnerabilities. Consider using\r\n     * {ReentrancyGuard} or the\r\n     * https://solidity.readthedocs.io/en/v0.5.11/security-considerations.html#use-the-checks-effects-interactions-pattern[checks-effects-interactions pattern].\r\n     */\r\n    function sendValue(address payable recipient, uint256 amount) internal {\r\n        require(address(this).balance >= amount, "Address: insufficient balance");\r\n\r\n        (bool success, ) = recipient.call{value: amount}("");\r\n        require(success, "Address: unable to send value, recipient may have reverted");\r\n    }\r\n\r\n    /**\r\n     * @dev Performs a Solidity function call using a low level `call`. A\r\n     * plain `call` is an unsafe replacement for a function call: use this\r\n     * function instead.\r\n     *\r\n     * If `target` reverts with a revert reason, it is bubbled up by this\r\n     * function (like regular Solidity function calls).\r\n     *\r\n     * Returns the raw returned data. To convert to the expected return value,\r\n     * use https://solidity.readthedocs.io/en/latest/units-and-global-variables.html?highlight=abi.decode#abi-encoding-and-decoding-functions[`abi.decode`].\r\n     *\r\n     * Requirements:\r\n     *\r\n     * - `target` must be a contract.\r\n     * - calling `target` with `data` must not revert.\r\n     *\r\n     * _Available since v3.1._\r\n     */\r\n    function functionCall(address target, bytes memory data) internal returns (bytes memory) {\r\n        return functionCall(target, data, "Address: low-level call failed");\r\n    }\r\n\r\n    /**\r\n     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`], but with\r\n     * `errorMessage` as a fallback revert reason when `target` reverts.\r\n     *\r\n     * _Available since v3.1._\r\n     */\r\n    function functionCall(\r\n        address target,\r\n        bytes memory data,\r\n        string memory errorMessage\r\n    ) internal returns (bytes memory) {\r\n        return functionCallWithValue(target, data, 0, errorMessage);\r\n    }\r\n\r\n    /**\r\n     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`],\r\n     * but also transferring `value` wei to `target`.\r\n     *\r\n     * Requirements:\r\n     *\r\n     * - the calling contract must have an ETH balance of at least `value`.\r\n     * - the called Solidity function must be `payable`.\r\n     *\r\n     * _Available since v3.1._\r\n     */\r\n    function functionCallWithValue(\r\n        address target,\r\n        bytes memory data,\r\n        uint256 value\r\n    ) internal returns (bytes memory) {\r\n        return functionCallWithValue(target, data, value, "Address: low-level call with value failed");\r\n    }\r\n\r\n    /**\r\n     * @dev Same as {xref-Address-functionCallWithValue-address-bytes-uint256-}[`functionCallWithValue`], but\r\n     * with `errorMessage` as a fallback revert reason when `target` reverts.\r\n     *\r\n     * _Available since v3.1._\r\n     */\r\n    function functionCallWithValue(\r\n        address target,\r\n        bytes memory data,\r\n        uint256 value,\r\n        string memory errorMessage\r\n    ) internal returns (bytes memory) {\r\n        require(address(this).balance >= value, "Address: insufficient balance for call");\r\n        require(isContract(target), "Address: call to non-contract");\r\n\r\n        (bool success, bytes memory returndata) = target.call{value: value}(data);\r\n        return verifyCallResult(success, returndata, errorMessage);\r\n    }\r\n\r\n    /**\r\n     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`],\r\n     * but performing a static call.\r\n     *\r\n     * _Available since v3.3._\r\n     */\r\n    function functionStaticCall(address target, bytes memory data) internal view returns (bytes memory) {\r\n        return functionStaticCall(target, data, "Address: low-level static call failed");\r\n    }\r\n\r\n    /**\r\n     * @dev Same as {xref-Address-functionCall-address-bytes-string-}[`functionCall`],\r\n     * but performing a static call.\r\n     *\r\n     * _Available since v3.3._\r\n     */\r\n    function functionStaticCall(\r\n        address target,\r\n        bytes memory data,\r\n        string memory errorMessage\r\n    ) internal view returns (bytes memory) {\r\n        require(isContract(target), "Address: static call to non-contract");\r\n\r\n        (bool success, bytes memory returndata) = target.staticcall(data);\r\n        return verifyCallResult(success, returndata, errorMessage);\r\n    }\r\n\r\n    /**\r\n     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`],\r\n     * but performing a delegate call.\r\n     *\r\n     * _Available since v3.4._\r\n     */\r\n    function functionDelegateCall(address target, bytes memory data) internal returns (bytes memory) {\r\n        return functionDelegateCall(target, data, "Address: low-level delegate call failed");\r\n    }\r\n\r\n    /**\r\n     * @dev Same as {xref-Address-functionCall-address-bytes-string-}[`functionCall`],\r\n     * but performing a delegate call.\r\n     *\r\n     * _Available since v3.4._\r\n     */\r\n    function functionDelegateCall(\r\n        address target,\r\n        bytes memory data,\r\n        string memory errorMessage\r\n    ) internal returns (bytes memory) {\r\n        require(isContract(target), "Address: delegate call to non-contract");\r\n\r\n        (bool success, bytes memory returndata) = target.delegatecall(data);\r\n        return verifyCallResult(success, returndata, errorMessage);\r\n    }\r\n\r\n    /**\r\n     * @dev Tool to verifies that a low level call was successful, and revert if it wasn\'t, either by bubbling the\r\n     * revert reason using the provided one.\r\n     *\r\n     * _Available since v4.3._\r\n     */\r\n    function verifyCallResult(\r\n        bool success,\r\n        bytes memory returndata,\r\n        string memory errorMessage\r\n    ) internal pure returns (bytes memory) {\r\n        if (success) {\r\n            return returndata;\r\n        } else {\r\n            // Look for revert reason and bubble it up if present\r\n            if (returndata.length > 0) {\r\n                // The easiest way to bubble the revert reason is using memory via assembly\r\n\r\n                assembly {\r\n                    let returndata_size := mload(returndata)\r\n                    revert(add(32, returndata), returndata_size)\r\n                }\r\n            } else {\r\n                revert(errorMessage);\r\n            }\r\n        }\r\n    }\r\n}\r\n\r\n// File: @openzeppelin/contracts/utils/StorageSlot.sol\r\n\r\n\r\npragma solidity ^0.8.0;\r\n\r\n/**\r\n * @dev Library for reading and writing primitive types to specific storage slots.\r\n *\r\n * Storage slots are often used to avoid storage conflict when dealing with upgradeable contracts.\r\n * This library helps with reading and writing to such slots without the need for inline assembly.\r\n *\r\n * The functions in this library return Slot structs that contain a `value` member that can be used to read or write.\r\n *\r\n * Example usage to set ERC1967 implementation slot:\r\n * ```\r\n * contract ERC1967 {\r\n *     bytes32 internal constant _IMPLEMENTATION_SLOT = 0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc;\r\n *\r\n *     function _getImplementation() internal view returns (address) {\r\n *         return StorageSlot.getAddressSlot(_IMPLEMENTATION_SLOT).value;\r\n *     }\r\n *\r\n *     function _setImplementation(address newImplementation) internal {\r\n *         require(Address.isContract(newImplementation), "ERC1967: new implementation is not a contract");\r\n *         StorageSlot.getAddressSlot(_IMPLEMENTATION_SLOT).value = newImplementation;\r\n *     }\r\n * }\r\n * ```\r\n *\r\n * _Available since v4.1 for `address`, `bool`, `bytes32`, and `uint256`._\r\n */\r\nlibrary StorageSlot {\r\n    struct AddressSlot {\r\n        address value;\r\n    }\r\n\r\n    struct BooleanSlot {\r\n        bool value;\r\n    }\r\n\r\n    struct Bytes32Slot {\r\n        bytes32 value;\r\n    }\r\n\r\n    struct Uint256Slot {\r\n        uint256 value;\r\n    }\r\n\r\n    /**\r\n     * @dev Returns an `AddressSlot` with member `value` located at `slot`.\r\n     */\r\n    function getAddressSlot(bytes32 slot) internal pure returns (AddressSlot storage r) {\r\n        assembly {\r\n            r.slot := slot\r\n        }\r\n    }\r\n\r\n    /**\r\n     * @dev Returns an `BooleanSlot` with member `value` located at `slot`.\r\n     */\r\n    function getBooleanSlot(bytes32 slot) internal pure returns (BooleanSlot storage r) {\r\n        assembly {\r\n            r.slot := slot\r\n        }\r\n    }\r\n\r\n    /**\r\n     * @dev Returns an `Bytes32Slot` with member `value` located at `slot`.\r\n     */\r\n    function getBytes32Slot(bytes32 slot) internal pure returns (Bytes32Slot storage r) {\r\n        assembly {\r\n            r.slot := slot\r\n        }\r\n    }\r\n\r\n    /**\r\n     * @dev Returns an `Uint256Slot` with member `value` located at `slot`.\r\n     */\r\n    function getUint256Slot(bytes32 slot) internal pure returns (Uint256Slot storage r) {\r\n        assembly {\r\n            r.slot := slot\r\n        }\r\n    }\r\n}\r\n\r\n// File: @openzeppelin/contracts/proxy/ERC1967/ERC1967Upgrade.sol\r\n\r\n\r\npragma solidity ^0.8.2;\r\n\r\n\r\n\r\n/**\r\n * @dev This abstract contract provides getters and event emitting update functions for\r\n * https://eips.ethereum.org/EIPS/eip-1967[EIP1967] slots.\r\n *\r\n * _Available since v4.1._\r\n *\r\n * @custom:oz-upgrades-unsafe-allow delegatecall\r\n */\r\nabstract contract ERC1967Upgrade {\r\n    // This is the keccak-256 hash of "eip1967.proxy.rollback" subtracted by 1\r\n    bytes32 private constant _ROLLBACK_SLOT = 0x4910fdfa16fed3260ed0e7147f7cc6da11a60208b5b9406d12a635614ffd9143;\r\n\r\n    /**\r\n     * @dev Storage slot with the address of the current implementation.\r\n     * This is the keccak-256 hash of "eip1967.proxy.implementation" subtracted by 1, and is\r\n     * validated in the constructor.\r\n     */\r\n    bytes32 internal constant _IMPLEMENTATION_SLOT = 0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc;\r\n\r\n    /**\r\n     * @dev Emitted when the implementation is upgraded.\r\n     */\r\n    event Upgraded(address indexed implementation);\r\n\r\n    /**\r\n     * @dev Returns the current implementation address.\r\n     */\r\n    function _getImplementation() internal view returns (address) {\r\n        return StorageSlot.getAddressSlot(_IMPLEMENTATION_SLOT).value;\r\n    }\r\n\r\n    /**\r\n     * @dev Stores a new address in the EIP1967 implementation slot.\r\n     */\r\n    function _setImplementation(address newImplementation) private {\r\n        require(Address.isContract(newImplementation), "ERC1967: new implementation is not a contract");\r\n        StorageSlot.getAddressSlot(_IMPLEMENTATION_SLOT).value = newImplementation;\r\n    }\r\n\r\n    /**\r\n     * @dev Perform implementation upgrade\r\n     *\r\n     * Emits an {Upgraded} event.\r\n     */\r\n    function _upgradeTo(address newImplementation) internal {\r\n        _setImplementation(newImplementation);\r\n        emit Upgraded(newImplementation);\r\n    }\r\n\r\n    /**\r\n     * @dev Perform implementation upgrade with additional setup call.\r\n     *\r\n     * Emits an {Upgraded} event.\r\n     */\r\n    function _upgradeToAndCall(\r\n        address newImplementation,\r\n        bytes memory data,\r\n        bool forceCall\r\n    ) internal {\r\n        _upgradeTo(newImplementation);\r\n        if (data.length > 0 || forceCall) {\r\n            Address.functionDelegateCall(newImplementation, data);\r\n        }\r\n    }\r\n\r\n    /**\r\n     * @dev Perform implementation upgrade with security checks for UUPS proxies, and additional setup call.\r\n     *\r\n     * Emits an {Upgraded} event.\r\n     */\r\n    function _upgradeToAndCallSecure(\r\n        address newImplementation,\r\n        bytes memory data,\r\n        bool forceCall\r\n    ) internal {\r\n        address oldImplementation = _getImplementation();\r\n\r\n        // Initial upgrade and setup call\r\n        _setImplementation(newImplementation);\r\n        if (data.length > 0 || forceCall) {\r\n            Address.functionDelegateCall(newImplementation, data);\r\n        }\r\n\r\n        // Perform rollback test if not already in progress\r\n        StorageSlot.BooleanSlot storage rollbackTesting = StorageSlot.getBooleanSlot(_ROLLBACK_SLOT);\r\n        if (!rollbackTesting.value) {\r\n            // Trigger rollback using upgradeTo from the new implementation\r\n            rollbackTesting.value = true;\r\n            Address.functionDelegateCall(\r\n                newImplementation,\r\n                abi.encodeWithSignature("upgradeTo(address)", oldImplementation)\r\n            );\r\n            rollbackTesting.value = false;\r\n            // Check rollback was effective\r\n            require(oldImplementation == _getImplementation(), "ERC1967Upgrade: upgrade breaks further upgrades");\r\n            // Finally reset to the new implementation and log the upgrade\r\n            _upgradeTo(newImplementation);\r\n        }\r\n    }\r\n\r\n    /**\r\n     * @dev Storage slot with the admin of the contract.\r\n     * This is the keccak-256 hash of "eip1967.proxy.admin" subtracted by 1, and is\r\n     * validated in the constructor.\r\n     */\r\n    bytes32 internal constant _ADMIN_SLOT = 0xb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d6103;\r\n\r\n    /**\r\n     * @dev Emitted when the admin account has changed.\r\n     */\r\n    event AdminChanged(address previousAdmin, address newAdmin);\r\n\r\n    /**\r\n     * @dev Returns the current admin.\r\n     */\r\n    function _getAdmin() internal view returns (address) {\r\n        return StorageSlot.getAddressSlot(_ADMIN_SLOT).value;\r\n    }\r\n\r\n    /**\r\n     * @dev Stores a new address in the EIP1967 admin slot.\r\n     */\r\n    function _setAdmin(address newAdmin) private {\r\n        require(newAdmin != address(0), "ERC1967: new admin is the zero address");\r\n        StorageSlot.getAddressSlot(_ADMIN_SLOT).value = newAdmin;\r\n    }\r\n\r\n    /**\r\n     * @dev Changes the admin of the proxy.\r\n     *\r\n     * Emits an {AdminChanged} event.\r\n     */\r\n    function _changeAdmin(address newAdmin) internal {\r\n        emit AdminChanged(_getAdmin(), newAdmin);\r\n        _setAdmin(newAdmin);\r\n    }\r\n\r\n    /**\r\n     * @dev The storage slot of the UpgradeableBeacon contract which defines the implementation for this proxy.\r\n     * This is bytes32(uint256(keccak256(\'eip1967.proxy.beacon\')) - 1)) and is validated in the constructor.\r\n     */\r\n    bytes32 internal constant _BEACON_SLOT = 0xa3f0ad74e5423aebfd80d3ef4346578335a9a72aeaee59ff6cb3582b35133d50;\r\n\r\n    /**\r\n     * @dev Emitted when the beacon is upgraded.\r\n     */\r\n    event BeaconUpgraded(address indexed beacon);\r\n\r\n    /**\r\n     * @dev Returns the current beacon.\r\n     */\r\n    function _getBeacon() internal view returns (address) {\r\n        return StorageSlot.getAddressSlot(_BEACON_SLOT).value;\r\n    }\r\n\r\n    /**\r\n     * @dev Stores a new beacon in the EIP1967 beacon slot.\r\n     */\r\n    function _setBeacon(address newBeacon) private {\r\n        require(Address.isContract(newBeacon), "ERC1967: new beacon is not a contract");\r\n        require(\r\n            Address.isContract(IBeacon(newBeacon).implementation()),\r\n            "ERC1967: beacon implementation is not a contract"\r\n        );\r\n        StorageSlot.getAddressSlot(_BEACON_SLOT).value = newBeacon;\r\n    }\r\n\r\n    /**\r\n     * @dev Perform beacon upgrade with additional setup call. Note: This upgrades the address of the beacon, it does\r\n     * not upgrade the implementation contained in the beacon (see {UpgradeableBeacon-_setImplementation} for that).\r\n     *\r\n     * Emits a {BeaconUpgraded} event.\r\n     */\r\n    function _upgradeBeaconToAndCall(\r\n        address newBeacon,\r\n        bytes memory data,\r\n        bool forceCall\r\n    ) internal {\r\n        _setBeacon(newBeacon);\r\n        emit BeaconUpgraded(newBeacon);\r\n        if (data.length > 0 || forceCall) {\r\n            Address.functionDelegateCall(IBeacon(newBeacon).implementation(), data);\r\n        }\r\n    }\r\n}\r\n\r\n// File: @openzeppelin/contracts/proxy/beacon/BeaconProxy.sol\r\n\r\n\r\npragma solidity ^0.8.0;\r\n\r\n\r\n\r\n/**\r\n * @dev This contract implements a proxy that gets the implementation address for each call from a {UpgradeableBeacon}.\r\n *\r\n * The beacon address is stored in storage slot `uint256(keccak256(\'eip1967.proxy.beacon\')) - 1`, so that it doesn\'t\r\n * conflict with the storage layout of the implementation behind the proxy.\r\n *\r\n * _Available since v3.4._\r\n */\r\ncontract BeaconProxy is Proxy, ERC1967Upgrade {\r\n    /**\r\n     * @dev Initializes the proxy with `beacon`.\r\n     *\r\n     * If `data` is nonempty, it\'s used as data in a delegate call to the implementation returned by the beacon. This\r\n     * will typically be an encoded function call, and allows initializating the storage of the proxy like a Solidity\r\n     * constructor.\r\n     *\r\n     * Requirements:\r\n     *\r\n     * - `beacon` must be a contract with the interface {IBeacon}.\r\n     */\r\n    constructor(address beacon, bytes memory data) payable {\r\n        assert(_BEACON_SLOT == bytes32(uint256(keccak256("eip1967.proxy.beacon")) - 1));\r\n        _upgradeBeaconToAndCall(beacon, data, false);\r\n    }\r\n\r\n    /**\r\n     * @dev Returns the current beacon address.\r\n     */\r\n    function _beacon() internal view virtual returns (address) {\r\n        return _getBeacon();\r\n    }\r\n\r\n    /**\r\n     * @dev Returns the current implementation address of the associated beacon.\r\n     */\r\n    function _implementation() internal view virtual override returns (address) {\r\n        return IBeacon(_getBeacon()).implementation();\r\n    }\r\n\r\n    /**\r\n     * @dev Changes the proxy to use a new beacon. Deprecated: see {_upgradeBeaconToAndCall}.\r\n     *\r\n     * If `data` is nonempty, it\'s used as data in a delegate call to the implementation returned by the beacon.\r\n     *\r\n     * Requirements:\r\n     *\r\n     * - `beacon` must be a contract.\r\n     * - The implementation returned by `beacon` must be a contract.\r\n     */\r\n    function _setBeacon(address beacon, bytes memory data) internal virtual {\r\n        _upgradeBeaconToAndCall(beacon, data, false);\r\n    }\r\n}\r\n\r\n// File: contracts/bridge/token/Token.sol\r\n\r\n// contracts/Structs.sol\r\n\r\npragma solidity ^0.8.0;\r\n\r\ncontract BridgeToken is BeaconProxy {\r\n    constructor(address beacon, bytes memory data) BeaconProxy(beacon, data) {\r\n\r\n    }\r\n}',
      ABI: '[{"inputs":[{"internalType":"address","name":"beacon","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"previousAdmin","type":"address"},{"indexed":false,"internalType":"address","name":"newAdmin","type":"address"}],"name":"AdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"beacon","type":"address"}],"name":"BeaconUpgraded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"implementation","type":"address"}],"name":"Upgraded","type":"event"},{"stateMutability":"payable","type":"fallback"},{"stateMutability":"payable","type":"receive"}]',
      ContractName: 'BridgeToken',
      CompilerVersion: 'v0.8.4+commit.c7e474f2',
      OptimizationUsed: '1',
      Runs: '200',
      ConstructorArguments:
        '000000000000000000000000796dff6d74f3e27060b71255fe517bfb23c93eed00000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000164c71f461500000000000000000000000000000000000000000000000000000000000000e0000000000000000000000000000000000000000000000000000000000000012000000000000000000000000000000000000000000000000000000000000000120000000000000000000000000000000000000000000000000000000000010e51000000000000000000000000796dff6d74f3e27060b71255fe517bfb23c93eed0000000000000000000000000000000000000000000000000000000000000002000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2000000000000000000000000000000000000000000000000000000000000000d57726170706564204574686572000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004574554480000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
      EVMVersion: 'Default',
      Library: '',
      LicenseType: 'Apache-2.0',
      Proxy: '1',
      Implementation: '0x796dff6d74f3e27060b71255fe517bfb23c93eed',
      SwarmSource: 'ipfs://3e23ac4f79a95247999f8e0df94ea5bd5e38561ccfd051b0ea50ba9aea59b8f1',
    },
  ],
}

const IMPLEMENATATION_CONTRACT = {
  status: '1',
  message: 'OK',
  result: [
    {
      SourceCode:
        '// File: @openzeppelin/contracts/proxy/Proxy.sol\r\n\r\n// SPDX-License-Identifier: MIT\r\n\r\npragma solidity ^0.8.0;\r\n\r\n/**\r\n * @dev This abstract contract provides a fallback function that delegates all calls to another contract using the EVM\r\n * instruction `delegatecall`. We refer to the second contract as the _implementation_ behind the proxy, and it has to\r\n * be specified by overriding the virtual {_implementation} function.\r\n *\r\n * Additionally, delegation to the implementation can be triggered manually through the {_fallback} function, or to a\r\n * different contract through the {_delegate} function.\r\n *\r\n * The success and return data of the delegated call will be returned back to the caller of the proxy.\r\n */\r\nabstract contract Proxy {\r\n    /**\r\n     * @dev Delegates the current call to `implementation`.\r\n     *\r\n     * This function does not return to its internall call site, it will return directly to the external caller.\r\n     */\r\n    function _delegate(address implementation) internal virtual {\r\n        assembly {\r\n            // Copy msg.data. We take full control of memory in this inline assembly\r\n            // block because it will not return to Solidity code. We overwrite the\r\n            // Solidity scratch pad at memory position 0.\r\n            calldatacopy(0, 0, calldatasize())\r\n\r\n            // Call the implementation.\r\n            // out and outsize are 0 because we don\'t know the size yet.\r\n            let result := delegatecall(gas(), implementation, 0, calldatasize(), 0, 0)\r\n\r\n            // Copy the returned data.\r\n            returndatacopy(0, 0, returndatasize())\r\n\r\n            switch result\r\n            // delegatecall returns 0 on error.\r\n            case 0 {\r\n                revert(0, returndatasize())\r\n            }\r\n            default {\r\n                return(0, returndatasize())\r\n            }\r\n        }\r\n    }\r\n\r\n    /**\r\n     * @dev This is a virtual function that should be overriden so it returns the address to which the fallback function\r\n     * and {_fallback} should delegate.\r\n     */\r\n    function _implementation() internal view virtual returns (address);\r\n\r\n    /**\r\n     * @dev Delegates the current call to the address returned by `_implementation()`.\r\n     *\r\n     * This function does not return to its internall call site, it will return directly to the external caller.\r\n     */\r\n    function _fallback() internal virtual {\r\n        _beforeFallback();\r\n        _delegate(_implementation());\r\n    }\r\n\r\n    /**\r\n     * @dev Fallback function that delegates calls to the address returned by `_implementation()`. Will run if no other\r\n     * function in the contract matches the call data.\r\n     */\r\n    fallback() external payable virtual {\r\n        _fallback();\r\n    }\r\n\r\n    /**\r\n     * @dev Fallback function that delegates calls to the address returned by `_implementation()`. Will run if call data\r\n     * is empty.\r\n     */\r\n    receive() external payable virtual {\r\n        _fallback();\r\n    }\r\n\r\n    /**\r\n     * @dev Hook that is called before falling back to the implementation. Can happen as part of a manual `_fallback`\r\n     * call, or as part of the Solidity `fallback` or `receive` functions.\r\n     *\r\n     * If overriden should call `super._beforeFallback()`.\r\n     */\r\n    function _beforeFallback() internal virtual {}\r\n}\r\n\r\n// File: @openzeppelin/contracts/proxy/beacon/IBeacon.sol\r\n\r\npragma solidity ^0.8.0;\r\n\r\n/**\r\n * @dev This is the interface that {BeaconProxy} expects of its beacon.\r\n */\r\ninterface IBeacon {\r\n    /**\r\n     * @dev Must return an address that can be used as a delegate call target.\r\n     *\r\n     * {BeaconProxy} will check that this address is a contract.\r\n     */\r\n    function implementation() external view returns (address);\r\n}\r\n\r\n// File: @openzeppelin/contracts/utils/Address.sol\r\n\r\npragma solidity ^0.8.0;\r\n\r\n/**\r\n * @dev Collection of functions related to the address type\r\n */\r\nlibrary Address {\r\n    /**\r\n     * @dev Returns true if `account` is a contract.\r\n     *\r\n     * [IMPORTANT]\r\n     * ====\r\n     * It is unsafe to assume that an address for which this function returns\r\n     * false is an externally-owned account (EOA) and not a contract.\r\n     *\r\n     * Among others, `isContract` will return false for the following\r\n     * types of addresses:\r\n     *\r\n     *  - an externally-owned account\r\n     *  - a contract in construction\r\n     *  - an address where a contract will be created\r\n     *  - an address where a contract lived, but was destroyed\r\n     * ====\r\n     */\r\n    function isContract(address account) internal view returns (bool) {\r\n        // This method relies on extcodesize, which returns 0 for contracts in\r\n        // construction, since the code is only stored at the end of the\r\n        // constructor execution.\r\n\r\n        uint256 size;\r\n        assembly {\r\n            size := extcodesize(account)\r\n        }\r\n        return size > 0;\r\n    }\r\n\r\n    /**\r\n     * @dev Replacement for Solidity\'s `transfer`: sends `amount` wei to\r\n     * `recipient`, forwarding all available gas and reverting on errors.\r\n     *\r\n     * https://eips.ethereum.org/EIPS/eip-1884[EIP1884] increases the gas cost\r\n     * of certain opcodes, possibly making contracts go over the 2300 gas limit\r\n     * imposed by `transfer`, making them unable to receive funds via\r\n     * `transfer`. {sendValue} removes this limitation.\r\n     *\r\n     * https://diligence.consensys.net/posts/2019/09/stop-using-soliditys-transfer-now/[Learn more].\r\n     *\r\n     * IMPORTANT: because control is transferred to `recipient`, care must be\r\n     * taken to not create reentrancy vulnerabilities. Consider using\r\n     * {ReentrancyGuard} or the\r\n     * https://solidity.readthedocs.io/en/v0.5.11/security-considerations.html#use-the-checks-effects-interactions-pattern[checks-effects-interactions pattern].\r\n     */\r\n    function sendValue(address payable recipient, uint256 amount) internal {\r\n        require(address(this).balance >= amount, "Address: insufficient balance");\r\n\r\n        (bool success, ) = recipient.call{value: amount}("");\r\n        require(success, "Address: unable to send value, recipient may have reverted");\r\n    }\r\n\r\n    /**\r\n     * @dev Performs a Solidity function call using a low level `call`. A\r\n     * plain `call` is an unsafe replacement for a function call: use this\r\n     * function instead.\r\n     *\r\n     * If `target` reverts with a revert reason, it is bubbled up by this\r\n     * function (like regular Solidity function calls).\r\n     *\r\n     * Returns the raw returned data. To convert to the expected return value,\r\n     * use https://solidity.readthedocs.io/en/latest/units-and-global-variables.html?highlight=abi.decode#abi-encoding-and-decoding-functions[`abi.decode`].\r\n     *\r\n     * Requirements:\r\n     *\r\n     * - `target` must be a contract.\r\n     * - calling `target` with `data` must not revert.\r\n     *\r\n     * _Available since v3.1._\r\n     */\r\n    function functionCall(address target, bytes memory data) internal returns (bytes memory) {\r\n        return functionCall(target, data, "Address: low-level call failed");\r\n    }\r\n\r\n    /**\r\n     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`], but with\r\n     * `errorMessage` as a fallback revert reason when `target` reverts.\r\n     *\r\n     * _Available since v3.1._\r\n     */\r\n    function functionCall(\r\n        address target,\r\n        bytes memory data,\r\n        string memory errorMessage\r\n    ) internal returns (bytes memory) {\r\n        return functionCallWithValue(target, data, 0, errorMessage);\r\n    }\r\n\r\n    /**\r\n     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`],\r\n     * but also transferring `value` wei to `target`.\r\n     *\r\n     * Requirements:\r\n     *\r\n     * - the calling contract must have an ETH balance of at least `value`.\r\n     * - the called Solidity function must be `payable`.\r\n     *\r\n     * _Available since v3.1._\r\n     */\r\n    function functionCallWithValue(\r\n        address target,\r\n        bytes memory data,\r\n        uint256 value\r\n    ) internal returns (bytes memory) {\r\n        return functionCallWithValue(target, data, value, "Address: low-level call with value failed");\r\n    }\r\n\r\n    /**\r\n     * @dev Same as {xref-Address-functionCallWithValue-address-bytes-uint256-}[`functionCallWithValue`], but\r\n     * with `errorMessage` as a fallback revert reason when `target` reverts.\r\n     *\r\n     * _Available since v3.1._\r\n     */\r\n    function functionCallWithValue(\r\n        address target,\r\n        bytes memory data,\r\n        uint256 value,\r\n        string memory errorMessage\r\n    ) internal returns (bytes memory) {\r\n        require(address(this).balance >= value, "Address: insufficient balance for call");\r\n        require(isContract(target), "Address: call to non-contract");\r\n\r\n        (bool success, bytes memory returndata) = target.call{value: value}(data);\r\n        return verifyCallResult(success, returndata, errorMessage);\r\n    }\r\n\r\n    /**\r\n     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`],\r\n     * but performing a static call.\r\n     *\r\n     * _Available since v3.3._\r\n     */\r\n    function functionStaticCall(address target, bytes memory data) internal view returns (bytes memory) {\r\n        return functionStaticCall(target, data, "Address: low-level static call failed");\r\n    }\r\n\r\n    /**\r\n     * @dev Same as {xref-Address-functionCall-address-bytes-string-}[`functionCall`],\r\n     * but performing a static call.\r\n     *\r\n     * _Available since v3.3._\r\n     */\r\n    function functionStaticCall(\r\n        address target,\r\n        bytes memory data,\r\n        string memory errorMessage\r\n    ) internal view returns (bytes memory) {\r\n        require(isContract(target), "Address: static call to non-contract");\r\n\r\n        (bool success, bytes memory returndata) = target.staticcall(data);\r\n        return verifyCallResult(success, returndata, errorMessage);\r\n    }\r\n\r\n    /**\r\n     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`],\r\n     * but performing a delegate call.\r\n     *\r\n     * _Available since v3.4._\r\n     */\r\n    function functionDelegateCall(address target, bytes memory data) internal returns (bytes memory) {\r\n        return functionDelegateCall(target, data, "Address: low-level delegate call failed");\r\n    }\r\n\r\n    /**\r\n     * @dev Same as {xref-Address-functionCall-address-bytes-string-}[`functionCall`],\r\n     * but performing a delegate call.\r\n     *\r\n     * _Available since v3.4._\r\n     */\r\n    function functionDelegateCall(\r\n        address target,\r\n        bytes memory data,\r\n        string memory errorMessage\r\n    ) internal returns (bytes memory) {\r\n        require(isContract(target), "Address: delegate call to non-contract");\r\n\r\n        (bool success, bytes memory returndata) = target.delegatecall(data);\r\n        return verifyCallResult(success, returndata, errorMessage);\r\n    }\r\n\r\n    /**\r\n     * @dev Tool to verifies that a low level call was successful, and revert if it wasn\'t, either by bubbling the\r\n     * revert reason using the provided one.\r\n     *\r\n     * _Available since v4.3._\r\n     */\r\n    function verifyCallResult(\r\n        bool success,\r\n        bytes memory returndata,\r\n        string memory errorMessage\r\n    ) internal pure returns (bytes memory) {\r\n        if (success) {\r\n            return returndata;\r\n        } else {\r\n            // Look for revert reason and bubble it up if present\r\n            if (returndata.length > 0) {\r\n                // The easiest way to bubble the revert reason is using memory via assembly\r\n\r\n                assembly {\r\n                    let returndata_size := mload(returndata)\r\n                    revert(add(32, returndata), returndata_size)\r\n                }\r\n            } else {\r\n                revert(errorMessage);\r\n            }\r\n        }\r\n    }\r\n}\r\n\r\n// File: @openzeppelin/contracts/utils/StorageSlot.sol\r\n\r\npragma solidity ^0.8.0;\r\n\r\n/**\r\n * @dev Library for reading and writing primitive types to specific storage slots.\r\n *\r\n * Storage slots are often used to avoid storage conflict when dealing with upgradeable contracts.\r\n * This library helps with reading and writing to such slots without the need for inline assembly.\r\n *\r\n * The functions in this library return Slot structs that contain a `value` member that can be used to read or write.\r\n *\r\n * Example usage to set ERC1967 implementation slot:\r\n * ```\r\n * contract ERC1967 {\r\n *     bytes32 internal constant _IMPLEMENTATION_SLOT = 0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc;\r\n *\r\n *     function _getImplementation() internal view returns (address) {\r\n *         return StorageSlot.getAddressSlot(_IMPLEMENTATION_SLOT).value;\r\n *     }\r\n *\r\n *     function _setImplementation(address newImplementation) internal {\r\n *         require(Address.isContract(newImplementation), "ERC1967: new implementation is not a contract");\r\n *         StorageSlot.getAddressSlot(_IMPLEMENTATION_SLOT).value = newImplementation;\r\n *     }\r\n * }\r\n * ```\r\n *\r\n * _Available since v4.1 for `address`, `bool`, `bytes32`, and `uint256`._\r\n */\r\nlibrary StorageSlot {\r\n    struct AddressSlot {\r\n        address value;\r\n    }\r\n\r\n    struct BooleanSlot {\r\n        bool value;\r\n    }\r\n\r\n    struct Bytes32Slot {\r\n        bytes32 value;\r\n    }\r\n\r\n    struct Uint256Slot {\r\n        uint256 value;\r\n    }\r\n\r\n    /**\r\n     * @dev Returns an `AddressSlot` with member `value` located at `slot`.\r\n     */\r\n    function getAddressSlot(bytes32 slot) internal pure returns (AddressSlot storage r) {\r\n        assembly {\r\n            r.slot := slot\r\n        }\r\n    }\r\n\r\n    /**\r\n     * @dev Returns an `BooleanSlot` with member `value` located at `slot`.\r\n     */\r\n    function getBooleanSlot(bytes32 slot) internal pure returns (BooleanSlot storage r) {\r\n        assembly {\r\n            r.slot := slot\r\n        }\r\n    }\r\n\r\n    /**\r\n     * @dev Returns an `Bytes32Slot` with member `value` located at `slot`.\r\n     */\r\n    function getBytes32Slot(bytes32 slot) internal pure returns (Bytes32Slot storage r) {\r\n        assembly {\r\n            r.slot := slot\r\n        }\r\n    }\r\n\r\n    /**\r\n     * @dev Returns an `Uint256Slot` with member `value` located at `slot`.\r\n     */\r\n    function getUint256Slot(bytes32 slot) internal pure returns (Uint256Slot storage r) {\r\n        assembly {\r\n            r.slot := slot\r\n        }\r\n    }\r\n}\r\n\r\n// File: @openzeppelin/contracts/proxy/ERC1967/ERC1967Upgrade.sol\r\n\r\npragma solidity ^0.8.2;\r\n\r\n\r\n\r\n/**\r\n * @dev This abstract contract provides getters and event emitting update functions for\r\n * https://eips.ethereum.org/EIPS/eip-1967[EIP1967] slots.\r\n *\r\n * _Available since v4.1._\r\n *\r\n * @custom:oz-upgrades-unsafe-allow delegatecall\r\n */\r\nabstract contract ERC1967Upgrade {\r\n    // This is the keccak-256 hash of "eip1967.proxy.rollback" subtracted by 1\r\n    bytes32 private constant _ROLLBACK_SLOT = 0x4910fdfa16fed3260ed0e7147f7cc6da11a60208b5b9406d12a635614ffd9143;\r\n\r\n    /**\r\n     * @dev Storage slot with the address of the current implementation.\r\n     * This is the keccak-256 hash of "eip1967.proxy.implementation" subtracted by 1, and is\r\n     * validated in the constructor.\r\n     */\r\n    bytes32 internal constant _IMPLEMENTATION_SLOT = 0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc;\r\n\r\n    /**\r\n     * @dev Emitted when the implementation is upgraded.\r\n     */\r\n    event Upgraded(address indexed implementation);\r\n\r\n    /**\r\n     * @dev Returns the current implementation address.\r\n     */\r\n    function _getImplementation() internal view returns (address) {\r\n        return StorageSlot.getAddressSlot(_IMPLEMENTATION_SLOT).value;\r\n    }\r\n\r\n    /**\r\n     * @dev Stores a new address in the EIP1967 implementation slot.\r\n     */\r\n    function _setImplementation(address newImplementation) private {\r\n        require(Address.isContract(newImplementation), "ERC1967: new implementation is not a contract");\r\n        StorageSlot.getAddressSlot(_IMPLEMENTATION_SLOT).value = newImplementation;\r\n    }\r\n\r\n    /**\r\n     * @dev Perform implementation upgrade\r\n     *\r\n     * Emits an {Upgraded} event.\r\n     */\r\n    function _upgradeTo(address newImplementation) internal {\r\n        _setImplementation(newImplementation);\r\n        emit Upgraded(newImplementation);\r\n    }\r\n\r\n    /**\r\n     * @dev Perform implementation upgrade with additional setup call.\r\n     *\r\n     * Emits an {Upgraded} event.\r\n     */\r\n    function _upgradeToAndCall(\r\n        address newImplementation,\r\n        bytes memory data,\r\n        bool forceCall\r\n    ) internal {\r\n        _upgradeTo(newImplementation);\r\n        if (data.length > 0 || forceCall) {\r\n            Address.functionDelegateCall(newImplementation, data);\r\n        }\r\n    }\r\n\r\n    /**\r\n     * @dev Perform implementation upgrade with security checks for UUPS proxies, and additional setup call.\r\n     *\r\n     * Emits an {Upgraded} event.\r\n     */\r\n    function _upgradeToAndCallSecure(\r\n        address newImplementation,\r\n        bytes memory data,\r\n        bool forceCall\r\n    ) internal {\r\n        address oldImplementation = _getImplementation();\r\n\r\n        // Initial upgrade and setup call\r\n        _setImplementation(newImplementation);\r\n        if (data.length > 0 || forceCall) {\r\n            Address.functionDelegateCall(newImplementation, data);\r\n        }\r\n\r\n        // Perform rollback test if not already in progress\r\n        StorageSlot.BooleanSlot storage rollbackTesting = StorageSlot.getBooleanSlot(_ROLLBACK_SLOT);\r\n        if (!rollbackTesting.value) {\r\n            // Trigger rollback using upgradeTo from the new implementation\r\n            rollbackTesting.value = true;\r\n            Address.functionDelegateCall(\r\n                newImplementation,\r\n                abi.encodeWithSignature("upgradeTo(address)", oldImplementation)\r\n            );\r\n            rollbackTesting.value = false;\r\n            // Check rollback was effective\r\n            require(oldImplementation == _getImplementation(), "ERC1967Upgrade: upgrade breaks further upgrades");\r\n            // Finally reset to the new implementation and log the upgrade\r\n            _upgradeTo(newImplementation);\r\n        }\r\n    }\r\n\r\n    /**\r\n     * @dev Storage slot with the admin of the contract.\r\n     * This is the keccak-256 hash of "eip1967.proxy.admin" subtracted by 1, and is\r\n     * validated in the constructor.\r\n     */\r\n    bytes32 internal constant _ADMIN_SLOT = 0xb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d6103;\r\n\r\n    /**\r\n     * @dev Emitted when the admin account has changed.\r\n     */\r\n    event AdminChanged(address previousAdmin, address newAdmin);\r\n\r\n    /**\r\n     * @dev Returns the current admin.\r\n     */\r\n    function _getAdmin() internal view returns (address) {\r\n        return StorageSlot.getAddressSlot(_ADMIN_SLOT).value;\r\n    }\r\n\r\n    /**\r\n     * @dev Stores a new address in the EIP1967 admin slot.\r\n     */\r\n    function _setAdmin(address newAdmin) private {\r\n        require(newAdmin != address(0), "ERC1967: new admin is the zero address");\r\n        StorageSlot.getAddressSlot(_ADMIN_SLOT).value = newAdmin;\r\n    }\r\n\r\n    /**\r\n     * @dev Changes the admin of the proxy.\r\n     *\r\n     * Emits an {AdminChanged} event.\r\n     */\r\n    function _changeAdmin(address newAdmin) internal {\r\n        emit AdminChanged(_getAdmin(), newAdmin);\r\n        _setAdmin(newAdmin);\r\n    }\r\n\r\n    /**\r\n     * @dev The storage slot of the UpgradeableBeacon contract which defines the implementation for this proxy.\r\n     * This is bytes32(uint256(keccak256(\'eip1967.proxy.beacon\')) - 1)) and is validated in the constructor.\r\n     */\r\n    bytes32 internal constant _BEACON_SLOT = 0xa3f0ad74e5423aebfd80d3ef4346578335a9a72aeaee59ff6cb3582b35133d50;\r\n\r\n    /**\r\n     * @dev Emitted when the beacon is upgraded.\r\n     */\r\n    event BeaconUpgraded(address indexed beacon);\r\n\r\n    /**\r\n     * @dev Returns the current beacon.\r\n     */\r\n    function _getBeacon() internal view returns (address) {\r\n        return StorageSlot.getAddressSlot(_BEACON_SLOT).value;\r\n    }\r\n\r\n    /**\r\n     * @dev Stores a new beacon in the EIP1967 beacon slot.\r\n     */\r\n    function _setBeacon(address newBeacon) private {\r\n        require(Address.isContract(newBeacon), "ERC1967: new beacon is not a contract");\r\n        require(\r\n            Address.isContract(IBeacon(newBeacon).implementation()),\r\n            "ERC1967: beacon implementation is not a contract"\r\n        );\r\n        StorageSlot.getAddressSlot(_BEACON_SLOT).value = newBeacon;\r\n    }\r\n\r\n    /**\r\n     * @dev Perform beacon upgrade with additional setup call. Note: This upgrades the address of the beacon, it does\r\n     * not upgrade the implementation contained in the beacon (see {UpgradeableBeacon-_setImplementation} for that).\r\n     *\r\n     * Emits a {BeaconUpgraded} event.\r\n     */\r\n    function _upgradeBeaconToAndCall(\r\n        address newBeacon,\r\n        bytes memory data,\r\n        bool forceCall\r\n    ) internal {\r\n        _setBeacon(newBeacon);\r\n        emit BeaconUpgraded(newBeacon);\r\n        if (data.length > 0 || forceCall) {\r\n            Address.functionDelegateCall(IBeacon(newBeacon).implementation(), data);\r\n        }\r\n    }\r\n}\r\n\r\n// File: @openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol\r\n\r\npragma solidity ^0.8.0;\r\n\r\n\r\n/**\r\n * @dev This contract implements an upgradeable proxy. It is upgradeable because calls are delegated to an\r\n * implementation address that can be changed. This address is stored in storage in the location specified by\r\n * https://eips.ethereum.org/EIPS/eip-1967[EIP1967], so that it doesn\'t conflict with the storage layout of the\r\n * implementation behind the proxy.\r\n */\r\ncontract ERC1967Proxy is Proxy, ERC1967Upgrade {\r\n    /**\r\n     * @dev Initializes the upgradeable proxy with an initial implementation specified by `_logic`.\r\n     *\r\n     * If `_data` is nonempty, it\'s used as data in a delegate call to `_logic`. This will typically be an encoded\r\n     * function call, and allows initializating the storage of the proxy like a Solidity constructor.\r\n     */\r\n    constructor(address _logic, bytes memory _data) payable {\r\n        assert(_IMPLEMENTATION_SLOT == bytes32(uint256(keccak256("eip1967.proxy.implementation")) - 1));\r\n        _upgradeToAndCall(_logic, _data, false);\r\n    }\r\n\r\n    /**\r\n     * @dev Returns the current implementation address.\r\n     */\r\n    function _implementation() internal view virtual override returns (address impl) {\r\n        return ERC1967Upgrade._getImplementation();\r\n    }\r\n}\r\n\r\n// File: contracts/bridge/TokenBridge.sol\r\n\r\n// contracts/Wormhole.sol\r\n\r\npragma solidity ^0.8.0;\r\n\r\ncontract TokenBridge is ERC1967Proxy {\r\n    constructor (address implementation, bytes memory initData)\r\n    ERC1967Proxy(\r\n        implementation,\r\n        initData\r\n    )\r\n    {}\r\n}',
      ABI: '[{"inputs":[{"internalType":"address","name":"implementation","type":"address"},{"internalType":"bytes","name":"initData","type":"bytes"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"previousAdmin","type":"address"},{"indexed":false,"internalType":"address","name":"newAdmin","type":"address"}],"name":"AdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"beacon","type":"address"}],"name":"BeaconUpgraded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"implementation","type":"address"}],"name":"Upgraded","type":"event"},{"stateMutability":"payable","type":"fallback"},{"stateMutability":"payable","type":"receive"}]',
      ContractName: 'TokenBridge',
      CompilerVersion: 'v0.8.4+commit.c7e474f2',
      OptimizationUsed: '1',
      Runs: '200',
      ConstructorArguments:
        '00000000000000000000000051b5123a7b0f9b2ba265f9c4c8de7d78d52f510f000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000e43bfa0638000000000000000000000000b91e3638f82a1facb28690b37e3aae45d2c33808000000000000000000000000000000000000000000000000000000000000000e000000000000000000000000a321448d90d4e5b0a732867c18ea198e75cac48e00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000004000000000000000000000000a5f208e072434bc67592e4c49c1b991ba79bca46000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
      EVMVersion: 'Default',
      Library: '',
      LicenseType: 'Apache-2.0',
      Proxy: '1',
      Implementation: '0x99dd86b81080e1cc794695b9e740b979d0286649',
      SwarmSource: 'ipfs://c651652cc0041da7a6ccfbb62ab4d69a33d006e787e6a41c09cd2b8fb857905d',
    },
  ],
}
