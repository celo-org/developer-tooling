/**
 * Compile-time type safety verification for strongly-typed contract methods.
 *
 * This file is NOT a runtime test. It uses TypeScript's type system to verify
 * that proxyCall and proxySend enforce correct method names and argument types
 * at compile time. The @ts-expect-error directives verify that intentional
 * type errors are caught by the TypeScript compiler.
 *
 * Run with: yarn workspace @celo/contractkit run build
 */

import { accountsABI } from '@celo/abis'
import type { Connection } from '@celo/connect'
import type { CeloContract, ViemContract } from '@celo/connect'
import { proxyCall, proxySend } from '../wrappers/BaseWrapper'

// Declare a typed Accounts contract with const-typed ABI
declare const accountsContract: ViemContract<typeof accountsABI>

// Declare a dummy connection for proxySend tests
declare const connection: Connection

// ============================================================================
// Test 1: proxyCall with correct method name compiles
// ============================================================================
// This should compile without error. 'isAccount' is a valid view method on Accounts.
void proxyCall(accountsContract, 'isAccount')

// ============================================================================
// Test 2: proxyCall with incorrect method name fails
// ============================================================================
// This should fail at compile time. 'isAcount' (typo) is not a valid method.
// @ts-expect-error - 'isAcount' is not a valid method name on Accounts contract
void proxyCall(accountsContract, 'isAcount')

// ============================================================================
// Test 3: proxySend with correct method name compiles
// ============================================================================
// This should compile without error. 'createAccount' is a valid send method on Accounts.
void proxySend(connection, accountsContract, 'createAccount')

// ============================================================================
// Test 4: proxySend with incorrect method name fails
// ============================================================================
// This should fail at compile time. 'createAcount' (typo) is not a valid method.
// @ts-expect-error - 'createAcount' is not a valid method name on Accounts contract
void proxySend(connection, accountsContract, 'createAcount')

// ============================================================================
// Test 5: proxyCall with another valid view method compiles
// ============================================================================
// 'getVoteSigner' is a valid view method on Accounts.
void proxyCall(accountsContract, 'getVoteSigner')

// ============================================================================
// Test 6: proxySend with another valid send method compiles
// ============================================================================
// 'authorizeVoteSigner' is a valid send method on Accounts.
void proxySend(connection, accountsContract, 'authorizeVoteSigner')

// ============================================================================
// Test 7: proxyCall rejects a send-only method
// ============================================================================
// 'createAccount' is a send method, not a view method. proxyCall should reject it.
// @ts-expect-error - 'createAccount' is not a view/pure method
void proxyCall(accountsContract, 'createAccount')

// ============================================================================
// Test 8: proxySend rejects a view-only method
// ============================================================================
// 'isAccount' is a view method, not a send method. proxySend should reject it.
// @ts-expect-error - 'isAccount' is not a nonpayable/payable method
void proxySend(connection, accountsContract, 'isAccount')

// ============================================================================
// Tests 9-12: CeloContract (GetContractReturnType) compatibility
// ============================================================================

// CeloContract uses viem's GetContractReturnType which has a different shape
// than ViemContract. The ContractLike<TAbi> parameter type ensures both work.
declare const celoContract: CeloContract<typeof accountsABI>

// Test 9: proxyCall with CeloContract and correct method name compiles
void proxyCall(celoContract, 'isAccount')

// Test 10: proxySend with CeloContract and correct method name compiles
void proxySend(connection, celoContract, 'createAccount')

// Test 11: proxyCall with CeloContract rejects incorrect method name
// @ts-expect-error - 'isAcount' is not a valid method name on Accounts contract
void proxyCall(celoContract, 'isAcount')

// Test 12: proxySend with CeloContract rejects incorrect method name
// @ts-expect-error - 'createAcount' is not a valid method name on Accounts contract
void proxySend(connection, celoContract, 'createAcount')
