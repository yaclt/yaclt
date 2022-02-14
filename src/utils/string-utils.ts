import { compileTemplate } from "../utils/template-utils";

export const StringFormatParams = {
  changeType: "changeType",
  changeTypes: "changeTypes",
  message: "message",
  issueId: "issueId",
};

export const regexIndexOf = (
  string: string,
  regex: RegExp,
  startpos?: number
): number => {
  const indexOf = string.slice(Math.max(0, startpos || 0)).search(regex);
  return indexOf >= 0 ? indexOf + (startpos || 0) : indexOf;
};

export const formatToChangeTypeTemplate = (
  format: string
): HandlebarsTemplateDelegate<Record<string, unknown>> | undefined => {
  const changeTypeTemplatePattern = /{{\s*changeType\s*}}/;
  const hasChangeType = changeTypeTemplatePattern.test(format);
  if (!hasChangeType) {
    return undefined;
  }

  const indexOfChangeType = format.search(changeTypeTemplatePattern);
  const changeTypeHandlebars = format.slice(
    Math.max(0, regexIndexOf(format, changeTypeTemplatePattern)),
    Math.min(
      format.length,
      indexOfChangeType +
        StringFormatParams.changeType.length +
        Math.max(
          format
            .slice(indexOfChangeType + StringFormatParams.changeType.length)
            .indexOf("}}") + 3,
          0
        )
    )
  );
  return compileTemplate(changeTypeHandlebars);
};

export const dryRunTemplate = (
  filesToBeDeleted: string[],
  globalChangelogFilename: string,
  globalChangelogAdditions: string
): string => {
  const template = compileTemplate(`Files to be deleted:
{{#each filesToBeDeleted}}
- {{this}}
{{/each}}
  
{{globalChangelogFilename}} changes:
  
{{globalChangelogAdditions}}`);

  return template({
    filesToBeDeleted: filesToBeDeleted,
    globalChangelogFilename: globalChangelogFilename,
    globalChangelogAdditions: globalChangelogAdditions,
  });
};

export const camelToKebabCase = (str: string): string =>
  str
    .split("")
    .map((letter, idx) =>
      letter.toUpperCase() === letter
        ? `${idx !== 0 ? "-" : ""}${letter.toLowerCase()}`
        : letter
    )
    .join("");

export const kebabToCamelCase = (str: string): string =>
  str.replace(/-./g, (match: string) => match.charAt(1).toUpperCase());
