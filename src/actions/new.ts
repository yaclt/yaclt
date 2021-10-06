import fs from "fs";
import git from "isomorphic-git";
import { DateTime } from "luxon";
import path from "path";
import yargs from "yargs";
import { openInEditor } from "../utils/file-utils";
import { handleHooks, Hook } from "../utils/hook-handler";
import { Logger } from "../utils/logger";
import { toValidFilename } from "../utils/path-utils";
import { StringFormatParams } from "../utils/string-utils";
import { compileTemplate } from "../utils/template-utils";
import { ActionOptions } from "./action-options";

export interface ActionNewOptions extends ActionOptions {
  changeType: string;
  issueId?: string;
  gitBranchFormat?: string;
  message?: string;
  edit: boolean;
  preNew?: Hook;
  postNew?: Hook;
  entryFileName?: string;
}

const actionNewHandler = async (options: ActionNewOptions): Promise<void> => {
  const outputPath = path.join(
    options.logsDir,
    toValidFilename(options.entryFileName || `${DateTime.now().toISO()}.md`)
  );

  if (fs.existsSync(outputPath)) {
    const message = `File ${outputPath} alread exists`;
    Logger.error(message);
    yargs.exit(1, new Error(message));
    process.exit(1);
  }

  let issueId: string | undefined;
  if (options.issueId) {
    issueId = options.issueId;
  } else if (options.gitBranchFormat) {
    const branch = await git.currentBranch({ fs, dir: process.cwd() });
    if (branch) {
      const pattern = new RegExp(options.gitBranchFormat);
      issueId = branch.match(pattern)?.[1];
    }
  }

  const template = compileTemplate(options.format);
  const entryText = template({
    [StringFormatParams.changeType]: options.changeType,
    [StringFormatParams.message]:
      options.message ?? "A user-friendly description of your change",
    [StringFormatParams.issueId]: issueId ?? "0000",
  });

  if (!fs.existsSync(options.logsDir)) {
    fs.mkdirSync(options.logsDir);
  }

  fs.writeFileSync(outputPath, entryText);

  Logger.value(outputPath);
  Logger.success(`Changelog entry placeholder generated at ${outputPath}!`);

  if (options.edit) {
    openInEditor(outputPath);
  }
};

export const ActionNew = handleHooks(actionNewHandler, "preNew", "postNew");
