import yargs from "yargs";
import { Logger } from "../logger";
import { relativize } from "../path-utils";
import { runAction } from "../run-action";

jest.mock("../logger", () => ({
  Logger: {
    error: jest.fn(),
    info: jest.fn(),
  },
}));

jest.mock("../path-utils", () => ({
  relativize: jest.fn(() => "./file-path"),
}));

describe("runAction", () => {
  const OLD_ENV = process.env;
  const emptyStatement = "";
  const mockExit = jest.spyOn(process, "exit").mockImplementation(() => {
    throw new Error("error");
  });
  const mockYargs = jest
    .spyOn(yargs, "exit")
    .mockImplementation(() => emptyStatement);

  beforeEach(() => {
    jest.clearAllMocks();
    process.env = OLD_ENV;
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  it("should call logger and complete action when YACLT_CONFIG_PATH is present", () => {
    process.env["YACLT_CONFIG_PATH"] = "./file-path";
    const expected = "return value";

    const actual = runAction((): string => "return value");

    expect(Logger.info).toHaveBeenCalledWith(
      "Using configuration file at ./file-path"
    );
    expect(relativize).toHaveBeenCalledWith("./file-path");
    expect(actual).toBe(expected);
  });

  it("should not call logger but complete action when YACLT_CONFIG_PATH is not present", () => {
    process.env = {};
    const expected = "return value";

    const actual = runAction((): string => "return value");

    expect(Logger.info).not.toHaveBeenCalled();
    expect(actual).toBe(expected);
  });

  it("should call logger with custom error when error is thrown without message and exit", () => {
    process.env["YACLT_CONFIG_PATH"] = "./file-path";

    /* eslint-disable unicorn/error-message */
    const error = new Error(undefined);
    /* eslint-enable unicorn/error-message */

    expect(() =>
      runAction(() => {
        throw error;
      })
    ).toThrow("error");

    expect(Logger.error).toHaveBeenCalledWith("An unknown error ocurred.");
    expect(mockYargs).toHaveBeenCalledWith(1, error);
    expect(mockExit).toHaveBeenCalledWith(1);
  });

  it("should call logger with error message when error is thrown with message and exit", () => {
    process.env["YACLT_CONFIG_PATH"] = "./file-path";
    const error = new Error("error occured");

    expect(() =>
      runAction(() => {
        throw error;
      })
    ).toThrow("error");

    expect(Logger.error).toHaveBeenCalledWith("error occured");
    expect(mockYargs).toHaveBeenCalledWith(1, error);
    expect(mockExit).toHaveBeenCalledWith(1);
  });
});
