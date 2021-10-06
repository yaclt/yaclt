import { isFunction } from "../type-utils";

describe("isFunction", () => {
  it("should return true for long-hand function declarations", () => {
    // eslint-disable-next-line  @typescript-eslint/no-empty-function, prefer-arrow/prefer-arrow-functions, unicorn/consistent-function-scoping
    const subject = function (): void {};

    expect(isFunction(subject)).toBe(true);
  });

  it("should return true for arrow functions", () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function, unicorn/consistent-function-scoping
    const subject = (): void => {};

    expect(isFunction(subject)).toBe(true);
  });

  /* eslint-disable unicorn/no-null */
  // prettier-ignore
  it.each`
  value          | type
  ${true}        | ${"boolean"}
  ${1}           | ${"number"}
  ${"string"}    | ${"string"}
  ${BigInt(999)} | ${"bigint"}
  ${undefined}   | ${"undefined"}
  ${null}        | ${"object"} // yeah this is a weird JavaScript thing, typeof null === object
  `("returns false for type $type", ({value, type}) => {
    expect(typeof value).toBe(type);
    expect(isFunction(value)).toBe(false);
  });
  /* eslint-enable */

  it("returns false for object literals", () => {
    expect(isFunction({ object: "literal" })).toBe(false);
  });
});
