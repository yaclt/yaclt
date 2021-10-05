import yargs from "yargs";
import { Logger } from "./logger";
import { relativize } from "./path-utils";

export const runAction = <T>(action: () => T): T => {
  try {
    const configPath = process.env["YACLT_CONFIG_PATH"];
    if (configPath) {
      Logger.info(`Using configuration file at ${relativize(configPath)}`);
    }

    return action();
  } catch (error) {
    if (error.message) {
      Logger.error(error.message);
    } else {
      Logger.error("An unknown error ocurred.");
    }
    yargs.exit(1, error);
    process.exit(1);
  }
};
