import { nameof } from "../nameof";

describe("nameof", () => {
  it("should accept key of particular type and return the same key", () => {
    type Point = { x: number; y: number };

    expect(nameof<Point>("x")).toBe("x");
  });
});
