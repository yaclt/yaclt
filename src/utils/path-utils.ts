import path from "path";

export const toValidFilename = (input: string): string =>
  input.replace(/["%*/:<>?\\|]/g, "-");

export const relativize = (configPath: string): string => {
  const pathRelativeToCwd = path.relative(process.cwd(), configPath);
  // if config path is under current path, use path relative to cwd
  if (!pathRelativeToCwd.includes("..")) {
    return `./${pathRelativeToCwd}`;
  }

  const home = process.env["HOME"];
  if (home && configPath.includes(home)) {
    return configPath.replace(home, "~");
  }

  return configPath;
};
