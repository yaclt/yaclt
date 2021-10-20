import { WithChangeTypeStrategy } from "../with-change-type";
import Handlebars from "handlebars";

const mock = jest.fn<Handlebars.TemplateDelegate, []>();
jest.mock("../../../../utils/template-utils", () => ({
  compileTemplate: jest.fn(() => mock),
}));

describe("WithChangeTypeStrategy", () => {
  let withChangeTypeStrategy: WithChangeTypeStrategy;
  const newTemplate = "[NEW]";
  const improvedTemplate = "[IMPROVED]";
  const entry = "[NEW] This is an new entry";
  describe("processLine", () => {
    beforeEach(() => {
      const template = newTemplate;
      const options: CompileOptions = { noEscape: true, strict: true };
      const record = Handlebars.compile(template, options);
      withChangeTypeStrategy = new WithChangeTypeStrategy(record, [
        newTemplate,
        improvedTemplate,
      ]);
    });

    it("should add entry in case it finds proper template", () => {
      expect(() => withChangeTypeStrategy.processLine(entry)).not.toThrow();
    });

    it("should throw error when changetype exists but cannot find template for the same", () => {
      expect(() =>
        withChangeTypeStrategy.processLine(
          "[IMPROVED] This is an improved entry"
        )
      ).toThrow("unable to parse change type");
    });

    it("should throw parsing error and should not add in case it doesn't find proper template", () => {
      expect(() =>
        withChangeTypeStrategy.processLine("[SUCCESS] This is an success entry")
      ).toThrow("unable to parse change type");
    });
  });

  describe("generate", () => {
    beforeEach(() => {
      const template = newTemplate;
      const options: CompileOptions = { noEscape: true, strict: true };
      const record = Handlebars.compile(template, options);
      withChangeTypeStrategy = new WithChangeTypeStrategy(record, [
        newTemplate,
        improvedTemplate,
      ]);
      jest.clearAllMocks();
    });

    it("should call compileTemplate result with label item and release number if entry exist", () => {
      withChangeTypeStrategy.processLine(entry);
      const expectedObj = {
        releaseNumber: "1",
        entryGroups: [{ items: [entry], label: newTemplate }],
      };

      withChangeTypeStrategy.generate(newTemplate, "1");
      expect(mock).toHaveBeenCalledWith(expectedObj);
    });

    it("should call compileTemplate result with empty entrygroup and release number if entry does not exist but template exists", () => {
      withChangeTypeStrategy.generate(newTemplate, "1");

      expect(mock).toHaveBeenCalledWith({
        entryGroups: [],
        releaseNumber: "1",
      });
    });

    it("should call compileTemplate result with empty entrygroup and release number if entry and template does not exist", () => {
      withChangeTypeStrategy.generate("[SUCCESS]", "1");

      expect(mock).toHaveBeenCalledWith({
        entryGroups: [],
        releaseNumber: "1",
      });
    });
  });
});
