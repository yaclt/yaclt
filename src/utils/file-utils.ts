import { spawn } from "child_process";
import fs from "fs";

export const readLines = (filePath: string): string[] =>
  fs
    .readFileSync(filePath)
    .toString()
    .replace(/\r\n/g, "\n")
    .split("\n")
    .filter(Boolean);

export const touchFile = (filePath: string): void => {
  // see https://remarkablemark.org/blog/2017/12/17/touch-file-nodejs/#touch-file
  const time = new Date();

  try {
    fs.utimesSync(filePath, time, time);
  } catch {
    fs.closeSync(fs.openSync(filePath, "w"));
  }
};

export const isFilepath = (subject: string): boolean => {
  try {
    fs.accessSync(subject);
    return true;
  } catch {
    return false;
  }
};

export const pathIsFile = (filePath: string): boolean => {
  try {
    return fs.statSync(filePath).isFile();
  } catch {
    return false;
  }
};

const parseEditorArgs = (
  editorString: string
): { cmd: string; args: string[] } => {
  if (!editorString.includes(" ")) {
    return { cmd: editorString, args: [] };
  }

  // split at space, unless the space is quoted
  const parts = editorString.split(/ +(?=(?:(?:[^"]*"){2})*[^"]*$)/g);
  if (parts.length === 0) {
    return { cmd: editorString, args: [] };
  }

  if (parts.length == 1) {
    return { cmd: parts[0] ?? editorString, args: [] };
  }

  const cmd = parts[0] ?? editorString;
  const args = parts.slice(1);
  return { cmd, args };
};

export const openInEditor = (file: string): void => {
  if (process.env["EDITOR"]) {
    const { cmd, args } = parseEditorArgs(process.env["EDITOR"]);
    args.push(file);
    spawn(cmd, args, { stdio: "inherit" });
  }
};
