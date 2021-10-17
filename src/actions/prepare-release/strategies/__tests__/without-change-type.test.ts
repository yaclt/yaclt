import { WithoutChangeTypeStrategy } from "../without-change-type";

const mockFn = jest.fn();
jest.mock("../../../../utils/template-utils", () => ({
  compileTemplate: jest.fn(() => mockFn),
}));
describe("WithoutChangeTypeStrategy", () => {
  let withoutChangeTypeStrategy: WithoutChangeTypeStrategy;
  const message = "standard message";

  describe("processLine", () => {
    beforeEach(() => {
      withoutChangeTypeStrategy = new WithoutChangeTypeStrategy();
    });

    it("should add a line when lines is empty", () => {
      withoutChangeTypeStrategy.processLine(message);

      expect(Reflect.get(withoutChangeTypeStrategy, "lines")).toEqual([
        message,
      ]);
    });

    it("should add multiple same lines", () => {
      withoutChangeTypeStrategy.processLine(message);
      withoutChangeTypeStrategy.processLine(message);

      expect(Reflect.get(withoutChangeTypeStrategy, "lines")).toEqual([
        message,
        message,
      ]);
    });

    it("should add multiple different lines", () => {
      withoutChangeTypeStrategy.processLine(message);
      withoutChangeTypeStrategy.processLine("message");

      expect(Reflect.get(withoutChangeTypeStrategy, "lines")).toEqual([
        message,
        "message",
      ]);
    });
  });

  describe("generate", () => {
    const RANDOM = "RANDOM";
    beforeEach(() => {
      withoutChangeTypeStrategy = new WithoutChangeTypeStrategy();
      mockFn.mockClear();
    });

    it("should call compileTemplate result with message and release number if entry exist", () => {
      withoutChangeTypeStrategy.processLine(message);

      withoutChangeTypeStrategy.generate(RANDOM, "1");
      expect(mockFn).toHaveBeenCalledWith({
        entries: [message],
        releaseNumber: "1",
      });
    });

    it("should call compileTemplate result with empty entries and release number if entry does not exist but template exists", () => {
      withoutChangeTypeStrategy.generate(RANDOM, "1");

      expect(mockFn).toHaveBeenCalledWith({ entries: [], releaseNumber: "1" });
    });
  });
});
