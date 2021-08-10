import fs from "fs";
import path from "path";
import yargs from "yargs";
import { readLines } from "../utils/file-utils";
import { Icons } from "../utils/icons";
import { formatToChangeTypeRegex } from "../utils/string-format";
import { ActionOptions } from "./action-options";

export interface ActionValidateOptions extends ActionOptions {
  changeTypes: string[];
  validationPattern: string;
}

export const ActionValidate = (options: ActionValidateOptions): boolean => {
  const noneFoundWarning = `${Icons.warning} No changelog entries found in ${options.logsDir}`;
  if (!fs.existsSync(options.logsDir)) {
    console.warn(noneFoundWarning);
    return false;
  }

  const filePaths = fs.readdirSync(options.logsDir);
  if (filePaths.length === 0) {
    console.warn(noneFoundWarning);
    return false;
  }

  let hasInvalidEntries = false;

  const regex = new RegExp(`^${options.validationPattern}$`);
  const changeTypePattern = formatToChangeTypeRegex(options.format);
  for (const filePath of filePaths) {
    const lines = readLines(path.join(options.logsDir, filePath));

    for (const line of lines) {
      if (!regex.test(line)) {
        console.error(
          `${Icons.error} Malformed changelog entry found in file ${filePath}: ${line}`
        );

        hasInvalidEntries = true;
      }

      const changeType = options.changeTypes.find((changeType: string) =>
        line.includes(changeTypePattern({ changeType }))
      );
      if (!changeType || changeType === "UNCATEGORIZED") {
        console.error(
          `${Icons.error} Invalid change type found in changelog file ${filePath}: ${line}`
        );
        hasInvalidEntries = true;
      }
    }
  }

  if (hasInvalidEntries) {
    const message = `${Icons.error} Malformed changelog entries found.`;
    console.error(options.plumbing ? "false" : message);
    yargs.exit(1, new Error(message));
    return false;
  }

  if (options.plumbing) {
    console.log("true");
    return true;
  }

  console.log(`${Icons.success} All changelog entries formatted correctly!`);
  return true;
};
