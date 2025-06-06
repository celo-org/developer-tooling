import { newSortedOracles as web3NewSortedOracles } from '@celo/abis/web3/SortedOracles'
import SortedOraclesArtifacts from '@celo/celo-devchain/contracts/contracts-0.5/SortedOracles.json'
import { AbiItem, Address } from '@celo/connect'
import {
  asCoreContractsOwner,
  LinkedLibraryAddress,
  testWithAnvilL2,
} from '@celo/dev-utils/anvil-test'
import { describeEach } from '@celo/dev-utils/describeEach'
import { NetworkConfig, timeTravel } from '@celo/dev-utils/ganache-test'
import { CeloContract } from '../base'
import { StableToken } from '../celo-tokens'
import { newKitFromWeb3 } from '../kit'
import { OracleRate, ReportTarget, SortedOraclesWrapper } from './SortedOracles'

// set timeout to 10 seconds
jest.setTimeout(10 * 1000)

testWithAnvilL2('SortedOracles Wrapper', (web3) => {
  const kit = newKitFromWeb3(web3)

  const reportAsOracles = async (
    sortedOracles: SortedOraclesWrapper,
    target: ReportTarget,
    oracles: Address[],
    rates: number[] = []
  ): Promise<void> => {
    // Create some arbitrary values to report if none were passed in
    if (rates.length === 0) {
      for (const _oracle of oracles) {
        rates.push(Math.random() * 2)
      }
    }

    for (let i = 0; i < rates.length; i++) {
      const tx = await sortedOracles.report(target, rates[i], oracles[i])
      await tx.sendAndWaitForReceipt()
    }
  }

  // Quick setup for conditions when some oracle reports are expired and the rest are not.
  // This assumes that the rates reported can be arbitrary and not a critical piece of the test.
  const setupExpiredAndNotExpiredReports = async (
    sortedOracles: SortedOraclesWrapper,
    target: ReportTarget,
    expiredOracles: Address[],
    allOracles: Address[]
  ): Promise<void> => {
    const expirySeconds = (await sortedOracles.reportExpirySeconds()).toNumber()
    await reportAsOracles(sortedOracles, target, expiredOracles)

    await timeTravel(expirySeconds * 2, web3)

    const freshOracles = allOracles.filter((o) => !expiredOracles.includes(o))
    await reportAsOracles(sortedOracles, target, freshOracles)
  }

  /**
   * When testing with a custom token pair we can't use the
   * already deployed SortedOracles because that's managed
   * by Governance and we can't execute changes on the contract.
   * To make it easier we'll deploy an new version for use in
   * the tests
   */
  const newSortedOracles = async (owner: Address): Promise<SortedOraclesWrapper> => {
    const contract = new web3.eth.Contract(SortedOraclesArtifacts.abi as AbiItem[])

    const deployTx = contract.deploy({
      data: SortedOraclesArtifacts.bytecode.replace(
        /__AddressSortedLinkedListWithMedian_____/g,
        LinkedLibraryAddress.AddressSortedLinkedListWithMedian.replace('0x', '')
      ),
      arguments: [NetworkConfig.oracles.reportExpiry],
    })

    const txResult = await deployTx.send({ from: owner })
    const deployedContract = web3NewSortedOracles(web3, txResult.options.address)

    await deployedContract.methods
      .initialize(NetworkConfig.oracles.reportExpiry)
      .send({ from: owner })

    return new SortedOraclesWrapper(kit.connection, deployedContract, kit.registry)
  }

  const addOracleForTarget = async (
    sortedOraclesInstance: SortedOraclesWrapper,
    target: ReportTarget,
    oracle: Address,
    owner: Address
  ): Promise<void> => {
    // @ts-ignore
    const identifier = await sortedOraclesInstance.toCurrencyPairIdentifier(target)
    // @ts-ignore
    const sortedOraclesContract = sortedOraclesInstance.contract
    await sortedOraclesContract.methods.addOracle(identifier, oracle).send({
      from: owner,
    })
  }

  // NOTE: These values are set in packages/dev-utils/src/migration-override.json,
  // and are derived from the MNEMONIC.
  // If the MNEMONIC has changed, these will need to be reset.
  // To do that, look at the output of web3.eth.getAccounts(), and pick a few
  // addresses from that set to be oracles
  const stableTokenOracles: Address[] = NetworkConfig.stableToken.oracles
  const stableTokenEUROracles: Address[] = NetworkConfig.stableTokenEUR.oracles
  const stableTokenBRLOracles: Address[] = NetworkConfig.stableTokenBRL.oracles
  // Use same oracle addresses for CELO/BTC as well
  const celoBtcOracles: Address[] = NetworkConfig.stableToken.oracles
  const oracleAddress = stableTokenOracles[stableTokenOracles.length - 1]

  let stableTokenSortedOracles: SortedOraclesWrapper
  let btcSortedOracles: SortedOraclesWrapper

  let allAccounts: Address[]
  let stableTokenAddress: Address
  let nonOracleAddress: Address
  let btcOracleOwner: Address
  let stableTokenOracleOwner: Address
  const CELOBTCIdentifier: Address = web3.utils.toChecksumAddress(
    web3.utils.keccak256('CELOBTC').slice(26)
  )

  beforeAll(async () => {
    allAccounts = await web3.eth.getAccounts()

    btcOracleOwner = stableTokenOracleOwner = allAccounts[0]

    btcSortedOracles = await newSortedOracles(btcOracleOwner)
    stableTokenSortedOracles = await kit.contracts.getSortedOracles()
    const stableTokenSortedOraclesContract = web3NewSortedOracles(
      web3,
      stableTokenSortedOracles.address
    )

    await asCoreContractsOwner(web3, async (ownerAddress) => {
      const stableTokenUSDAddress = (await kit.contracts.getStableToken(StableToken.cUSD)).address
      const stableTokenEURAddress = (await kit.contracts.getStableToken(StableToken.cEUR)).address
      const stableTokenBRLAddress = (await kit.contracts.getStableToken(StableToken.cREAL)).address

      for (const tokenAddress of [
        stableTokenUSDAddress,
        stableTokenEURAddress,
        stableTokenBRLAddress,
      ]) {
        await stableTokenSortedOraclesContract.methods
          .removeOracle(tokenAddress, ownerAddress, 0)
          .send({ from: ownerAddress })
      }

      for (const oracle of stableTokenOracles) {
        await stableTokenSortedOraclesContract.methods
          .addOracle(stableTokenUSDAddress, oracle)
          .send({ from: ownerAddress })
      }

      for (const oracle of stableTokenEUROracles) {
        await stableTokenSortedOraclesContract.methods
          .addOracle(stableTokenEURAddress, oracle)
          .send({ from: ownerAddress })
      }

      for (const oracle of stableTokenBRLOracles) {
        await stableTokenSortedOraclesContract.methods
          .addOracle(stableTokenBRLAddress, oracle)
          .send({ from: ownerAddress })
      }
    })

    stableTokenAddress = await kit.registry.addressFor(CeloContract.StableToken)

    nonOracleAddress = allAccounts.find((addr) => {
      return !stableTokenOracles.includes(addr)
    })!

    for (const oracle of celoBtcOracles) {
      await addOracleForTarget(btcSortedOracles, CELOBTCIdentifier, oracle, btcOracleOwner)
    }
    // And also report an initial price as happens in 09_stabletoken.ts
    // So that we can share tests between the two oracles.
    await (
      await btcSortedOracles.report(
        CELOBTCIdentifier,
        NetworkConfig.stableToken.goldPrice,
        oracleAddress
      )
    ).sendAndWaitForReceipt()

    // We need to setup the stable token oracle with an initial report
    // from the same address as the BTC oracle
    await (
      await stableTokenSortedOracles.report(
        CeloContract.StableToken,
        NetworkConfig.stableToken.goldPrice,
        stableTokenOracleOwner
      )
    ).sendAndWaitForReceipt({ from: stableTokenOracleOwner })

    const expirySeconds = (await stableTokenSortedOracles.reportExpirySeconds()).toNumber()
    await timeTravel(expirySeconds * 2, web3)

    const removeExpiredReportsTx = await stableTokenSortedOracles.removeExpiredReports(
      CeloContract.StableToken,
      1
    )
    await removeExpiredReportsTx.sendAndWaitForReceipt({
      from: oracleAddress,
    })
  })

  const testCases: { label: string; reportTarget: ReportTarget }[] = [
    {
      label: 'StableToken (CELO/USD)',
      reportTarget: CeloContract.StableToken,
    },
    {
      label: 'CELO/BTC',
      reportTarget: CELOBTCIdentifier,
    },
  ]

  describeEach(testCases, ({ reportTarget }) => {
    let sortedOracles: SortedOraclesWrapper
    beforeEach(() => {
      if (reportTarget === CELOBTCIdentifier) {
        sortedOracles = btcSortedOracles
      } else if (reportTarget === CeloContract.StableToken) {
        sortedOracles = stableTokenSortedOracles
      } else {
        throw new Error(`Unexpected report target: ${reportTarget}`)
      }
    })

    describe('#report', () => {
      const value = 16

      describe('when reporting from a whitelisted Oracle', () => {
        it('should be able to report a rate', async () => {
          const initialRates: OracleRate[] = await sortedOracles.getRates(reportTarget)

          const tx = await sortedOracles.report(reportTarget, value, oracleAddress)
          await tx.sendAndWaitForReceipt()

          const resultingRates: OracleRate[] = await sortedOracles.getRates(reportTarget)
          expect(resultingRates).not.toMatchObject(initialRates)
        })

        describe('when inserting into the middle of the existing rates', () => {
          beforeEach(async () => {
            const rates = [15, 20, 17]
            await reportAsOracles(sortedOracles, reportTarget, stableTokenOracles, rates)
          })

          const expectedLesserKey = stableTokenOracles[0]
          const expectedGreaterKey = stableTokenOracles[2]

          const expectedOracleOrder = [
            stableTokenOracles[1],
            stableTokenOracles[2],
            oracleAddress,
            stableTokenOracles[0],
          ]

          it('passes the correct lesserKey and greaterKey as args', async () => {
            const tx = await sortedOracles.report(reportTarget, value, oracleAddress)
            const actualArgs = tx.txo.arguments
            expect(actualArgs[2]).toEqual(expectedLesserKey)
            expect(actualArgs[3]).toEqual(expectedGreaterKey)

            await tx.sendAndWaitForReceipt()
          })

          it('inserts the new record in the right place', async () => {
            const tx = await sortedOracles.report(reportTarget, value, oracleAddress)
            await tx.sendAndWaitForReceipt()

            const resultingRates: OracleRate[] = await sortedOracles.getRates(reportTarget)

            expect(resultingRates.map((r) => r.address)).toEqual(expectedOracleOrder)
          })
        })
      })

      describe('when reporting from a non-oracle address', () => {
        it('should raise an error', async () => {
          const tx = await sortedOracles.report(reportTarget, value, nonOracleAddress)
          await expect(tx.sendAndWaitForReceipt()).rejects.toThrow('sender was not an oracle')
        })

        it('should not change the list of rates', async () => {
          const initialRates = await sortedOracles.getRates(reportTarget)
          try {
            const tx = await sortedOracles.report(reportTarget, value, nonOracleAddress)
            await tx.sendAndWaitForReceipt()
          } catch (err) {
            // We don't need to do anything with this error other than catch it so
            // it doesn't fail this test.
          } finally {
            const resultingRates = await sortedOracles.getRates(reportTarget)
            expect(resultingRates).toMatchObject(initialRates)
          }
        })
      })
    })

    describe('#removeExpiredReports', () => {
      describe('when expired reports exist', () => {
        const expiredOracles = stableTokenOracles.slice(0, 2)
        let initialReportCount: number

        beforeEach(async () => {
          await setupExpiredAndNotExpiredReports(
            sortedOracles,
            reportTarget,
            expiredOracles,
            stableTokenOracles
          )
          initialReportCount = await sortedOracles.numRates(reportTarget)
        })

        it('should successfully remove a report', async () => {
          const tx = await sortedOracles.removeExpiredReports(reportTarget, 1)
          await tx.sendAndWaitForReceipt({ from: oracleAddress })

          expect(await sortedOracles.numRates(reportTarget)).toEqual(initialReportCount - 1)
        })

        it('removes only the expired reports, even if the number to remove is higher', async () => {
          const toRemove = expiredOracles.length + 1
          const tx = await sortedOracles.removeExpiredReports(reportTarget, toRemove)
          await tx.sendAndWaitForReceipt({ from: oracleAddress })

          expect(await sortedOracles.numRates(reportTarget)).toEqual(
            initialReportCount - expiredOracles.length
          )
        })
      })

      it('should not remove any reports when reports exist but are not expired', async () => {
        await reportAsOracles(sortedOracles, reportTarget, stableTokenOracles)

        const initialReportCount = await sortedOracles.numRates(reportTarget)

        const tx = await sortedOracles.removeExpiredReports(reportTarget, 1)
        await tx.sendAndWaitForReceipt({ from: oracleAddress })

        expect(await sortedOracles.numRates(reportTarget)).toEqual(initialReportCount)
      })
    })

    describe('#isOldestReportExpired', () => {
      describe('when at least one expired report exists', () => {
        it('returns with true and the address of the last reporting oracle', async () => {
          await setupExpiredAndNotExpiredReports(
            sortedOracles,
            reportTarget,
            [oracleAddress],
            stableTokenOracles
          )
          const [isExpired, address] = await sortedOracles.isOldestReportExpired(reportTarget)
          expect(isExpired).toEqual(true)
          expect(address).toEqual(oracleAddress)
        })
      })
      describe('when the oldest is not expired', () => {
        it('returns with false and the address of the last reporting oracle', async () => {
          await reportAsOracles(sortedOracles, reportTarget, stableTokenOracles)
          const [isExpired, address] = await sortedOracles.isOldestReportExpired(reportTarget)
          expect(isExpired).toEqual(false)
          expect(address).toEqual(stableTokenOracles[0])
        })
      })
    })

    /**
     * Proxy Calls to view methods
     *
     * The purpose of these tests is to verify that these wrapper functions exist,
     * are calling the contract methods correctly, and get some value back. The
     * values checked here are often dependent on setup occuring in the protocol
     * migrations run in `yarn test:reset`. If these tests are failing, the first
     * thing to check is if there have been changes to the migrations
     */
    describe('#getRates', () => {
      const expectedRates = [2, 1.5, 1, 0.5]
      beforeEach(async () => {
        await reportAsOracles(sortedOracles, reportTarget, stableTokenOracles, expectedRates)
      })
      it('SBAT getRates', async () => {
        const actualRates = await sortedOracles.getRates(reportTarget)
        expect(actualRates.length).toBeGreaterThan(0)
        for (const rate of actualRates) {
          expect(rate).toHaveProperty('address')
          expect(rate).toHaveProperty('rate')
          expect(rate).toHaveProperty('medianRelation')
        }
      })

      it('returns the correct rate', async () => {
        const response = await sortedOracles.getRates(reportTarget)
        const actualRates = response.map((r) => r.rate.toNumber())
        expect(actualRates).toEqual(expectedRates)
      })
    })

    describe('#isOracle', () => {
      it('returns true when this address is a whitelisted oracle for this token', async () => {
        expect(await sortedOracles.isOracle(reportTarget, oracleAddress)).toEqual(true)
      })
      it('returns false when this address is not an oracle', async () => {
        expect(await sortedOracles.isOracle(reportTarget, nonOracleAddress)).toEqual(false)
      })
    })

    describe('#numRates', () => {
      it('returns a count of rates reported for the specified token', async () => {
        // Why 1? In packages/protocol/09_stabletoken, a single rate is reported
        expect(await sortedOracles.numRates(reportTarget)).toEqBigNumber(1)
      })
    })

    describe('#medianRate', () => {
      it('returns the key for the median', async () => {
        const returnedMedian = await sortedOracles.medianRate(reportTarget)
        expect(returnedMedian.rate).toEqBigNumber(NetworkConfig.stableToken.goldPrice)
      })
    })

    describe('#reportExpirySeconds', () => {
      it('returns the number of seconds after which a report expires', async () => {
        const result = await sortedOracles.reportExpirySeconds()
        expect(result).toEqBigNumber(NetworkConfig.oracles.reportExpiry)
      })
    })
  })

  /**
   * Helper Functions
   *
   * These are functions in the wrapper that call other functions, passing in
   * some regularly used arguments. The purpose of these tests is to verify that
   * those arguments are being set correctly.
   */
  describe('#reportStableToken', () => {
    it('calls report with the address for StableToken (cUSD) by default', async () => {
      const tx = await stableTokenSortedOracles.reportStableToken(14, oracleAddress)
      await tx.sendAndWaitForReceipt()
      expect(tx.txo.arguments[0]).toEqual(stableTokenAddress)
    })

    describe('calls report with the address for the provided StableToken', () => {
      for (const token of Object.values(StableToken)) {
        it(`calls report with token ${token}`, async () => {
          const tx = await stableTokenSortedOracles.reportStableToken(14, oracleAddress, token)
          await tx.sendAndWaitForReceipt()
          expect(tx.txo.arguments[0]).toEqual(await kit.celoTokens.getAddress(token))
        })
      }
    })
  })

  describe('#getStableTokenRates', () => {
    it('gets rates for Stable Token', async () => {
      const usdRatesResult = await stableTokenSortedOracles.getStableTokenRates()
      const getRatesResult = await stableTokenSortedOracles.getRates(CeloContract.StableToken)
      expect(usdRatesResult).toEqual(getRatesResult)
    })
  })
})
