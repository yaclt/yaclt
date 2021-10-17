import chalk from "chalk";

const colorStrings = (
  colorFunc: (str: string) => string,
  data: unknown[]
): unknown[] | string => {
  if (data == undefined) {
    return "";
  }

  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    if (typeof item === "string") {
      data[i] = colorFunc(item);
    }
  }

  return data;
};

export const enum LogLevel {
  none = -1,
  values = 0,
  normal = 1,
  verbose = 2,
}

/* eslint-disable no-console */
const consoleLog = console.log.bind({});
const consoleInfo = console.info.bind({});
const consoleWarn = console.warn.bind({});
const consoleError = console.error.bind({});

const hijackConsole = (): void => {
  console.log = info;
  console.info = info;
  console.warn = warn;
  console.error = error;
};
/* eslint-enable no-console */

let _logLevel = LogLevel.normal;
const setLogLevel = (logLevel: LogLevel): LogLevel => {
  hijackConsole();
  switch (logLevel) {
    case LogLevel.none:
      _logLevel = LogLevel.none;
      break;
    case LogLevel.values:
      _logLevel = LogLevel.values;
      break;
    case LogLevel.normal:
      _logLevel = LogLevel.normal;
      break;
    case LogLevel.verbose:
      _logLevel = LogLevel.verbose;
      break;
    default:
      _logLevel = LogLevel.normal;
      break;
  }
  return _logLevel;
};

const value = (...data: unknown[]): void => {
  // this one is primarily used for plumbing, so require exactly this log level
  if (_logLevel !== LogLevel.values) {
    return;
  }

  consoleLog(...data);
};

const info = (...data: unknown[]): void => {
  if (_logLevel < LogLevel.verbose) {
    return;
  }

  consoleInfo(
    chalk.bgBlue(chalk.black(chalk.bold("INFO"))),
    ...colorStrings(chalk.blue, data)
  );
};

const warn = (...data: unknown[]): void => {
  if (_logLevel < LogLevel.normal) {
    return;
  }

  consoleWarn(
    chalk.bgYellow(chalk.black(chalk.bold("WARN"))),
    ...colorStrings(chalk.yellow, data)
  );
};

const error = (...data: unknown[]): void => {
  if (_logLevel < LogLevel.normal) {
    return;
  }

  consoleError(
    chalk.bgRed(chalk.black(chalk.bold("ERROR"))),
    ...colorStrings(chalk.red, data)
  );
};

const success = (...data: unknown[]): void => {
  if (_logLevel < LogLevel.normal) {
    return;
  }

  consoleLog(
    chalk.bgGreenBright(chalk.black(chalk.bold("SUCCESS"))),
    ...colorStrings(chalk.greenBright, data)
  );
};

export const Logger = Object.freeze({
  setLogLevel,
  value,
  info,
  warn,
  error,
  success,
});
