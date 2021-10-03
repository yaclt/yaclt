import { compile } from "handlebars";
import { compileTemplate } from "./template-utils";

jest.mock("handlebars", () => {
  return { compile: jest.fn() };
});

describe("tests compileTemplate", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should call compile with noescape alone when no options are passed", () => {
    let template = "hello";
    let options: CompileOptions = { noEscape: true };

    compileTemplate("hello");

    expect(compile).toBeCalledWith(template, options);
  });

  test("should call compile with noescape and given options when options are passed", () => {
    let template = "hello";
    let options: CompileOptions = { noEscape: true, strict: true };
    let inputOptions: CompileOptions = { strict: true };

    compileTemplate("hello", inputOptions);

    expect(compile).toBeCalledWith(template, options);
  });
});
