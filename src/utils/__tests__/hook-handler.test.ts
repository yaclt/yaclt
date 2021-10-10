import { handleHooks } from "../hook-handler";
import yargs from "yargs";
import { Logger } from "../logger";
jest.mock("../logger", () => ({
  Logger: {
    error: jest.fn(),
  },
}));

describe("handleHooks", () => {
  const emptyBlock = "";
  const mockExit = jest.spyOn(process, "exit").mockImplementation(() => {
    throw new Error("Error");
  });
  const mockYargs = jest.spyOn(yargs, "exit").mockImplementation(() => {
    emptyBlock;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it("should exit in case prehook is not a function", () => {
    type Argument = { preHook: number; postHook: number };
    const handler: (argv: Argument) => void = (argv: Argument) => {
      argv.preHook;
    };

    const func = handleHooks(handler, "preHook", "postHook");
    func.call(func, { preHook: 4, postHook: 5 });

    expect(mockYargs).toHaveBeenCalledWith(
      1,
      new Error("Hook preHook is not defined as a function.")
    );
    expect(mockExit).toHaveBeenCalledWith(1);
  });

  it("should exit in case prehook is a function but posthook is not a function", () => {
    type Argument = { preHook: () => true; postHook: number };
    const handler: (argv: Argument) => void = (argv: Argument) => {
      argv.preHook;
    };

    const func = handleHooks(handler, "preHook", "postHook");
    func.call(func, { preHook: () => true, postHook: 5 });

    expect(mockYargs).toHaveBeenCalledWith(
      1,
      new Error("Hook postHook is not defined as a function.")
    );
    expect(mockExit).toHaveBeenCalledWith(1);
  });

  it("should exit in case prehook promise is rejected", async () => {
    const rejection = Promise.reject("error");
    type Argument = { preHook: () => Promise<never>; postHook: () => void };
    const handler: (argv: Argument) => void = (argv: Argument) => {
      argv.postHook;
    };

    const func = handleHooks(handler, "preHook", "postHook");
    await func
      .call(func, {
        preHook: () => rejection,
        postHook: () => {
          emptyBlock;
        },
      })
      .catch((error) => {
        error;
      });

    expect(Logger.error).toHaveBeenCalledWith(
      "An error occurred evaluating hook preHook",
      "error"
    );
    expect(mockYargs).toHaveBeenCalledWith(
      1,
      new Error("An error occurred evaluating hook preHook")
    );
    expect(mockExit).toHaveBeenCalledWith(1);
  });

  it("should exit in case posthook promise is rejected", async () => {
    const rejection = Promise.reject("error");
    type Argument = { preHook: () => void; postHook: () => Promise<never> };
    const handler: (argv: Argument) => void = (argv: Argument) => {
      argv.postHook;
    };

    const func = handleHooks(handler, "preHook", "postHook");
    await func
      .call(func, {
        preHook: () => {
          emptyBlock;
        },
        postHook: () => rejection,
      })
      .catch((error) => {
        error;
      });

    expect(Logger.error).toHaveBeenCalledWith(
      "An error occurred evaluating hook postHook",
      "error"
    );
    expect(mockYargs).toHaveBeenCalledWith(
      1,
      new Error("An error occurred evaluating hook postHook")
    );
    expect(mockExit).toHaveBeenCalledWith(1);
  });

  it("should exit in case prehook promise is resolved but to a false value", async () => {
    const rejection = Promise.resolve(false);
    type Argument = { preHook: () => Promise<boolean>; postHook: () => void };
    const handler: (argv: Argument) => void = (argv: Argument) => {
      argv.postHook;
    };

    const func = handleHooks(handler, "preHook", "postHook");
    await func
      .call(func, {
        preHook: () => rejection,
        postHook: () => {
          emptyBlock;
        },
      })
      .catch((error) => {
        error;
      });

    expect(Logger.error).toHaveBeenCalledWith("Hook preHook returned false.");
    expect(mockYargs).toHaveBeenCalledWith(
      1,
      new Error("Hook preHook returned false.")
    );
    expect(mockExit).toHaveBeenCalledWith(1);
  });

  it("should exit in case posthook promise is resolved but to a false value", async () => {
    const rejection = Promise.resolve(false);
    type Argument = { preHook: () => void; postHook: () => Promise<boolean> };
    const handler: (argv: Argument) => void = (argv: Argument) => {
      argv.postHook;
    };

    const func = handleHooks(handler, "preHook", "postHook");
    await func
      .call(func, {
        preHook: () => {
          emptyBlock;
        },
        postHook: () => rejection,
      })
      .catch((error) => {
        error;
      });

    expect(Logger.error).toHaveBeenCalledWith("Hook postHook returned false.");
    expect(mockYargs).toHaveBeenCalledWith(
      1,
      new Error("Hook postHook returned false.")
    );
    expect(mockExit).toHaveBeenCalledWith(1);
  });

  it("should exit in case prehook returns a false value", async () => {
    const rejection = false;
    type Argument = { preHook: () => boolean; postHook: () => void };
    const handler: (argv: Argument) => void = (argv: Argument) => {
      argv.postHook;
    };

    const func = handleHooks(handler, "preHook", "postHook");
    await func
      .call(func, {
        preHook: () => rejection,
        postHook: () => {
          emptyBlock;
        },
      })
      .catch((error) => {
        error;
      });

    expect(Logger.error).toHaveBeenCalledWith("Hook preHook returned false.");
    expect(mockYargs).toHaveBeenCalledWith(
      1,
      new Error("Hook preHook returned false.")
    );
    expect(mockExit).toHaveBeenCalledWith(1);
  });

  it("should exit in case posthook returns a false value", async () => {
    const rejection = false;
    type Argument = { preHook: () => void; postHook: () => boolean };
    const handler: (argv: Argument) => void = (argv: Argument) => {
      argv.postHook;
    };

    const func = handleHooks(handler, "preHook", "postHook");
    await func
      .call(func, {
        preHook: () => {
          emptyBlock;
        },
        postHook: () => rejection,
      })
      .catch((error) => {
        error;
      });

    expect(Logger.error).toHaveBeenCalledWith("Hook postHook returned false.");
    expect(mockYargs).toHaveBeenCalledWith(
      1,
      new Error("Hook postHook returned false.")
    );
    expect(mockExit).toHaveBeenCalledWith(1);
  });

  it("should evaluate handler and return value incase both the promise is resolved", async () => {
    const success = Promise.resolve("success");
    type Argument = {
      preHook: () => Promise<string>;
      postHook: () => Promise<string>;
    };
    const handler: (argv: Argument) => Promise<string> = (argv: Argument) =>
      argv.postHook();

    const func = handleHooks(handler, "preHook", "postHook");
    const value = await func
      .call(func, { preHook: () => success, postHook: () => success })
      .catch((error) => {
        error;
      });

    expect(value).toBe("success");
  });
});
