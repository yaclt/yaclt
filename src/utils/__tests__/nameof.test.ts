import { nameof } from "../nameof";

describe("nameof", () => {
  it("should accept key of particular type and return the same key", () => {
    type point = { x: number; y: number };

    expect(nameof<point>("x")).toBe("x");
  });
});
