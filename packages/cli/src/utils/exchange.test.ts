import { calculateExpectedSlippage } from './exchange'

import BigNumber from 'bignumber.js'

describe('calculateExpectedSlippage', () => {
  describe('when amount is the same', () => {
    it('gives zero', () => {
      const sellingAmount = new BigNumber(100)
      const quotedAmountToReceiveWithBuffer = new BigNumber(110)
      const oracleMedianRate = new BigNumber('1.1')
      const slippage = 0 // 2% slippage
      // (Executed Price – Expected Price) / Expected Price * 100
      expect(
        calculateExpectedSlippage(sellingAmount, quotedAmountToReceiveWithBuffer, oracleMedianRate)
      ).toEqual(slippage)
    })
  })
  describe('when quotedAmountToReceiveWithBuffer is less than oracle rate', () => {
    it('gives a negative amount', () => {
      const sellingAmount = new BigNumber(100)
      const quotedAmountToReceiveWithBuffer = new BigNumber(105)
      const oracleMedianRate = new BigNumber('1.1')
      const slippage = -1.81 // 2% slippage
      // (Executed Price – Expected Price) / Expected Price * 100
      expect(
        calculateExpectedSlippage(sellingAmount, quotedAmountToReceiveWithBuffer, oracleMedianRate)
      ).toEqual(slippage)
    })
  })
  describe('when quotedAmountToReceiveWithBuffer is higher than oracle rate', () => {
    it('gives a positive amount', () => {
      const sellingAmount = new BigNumber(100)
      const quotedAmountToReceiveWithBuffer = new BigNumber(115)
      const oracleMedianRate = new BigNumber('1.1')
      const slippage = 1.81 // 2% slippage
      // (Executed Price – Expected Price) / Expected Price * 100
      expect(
        calculateExpectedSlippage(sellingAmount, quotedAmountToReceiveWithBuffer, oracleMedianRate)
      ).toEqual(slippage)
    })
  })
})
