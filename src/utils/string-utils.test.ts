import { compileTemplate } from "./template-utils";
import {
  regexIndexOf,
  formatToChangeTypeTemplate,
  camelToKebabCase,
  kebabToCamelCase,
} from "./string-utils";

jest.mock("./template-utils", () => {
  return { compileTemplate: jest.fn() };
});

describe("tests regexIndexOf", () => {
  test("should return -1 when the regular expression is not found within given range", () => {
    let expected = -1;

    let actual = regexIndexOf("hello-r", RegExp("^r"), 1);

    expect(actual).toBe(expected);
  });

  test("should return 1 when the regular expression is satisfied at the starting index", () => {
    let expected = 1;

    let actual = regexIndexOf("hello-r", RegExp("^e"), 1);

    expect(actual).toBe(expected);
  });

  test("should return 5 when the regular expression is satisfied at the 4th index", () => {
    let expected = 5;

    let actual = regexIndexOf("hello-r", RegExp("-"), 1);

    expect(actual).toBe(expected);
  });
});

describe("tests formatToChangeTypeTemplate", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("should return undefined when there is no matches for changeTypeTemplate", () => {
    let expected = undefined;

    let actual = formatToChangeTypeTemplate("nothing in place");

    expect(actual).toBe(expected);
  });

  test("should call compileTemplate with {{changeType}}N when the character next to changeType is N", () => {
    const args = "{{changeType}}N";

    formatToChangeTypeTemplate("{{changeType}}New");

    expect(compileTemplate).toBeCalledWith(args);
  });

  test("should call compileTemplate with {{changeType}} when there is no character next to changeType", () => {
    const args = "{{changeType}} ";

    formatToChangeTypeTemplate("{{changeType}} New");

    expect(compileTemplate).toBeCalledWith(args);
  });
});

describe("tests camelToKebabCase", () => {
  test("should return empty string when the input is empty", () => {
    let expected = "";

    let actual = camelToKebabCase("");

    expect(actual).toBe(expected);
  });

  test("should return string with - inbetween for camelcase string", () => {
    let expected = "hello-world";

    let actual = camelToKebabCase("helloWorld");

    expect(actual).toBe(expected);
  });

  test("should return same string when there is no capital letter inbetween", () => {
    let expected = "hello";

    let actual = camelToKebabCase("hello");

    expect(actual).toBe(expected);
  });
});

describe("tests kebabToCamelCase", () => {
  test("should return empty string when the input is empty", () => {
    let expected = "";

    let actual = kebabToCamelCase("");

    expect(actual).toBe(expected);
  });

  test("should return camelcase string for kebabcase string with capital letter after hyphen", () => {
    let expected = "helloWorld";

    let actual = kebabToCamelCase("hello-World");

    expect(actual).toBe(expected);
  });

  test("should return camelcase string after capitalizing first letters for kebabcase input", () => {
    let expected = "helloWorld";

    let actual = kebabToCamelCase("hello-world");

    expect(actual).toBe(expected);
  });

  test("should return same string when there is no - inbetween", () => {
    let expected = "hello";

    let actual = camelToKebabCase("hello");

    expect(actual).toBe(expected);
  });
});
