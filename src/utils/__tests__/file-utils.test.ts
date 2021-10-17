import mock from "mock-fs";
import {
  readLines,
  touchFile,
  isFilepath,
  pathIsFile,
  openInEditor,
} from "../file-utils";
import fs from "fs";
import { spawn } from "child_process";

mock({
  "no-line.txt": "",
  "one-line.txt": "one line",
  "two-line.txt": "one line\ntwo line",
  "mock-file-that-exist.txt": "",
});

jest.mock("child_process", () => ({
  spawn: jest.fn(),
}));

const emptyStatement = {};

describe("file-utils", () => {
  afterAll(() => {
    jest.clearAllMocks();
    jest.unmock("child_process");
    jest.unmock("fs");
    mock.restore();
  });
  describe("readLines", () => {
    afterAll(() => {
      jest.clearAllMocks();
    });

    it("should read line and return a empty array for one line file", () => {
      expect(readLines("./no-line.txt")).toEqual([]);
    });

    it("should read line and single return a single element for one line file", () => {
      expect(readLines("./one-line.txt")).toEqual(["one line"]);
    });

    it("should read line and single return a multiple element for multiline file", () => {
      expect(readLines("./two-line.txt")).toEqual(["one line", "two line"]);
    });
  });

  describe("touchFile", () => {
    afterAll(() => {
      jest.clearAllMocks();
    });

    it("should create file if that does not exist", () => {
      expect(fs.existsSync("./create-file.txt")).toBe(false);

      touchFile("./create-file.txt");

      expect(fs.existsSync("./create-file.txt")).toBe(true);
    });

    it("should call closeSync with given file name when UtimesSync throws error", () => {
      jest.spyOn(fs, "utimesSync").mockImplementationOnce(() => {
        throw new Error("error");
      });
      const mockCloseSync = jest
        .spyOn(fs, "closeSync")
        .mockImplementationOnce(() => emptyStatement);
      const openSyncReturnValue = 1;
      const mockOpenSync = jest
        .spyOn(fs, "openSync")
        .mockImplementationOnce(() => openSyncReturnValue);
      expect(touchFile("./error-file.txt")).toBeUndefined();

      expect(mockOpenSync).toHaveBeenCalledWith("./error-file.txt", "w");
      expect(mockCloseSync).toHaveBeenCalledWith(openSyncReturnValue);
    });
  });

  describe("isFilePath", () => {
    afterAll(() => {
      jest.clearAllMocks();
    });

    it("should return true when the file exists", () => {
      expect(isFilepath("./mock-file-that-exist.txt")).toBeTruthy();
    });

    it("should return false when the file does not exist", () => {
      expect(isFilepath("./mock-file-that-does-not-exist.txt")).toBeFalsy();
    });
  });

  describe("pathIsFile", () => {
    afterAll(() => {
      jest.clearAllMocks();
    });

    it("should return true when the file exists", () => {
      expect(pathIsFile("./mock-file-that-exist.txt")).toBeTruthy();
    });

    it("should return false when the file does not exist", () => {
      expect(pathIsFile("./mock-file-that-does-not-exist.txt")).toBeFalsy();
    });
  });

  describe("openInEditor", () => {
    let OLD_ENV: NodeJS.ProcessEnv;

    beforeAll(() => {
      OLD_ENV = process.env;
    });

    beforeEach(() => {
      jest.clearAllMocks();
      process.env = OLD_ENV;
    });

    afterAll(() => {
      process.env = OLD_ENV;
    });

    it("should call spawn if the process env of editor exists", () => {
      process.env["EDITOR"] = "true";

      openInEditor("./no-line.txt");

      expect(spawn).toHaveBeenCalledWith("true", ["./no-line.txt"], {
        stdio: "inherit",
      });
    });

    it("should not call call spawn if the process env of editor does not exist", () => {
      process.env = {};

      openInEditor("./no-line.txt");

      expect(spawn).not.toHaveBeenCalled();
    });
  });
});
