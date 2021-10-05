import {
  camelToKebabCase,
  formatToChangeTypeTemplate,
  kebabToCamelCase,
  regexIndexOf,
} from "../string-utils";
import { compileTemplate } from "../template-utils";

jest.mock("../template-utils", () => ({ compileTemplate: jest.fn() }));

describe("tests regexIndexOf", () => {
  test("should return -1 when the regular expression is not found within given range", () => {
    const expected = -1;

    const actual = regexIndexOf("hello-r", new RegExp("^r"), 1);

    expect(actual).toBe(expected);
  });

  test("should return 1 when the regular expression is satisfied at the starting index and starting position is 1", () => {
    const expected = 1;

    const actual = regexIndexOf("hello-r", new RegExp("^e"), 1);

    expect(actual).toBe(expected);
  });

  test("should return 5 when the regular expression is satisfied at the 4th index and starting position is 1", () => {
    const expected = 5;

    const actual = regexIndexOf("hello-r", new RegExp("-"), 1);

    expect(actual).toBe(expected);
  });
});

describe("tests formatToChangeTypeTemplate", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("should return undefined when there is no matches for changeTypeTemplate", () => {
    const actual = formatToChangeTypeTemplate("nothing in place");

    expect(actual).toBeUndefined();
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
    const expected = "";

    const actual = camelToKebabCase("");

    expect(actual).toBe(expected);
  });

  test("should return string with - inbetween for camelcase string", () => {
    const expected = "hello-world";

    const actual = camelToKebabCase("helloWorld");

    expect(actual).toBe(expected);
  });

  test("should return same string when there is no capital letter inbetween", () => {
    const expected = "hello";

    const actual = camelToKebabCase("hello");

    expect(actual).toBe(expected);
  });
});

describe("tests kebabToCamelCase", () => {
  test("should return empty string when the input is empty", () => {
    const expected = "";

    const actual = kebabToCamelCase("");

    expect(actual).toBe(expected);
  });

  test("should return camelcase string for kebabcase string with capital letter after hyphen", () => {
    const expected = "helloWorld";

    const actual = kebabToCamelCase("hello-World");

    expect(actual).toBe(expected);
  });

  test("should return camelcase string after capitalizing first letters for kebabcase input", () => {
    const expected = "helloWorld";

    const actual = kebabToCamelCase("hello-world");

    expect(actual).toBe(expected);
  });

  test("should return same string when there is no - inbetween", () => {
    const expected = "hello";

    const actual = kebabToCamelCase("hello");

    expect(actual).toBe(expected);
  });
});
