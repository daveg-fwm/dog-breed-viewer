import { capitalizeString } from "./capitalize-string";

describe("Utility function capitalizeString", () => {
  it("should return an empty string if it receives an empty string", () => {
    const emptyString = capitalizeString("");
    expect(emptyString).toEqual("");
  });

  it("should return the provided text with each word starting with a capital letter", () => {
    const singleWord = capitalizeString("hound");
    expect(singleWord).toEqual("Hound");

    const twoWords = capitalizeString("french bulldog");
    expect(twoWords).toEqual("French Bulldog");
  });

  it("should only allow the first letter to start with a capital letter", () => {
    const emptyString = capitalizeString("BullTerrier");

    expect(emptyString).not.toEqual("BullTerrier");
    expect(emptyString).toEqual("Bullterrier");
  });
});
