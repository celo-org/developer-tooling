import { StableToken, newKitFromWeb3 } from '@celo/contractkit'
import baseSetup from '@celo/dev-utils/lib/ganache-setup'
// Has to import the matchers somewhere so that typescript knows the matchers have been made available
import * as path from 'path'
import Web3 from 'web3'

// Warning: There should be an unused import of '@celo/dev-utils/lib/matchers' above.
// If there is not, then your editor probably deleted it automatically.

export default async function globalSetup() {
  console.log('\nstarting ganache...')
  const chainDataPath = path.join(path.dirname(require.resolve('@celo/celo-devchain')), '../chains')
  // v11 refers to core contract release 11
  await baseSetup(path.resolve(chainDataPath), 'v11.tar.gz', {
    from_targz: true,
  })
  console.log('\n ganache started...')
  // it is necessary to disabled oclif integration with ts-node as
  // together it leads to a silent signit error and exit when tsconfk is loaded.
  // @ts-ignore - because global this doesnt have oclif property
  global.oclif = { tsnodeEnabled: false }

  const web3 = new Web3('http://localhost:8545')
  const kit = newKitFromWeb3(web3)
  kit.connection.addAccount('0xf2f48ee19680706196e2e339e5da3491186e0c4c5030670656b0e0164837257d')
  kit.connection.defaultAccount
  console.log(kit.defaultAccount, web3.defaultAccount, kit.connection.defaultAccount)
  const tokens = await Promise.all([
    kit.contracts.getGoldToken(),
    ...(await Promise.all(
      Object.keys(StableToken).map((token) => kit.contracts.getStableToken(token as StableToken))
    )),
  ])
  const {
    methods: { addToken, owner },
  } = await kit._web3Contracts.getFeeCurrencyWhitelist()
  for (const token of tokens) {
    await addToken(token.address).call({ from: await owner().call() })
    console.log(` - added ${await token.name()}->${token.address} as whitelisted fee currency`)
  }
}
