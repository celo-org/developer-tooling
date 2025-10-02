import BigNumber from 'bignumber.js'

function valueToBigNumber(input: BigNumber.Value): BigNumber {
  return new BigNumber(input.toString())
}

enum TimeDurations {
  millennium = 31536000000000,
  century = 3153600000000,
  decade = 315360000000,
  year = 31536000000,
  quarter = 7776000000,
  month = 2592000000,
  week = 604800000,
  day = 86400000,
  hour = 3600000,
  minute = 60000,
  second = 1000,
  millisecond = 1,
}

type TimeUnit = keyof typeof TimeDurations

// taken mostly from https://gist.github.com/RienNeVaPlus/024de3431ae95546d60f2acce128a7e2
export function secondsToDurationString(
  durationSeconds: BigNumber.Value,
  outputUnits: TimeUnit[] = ['year', 'month', 'week', 'day', 'hour', 'minute', 'second']
): string {
  let durationMilliseconds = valueToBigNumber(durationSeconds)
    .times(TimeDurations.second)
    .toNumber()
  if (durationMilliseconds <= 0) {
    return 'past'
  }
  const durations = outputUnits.reduce((res: Map<TimeUnit, number>, key) => {
    const unitDuration = TimeDurations[key]
    const value = Math.floor(durationMilliseconds / unitDuration)
    durationMilliseconds -= value * unitDuration
    return res.set(key, value)
  }, new Map())
  let s = ''
  durations.forEach((value, unit) => {
    if (value > 0) {
      s += `${value} ${unit}${value !== 1 ? 's' : ''} `
    }
  })
  return s.trim()
}

export const blocksToDurationString = (input: BigNumber.Value): string =>
  secondsToDurationString(valueToBigNumber(input).times(1)) // Celo block time is 1 second