import yargs, { CommandModule, Options } from "yargs";
import { Logger } from "../../utils/logger";
import { kebabToCamelCase } from "../../utils/string-utils";
import { FunctionArg } from "../../utils/type-utils";
import { Commands } from "../commands";
import { MiddlewareHandler } from "./middleware-handler";

const allValidOptions: string[] = [];
Commands.forEach((command: CommandModule) => {
  const builderKeys = Object.keys(command.builder ?? {});
  if (builderKeys.length === 0) {
    return;
  }

  allValidOptions.push(...builderKeys);

  for (const key of builderKeys) {
    const alias = (command.builder as Record<string, Options> | undefined)?.[
      key
    ]?.alias;
    if (alias) {
      if (Array.isArray(alias)) {
        allValidOptions.push(...alias);
      } else {
        allValidOptions.push(alias as string);
      }
    }
  }
});

export const ValidateArgvMiddleware: MiddlewareHandler = {
  handler: (
    argv: Record<string, string | boolean | number | FunctionArg>
  ): Record<string, string | boolean | number | FunctionArg> => {
    const invalidOptions: string[] = [];
    for (const key of Object.keys(argv)) {
      const convertedKey = kebabToCamelCase(key);
      // these are special yargs things added to argv
      if (key === "_" || key === "$0") {
        continue;
      }

      if (
        allValidOptions.every(
          (optionName: string) =>
            optionName !== key && optionName !== convertedKey
        )
      ) {
        invalidOptions.push(key);
      }
    }

    if (invalidOptions.length > 0) {
      for (const key of invalidOptions) {
        Logger.error(
          `Unknown option: ${key.length > 1 ? `--${key}` : `-${key}`}`
        );
      }
      Logger.value(false);
      yargs.exit(1, new Error("Invalid options found in argv"));
      process.exit(1);
    }

    return argv;
  },
  preValidation: true,
};
