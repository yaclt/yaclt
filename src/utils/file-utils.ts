import fs from "fs";
import { spawn } from "child_process";

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

export const openInEditor = (file: string): void => {
  if (process.env["EDITOR"]) {
    spawn(process.env["EDITOR"], [file], { stdio: "inherit" });
  }
};
