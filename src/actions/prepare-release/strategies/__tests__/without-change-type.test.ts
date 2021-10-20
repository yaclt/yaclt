import { WithoutChangeTypeStrategy } from "../without-change-type";

const mock = jest.fn<Handlebars.TemplateDelegate, []>();
jest.mock("../../../../utils/template-utils", () => ({
  compileTemplate: jest.fn(() => mock),
}));
describe("WithoutChangeTypeStrategy", () => {
  let withoutChangeTypeStrategy: WithoutChangeTypeStrategy;
  const entry = "standard entry";

  describe("processLine", () => {
    beforeEach(() => {
      withoutChangeTypeStrategy = new WithoutChangeTypeStrategy();
    });

    it("should add a line when lines is empty", () => {
      expect(() => withoutChangeTypeStrategy.processLine(entry)).not.toThrow();
    });
  });

  describe("generate", () => {
    const newTemplate = "[NEW]";
    beforeEach(() => {
      withoutChangeTypeStrategy = new WithoutChangeTypeStrategy();
      mock.mockClear();
    });

    it("should call compileTemplate result with message and release number if entry exist", () => {
      withoutChangeTypeStrategy.processLine(entry);

      withoutChangeTypeStrategy.generate(newTemplate, "1");
      expect(mock).toHaveBeenCalledWith({
        entries: [entry],
        releaseNumber: "1",
      });
    });

    it("should call compileTemplate result with empty entries and release number if entry does not exist but template exists", () => {
      withoutChangeTypeStrategy.generate(newTemplate, "1");

      expect(mock).toHaveBeenCalledWith({ entries: [], releaseNumber: "1" });
    });
  });
});
