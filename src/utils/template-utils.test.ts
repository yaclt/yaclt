import { compile } from "handlebars";
import { compileTemplate } from "./template-utils";

jest.mock("handlebars", () => ({ compile: jest.fn() }));

describe("tests compileTemplate", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should call compile with noescape alone when no options are passed", () => {
    const template = "hello";
    const options: CompileOptions = { noEscape: true };

    compileTemplate("hello");

    expect(compile).toBeCalledWith(template, options);
  });

  test("should call compile with noescape and given options when options are passed", () => {
    const template = "hello";
    const options: CompileOptions = { noEscape: true, strict: true };
    const inputOptions: CompileOptions = { strict: true };

    compileTemplate("hello", inputOptions);

    expect(compile).toBeCalledWith(template, options);
  });
});
