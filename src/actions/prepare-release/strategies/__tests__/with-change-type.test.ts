import { WithChangeTypeStrategy } from "../with-change-type";
import Handlebars from "handlebars";

const mock = jest.fn<Handlebars.TemplateDelegate, []>();
jest.mock("../../../../utils/template-utils", () => ({
  compileTemplate: jest.fn(() => mock),
}));

describe("WithChangeTypeStrategy", () => {
  let withChangeTypeStrategy: WithChangeTypeStrategy;
  const newTag = "NEW";
  const entry = "[NEW] This is a entry";
  describe("processLine", () => {
    beforeEach(() => {
      const template = "[{{changeType}}]";
      const options: CompileOptions = { noEscape: true, strict: true };
      const record = Handlebars.compile(template, options);
      withChangeTypeStrategy = new WithChangeTypeStrategy(record, [newTag]);
    });

    it("should add entry in case it finds proper template", () => {
      expect(() => withChangeTypeStrategy.processLine(entry)).not.toThrow();
    });

    it("should throw error when changetype does not exist in the line", () => {
      expect(() =>
        withChangeTypeStrategy.processLine("This is a improved entry")
      ).toThrow("unable to parse change type");
    });

    it("should throw parsing error in case it doesn't find proper tag", () => {
      expect(() =>
        withChangeTypeStrategy.processLine("[SUCCESS] This is a success entry")
      ).toThrow("unable to parse change type");
    });
  });

  describe("generate", () => {
    beforeEach(() => {
      const template = newTag;
      const options: CompileOptions = { noEscape: true, strict: true };
      const record = Handlebars.compile(template, options);
      withChangeTypeStrategy = new WithChangeTypeStrategy(record, [newTag]);
      jest.clearAllMocks();
    });

    it("should call compileTemplate result with label item and release number if entry exists", () => {
      withChangeTypeStrategy.processLine(entry);
      const expectedObj = {
        releaseNumber: "1",
        entryGroups: [{ items: [entry], label: newTag }],
      };

      withChangeTypeStrategy.generate(newTag, "1");
      expect(mock).toHaveBeenCalledWith(expectedObj);
    });

    it("should call compileTemplate result with empty entrygroup and release number if entry does not exist but tag exists", () => {
      withChangeTypeStrategy.generate(newTag, "1");

      expect(mock).toHaveBeenCalledWith({
        entryGroups: [],
        releaseNumber: "1",
      });
    });

    it("should call compileTemplate result with empty entrygroup and release number if entry and tag does not exist", () => {
      withChangeTypeStrategy.generate("SUCCESS", "1");

      expect(mock).toHaveBeenCalledWith({
        entryGroups: [],
        releaseNumber: "1",
      });
    });
  });
});
