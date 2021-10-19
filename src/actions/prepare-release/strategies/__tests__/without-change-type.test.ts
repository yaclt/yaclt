import { WithoutChangeTypeStrategy } from "../without-change-type";

const mock = jest.fn<Handlebars.TemplateDelegate, []>();
jest.mock("../../../../utils/template-utils", () => ({
  compileTemplate: jest.fn(() => mock),
}));
describe("WithoutChangeTypeStrategy", () => {
  let withoutChangeTypeStrategy: WithoutChangeTypeStrategy;
  const message = "standard message";

  describe("processLine", () => {
    beforeEach(() => {
      withoutChangeTypeStrategy = new WithoutChangeTypeStrategy();
    });

    it("should add a line when lines is empty", () => {
      expect(withoutChangeTypeStrategy.processLine(message)).toBeUndefined();
    });

    it("should add multiple same lines", () => {
      withoutChangeTypeStrategy.processLine(message);

      expect(withoutChangeTypeStrategy.processLine(message)).toBeUndefined();
    });

    it("should add multiple different lines", () => {
      withoutChangeTypeStrategy.processLine(message);

      expect(withoutChangeTypeStrategy.processLine("message")).toBeUndefined();
    });
  });

  describe("generate", () => {
    const RANDOM = "RANDOM";
    beforeEach(() => {
      withoutChangeTypeStrategy = new WithoutChangeTypeStrategy();
      mock.mockClear();
    });

    it("should call compileTemplate result with message and release number if entry exist", () => {
      withoutChangeTypeStrategy.processLine(message);

      withoutChangeTypeStrategy.generate(RANDOM, "1");
      expect(mock).toHaveBeenCalledWith({
        entries: [message],
        releaseNumber: "1",
      });
    });

    it("should call compileTemplate result with empty entries and release number if entry does not exist but template exists", () => {
      withoutChangeTypeStrategy.generate(RANDOM, "1");

      expect(mock).toHaveBeenCalledWith({ entries: [], releaseNumber: "1" });
    });
  });
});
