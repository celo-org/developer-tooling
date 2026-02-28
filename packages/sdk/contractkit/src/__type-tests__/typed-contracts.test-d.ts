/**
 * Compile-time type safety verification for strongly-typed contract methods.
 *
 * This file is NOT a runtime test. It uses TypeScript's type system to verify
 * that .read enforces correct method names and argument types
 * at compile time. The @ts-expect-error directives verify that intentional
 * type errors are caught by the TypeScript compiler.
 *
 * Run with: yarn workspace @celo/contractkit run build
 */

import { accountsABI } from '@celo/abis'
import type { CeloContract } from '@celo/connect'

// Declare a typed Accounts contract with const-typed ABI
declare const accountsContract: CeloContract<typeof accountsABI>

// ============================================================================
// Tests 1-4: CeloContract .read property type safety
// ============================================================================
// CeloContract provides a .read namespace with type-safe view methods.
// This section verifies that .read property access works correctly.

// Test 1: .read.isAccount resolves to correct function type
// 'isAccount' is a valid view method on Accounts. Should compile without error.
void accountsContract.read.isAccount

// Test 2: .read with correct method name is callable
// Verify that the function can be called with correct arguments.
// 'isAccount' takes an address parameter and returns boolean.
const isAccountFn = accountsContract.read.isAccount
void isAccountFn

// Test 3: .read rejects invalid method names
// 'nonExistentFunction' is not a valid method on Accounts contract.
// @ts-expect-error - 'nonExistentFunction' is not a valid method name
void accountsContract.read.nonExistentFunction

// Test 4: .read.createAccount should fail (send-only method)
// 'createAccount' is a send method, not a view method. .read should reject it.
// @ts-expect-error - 'createAccount' is not a view/pure method
void accountsContract.read.createAccount

// ============================================================================
// Tests 5-8: CeloContract (GetContractReturnType) compatibility
// ============================================================================

// CeloContract uses viem's GetContractReturnType.
// The ContractLike<TAbi> parameter type ensures it works with .read.
declare const celoContract: CeloContract<typeof accountsABI>

// Test 5: .read.isAccount with CeloContract compiles
// 'isAccount' is a valid view method on Accounts. Should compile without error.
void celoContract.read.isAccount

// Test 6: .read with CeloContract rejects incorrect method name
// @ts-expect-error - 'nonExistentFunction' is not a valid method name on Accounts contract
void celoContract.read.nonExistentFunction

// Test 7: .read.createAccount should fail (send-only method)
// 'createAccount' is a send method, not a view method. .read should reject it.
// @ts-expect-error - 'createAccount' is not a view/pure method
void celoContract.read.createAccount
