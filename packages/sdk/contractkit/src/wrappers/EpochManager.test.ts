import { newElection } from '@celo/abis-12/web3/Election'
import { newEpochManager } from '@celo/abis-12/web3/EpochManager'
import {
  asCoreContractsOwner,
  GROUP_ADDRESSES,
  testWithAnvilL2,
} from '@celo/dev-utils/lib/anvil-test'
import { timeTravel } from '@celo/dev-utils/lib/ganache-test'
import BigNumber from 'bignumber.js'
import Web3 from 'web3'
import { newKitFromWeb3 } from '../kit'
import { valueToFixidityString } from './BaseWrapper'

process.env.NO_SYNCCHECK = 'true'

testWithAnvilL2('EpochManagerWrapper', (web3: Web3) => {
  const kit = newKitFromWeb3(web3)

  const secondsInOneBlock = 5
  const blocksInEpoch = 17280
  const timeDelta = blocksInEpoch * secondsInOneBlock

  it('has the correct address for the EpochManager contract', async () => {
    const epochManagerWrapper = await kit.contracts.getEpochManager()

    expect(epochManagerWrapper.address).toMatchInlineSnapshot(
      `"0xbf13Ba354EeF22976Faf20b11E6dd5440514eE68"`
    )
  })

  it('indicates that it is time for next epoch', async () => {
    const epochManagerWrapper = await kit.contracts.getEpochManager()

    expect(await epochManagerWrapper.isTimeForNextEpoch()).toBeFalsy()

    await timeTravel(timeDelta, web3)

    expect(await epochManagerWrapper.isTimeForNextEpoch()).toBeTruthy()
  })

  it('gets elected validators', async () => {
    const epochManagerWrapper = await kit.contracts.getEpochManager()

    expect(await epochManagerWrapper.getElected()).toMatchInlineSnapshot(`
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

    expect((await epochManagerWrapper.getEpochProcessingStatus()).status).toMatchInlineSnapshot(`
      {
        "perValidatorReward": "0",
        "status": 0,
        "toProcessGroups": 0,
        "totalRewardsCarbonFund": "0",
        "totalRewardsCommunity": "0",
        "totalRewardsVoter": "0",
      }
    `)
  })

  it('starts next epoch process', async () => {
    const epochManagerWrapper = await kit.contracts.getEpochManager()
    const epochManagerContract = newEpochManager(web3, epochManagerWrapper.address)

    await timeTravel(timeDelta, web3)
    await timeTravel(timeDelta, web3)
    await timeTravel(timeDelta, web3)
    await timeTravel(timeDelta, web3)
    await timeTravel(timeDelta, web3)

    await epochManagerContract.methods.setEpochDuration('10').send({
      from: (await web3.eth.getAccounts())[0],
    })
    await timeTravel(12, web3)
    await epochManagerWrapper
      .startNextEpochProcess()
      .sendAndWaitForReceipt({ from: (await web3.eth.getAccounts())[0] })

    expect(await epochManagerWrapper.getEpochProcessingStatus()).toMatchInlineSnapshot(`
      {
        "perValidatorReward": "0",
        "status": 1,
        "toProcessGroups": 0,
        "totalRewardsCarbonFund": "0",
        "totalRewardsCommunity": "0",
        "totalRewardsVoter": "0",
      }
    `)
  })

  async function activateValidators() {
    const validatorsContract = await kit.contracts.getValidators()
    const electionWrapper = await kit.contracts.getElection()
    const electionContract = newElection(web3, electionWrapper.address)
    const validatorGroups = await validatorsContract.getRegisteredValidatorGroupsAddresses()

    await timeTravel(timeDelta, web3)
    await timeTravel(timeDelta, web3)
    await timeTravel(timeDelta, web3)
    await timeTravel(timeDelta, web3)
    await timeTravel(timeDelta, web3)

    for (const validatorGroup of validatorGroups) {
      const pendingVotesForGroup = new BigNumber(
        await electionContract.methods.getPendingVotesForGroup(validatorGroup).call()
      )
      if (pendingVotesForGroup.gt(0)) {
        await electionContract.methods.activate(validatorGroup).send({ from: validatorGroup })
      }
    }
  }

  it('finishes next epoch process', async () => {
    const epochManagerWrapper = await kit.contracts.getEpochManager()

    // TODO this seems not to have any effect
    await asCoreContractsOwner(
      web3,
      async (from) => {
        const elected = await epochManagerWrapper.getElected()
        const scoreManagerContract = await kit._web3Contracts.getScoreManager()

        for (const groupAddress of GROUP_ADDRESSES) {
          await scoreManagerContract.methods
            .setGroupScore(groupAddress, valueToFixidityString(new BigNumber(1)))
            .send({ from })
        }

        for (const validatorAddress of elected) {
          await scoreManagerContract.methods
            .setValidatorScore(validatorAddress, valueToFixidityString(new BigNumber(1)))
            .send({ from })
        }
      },
      new BigNumber(web3.utils.toWei('1', 'ether'))
    )

    const secondsInOneBlock = 5
    const blocksInEpoch = 17280
    const timeDelta = blocksInEpoch * secondsInOneBlock
    await timeTravel(timeDelta, web3)
    await timeTravel(timeDelta, web3)
    await timeTravel(timeDelta, web3)
    await timeTravel(timeDelta, web3)
    await timeTravel(timeDelta, web3)

    await epochManagerWrapper
      .startNextEpochProcess()
      .sendAndWaitForReceipt({ from: (await web3.eth.getAccounts())[0] })

    await (
      await epochManagerWrapper.finishNextEpochProcessTx()
    ).sendAndWaitForReceipt({ from: (await web3.eth.getAccounts())[0] })

    await activateValidators()

    await epochManagerWrapper
      .startNextEpochProcess()
      .sendAndWaitForReceipt({ from: (await web3.eth.getAccounts())[0] })

    await (
      await epochManagerWrapper.finishNextEpochProcessTx()
    ).sendAndWaitForReceipt({ from: (await web3.eth.getAccounts())[0] })

    // expect(await epochManagerWrapper.getEpochProcessingStatus()).toMatchInlineSnapshot(`
    //   {
    //     "perValidatorReward": "0",
    //     "status": 0,
    //     "toProcessGroups": 3,
    //     "totalRewardsCarbonFund": "0",
    //     "totalRewardsCommunity": "0",
    //     "totalRewardsVoter": "0",
    //   }
    // `)
  })

  // TODO one more tests to create multiple epochs, start/finish multiple epochs
})
