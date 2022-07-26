import yargs from "yargs";
import { Logger, LogLevel } from "../../utils/logger";
import { nameof } from "../../utils/nameof";
import { FunctionArg } from "../../utils/type-utils";
import { PrepareReleaseCommandOptions } from "../commands/prepare-release";
import { GlobalArgv } from "../options";
import { MiddlewareHandler } from "./middleware-handler";

export const LogLevelMiddleware: MiddlewareHandler = {
  handler: (argv: Record<string, string | boolean | number | FunctionArg>) => {
    if (argv[nameof<GlobalArgv>("plumbing")]) {
      Logger.setLogLevel(LogLevel.values);
      return;
    }

    if (
      argv[nameof<GlobalArgv>("verbose")] &&
      argv[nameof<GlobalArgv>("quiet")]
    ) {
      Logger.setLogLevel(LogLevel.normal);
      const message = "Passing both --verbose and --quiet is contradictory.";
      Logger.error(message);
      yargs.exit(1, new Error(message));
      process.exit(1);
    }

    if (
      argv[nameof<PrepareReleaseCommandOptions>("dryRun")] &&
      argv[nameof<GlobalArgv>("quiet")]
    ) {
      Logger.setLogLevel(LogLevel.normal);
      const message = "Passing both --dryRun and --quiet is contradictory.";
      Logger.error(message);
      yargs.exit(1, new Error(message));
      process.exit(1);
    }

    if (argv[nameof<GlobalArgv>("verbose")]) {
      Logger.setLogLevel(LogLevel.verbose);
      return;
    }

    if (argv[nameof<GlobalArgv>("quiet")]) {
      Logger.setLogLevel(LogLevel.none);
      return;
    }

    Logger.setLogLevel(LogLevel.normal);
  },
  preValidation: true,
};
