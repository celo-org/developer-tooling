import { accountsABI, goldTokenABI, governanceABI, lockedGoldABI, stableTokenABI, validatorsABI } from '@celo/abis-12'
import { eqAddress, NULL_ADDRESS, StrongAddress } from '@celo/base/lib/address'
import {
  COMPLIANT_ERROR_RESPONSE,
  OFAC_SANCTIONS_LIST_URL,
  SANCTIONED_ADDRESSES,
} from '@celo/compliance'
import { Address } from '@celo/connect'
import { StableToken } from '@celo/contractkit'
import { AccountsWrapper } from '@celo/contractkit/lib/wrappers/Accounts'
import {
  GovernanceWrapper,
  HotfixRecord,
  ProposalStage,
} from '@celo/contractkit/lib/wrappers/Governance'
import { LockedGoldWrapper } from '@celo/contractkit/lib/wrappers/LockedGold'
import { MultiSigWrapper } from '@celo/contractkit/lib/wrappers/MultiSig'
import { ValidatorsWrapper } from '@celo/contractkit/lib/wrappers/Validators'
import { isValidAddress } from '@celo/utils/lib/address'
import { verifySignature } from '@celo/utils/lib/signatureUtils'
import BigNumber from 'bignumber.js'
import chalk from 'chalk'
import { fetch } from 'cross-fetch'
import { erc20Abi, getContract, GetContractReturnType, PublicClient } from 'viem'
import utils from 'web3-utils'
import { resolveAddress } from '../packages-to-be/address-resolver'
import { getCurrentTimestamp, printValueMapRecursive } from './cli'
import { meetsValidatorBalanceRequirements } from '../packages-to-be/validators'
import { AccountsContract, getAccountsContract, getGovernanceContract, getLockedGoldContract, getValidatorsContract, GovernanceContract, LockedGoldContract, ValidatorsContract } from '../packages-to-be/contracts'
import { CeloClient, getClient } from '../packages-to-be/client'
import { signerToAccount } from '../packages-to-be/account'
import { resolve } from 'path'

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

export function newCheckBuilder(signer?: StrongAddress) {
  return new CheckBuilder(signer)
}

class CheckBuilder {
  private checks: CommandCheck[] = []
  private client: CeloClient;

  constructor(
    private signer?: StrongAddress
  ) {
    this.client = getClient()
  }

  withValidators<A>(
    f: (validators: ValidatorsContract, signer: StrongAddress, account: StrongAddress, ctx: CheckBuilder) => A
  ): () => Promise<Resolve<A>> {
    return async () => {
      const validatorsContract = await getValidatorsContract()

      if (this.signer) {
        const account = await this.client.readContract({
          address: await resolveAddress('Accounts'),
          abi: accountsABI,
          functionName: 'signerToAccount',
          args: [this.signer]
        })

        return f(validatorsContract, this.signer, account, this) as Resolve<A>
      } else {
        // TODO resolve
        return f(validatorsContract, '', '', this) as Resolve<A>
      }
    }
  }

  withLockedGold<A>(
    f: (
      lockedGold: LockedGoldContract,
      signer: Address,
      account: Address,
      validators: ValidatorsContract
    ) => A
  ): () => Promise<Resolve<A>> {
    return async () => {
      const lockedCeloContract = await getLockedGoldContract()
      const validatorsContract = await getValidatorsContract()

      if (this.signer) {
        const account = await signerToAccount(this.signer)
        return f(lockedCeloContract, this.signer, account, validatorsContract) as Resolve<A>
      } else {
        return f(lockedCeloContract, '', '', validatorsContract) as Resolve<A>
      }
    }
  }

  withAccounts<A>(f: (accounts: AccountsContract) => A): () => Promise<Resolve<A>> {
    return async () => {
      const accountsContract = await getAccountsContract()

      return f(accountsContract) as Resolve<A>
    }
  }

  withGovernance<A>(
    f: (governance: GovernanceContract, signer: Address, account: Address, ctx: CheckBuilder) => A
  ): () => Promise<Resolve<A>> {
    return async () => {
      const governanceContract = await getGovernanceContract()

      return f(governanceContract, '', '', this) as Resolve<A>
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

  isApprover = (account: Address) =>
    this.addCheck(
      `${account} is approver address`,
      this.withGovernance(async (governance) => eqAddress(await governance.read.approver(), account))
    )

  isSecurityCouncil = (account: Address) =>
    this.addCheck(
      `${account} is security council address`,
      this.withGovernance(async (governance) =>
        eqAddress(await governance.read.securityCouncil(), account)
      )
    )

  proposalExists = (proposalID: string) =>
    this.addCheck(
      `${proposalID} is an existing proposal`,
      this.withGovernance((governance) => governance.read.proposalExists([BigInt(proposalID)]))
    )

  proposalInStage = (proposalID: string, stage: keyof typeof ProposalStage) =>
    this.proposalInStages(proposalID, [stage])

  proposalInStages = (proposalID: string, stages: (keyof typeof ProposalStage)[]) =>
    this.addCheck(
      `${proposalID} is in stage ${stages.join(' or ')}`,
      this.withGovernance(async (governance) => {
        const stage = await governance.read.getProposalStage([BigInt(proposalID)])
        let match = false
        for (const allowedStage of stages) {
          match = stage === allowedStage || match
        }
        if (!match) {
          const schedule = await governance.proposalSchedule(proposalID)
          printValueMapRecursive(schedule)
        }
        return match
      })
    )

  proposalIsPassing = (proposalID: string) =>
    this.addCheck(
      `Proposal ${proposalID} is passing corresponding constitutional quorum`,
      this.withGovernance((governance) => governance.isProposalPassing(proposalID))
    )

  hotfixIsPassing = (hash: Buffer) =>
    this.addCheck(
      `Hotfix 0x${hash.toString('hex')} is whitelisted by quorum of validators`,
      this.withGovernance((governance) => governance.isHotfixPassing(hash))
    )

  hotfixNotExecuted = (hash: Buffer) =>
    this.addCheck(
      `Hotfix 0x${hash.toString('hex')} is not already executed`,
      this.withGovernance(async (governance) => !(await governance.getHotfixRecord(hash)).executed)
    )

  hotfixExecutionTimeLimitNotReached = (hash: Buffer) =>
    this.addCheck(
      `Hotfix 0x${hash.toString('hex')} is still in its execution time limit window`,
      this.withGovernance(async (governance) =>
        ((await governance.getHotfixRecord(hash)) as HotfixRecord).executionTimeLimit.gt(
          getCurrentTimestamp()
        )
      )
    )

  hotfixApproved = (hash: Buffer) =>
    this.addCheck(
      `Hotfix 0x${hash.toString('hex')} is approved by approver`,
      this.withGovernance(async (governance) => (await governance.getHotfixRecord(hash)).approved)
    )

  hotfixCouncilApproved = (hash: Buffer) =>
    this.addCheck(
      `Hotfix 0x${hash.toString('hex')} is approved by security council`,
      this.withGovernance(
        async (governance) =>
          ((await governance.getHotfixRecord(hash)) as HotfixRecord).councilApproved
      )
    )

  hotfixNotApproved = (hash: Buffer) =>
    this.addCheck(
      `Hotfix 0x${hash.toString('hex')} is not already approved`,
      this.withGovernance(async (governance) => !(await governance.getHotfixRecord(hash)).approved)
    )

  hotfixNotApprovedBySecurityCouncil = (hash: Buffer) =>
    this.addCheck(
      `Hotfix 0x${hash.toString('hex')} is not already approved by security council`,
      this.withGovernance(async (governance) => {
        const record = await governance.getHotfixRecord(hash)

        return !(record as HotfixRecord).councilApproved
      })
    )

  canSign = (account: Address) =>
    this.addCheck('Account can sign', async () => {
      try {
        const message = 'test'
        const kit = await this.getKit()
        const signature = await kit.connection.sign(message, account)
        return verifySignature(message, signature, account)
      } catch (error) {
        console.error(error)
        return false
      }
    })

  canSignValidatorTxs = () =>
    this.addCheck(
      'Signer can sign Validator Txs',
      this.withAccounts((accounts) =>
        accounts
          .validatorSignerToAccount(this.signer!)
          .then(() => true)
          .catch(() => false)
      )
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

  isValidator = (account?: StrongAddress) =>
    this.addCheck(
      `${account} is Validator`,
      this.withValidators((validators, _, _account) => validators.read.isValidator([account ?? _account]))
    )

  isValidatorGroup = (account: StrongAddress) =>
    this.addCheck(
      `${account} is ValidatorGroup`,
      this.withValidators((validators) => validators.read.isValidatorGroup([account]))
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
      this.withValidators((validators, _, account) => negate(validators.read.isValidatorGroup([account])))
    )

  signerMeetsValidatorBalanceRequirements = () =>
    this.addCheck(
      `Signer's account has enough locked celo for registration`,
      this.withValidators((validators, _signer, account) => meetsValidatorBalanceRequirements(account))
      )
    )

  signerMeetsValidatorGroupBalanceRequirements = () =>
    this.addCheck(
      `Signer's account has enough locked celo for group registration`,
      this.withValidators((validators, _signer, account) =>
        validators.read.meetsValidatorGroupBalanceRequirements([account])
      )
    )

  meetsValidatorBalanceRequirements = (account: StrongAddress) =>
    this.addCheck(
      `${account} has enough locked celo for registration`,
      meetsValidatorBalanceRequirements(account)
    )

  meetsValidatorGroupBalanceRequirements = (account: Address) =>
    this.addCheck(
      `${account} has enough locked celo for group registration`,
      this.withValidators((validators) => {
        const
        return validators.read.meetsValidatorGroupBalanceRequirements([account])

      })
    )
  isNotSanctioned = (address: Address) => {
    return this.addCheck(
      'Compliant Address',
      async () => {
        const isSanctioned = await this.fetchIsSanctioned(address)
        return !isSanctioned
      },
      COMPLIANT_ERROR_RESPONSE
    )
  }

  isValidAddress = (address: Address) =>
    this.addCheck(`${address} is a valid address`, () => isValidAddress(address))

  isNotAccount = (address: Address) =>
    this.addCheck(
      `${address} is not a registered Account`,
      // TODO remove as
      this.withAccounts((accounts) => negate(accounts.read.isAccount([address as StrongAddress])))
    )

  isSignerOrAccount = () =>
    this.addCheck(
      `${this.signer!} is Signer or registered Account`,
      this.withAccounts(async (accounts) => {
        const res =
          (await accounts.read.isAccount([this.signer!])) || (await accounts.read.isSigner([this.signer!]))
        return res
      }),
      `${this.signer} is not a signer or registered as an account. Try authorizing as a signer or running account:register.`
    )

  isVoteSignerOrAccount = () =>
    this.addCheck(
      `${this.signer!} is vote signer or registered account`,
      this.withAccounts(async (accounts) => {
        return accounts.voteSignerToAccount(this.signer!).then(
          (addr) => !eqAddress(addr, NULL_ADDRESS),
          () => false
        )
      })
    )

  isAccount = (address: StrongAddress) =>
    this.addCheck(
      `${address} is a registered Account`,
      this.withAccounts((accounts) => accounts.read.isAccount([address])),
      `${address} is not registered as an account. Try running account:register`
    )

  isNotVoting = (address: StrongAddress) =>
    this.addCheck(
      `${address} is not currently voting on a governance proposal`,
      this.withGovernance((governance) => negate(governance.read.isVoting([address]))),
      `${address} is currently voting in governance. Revoke your upvotes or wait for the referendum to end.`
    )

  // TODO interface changed - fix usages
  hasEnoughCelo = (account: StrongAddress, value: bigint) => {
    // TODO is this toString necessary?
    const valueInEth = utils.fromWei(value.toString(), 'ether')

    return this.addCheck(`Account has at least ${valueInEth} CELO`, () => {
      const balance = await this.client.readContract({
        // TODO GoldToken is being renamed to CeloToken
        address: await resolveAddress('GoldToken'),
        abi: goldTokenABI,
        functionName: 'balanceOf',
        args: [account],
      })

      return balance >= value;
    });
  }

  hasEnoughStable = (
    account: StrongAddress,
    // TODO interface changed - fix usages
    value: bigint,
    stable: StableToken = StableToken.cUSD
  ) => {
    // TODO is this toString necessary?
    const valueInEth = utils.fromWei(value.toString(), 'ether')

    return this.addCheck(`Account has at least ${valueInEth} ${stable}`, () => {
      const balance = await this.client.readContract({
        address: await resolveAddress('StableToken'),
        abi: stableTokenABI,
        functionName: 'balanceOf',
        args: [account],
      })

      return balance >= value;
    });
  }

  // TODO interface changed - fix usages
  hasEnoughErc20 = (account: StrongAddress, value: bigint, erc20: StrongAddress) => {
    // TODO is this toString necessary?
    const valueInEth = utils.fromWei(value.toString(), 'ether')

    return this.addCheck(`Account has at least ${valueInEth} erc20 token`, () => {
      const balance = await this.client.readContract({
        address: erc20,
        abi: erc20Abi, // this is the viem's erc20 abi, check it
        functionName: 'balanceOf',
        args: [account],
      })

      return balance >= value;
    });
  }

  exceedsProposalMinDeposit = (deposit: BigNumber) =>
    this.addCheck(
      `Deposit is greater than or equal to governance proposal minDeposit`,
      this.withGovernance(async (governance) => deposit.gte(await governance.read.minDeposit()))
    )

  hasRefundedDeposits = (account: Address) =>
    this.addCheck(
      `${account} has refunded governance deposits`,
      this.withGovernance(
        async (governance) => !(await governance.getRefundedDeposits(account)).isZero()
      )
    )

  hasEnoughLockedGold = (value: BigNumber) => {
    const valueInEth = utils.fromWei(value.toFixed(), 'ether')
    return this.addCheck(
      `Account has at least ${valueInEth} Locked Gold`,
      this.withLockedGold(async (lockedGold, _signer, account) =>
        value.isLessThanOrEqualTo(await lockedGold.read.getAccountTotalLockedGold([account]))
      )
    )
  }

  hasEnoughNonvotingLockedGold = (value: BigNumber) => {
    const valueInEth = utils.fromWei(value.toFixed(), 'ether')
    return this.addCheck(
      `Account has at least ${valueInEth} non-voting Locked Gold`,
      this.withLockedGold(async (lockedGold, _signer, account) =>
        value.isLessThanOrEqualTo(await lockedGold.read.getAccountNonvotingLockedGold([account]))
      )
    )
  }

  hasEnoughLockedGoldToUnlock = (value: BigNumber) => {
    const valueInEth = utils.fromWei(value.toFixed(), 'ether')
    return this.addCheck(
      `Account has at least ${valueInEth} non-voting Locked Gold over requirement`,
      this.withLockedGold(async (lockedGold, _signer, account, validators) => {
        const requirement = await validators.getAccountLockedGoldRequirement(account)
        return (
          (requirement.eq(0) ||
            value.plus(requirement).lte(await lockedGold.getAccountTotalLockedGold(account))) &&
          value.lte(await lockedGold.getAccountNonvotingLockedGold(account))
        )
      })
    )
  }

  isNotValidatorGroupMember = () => {
    return this.addCheck(
      `Account isn't a member of a validator group`,
      this.withValidators(async (validators, _signer, account) => {
        const { affiliation } = await validators.getValidator(account)
        if (!affiliation || eqAddress(affiliation, NULL_ADDRESS)) {
          return true
        }
        // passing false opts out of fetching affilliates which we dont use anyway
        const { members } = await validators.getValidatorGroup(affiliation!, false)
        return !members.includes(account)
      })
    )
  }

  validatorDeregisterDurationPassed = () => {
    return this.addCheck(
      `Enough time has passed since the account was removed from a validator group?`,
      this.withValidators(async (validators, _signer, account) => {
        const { lastRemovedFromGroupTimestamp } =
          await validators.getValidatorMembershipHistoryExtraData(account)
        const { duration } = await validators.getValidatorLockedGoldRequirements()
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
        return validators.isValidatorGroup(account)
      }),
      this.withValidators(async (validators, _signer, account) => {
        const group = await validators.getValidatorGroup(account)
        const { duration } = await validators.getGroupLockedGoldRequirements()
        const waitPeriodEnd = group.membersUpdated + duration.toNumber()
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
        const { lastSlashed } = await validators.getValidatorGroup(account)
        const duration = await validators.getSlashingMultiplierResetPeriod()
        return duration.toNumber() + lastSlashed.toNumber() < Date.now() / 1000
      })
    )
  }

  hasACommissionUpdateQueued = () =>
    this.addCheck(
      "There's a commision update queued",
      this.withValidators(async (validators, _signer, account) => {
        const vg = await validators.getValidatorGroup(account)
        return !vg.nextCommissionBlock.eq(0)
      })
    )

  hasCommissionUpdateDelayPassed = () =>
    this.addCheck(
      'The Commission update delay has already passed',
      this.withValidators(async (validators, _signer, account, ctx) => {
        const web3 = await ctx.getWeb3()
        const blockNumber = await web3.eth.getBlockNumber()
        const vg = await validators.getValidatorGroup(account)
        return vg.nextCommissionBlock.lte(blockNumber)
      })
    )

  isMultiSigOwner = (from: string, multisig: MultiSigWrapper) => {
    return this.addCheck('The provided address is an owner of the multisig', async () => {
      const owners = await multisig.getOwners()
      return owners.indexOf(from) > -1
    })
  }

  async runChecks() {
    console.log(`Running Checks:`)
    let allPassed = true
    for (const aCheck of this.checks) {
      const passed = await aCheck.run()
      const status︎Str = chalk.bold(passed ? '✔' : '✘')
      const color = passed ? chalk.green : chalk.red
      const msg = !passed && aCheck.errorMessage ? aCheck.errorMessage : ''
      console.log(color(`   ${status︎Str}  ${aCheck.name} ${msg}`))
      allPassed = allPassed && passed
    }

    if (!allPassed) {
      return this.cmd.error("Some checks didn't pass!")
    } else {
      console.log(`All checks passed`)
    }
  }

  // SANCTIONED_ADDRESSES is so well typed that if you call includes with a string it gives a type error.
  // same if you make it a set or use indexOf so concat it with an empty string to give type without needing to ts-ignore
  private readonly SANCTIONED_SET = {
    data: new Set([''].concat(SANCTIONED_ADDRESSES)),
    wasRefreshed: false,
  }

  private async fetchIsSanctioned(address: string) {
    // Would like to avoid calling this EVERY run. but at least calling
    // twice in a row (such as when checking from and to addresses) should be cached
    // using boolean because either it's been refreshed or this is the first run of the invocation. its short lived
    if (!this.SANCTIONED_SET.wasRefreshed) {
      try {
        const result = await fetch(OFAC_SANCTIONS_LIST_URL)
        const data = await result.json()
        if (Array.isArray(data)) {
          this.SANCTIONED_SET.data = new Set(data)
          this.SANCTIONED_SET.wasRefreshed = true
        }
      } catch (e) {
        console.error('Error fetching OFAC sanctions list', e)
      }
    }
    return this.SANCTIONED_SET.data.has(address)
  }

  // async executeValidatorTx(
  //   name: string,
  //   f: (
  //     validators: ValidatorsWrapper,
  //     signer: Address,
  //     account: Address
  //   ) => Promise<CeloTransactionObject<any>> | CeloTransactionObject<any>
  // ) {

  // }
}
