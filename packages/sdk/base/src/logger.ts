export type Logger = (...args: any[]) => void
/** @internal */
export const noopLogger: Logger = () => {
  /* noop*/
}
/** @internal */
export const prefixLogger = (prefix: string, logger: Logger) => {
  return logger === noopLogger ? noopLogger : (...args: any[]) => logger(`${prefix}:: `, ...args)
}
/** @internal */
export const consoleLogger: Logger = console.log
