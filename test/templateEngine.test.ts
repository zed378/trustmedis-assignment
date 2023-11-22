import TemplateGeneratorEngine from "../src/templateEngine";

describe("TemplateEngine", () => {
  it("should generate the correct number for test case 1", () => {
    const template = "{SEQ}-{YYYY}/{MM}/{DD}-{REG_TYPE}";
    const engine = new TemplateGeneratorEngine(template);

    const result = engine.generateNumber({
      regType: "RI",
      currentDate: new Date("2023-01-01"),
      seq: 1,
    });

    expect(result).toBe("0001-2023/01/01-RI");
  });

  it("should generate the correct number for test case 2", () => {
    const template = "{REG_TYPE}/{YYMMDD}/{SEQ}";
    const engine = new TemplateGeneratorEngine(template);

    const result = engine.generateNumber({
      regType: "RI",
      currentDate: new Date("2023-01-01"),
      seq: 1,
    });

    expect(result).toBe("RI/230101/0001");
  });
});
