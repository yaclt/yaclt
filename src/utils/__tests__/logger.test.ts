/* eslint-disable no-console */
const realLog = console.log;
console.log = jest.fn();
const mockedLog = console.log;

const realInfo = console.info;
console.info = jest.fn();
const mockedInfo = console.info;

const realWarn = console.warn;
console.warn = jest.fn();
const mockedWarn = console.warn;

const realError = console.error;
console.error = jest.fn();
const mockedError = console.error;

import chalk from "chalk";
import { Logger, LogLevel } from "../logger";

describe("Logger", () => {
  afterAll(() => {
    jest.restoreAllMocks();
    console.log = realLog;
    console.error = realError;
    console.warn = realWarn;
    console.info = realInfo;
  });

  describe("setLogLevel", () => {
    it("should set log level to none in case of -1", () => {
      expect(Logger.setLogLevel(-1)).toBe(LogLevel.none);
    });

    it("should set log level to normal in case of 1", () => {
      expect(Logger.setLogLevel(1)).toBe(LogLevel.normal);
    });

    it("should set log level to value in case of 0", () => {
      expect(Logger.setLogLevel(0)).toBe(LogLevel.values);
    });

    it("should set log level to verbose in case of 2", () => {
      expect(Logger.setLogLevel(2)).toBe(LogLevel.verbose);
    });

    it("should set log level to normal in case of non enum values", () => {
      expect(Logger.setLogLevel(50)).toBe(LogLevel.normal);
    });
  });

  describe("success", () => {
    const successLog = chalk.bgGreenBright(chalk.black(chalk.bold("SUCCESS")));
    const successMessage = chalk.greenBright("Success message");
    const successNumber = 1;

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should call console log when the loglevel is normal", () => {
      Logger.setLogLevel(1);
      Logger.success("Success message");

      expect(mockedLog).toHaveBeenCalledWith(successLog, successMessage);
    });

    it("should call console log when the loglevel is verbose", () => {
      Logger.setLogLevel(2);
      Logger.success("Success message");

      expect(mockedLog).toHaveBeenCalledWith(successLog, successMessage);
    });

    it("should call console log when the loglevel is verbose and there is more than 1 element", () => {
      Logger.setLogLevel(2);
      Logger.success("Success message", 1);

      expect(mockedLog).toHaveBeenCalledWith(
        successLog,
        successMessage,
        successNumber
      );
    });

    it("should call console log when no loglevel is set", () => {
      Logger.setLogLevel(1);
      Logger.success("Success message");

      expect(mockedLog).toHaveBeenCalledWith(successLog, successMessage);
    });

    it("should call console log when no loglevel is none or value", () => {
      Logger.setLogLevel(-1);
      Logger.success("Success message");

      expect(mockedLog).not.toHaveBeenCalled();
    });

    it("should call console log when no loglevel is none or value", () => {
      Logger.setLogLevel(-1);
      Logger.success("Success message");

      expect(mockedLog).not.toHaveBeenCalled();
    });
  });

  describe("info", () => {
    const infoLog = chalk.bgBlue(chalk.black(chalk.bold("INFO")));
    const successMessage = chalk.blue("Success message");
    const successNumber = 1;

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should not call console info when the loglevel is normal", () => {
      Logger.setLogLevel(1);
      Logger.info("Success message");

      expect(mockedInfo).not.toHaveBeenCalled();
    });

    it("should call console info when the loglevel is verbose", () => {
      Logger.setLogLevel(2);
      Logger.info("Success message");

      expect(mockedInfo).toHaveBeenCalledWith(infoLog, successMessage);
    });

    it("should call console info when the loglevel is verbose and there is more than 1 element", () => {
      Logger.setLogLevel(2);
      Logger.info("Success message", 1);

      expect(mockedInfo).toHaveBeenCalledWith(
        infoLog,
        successMessage,
        successNumber
      );
    });

    it("should not call console info when no loglevel is set", () => {
      Logger.setLogLevel(1);
      Logger.info("Success message");

      expect(mockedInfo).not.toHaveBeenCalled();
    });

    it("should not call console info when loglevel is none or value", () => {
      Logger.setLogLevel(-1);
      Logger.info("Success message");

      expect(mockedInfo).not.toHaveBeenCalled();
    });
  });

  describe("warn", () => {
    const warnLog = chalk.bgYellow(chalk.black(chalk.bold("WARN")));
    const warnMessage = chalk.yellow("Warn message");
    const warnNumber = 1;

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should call console warn when the loglevel is normal", () => {
      Logger.setLogLevel(1);
      Logger.warn("Warn message");

      expect(mockedWarn).toHaveBeenCalledWith(warnLog, warnMessage);
    });

    it("should call console warn when the loglevel is verbose", () => {
      Logger.setLogLevel(2);
      Logger.warn("Warn message");

      expect(mockedWarn).toHaveBeenCalledWith(warnLog, warnMessage);
    });

    it("should call console warn when the loglevel is verbose and there is more than 1 element", () => {
      Logger.setLogLevel(2);
      Logger.warn("Warn message", 1);

      expect(mockedWarn).toHaveBeenCalledWith(warnLog, warnMessage, warnNumber);
    });

    it("should call console warn when no loglevel is set", () => {
      Logger.setLogLevel(1);
      Logger.warn("Warn message");

      expect(mockedWarn).toHaveBeenCalledWith(warnLog, warnMessage);
    });

    it("should call console warn when loglevel is none or value", () => {
      Logger.setLogLevel(-1);
      Logger.warn("Warn message");

      expect(mockedWarn).not.toHaveBeenCalled();
    });
  });

  describe("error", () => {
    const errorLog = chalk.bgRed(chalk.black(chalk.bold("ERROR")));
    const errorMessage = chalk.red("Error message");
    const errorNumber = 1;

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should call console error when the loglevel is normal", () => {
      Logger.setLogLevel(1);
      Logger.error("Error message");

      expect(mockedError).toHaveBeenCalledWith(errorLog, errorMessage);
    });

    it("should call console error when the loglevel is verbose", () => {
      Logger.setLogLevel(2);
      Logger.error("Error message");

      expect(mockedError).toHaveBeenCalledWith(errorLog, errorMessage);
    });

    it("should call console error when the loglevel is verbose and there is more than 1 element", () => {
      Logger.setLogLevel(2);
      Logger.error("Error message", 1);

      expect(mockedError).toHaveBeenCalledWith(
        errorLog,
        errorMessage,
        errorNumber
      );
    });

    it("should call console error when no loglevel is set", () => {
      Logger.setLogLevel(1);
      Logger.error("Error message");

      expect(mockedError).toHaveBeenCalledWith(errorLog, errorMessage);
    });

    it("should call console error when loglevel is none or value", () => {
      Logger.setLogLevel(-1);
      Logger.error("Error message");

      expect(mockedError).not.toHaveBeenCalled();
    });
  });

  describe("value", () => {
    const valueMessage = "Value message";
    const valueNumber = 1;

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should not call console log when the loglevel is normal", () => {
      Logger.setLogLevel(1);
      Logger.value(valueMessage);

      expect(mockedLog).not.toHaveBeenCalled();
    });

    it("should not call console log when the loglevel is verbose", () => {
      Logger.setLogLevel(2);
      Logger.value(valueMessage);

      expect(mockedLog).not.toHaveBeenCalled();
    });

    it("should call console log when the loglevel is value and there is more than 1 element", () => {
      Logger.setLogLevel(0);
      Logger.value(valueMessage, 1);

      expect(mockedLog).toHaveBeenCalledWith(valueMessage, valueNumber);
    });

    it("should call console warn when no loglevel is set", () => {
      Logger.setLogLevel(1);
      Logger.value(valueMessage);

      expect(mockedLog).not.toHaveBeenCalled();
    });

    it("should not call console warn when loglevel is none", () => {
      Logger.setLogLevel(-1);
      Logger.value(valueMessage);

      expect(mockedLog).not.toHaveBeenCalled();
    });

    it("should call console warn when loglevel is value", () => {
      Logger.setLogLevel(0);
      Logger.value(valueMessage);

      expect(mockedLog).toHaveBeenCalledWith(valueMessage);
    });
  });
});
