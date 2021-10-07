import { DateTime } from "luxon";
import {
  currentDateTimeHelper,
  capitalizeHelper,
  echoHelper,
} from "../handlebars-helpers";

describe("currentDateTimeHelper", () => {
  it("should call current date with to Iso date when format is ISODate", () => {
    const toIsoDateMock = jest
      .spyOn(DateTime.prototype, "toISODate")
      .mockImplementationOnce(() => "");
    currentDateTimeHelper("ISODate");

    expect(toIsoDateMock).toHaveBeenCalled();
  });

  it("should call current date with to Iso when format is ISO", () => {
    const toIsoMock = jest
      .spyOn(DateTime.prototype, "toISO")
      .mockImplementationOnce(() => "");
    currentDateTimeHelper("ISO");

    expect(toIsoMock).toHaveBeenCalled();
  });

  it("should call current date with to Iso when format is ISO", () => {
    const toIsoMock = jest
      .spyOn(DateTime.prototype, "toISO")
      .mockImplementationOnce(() => "");
    currentDateTimeHelper("ISO");

    expect(toIsoMock).toHaveBeenCalled();
  });

  it("should call current date with to localeString when format is localeString", () => {
    const toLocaleStringMock = jest
      .spyOn(DateTime.prototype, "toLocaleString")
      .mockImplementationOnce(() => "");
    currentDateTimeHelper("localeString");

    expect(toLocaleStringMock).toHaveBeenCalled();
  });

  it("should call current date with to format when format is not recognized", () => {
    const toFormat = jest
      .spyOn(DateTime.prototype, "toFormat")
      .mockImplementationOnce(() => "");
    currentDateTimeHelper("fgh");

    expect(toFormat).toHaveBeenCalled();
  });

  it("should call current date with to Iso date when no format is Passed", () => {
    const toIsoDateMock = jest
      .spyOn(DateTime.prototype, "toISODate")
      .mockImplementationOnce(() => "");
    currentDateTimeHelper();

    expect(toIsoDateMock).toHaveBeenCalled();
  });
});

describe("capitalizeHelper", () => {
  it("should capitalize initial if the letter is small", () => {
    const expected = "HelloWorld";

    const actual = capitalizeHelper("helloWorld");

    expect(expected).toBe(actual);
  });

  it("should return same initial letter if the is capital", () => {
    const expected = "Helloworld";

    const actual = capitalizeHelper("Helloworld");

    expect(expected).toBe(actual);
  });
});

describe("echoHelper", () => {
  it("should return same string", () => {
    const expected = "HelloWorld";

    const actual = echoHelper("HelloWorld");

    expect(expected).toBe(actual);
  });

  it("should return empty string for empty input", () => {
    const expected = "";

    const actual = echoHelper("");

    expect(expected).toBe(actual);
  });
});
