import { ContractKit } from '@celo/contractkit'
import { ClaimTypes, IdentityMetadataWrapper } from '@celo/metadata-claims'
import { AccountClaim } from '@celo/metadata-claims/lib/account'
import { verifyAccountClaim } from '@celo/metadata-claims/lib/verify'
import { ensureLeading0x } from '@celo/utils/lib/address'
import { notEmpty } from '@celo/utils/lib/collections'
import { BaseCommand } from '../../base'
import { printValueMap } from '../../utils/cli'
import { CustomArgs } from '../../utils/command'
import { kitToAccountMetaSigners } from '../../utils/identity'

async function getMetadata(kit: ContractKit, address: string) {
  const accounts = await kit.contracts.getAccounts()
  const url = await accounts.getMetadataURL(address)
  console.log(address, 'has url', url)
  return url === ''
    ? IdentityMetadataWrapper.fromEmpty(address)
    : IdentityMetadataWrapper.fetchFromURL(accounts, url)
}

function dedup(lst: string[]): string[] {
  return [...new Set(lst)]
}

async function getClaims(
  kit: ContractKit,
  address: string,
  data: IdentityMetadataWrapper
): Promise<string[]> {
  const accountsInfoGetters = await kitToAccountMetaSigners(kit)

  const getClaim = async (claim: AccountClaim) => {
    const error = await verifyAccountClaim(accountsInfoGetters, claim, ensureLeading0x(address))
    return error ? null : claim.address.toLowerCase()
  }
  const res = (await Promise.all(data.filterClaims(ClaimTypes.ACCOUNT).map(getClaim))).filter(
    notEmpty
  )
  res.push(address)
  return dedup(res)
}

export default class ShowClaimedAccounts extends BaseCommand {
  static description = 'Show information about claimed accounts'

  static flags = {
    ...BaseCommand.flags,
  }

  static args = {
    arg1: CustomArgs.address('address'),
  }

  static examples = ['show-claimed-accounts 0x5409ed021d9299bf6814279a6a1411a7e866a631']

  async run() {
    const kit = await this.getKit()
    const { args } = await this.parse(ShowClaimedAccounts)

    const metadata = await getMetadata(kit, args.arg1 as string)

    const claimedAccounts = await getClaims(kit, args.arg1 as string, metadata)

    console.log('All balances expressed in units of 10^-18.')
    for (const address of claimedAccounts) {
      console.log('\nShowing balances for', address)
      const balance = await kit.getTotalBalance(address)
      printValueMap(balance)
    }
  }
}
