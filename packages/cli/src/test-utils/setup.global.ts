export default async function globalSetup() {
  // it is necessary to disabled oclif integration with ts-node as
  // together it leads to a silent signit error and exit when tsconfk is loaded.
  // @ts-ignore - because global this doesnt have oclif property
  global.oclif = { tsnodeEnabled: false }
}
