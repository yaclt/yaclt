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

    it("should call utimesSync with given file name", () => {
      const mockUtimesSync = jest
        .spyOn(fs, "utimesSync")
        .mockImplementationOnce(() => emptyStatement);
      touchFile("./create-file.txt");

      expect(mockUtimesSync).toHaveBeenCalledWith(
        "./create-file.txt",
        expect.any(Date),
        expect.any(Date)
      );
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
      expect(touchFile("./error-file.txt")).toBe(undefined);

      expect(mockOpenSync).toHaveBeenCalledWith("./error-file.txt", "w");
      expect(mockCloseSync).toHaveBeenCalledWith(openSyncReturnValue);
    });
  });

  describe("isFilePath", () => {
    afterAll(() => {
      jest.clearAllMocks();
    });

    it("should return true if the file has access", () => {
      jest.spyOn(fs, "accessSync").mockImplementationOnce(() => emptyStatement);

      expect(isFilepath("./file-with-access.txt")).toEqual(true);
    });

    it("should return false if the file has no access", () => {
      jest.spyOn(fs, "accessSync").mockImplementationOnce(() => {
        throw new Error("error");
      });

      expect(isFilepath("./file-without-access.txt")).toEqual(false);
    });
  });

  describe("pathIsFile", () => {
    afterAll(() => {
      jest.clearAllMocks();
    });

    it("should return true if the file exists", () => {
      expect(pathIsFile("./no-line.txt")).toEqual(true);
    });

    it("should return false if the file does not exist", () => {
      expect(pathIsFile("./file-without-access.txt")).toEqual(false);
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
