import { arrayToMarkdownTable } from "./array-to-markdown-table";

describe("tests arrayToMarkdownTable", () => {
  test("should throw exception for empty list", () => {
    const expectedErrorMessage =
      "Need at least 1 item to generate a markdown table from.";

    expect(() => arrayToMarkdownTable([])).toThrow(expectedErrorMessage);
  });

  test("should generate markdown for a String and integer record", () => {
    const record: Record<string, number> = { Hello: 1 };
    const input = [record];
    const expected = "| Hello |\n| ----- |\n| 1     |\n";

    const actual = arrayToMarkdownTable(input);

    expect(actual).toBe(expected);
  });

  test("should humanize header and generate markdown for a String and integer record", () => {
    const record: Record<string, number> = { helloWorld: 1 };
    const input = [record];
    const expected = "| Hello World |\n| ----------- |\n| 1           |\n";

    const actual = arrayToMarkdownTable(input);

    expect(actual).toBe(expected);
  });

  test("should generate markdown for a String and string record with larger value that has space inbetween", () => {
    const record: Record<string, string> = {
      Hello: "bigger than header and have space",
    };
    const input = [record];
    const expected =
      "| Hello                             |\n| --------------------------------- |\n| bigger than header and have space |\n";

    const actual = arrayToMarkdownTable(input);

    expect(actual).toBe(expected);
  });

  test("should generate markdown for a String and string where the key is already humanized", () => {
    const record: Record<string, string> = { "Hello World": "humanized" };
    const input = [record];
    const expected = "| Hello World |\n| ----------- |\n| humanized   |\n";

    const actual = arrayToMarkdownTable(input);

    expect(actual).toBe(expected);
  });
});
