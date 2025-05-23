import { accountsABI, goldTokenABI, multiSigABI } from '@celo/abis'
import { resolveAddress } from '@celo/actions'
import {
  AccountsContract,
  getAccountsContract,
  signerToAccount,
} from '@celo/actions/contracts/accounts'
import {
  FeeCurrencyDirectory,
  getFeeCurrencyDirectoryContract,
} from '@celo/actions/contracts/feecurrency-directory'
import {
  getGovernanceContract,
  getProposalStage,
  GovernanceContract,
} from '@celo/actions/contracts/governance'
import { getLockedCeloContract, LockedCeloContract } from '@celo/actions/contracts/locked-celo'
import { getValidatorsContract, ValidatorsContract } from '@celo/actions/contracts/validators'
import { bufferToHex, ensureLeading0x, NULL_ADDRESS, StrongAddress } from '@celo/base/lib/address'
import { Address } from '@celo/connect'
import { HotfixRecord, ProposalStage } from '@celo/contractkit/lib/wrappers/Governance'
import BigNumber from 'bignumber.js'
import chalk from 'chalk'
import { fetch } from 'cross-fetch'
import {
  erc20Abi,
  formatEther,
  formatUnits,
  getAddress,
  isAddressEqual,
  PublicClient,
  WalletClient,
} from 'viem'
import { BaseCommand } from '../base'
import { getHotfixRecord, getProposalSchedule } from '../packages-to-be/governance'
import { StableToken, StableTokens } from '../packages-to-be/stable-tokens'
import { bigintToBigNumber, bigNumberToBigInt } from '../packages-to-be/utils'
import {
  getValidator,
  getValidatorGroup,
  getValidatorLockedGoldRequirements,
  getValidatorMembershipHistoryExtraData,
  meetsValidatorBalanceRequirements,
  meetsValidatorGroupBalanceRequirements,
} from '../packages-to-be/validators'
import { getCurrentTimestamp, printValueMapRecursive } from './cli'
export interface CommandCheck {
  name: string
  errorMessage?: string
  run(): Promise<boolean> | boolean
}

export function check(
  name: string,
  predicate: () => Promise<boolean> | boolean,
  errorMessage?: string
): CommandCheck {
  return {
    name,
    errorMessage,
    run: predicate,
  }
}

const negate = (x: Promise<boolean>) => x.then((y) => !y)

type Resolve<A> = A extends Promise<infer T> ? T : A

export function newCheckBuilder(command: BaseCommand, signer?: Address) {
  return new CheckBuilder(command, signer ? ensureLeading0x(signer) : undefined)
}

class CheckBuilder {
  private checks: CommandCheck[] = []
  private COMPLIANT_ERROR_RESPONSE =
    "'The wallet address has been sanctioned by the U.S. Department of the Treasury.''All U.S. persons are prohibited from accessing, receiving, accepting, or facilitating any property 'and interests in property (including use of any technology, software or software patch(es)) of these'designated digital wallet addresses.  These prohibitions include the making of any contribution or''provision of funds, goods, or services by, to, or for the benefit of any blocked person and the ''receipt of any contribution or provision of funds, goods, or services from any such person and ' 'all designated digital asset wallets.'"
  constructor(private command: BaseCommand, private signer?: StrongAddress) {}

  private async getClient(): Promise<PublicClient> {
    // In this case we're not using any Celo-specific client features, so it can be
    // safely casted to PublicClient
    return this.command.getPublicClient() as Promise<PublicClient>
  }

  private async getWalletClient(): Promise<WalletClient> {
    // In this case we're not using any Celo-specific client features, so it can be
    // safely casted to WalletClient
    return this.command.getWalletClient() as Promise<WalletClient>
  }

  private withSignerToAccount<A>(
    f: (account: StrongAddress, ctx: CheckBuilder) => A
  ): () => Promise<Resolve<A>> {
    return async () => {
      if (this.signer) {
        try {
          const account = await signerToAccount(await this.getClient(), this.signer)
          return f(account, this) as Resolve<A>
        } catch (_) {}
      }

      return f(NULL_ADDRESS, this) as Resolve<A>
    }
  }

  private withValidators<A>(
    f: (
      validators: ValidatorsContract,
      signer: StrongAddress,
      account: StrongAddress,
      ctx: CheckBuilder
    ) => A
  ): () => Promise<Resolve<A>> {
    return async () => {
      const validatorsContract = (await getValidatorsContract(
        await this.getClient()
      )) as ValidatorsContract<PublicClient>

      if (this.signer) {
        try {
          const account = await (
            await this.getClient()
          ).readContract({
            address: await resolveAddress(await this.getClient(), 'Accounts'),
            abi: accountsABI,
            functionName: 'signerToAccount',
            args: [this.signer],
          })

          return f(validatorsContract, this.signer, account, this) as Resolve<A>
        } catch (_) {}
      }

      return f(validatorsContract, NULL_ADDRESS, NULL_ADDRESS, this) as Resolve<A>
    }
  }

  private withLockedGold<A>(
    f: (
      lockedGold: LockedCeloContract,
      signer: StrongAddress,
      account: StrongAddress,
      validators: ValidatorsContract
    ) => A
  ): () => Promise<Resolve<A>> {
    return async () => {
      const lockedCeloContract = (await getLockedCeloContract(
        await this.getClient()
      )) as LockedCeloContract<PublicClient>
      const validatorsContract = (await getValidatorsContract(
        await this.getClient()
      )) as ValidatorsContract<PublicClient>

      if (this.signer) {
        try {
          const account = await signerToAccount(await this.getClient(), this.signer)

          return f(lockedCeloContract, this.signer, account, validatorsContract) as Resolve<A>
        } catch (_) {}
      }

      return f(lockedCeloContract, NULL_ADDRESS, NULL_ADDRESS, validatorsContract) as Resolve<A>
    }
  }

  private withAccounts<A>(f: (accounts: AccountsContract) => A): () => Promise<Resolve<A>> {
    return async () => {
      const accountsContract = (await getAccountsContract(
        await this.getClient()
      )) as AccountsContract<PublicClient>

      return f(accountsContract) as Resolve<A>
    }
  }

  private withGovernance<A>(f: (governance: GovernanceContract) => A): () => Promise<Resolve<A>> {
    return async () => {
      const governanceContract = (await getGovernanceContract(
        await this.getClient()
      )) as GovernanceContract<PublicClient>

      return f(governanceContract) as Resolve<A>
    }
  }

  private withFeeCurrencyDirectory<A>(
    f: (feeCurrencyDirectory: FeeCurrencyDirectory) => A
  ): () => Promise<Resolve<A>> {
    return async () => {
      const feeCurrencyDirectoryContract = (await getFeeCurrencyDirectoryContract(
        await this.getClient()
      )) as FeeCurrencyDirectory<PublicClient>

      return f(feeCurrencyDirectoryContract) as Resolve<A>
    }
  }

  /*
   * Add a check to the list of checks to be run
   * @param name - Name of the check
   * @param predicate - When this returns true a green check will be displayed, otherwise a red x
   * @param errorMessage - Optional error message to display if the check returns false
   */
  addCheck(name: string, predicate: () => Promise<boolean> | boolean, errorMessage?: string) {
    this.checks.push(check(name, predicate, errorMessage))
    return this
  }

  addConditionalCheck(
    name: string,
    runCondition: boolean,
    predicate: () => Promise<boolean> | boolean,
    errorMessage?: string
  ) {
    if (runCondition) {
      return this.addCheck(name, predicate, errorMessage)
    }
    return this
  }

  async addAsyncConditionalCheck(
    name: string,
    runCondition: () => Promise<boolean>,
    predicate: () => Promise<boolean> | boolean,
    errorMessage?: string
  ) {
    if (await runCondition()) {
      return this.addCheck(name, predicate, errorMessage)
    }
    return this
  }

  isValidWalletSigner = (account: Address) =>
    this.addCheck(`${account} can sign txs`, async () => {
      const address = getAddress(account)
      const wallet = await this.getWalletClient()
      const addresses = await wallet.getAddresses()
      const validSigner = Boolean(addresses.find((x) => isAddressEqual(address, x)))

      if (validSigner && !isAddressEqual(wallet.account?.address!, address)) {
        wallet.account!.address = address
      }

      return validSigner
    })

  isApprover = (account: Address) =>
    this.addCheck(
      `${account} is approver address`,
      this.withGovernance(async (governance) =>
        isAddressEqual(await governance.read.approver(), ensureLeading0x(account))
      )
    )

  isSecurityCouncil = (account: Address) =>
    this.addCheck(
      `${account} is security council address`,
      this.withGovernance(async (governance) => {
        return isAddressEqual(await governance.read.securityCouncil(), ensureLeading0x(account))
      })
    )

  proposalExists = (proposalID: string | bigint) =>
    this.addCheck(
      `${proposalID} is an existing proposal`,
      this.withGovernance((governance) => governance.read.proposalExists([BigInt(proposalID)]))
    )

  proposalInStage = (proposalID: string | bigint, stage: keyof typeof ProposalStage) =>
    this.proposalInStages(proposalID, [stage])

  proposalInStages = (proposalID: string | bigint, stages: (keyof typeof ProposalStage)[]) =>
    this.addCheck(
      `${proposalID} is in stage ${stages.join(' or ')}`,
      this.withGovernance(async (_governance) => {
        const stage = await getProposalStage(await this.getClient(), BigInt(proposalID))
        let match = false
        for (const allowedStage of stages) {
          match = stage === allowedStage || match
        }
        if (!match) {
          const schedule = await getProposalSchedule(await this.getClient(), BigInt(proposalID))

          printValueMapRecursive(schedule)
        }
        return match
      })
    )

  proposalIsPassing = (proposalID: string) =>
    this.addCheck(
      `Proposal ${proposalID} is passing corresponding constitutional quorum`,
      this.withGovernance((governance) => governance.read.isProposalPassing([BigInt(proposalID)]))
    )

  hotfixIsPassing = (hash: Buffer) =>
    this.addCheck(
      `Hotfix 0x${hash.toString('hex')} is whitelisted by quorum of validators`,
      this.withGovernance((governance) => governance.read.isHotfixPassing([bufferToHex(hash)]))
    )

  hotfixNotExecuted = (hash: Buffer) =>
    this.addCheck(
      `Hotfix 0x${hash.toString('hex')} is not already executed`,
      async () => !(await getHotfixRecord(await this.getClient(), hash)).executed
    )

  hotfixExecutionTimeLimitNotReached = (hash: Buffer) =>
    this.addCheck(
      `Hotfix 0x${hash.toString('hex')} is still in its execution time limit window`,
      async () =>
        (
          (await getHotfixRecord(await this.getClient(), hash)) as HotfixRecord
        ).executionTimeLimit.gt(getCurrentTimestamp())
    )

  hotfixApproved = (hash: Buffer) =>
    this.addCheck(
      `Hotfix 0x${hash.toString('hex')} is approved by approver`,
      async () => (await getHotfixRecord(await this.getClient(), hash)).approved
    )

  hotfixCouncilApproved = (hash: Buffer) =>
    this.addCheck(
      `Hotfix 0x${hash.toString('hex')} is approved by security council`,
      this.withGovernance(
        async (_governance) =>
          ((await getHotfixRecord(await this.getClient(), hash)) as HotfixRecord).councilApproved
      )
    )

  hotfixNotApproved = (hash: Buffer) =>
    this.addCheck(
      `Hotfix 0x${hash.toString('hex')} is not already approved`,
      async () => !(await getHotfixRecord(await this.getClient(), hash)).approved
    )

  hotfixNotApprovedBySecurityCouncil = (hash: Buffer) =>
    this.addCheck(
      `Hotfix 0x${hash.toString('hex')} is not already approved by security council`,
      async () => {
        const record = await getHotfixRecord(await this.getClient(), hash)

        return !(record as HotfixRecord).councilApproved
      }
    )

  canSignValidatorTxs = () =>
    this.addCheck(
      'Signer can sign Validator Txs',
      this.withAccounts(async (accounts) => {
        try {
          // This reverts if account cannot sign validator txs
          await accounts.read.validatorSignerToAccount([this.signer!])

          return true
        } catch (_) {
          return false
        }
      })
    )

  signerAccountIsValidator = () =>
    this.addCheck(
      `Signer account is Validator`,
      this.withValidators((validators, _s, account) => validators.read.isValidator([account]))
    )

  signerAccountIsValidatorGroup = () =>
    this.addCheck(
      `Signer account is ValidatorGroup`,
      this.withValidators((validators, _s, account) => validators.read.isValidatorGroup([account]))
    )

  isValidator = (account?: Address) =>
    this.addCheck(
      `${account} is Validator`,
      this.withValidators((validators, _, _account) =>
        validators.read.isValidator([ensureLeading0x(account ?? _account)])
      )
    )

  isValidatorGroup = (account: Address) =>
    this.addCheck(
      `${account} is ValidatorGroup`,
      this.withValidators((validators) =>
        validators.read.isValidatorGroup([ensureLeading0x(account)])
      )
    )

  isNotValidator = (account?: StrongAddress) =>
    this.addCheck(
      `${this.signer!} is not a registered Validator`,
      this.withValidators((validators, _, _account) =>
        negate(validators.read.isValidator([account ?? _account]))
      )
    )

  isNotValidatorGroup = () =>
    this.addCheck(
      `${this.signer!} is not a registered ValidatorGroup`,
      this.withValidators((validators, _, account) =>
        negate(validators.read.isValidatorGroup([account]))
      )
    )

  signerMeetsValidatorBalanceRequirements = () =>
    this.addCheck(
      `Signer's account has enough locked celo for registration`,
      this.withSignerToAccount(async (account) =>
        meetsValidatorBalanceRequirements(await this.getClient(), account)
      )
    )

  signerMeetsValidatorGroupBalanceRequirements = () =>
    this.addCheck(
      `Signer's account has enough locked celo for group registration`,
      this.withSignerToAccount(async (account) =>
        meetsValidatorGroupBalanceRequirements(await this.getClient(), account)
      )
    )

  isNotSanctioned = (address: Address) => {
    return this.addCheck(
      'Compliant Address',
      async () => {
        const isSanctioned = await this.fetchIsSanctioned(address)
        return !isSanctioned
      },
      this.COMPLIANT_ERROR_RESPONSE
    )
  }

  isNotAccount = (address: Address) =>
    this.addCheck(
      `${address} is not a registered Account`,
      this.withAccounts((accounts) => negate(accounts.read.isAccount([ensureLeading0x(address)])))
    )

  isSignerOrAccount = () =>
    this.addCheck(
      `${this.signer!} is Signer or registered Account`,
      this.withAccounts(async (accounts) => {
        const res =
          (await accounts.read.isAccount([this.signer!])) ||
          (await accounts.read.isAuthorizedSigner([this.signer!]))
        return res
      }),
      `${this.signer} is not a signer or registered as an account. Try authorizing as a signer or running account:register.`
    )

  isVoteSignerOrAccount = () =>
    this.addCheck(
      `${this.signer!} is vote signer or registered account`,
      this.withAccounts(async (accountsContract) => {
        try {
          const address = await accountsContract.read.voteSignerToAccount([this.signer!])

          return !isAddressEqual(address, NULL_ADDRESS)
        } catch (_) {}

        return false
      })
    )

  isAccount = (address: Address) =>
    this.addCheck(
      `${address} is a registered Account`,
      this.withAccounts(async (accounts) => {
        return accounts.read.isAccount([ensureLeading0x(address)])
      }),
      `${address} is not registered as an account. Try running account:register`
    )

  isNotVoting = (address: Address) =>
    this.addCheck(
      `${address} is not currently voting on a governance proposal`,
      this.withGovernance((governance) =>
        negate(governance.read.isVoting([ensureLeading0x(address)]))
      ),
      `${address} is currently voting in governance. Revoke your upvotes or wait for the referendum to end.`
    )

  hasEnoughCelo = (account: Address, _value: BigNumber | bigint) => {
    const value = typeof _value === 'bigint' ? _value : bigNumberToBigInt(_value)
    const valueInEth = formatEther(value)

    return this.addCheck(`Account has at least ${valueInEth} CELO`, async () => {
      const balance = await (
        await this.getClient()
      ).readContract({
        address: await resolveAddress(await this.getClient(), 'GoldToken'),
        abi: goldTokenABI,
        functionName: 'balanceOf',
        args: [ensureLeading0x(account)],
      })

      return balance >= value
    })
  }

  hasEnoughStable = (account: Address, _value: BigNumber | bigint, stable: StableToken) => {
    const value = typeof _value === 'bigint' ? _value : bigNumberToBigInt(_value)
    const valueInEth = formatEther(value)

    return this.addCheck(`Account has at least ${valueInEth} ${stable}`, async () => {
      const stableTokenContract = await StableTokens[stable](await this.getClient())
      const balance = await stableTokenContract.read.balanceOf([ensureLeading0x(account)])

      return balance >= value
    })
  }

  hasEnoughErc20 = (
    account: Address,
    _value: BigNumber | bigint,
    erc20: Address,
    decimals = 18
  ) => {
    const value = typeof _value === 'bigint' ? _value : bigNumberToBigInt(_value)
    const valueInEth = formatUnits(value, decimals)

    return this.addCheck(`Account has at least ${valueInEth} erc20 token`, async () => {
      const balance = await (
        await this.getClient()
      ).readContract({
        address: ensureLeading0x(erc20),
        abi: erc20Abi,
        functionName: 'balanceOf',
        args: [ensureLeading0x(account)],
      })

      return balance >= value
    })
  }

  exceedsProposalMinDeposit = (deposit: BigNumber) =>
    this.addCheck(
      `Deposit is greater than or equal to governance proposal minDeposit`,
      this.withGovernance(async (governance) =>
        deposit.gte(bigintToBigNumber(await governance.read.minDeposit()))
      )
    )

  hasRefundedDeposits = (account: Address) =>
    this.addCheck(
      `${account} has refunded governance deposits`,
      this.withGovernance(
        async (governance) =>
          !bigintToBigNumber(
            await governance.read.refundedDeposits([ensureLeading0x(account)])
          ).isZero()
      )
    )

  hasEnoughNonvotingLockedCelo = (value: bigint) => {
    const valueInEth = formatEther(value)

    return this.addCheck(
      `Account has at least ${valueInEth} non-voting Locked Celo`,
      this.withLockedGold(
        async (lockedGold, _signer, account) =>
          value <= (await lockedGold.read.getAccountNonvotingLockedGold([account]))
      )
    )
  }

  hasEnoughLockedGoldToUnlock = (value: BigNumber) => {
    const valueInEth = formatEther(bigNumberToBigInt(value))

    return this.addCheck(
      `Account has at least ${valueInEth} non-voting Locked Gold over requirement`,
      this.withLockedGold(async (lockedGold, _signer, account, validators) => {
        const requirement = bigintToBigNumber(
          await validators.read.getAccountLockedGoldRequirement([account])
        )

        return (
          (requirement.eq(0) ||
            value
              .plus(requirement)
              .lte(
                bigintToBigNumber(await lockedGold.read.getAccountTotalLockedGold([account]))
              )) &&
          value.lte(
            bigintToBigNumber(await lockedGold.read.getAccountNonvotingLockedGold([account]))
          )
        )
      })
    )
  }

  isNotValidatorGroupMember = () => {
    return this.addCheck(
      `Account isn't a member of a validator group`,
      this.withSignerToAccount(async (account) => {
        const { affiliation } = await getValidator(await this.getClient(), account)
        if (!affiliation || isAddressEqual(affiliation, NULL_ADDRESS)) {
          return true
        }

        // passing false opts out of fetching affilliates which we dont use anyway
        const { members } = await getValidatorGroup(await this.getClient(), affiliation!, false)
        return !members.includes(account)
      })
    )
  }

  validatorDeregisterDurationPassed = () => {
    return this.addCheck(
      `Enough time has passed since the account was removed from a validator group?`,
      this.withSignerToAccount(async (account) => {
        const { lastRemovedFromGroupTimestamp } = await getValidatorMembershipHistoryExtraData(
          await this.getClient(),
          account
        )
        const { duration } = await getValidatorLockedGoldRequirements(await this.getClient())
        const waitPeriodEnd = lastRemovedFromGroupTimestamp + duration.toNumber()
        const isDeregisterable = waitPeriodEnd < Date.now() / 1000
        if (!isDeregisterable) {
          console.warn(
            `Validator will be able to be deregistered: ${new Date(
              waitPeriodEnd * 1000
            ).toUTCString()}`
          )
        }
        return isDeregisterable
      })
    )
  }

  validatorGroupDeregisterDurationPassed = () => {
    return this.addAsyncConditionalCheck(
      'Enough time has passed since the validator group removed its last member? ',
      this.withValidators(async (validators, _signer, account) => {
        return validators.read.isValidatorGroup([account])
      }),
      this.withValidators(async (validators, _signer, account) => {
        const group = await getValidatorGroup(await this.getClient(), account)
        const [_, duration] = await validators.read.getGroupLockedGoldRequirements()
        const waitPeriodEnd = group.membersUpdated.plus(bigintToBigNumber(duration)).toNumber()
        const isDeregisterable = waitPeriodEnd < Date.now() / 1000
        if (!isDeregisterable) {
          console.warn(
            `Group will be able to be deregistered: ${new Date(waitPeriodEnd * 1000).toUTCString()}`
          )
        }
        return isDeregisterable
      })
    )
  }

  resetSlashingmultiplierPeriodPassed = () => {
    return this.addCheck(
      `Enough time has passed since the last halving of the slashing multiplier`,
      this.withValidators(async (validators, _signer, account) => {
        const { lastSlashed } = await getValidatorGroup(await this.getClient(), account)
        const duration = bigintToBigNumber(await validators.read.slashingMultiplierResetPeriod())

        return duration.toNumber() + lastSlashed.toNumber() < Date.now() / 1000
      })
    )
  }

  hasACommissionUpdateQueued = () =>
    this.addCheck(
      "There's a commision update queued",
      this.withSignerToAccount(async (account) => {
        const vg = await getValidatorGroup(await this.getClient(), account)

        return !vg.nextCommissionBlock.eq(0)
      })
    )

  hasCommissionUpdateDelayPassed = () =>
    this.addCheck(
      'The Commission update delay has already passed',
      this.withSignerToAccount(async (account) => {
        const blockNumber = await (await this.getClient()).getBlockNumber()
        const group = await getValidatorGroup(await this.getClient(), account)

        return group.nextCommissionBlock.lte(bigintToBigNumber(blockNumber))
      })
    )

  // This is the only required API change (because of dropping the usage of MultiSigWrapper)
  isMultiSigOwner = (from: StrongAddress, address: StrongAddress) => {
    return this.addCheck('The provided address is an owner of the multisig', async () => {
      const owners = await (
        await this.getClient()
      ).readContract({
        address,
        abi: multiSigABI,
        functionName: 'getOwners',
      })

      return owners.indexOf(from) > -1
    })
  }

  usesWhitelistedFeeCurrency = (feeCurrency?: StrongAddress) => {
    return this.addConditionalCheck(
      'The provided feeCurrency is whitelisted',
      Boolean(feeCurrency),
      this.withFeeCurrencyDirectory(async (feeCurrencyDirectory) => {
        const whitelist = await feeCurrencyDirectory.read.getCurrencies()
        return whitelist
          .map(_formatAddressForCompare)
          .includes(_formatAddressForCompare(feeCurrency!))
      }),
      `${feeCurrency!} is not a valid fee currency.`
    )
  }

  async runChecks({ failFast = false }: { failFast?: boolean } = {}) {
    console.log(`Running Checks:`)
    let allPassed = true
    for (const aCheck of this.checks) {
      const passed = await aCheck.run()
      const status︎Str = chalk.bold(passed ? '✔' : '✘')
      const color = passed ? chalk.green : chalk.red
      const msg = !passed && aCheck.errorMessage ? aCheck.errorMessage : ''
      console.log(color(`   ${status︎Str}  ${aCheck.name} ${msg}`))
      allPassed = allPassed && passed
      if (!passed && failFast) {
        break
      }
    }

    if (!allPassed) {
      // TODO(viem): leaving this for now not to change the API more than injecting a client
      // but in the future this should throw and the error/logging logic should be
      // in a BaseCommand method wrapping runChecks()
      return this.command.error("Some checks didn't pass!")
    } else {
      console.log(`All checks passed`)
    }
  }

  // SANCTIONED_ADDRESSES is so well typed that if you call includes with a string it gives a type error.
  // same if you make it a set or use indexOf so concat it with an empty string to give type without needing to ts-ignore
  private readonly SANCTIONED_SET = {
    data: new Set<StrongAddress>(),
    wasRefreshed: false,
  }

  private async fetchIsSanctioned(address: string) {
    const { COMPLIANT_ERROR_RESPONSE, OFAC_SANCTIONS_LIST_URL, SANCTIONED_ADDRESSES } =
      await import('@celo/compliance')
    this.COMPLIANT_ERROR_RESPONSE = COMPLIANT_ERROR_RESPONSE

    const lowercasedAddresses = SANCTIONED_ADDRESSES.map(_formatAddressForCompare)

    // Would like to avoid calling this EVERY run. but at least calling
    // twice in a row (such as when checking from and to addresses) should be cached
    // using boolean because either it's been refreshed or this is the first run of the invocation. its short lived
    if (!this.SANCTIONED_SET.wasRefreshed || this.SANCTIONED_SET.data.size === 0) {
      try {
        const result = await fetch(OFAC_SANCTIONS_LIST_URL)
        const data = await result.json()
        if (Array.isArray(data)) {
          this.SANCTIONED_SET.data = new Set(data.map(_formatAddressForCompare))
          this.SANCTIONED_SET.wasRefreshed = true
        } else {
          this.SANCTIONED_SET.data = new Set(lowercasedAddresses)
        }
      } catch (e) {
        ;(this.SANCTIONED_SET.data =
          this.SANCTIONED_SET.data.size === 0
            ? new Set(lowercasedAddresses)
            : this.SANCTIONED_SET.data),
          console.error('Error fetching OFAC sanctions list', e)
      }
    }
    return this.SANCTIONED_SET.data.has(_formatAddressForCompare(address))
  }
}

const _formatAddressForCompare = (str: string) => ensureLeading0x(str.toLowerCase())
