import os from "os";
import { relativize, toValidFilename } from "../path-utils";

describe("toValidFilename", () => {
  it("replaces illegal filename characters with hyphens", () => {
    const input = "filename%*/:<>?.txt";

    const expexted = "filename-------.txt";

    expect(toValidFilename(input)).toBe(expexted);
  });
});

describe("relativize", () => {
  it("starts with ./ when path is under current directory", () => {
    const path = `${process.cwd()}/yacltrc.yml`;

    const expected = "./yacltrc.yml";

    expect(relativize(path)).toBe(expected);
  });

  it("Is an absolute path when above current directory and not in home directory", () => {
    const path = "/etc/yaclt/yacltrc.yml";

    expect(relativize(path)).toBe(path);
  });

  it("replaces home directory path with tilde ~", () => {
    const path = `${os.homedir()}/.config/yaclt/yacltrc.yml`;

    const expected = "~/.config/yaclt/yacltrc.yml";

    expect(relativize(path)).toBe(expected);
  });
});
