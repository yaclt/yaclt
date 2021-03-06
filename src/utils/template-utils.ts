import Handlebars from "handlebars";

interface CompileOptions {
  data?: boolean;
  compat?: boolean;
  knownHelpers?: KnownHelpers;
  knownHelpersOnly?: boolean;
  noEscape?: boolean;
  strict?: boolean;
  assumeObjects?: boolean;
  preventIndent?: boolean;
  ignoreStandalone?: boolean;
  explicitPartialContext?: boolean;
}

export const compileTemplate = (
  template: string,
  options?: CompileOptions
): HandlebarsTemplateDelegate<Record<string, unknown>> => {
  options = { noEscape: true, ...options };
  return Handlebars.compile(template, options);
};
