import { electionABI, registryABI } from '@celo/abis'
import { StrongAddress } from '@celo/base'
import {
  asCoreContractsOwner,
  testWithAnvilL2,
  withImpersonatedAccount,
} from '@celo/dev-utils/anvil-test'
import { timeTravel } from '@celo/dev-utils/ganache-test'
import BigNumber from 'bignumber.js'
import { parseEther } from 'viem'
import { REGISTRY_CONTRACT_ADDRESS } from '../address-registry'
import { newKitFromProvider } from '../kit'
import { startAndFinishEpochProcess } from '../test-utils/utils'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('EpochManagerWrapper', (provider) => {
  const kit = newKitFromProvider(provider)

  let epochDuration: number

  beforeAll(async () => {
    const epochManagerWrapper = await kit.contracts.getEpochManager()
    epochDuration = await epochManagerWrapper.epochDuration()
  })

  it('has the correct address for the EpochManager contract', async () => {
    const epochManagerWrapper = await kit.contracts.getEpochManager()

    expect(epochManagerWrapper.address).toMatchInlineSnapshot(
      `"0x2E290D8c2D6b26985f2826A63Aa103963DbAca23"`
    )
  })

  it('indicates that it is time for next epoch', async () => {
    const epochManagerWrapper = await kit.contracts.getEpochManager()

    await timeTravel(epochDuration + 1, provider)

    expect(await epochManagerWrapper.isTimeForNextEpoch()).toBeTruthy()

    await startAndFinishEpochProcess(kit)

    expect(await epochManagerWrapper.isTimeForNextEpoch()).toBeFalsy()
  })

  it('gets elected validators', async () => {
    const epochManagerWrapper = await kit.contracts.getEpochManager()

    expect(await epochManagerWrapper.getElectedAccounts()).toMatchInlineSnapshot(`
      [
        "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
        "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc",
        "0x976EA74026E726554dB657fA54763abd0C3a0aa9",
        "0x14dC79964da2C08b23698B3D3cc7Ca32193d9955",
        "0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f",
        "0xa0Ee7A142d267C1f36714E4a8F75612F20a79720",
      ]
    `)
  })

  it('gets current epoch processing status', async () => {
    const epochManagerWrapper = await kit.contracts.getEpochManager()
    const accounts = await kit.connection.getAccounts()

    expect((await epochManagerWrapper.getEpochProcessingStatus()).status).toEqual(0)

    // Let the epoch pass and start another one
    await timeTravel(epochDuration, provider)
    await epochManagerWrapper.startNextEpochProcess().sendAndWaitForReceipt({
      from: accounts[0],
    })

    expect((await epochManagerWrapper.getEpochProcessingStatus()).status).toEqual(1)
  })

  it('gets first known epoch number', async () => {
    const epochManagerWrapper = await kit.contracts.getEpochManager()

    expect(await epochManagerWrapper.firstKnownEpoch()).toEqual(4)
  })

  it('gets block numbers for an epoch', async () => {
    const epochManagerWrapper = await kit.contracts.getEpochManager()
    const currentEpochNumber = await epochManagerWrapper.getCurrentEpochNumber()
    const accounts = await kit.connection.getAccounts()

    const firstBlock = await epochManagerWrapper.getFirstBlockAtEpoch(currentEpochNumber)
    expect(firstBlock).toEqual(300)
    await expect(epochManagerWrapper.getLastBlockAtEpoch(currentEpochNumber)).rejects.toThrow(
      'Epoch not finished yet'
    )

    // Let the epoch pass and start another one
    await timeTravel(epochDuration + 1, provider)
    await epochManagerWrapper.startNextEpochProcess().sendAndWaitForReceipt({
      from: accounts[0],
    })
    await (await epochManagerWrapper.finishNextEpochProcessTx()).sendAndWaitForReceipt({
      from: accounts[0],
    })

    const lastBlock = await epochManagerWrapper.getLastBlockAtEpoch(currentEpochNumber)
    expect(lastBlock).toEqual(17634)
  })

  it(
    'finishes epoch correctly when validator group is not eligable any more',
    async () => {
      const epochManagerWrapper = await kit.contracts.getEpochManager()
      const currentEpochNumber = await epochManagerWrapper.getCurrentEpochNumber()
      const accounts = await kit.connection.getAccounts()

      const firstBlock = await epochManagerWrapper.getFirstBlockAtEpoch(currentEpochNumber)
      expect(firstBlock).toEqual(300)
      await expect(epochManagerWrapper.getLastBlockAtEpoch(currentEpochNumber)).rejects.toThrow(
        'Epoch not finished yet'
      )

      // Let the epoch pass and start another one
      await timeTravel(epochDuration + 1, provider)
      await epochManagerWrapper.startNextEpochProcess().sendAndWaitForReceipt({
        from: accounts[0],
      })

      const validatorsContract = await kit.contracts.getValidators()
      const electionContract = await kit.contracts.getElection()
      const validatorGroups = await validatorsContract.getRegisteredValidatorGroupsAddresses()

      await asCoreContractsOwner(
        provider,
        async (ownerAdress: StrongAddress) => {
          const registryContract = kit.connection.createContract(
            registryABI as any,
            REGISTRY_CONTRACT_ADDRESS
          )

          await registryContract.methods.setAddressFor('Validators', accounts[0]).send({
            from: ownerAdress,
          })

          // @ts-expect-error
          await electionContract.contract.methods
            .markGroupIneligible(validatorGroups[0])
            .send({ from: accounts[0] })

          await registryContract.methods
            .setAddressFor('Validators', validatorsContract.address)
            .send({
              from: ownerAdress,
            })
        },
        parseEther('1')
      )

      await (await epochManagerWrapper.finishNextEpochProcessTx()).sendAndWaitForReceipt({
        from: accounts[0],
      })
    },
    1000 * 60 * 5
  )

  async function activateValidators() {
    const validatorsContract = await kit.contracts.getValidators()
    const electionWrapper = await kit.contracts.getElection()
    const electionContract = kit.connection.createContract(
      electionABI as any,
      electionWrapper.address
    )
    const validatorGroups = await validatorsContract.getRegisteredValidatorGroupsAddresses()

    for (const validatorGroup of validatorGroups) {
      const pendingVotesForGroup = new BigNumber(
        await electionContract.methods.getPendingVotesForGroup(validatorGroup).call()
      )
      if (pendingVotesForGroup.gt(0)) {
        await withImpersonatedAccount(
          provider,
          validatorGroup,
          async () => {
            await electionContract.methods.activate(validatorGroup).send({ from: validatorGroup })
          },
          parseEther('1')
        )
      }
    }
  }

  it('starts and finishes a number of epochs and sends validator rewards', async () => {
    const accounts = await kit.connection.getAccounts()
    const epochManagerWrapper = await kit.contracts.getEpochManager()
    const EPOCH_COUNT = 5

    await timeTravel(epochDuration, provider)

    await startAndFinishEpochProcess(kit)

    await activateValidators()

    const epochAfterFirstProcess = await epochManagerWrapper.getCurrentEpochNumber()
    expect(epochAfterFirstProcess).toEqual(5)

    for (let i = 0; i < EPOCH_COUNT; i++) {
      await timeTravel(epochDuration + 1, provider)

      await startAndFinishEpochProcess(kit)
    }

    expect(await epochManagerWrapper.getCurrentEpochNumber()).toEqual(
      epochAfterFirstProcess + EPOCH_COUNT
    )
    expect((await epochManagerWrapper.getEpochProcessingStatus()).status).toEqual(0)

    // Start a new epoch process, but not finish it, so we can check the amounts
    await timeTravel(epochDuration + 1, provider)
    await epochManagerWrapper.startNextEpochProcess().sendAndWaitForReceipt({
      from: accounts[0],
    })

    const status = await epochManagerWrapper.getEpochProcessingStatus()

    expect(status.totalRewardsVoter.toNumber()).toBeGreaterThan(0)
    expect(status.perValidatorReward.toNumber()).toBeGreaterThan(0)
    expect(status.totalRewardsCommunity.toNumber()).toBeGreaterThan(0)
    expect(status.totalRewardsCarbonFund.toNumber()).toBeGreaterThan(0)

    // Make sure the payments are sent out
    const validatorsWrapper = await kit.contracts.getValidators()
    const validatorAddress = (await epochManagerWrapper.getElectedAccounts())[0]
    const validatorGroupAddress = await validatorsWrapper.getValidatorsGroup(validatorAddress)

    const validatorBalanceBefore = (await kit.getTotalBalance(validatorAddress)).USDm!
    const validatorGroupBalanceBefore = (await kit.getTotalBalance(validatorGroupAddress)).USDm!

    await epochManagerWrapper.sendValidatorPayment(validatorAddress).sendAndWaitForReceipt({
      from: accounts[0],
    })

    expect(
      (await kit.getTotalBalance(validatorAddress)).USDm!.isGreaterThan(validatorBalanceBefore)
    ).toBeTruthy()
    expect(
      (await kit.getTotalBalance(validatorGroupAddress)).USDm!.isGreaterThan(
        validatorGroupBalanceBefore
      )
    ).toBeTruthy()
  })

  it('processes elected validator groups', async () => {
    const accounts = await kit.connection.getAccounts()
    const epochManagerWrapper = await kit.contracts.getEpochManager()

    await timeTravel(epochDuration, provider)

    await startAndFinishEpochProcess(kit)

    await activateValidators()

    // Start a new epoch process, but don't process it, so we can compare the amounts
    await timeTravel(epochDuration + 1, provider)

    await epochManagerWrapper.startNextEpochProcess().sendAndWaitForReceipt({
      from: accounts[0],
    })

    const statusBeforeProcessing = await epochManagerWrapper.getEpochProcessingStatus()

    expect(statusBeforeProcessing.totalRewardsVoter.toNumber()).toBeGreaterThan(0)
    expect(statusBeforeProcessing.perValidatorReward.toNumber()).toBeGreaterThan(0)
    expect(statusBeforeProcessing.totalRewardsCommunity.toNumber()).toBeGreaterThan(0)
    expect(statusBeforeProcessing.totalRewardsCarbonFund.toNumber()).toBeGreaterThan(0)

    await epochManagerWrapper.setToProcessGroups().sendAndWaitForReceipt({
      from: accounts[0],
    })

    await (await epochManagerWrapper.processGroupsTx()).sendAndWaitForReceipt({
      from: accounts[0],
    })

    const statusAfterProcessing = await epochManagerWrapper.getEpochProcessingStatus()

    expect(statusAfterProcessing.totalRewardsVoter.toNumber()).toEqual(0)
    expect(statusAfterProcessing.perValidatorReward.toNumber()).toEqual(0)
    expect(statusAfterProcessing.totalRewardsCommunity.toNumber()).toEqual(0)
    expect(statusAfterProcessing.totalRewardsCarbonFund.toNumber()).toEqual(0)
  })
})
