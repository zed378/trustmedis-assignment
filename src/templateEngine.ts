interface TemplateData {
  regType: string;
  currentDate: Date;
  seq: number;
}

class TemplateGeneratorEngine {
  private template: string;

  constructor(template: string) {
    this.template = template;
  }

  generateNumber(data: TemplateData): string {
    const { regType, currentDate, seq } = data;
    const placeholders = {
      REG_TYPE: regType,
      YY: currentDate.getFullYear().toString().slice(2),
      YYYY: currentDate.getFullYear().toString(),
      MM: ("0" + (currentDate.getMonth() + 1)).slice(-2),
      DD: ("0" + currentDate.getDate()).slice(-2),
      DDMMYYYY: `${("0" + currentDate.getDate()).slice(-2)}${(
        "0" +
        (currentDate.getMonth() + 1)
      ).slice(-2)}${currentDate.getFullYear()}`,
      YYMMDD: `${currentDate.getFullYear().toString().slice(2)}${(
        "0" +
        (currentDate.getMonth() + 1)
      ).slice(-2)}${("0" + currentDate.getDate()).slice(-2)}`,
      SEQ: ("0000" + seq).slice(-4),
    };

    let result = this.template;
    for (const [key, value] of Object.entries(placeholders)) {
      result = result.replace(new RegExp(`{${key}}`, "g"), value);
    }

    return result;
  }
}

export default TemplateGeneratorEngine;
