import findUp from "find-up";
import fs from "fs";
import yaml from "js-yaml";
import os from "os";
import path from "path";
import yargs from "yargs";
import { Logger } from "../utils/logger";

const supportedConfigFilenames = [
  "yacltrc.yaml",
  ".yacltrc.yaml",
  "yacltrc.yml",
  ".yacltrc.yml",
  "yacltrc.json",
  ".yacltrc.json",
  "yacltrc.js",
  ".yacltrc.js",
];

const parseConfig = (
  configPath: string,
  configContents: string
): Record<string, unknown> => {
  if (configPath.endsWith(".json")) {
    return JSON.parse(configContents);
  }

  if (configPath.endsWith(".yml") || configPath.endsWith(".yaml")) {
    const config = yaml.load(configContents);
    if (!config || typeof config !== "object") {
      const message = "Invalid yml configuration";
      Logger.error(message);
      yargs.exit(1, new Error(message));
      process.exit(1);
    }

    return config as Record<string, unknown>;
  }

  if (configPath.endsWith(".js")) {
    // we need to require this at runtime since it's a config file
    // eslint-disable-next-line unicorn/prefer-module
    return require(path.resolve(configPath.replace(".js", "")));
  }

  const message = `Unsupported config format '${configPath}'. Only 'yacltrc.yaml', 'yacltrc.yml', 'yacltrc.json', and 'yacltrc.js'`;
  Logger.error(message);
  yargs.exit(1, new Error(message));
  process.exit(1);
};

export const getConfig = (): Record<string, unknown> => {
  const configPath = findUp.sync(supportedConfigFilenames);

  if (!configPath) {
    // look for global config file
    const configHome =
      process.env["YACLT_CONFIG_HOME"] ||
      path.join(
        `${
          process.env["XDG_CONFIG_HOME"] || path.join(os.homedir(), ".config/")
        }`,
        "yaclt"
      );
    for (const filename of supportedConfigFilenames) {
      const globalConfigPath = path.join(configHome, filename);
      if (fs.existsSync(globalConfigPath)) {
        process.env["YACLT_CONFIG_PATH"] = globalConfigPath;
        // convert to relative path in case it's a .js config file
        const relativePath = path.relative(process.cwd(), globalConfigPath);
        const contents = fs.readFileSync(globalConfigPath).toString();
        return parseConfig(relativePath, contents);
      }
    }

    return {};
  }

  process.env["YACLT_CONFIG_PATH"] = configPath;
  const configContents = fs.readFileSync(configPath).toString();
  return parseConfig(configPath, configContents);
};
