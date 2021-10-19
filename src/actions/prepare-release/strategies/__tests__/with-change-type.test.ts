import { WithChangeTypeStrategy } from "../with-change-type";
import Handlebars from "handlebars";

const mock = jest.fn<Handlebars.TemplateDelegate, []>();
jest.mock("../../../../utils/template-utils", () => ({
  compileTemplate: jest.fn(() => mock),
}));

describe("WithChangeTypeStrategy", () => {
  let withChangeTypeStrategy: WithChangeTypeStrategy;
  const add = "ADD";
  const cmd = "CMD";
  const addMsg = "ADD -m message";
  describe("processLine", () => {
    beforeEach(() => {
      const template = add;
      const options: CompileOptions = { noEscape: true, strict: true };
      const record = Handlebars.compile(template, options);
      withChangeTypeStrategy = new WithChangeTypeStrategy(record, [add, cmd]);
    });

    it("should add entry in case it finds proper template", () => {
      expect(withChangeTypeStrategy.processLine(addMsg)).toBeUndefined();
    });

    it("should add entry to same label in case it finds proper template and label already exists", () => {
      withChangeTypeStrategy.processLine(addMsg);

      expect(
        withChangeTypeStrategy.processLine("ADD -m new message")
      ).toBeUndefined();
    });

    it("should throw error when changetype exists but cannot find template for the same", () => {
      expect(() =>
        withChangeTypeStrategy.processLine("CMD -m message")
      ).toThrow("unable to parse change type");
    });

    it("should throw parsing error and should not add in case it doesn't find proper template", () => {
      expect(() =>
        withChangeTypeStrategy.processLine("SUCCESS -m message")
      ).toThrow("unable to parse change type");
    });
  });

  describe("generate", () => {
    beforeEach(() => {
      const template = add;
      const options: CompileOptions = { noEscape: true, strict: true };
      const record = Handlebars.compile(template, options);
      withChangeTypeStrategy = new WithChangeTypeStrategy(record, [add, cmd]);
      jest.clearAllMocks();
    });

    it("should call compileTemplate result with label item and release number if entry exist", () => {
      withChangeTypeStrategy.processLine(addMsg);
      const expectedObj = {
        releaseNumber: "1",
        entryGroups: [{ items: [addMsg], label: add }],
      };

      withChangeTypeStrategy.generate(add, "1");
      expect(mock).toHaveBeenCalledWith(expectedObj);
    });

    it("should call compileTemplate result with empty entrygroup and release number if entry does not exist but template exists", () => {
      withChangeTypeStrategy.generate(add, "1");

      expect(mock).toHaveBeenCalledWith({
        entryGroups: [],
        releaseNumber: "1",
      });
    });

    it("should call compileTemplate result with empty entrygroup and release number if entry and template does not exist", () => {
      withChangeTypeStrategy.generate("SUCCESS", "1");

      expect(mock).toHaveBeenCalledWith({
        entryGroups: [],
        releaseNumber: "1",
      });
    });
  });
});
