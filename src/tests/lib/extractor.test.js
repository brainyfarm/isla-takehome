import constants from "../../lib/extractor/constants.js";
import PatientDataExtractor from "../../lib/extractor/extractor.js";

describe("PatientDataExtractor", () => {
  describe("Valid extraction scenarios", () => {
    test("should correctly extract patient data when text is in correct format", () => {
      const message = `
            MSG|^~\\&|SenderSystem|Location|ReceiverSystem|Location|20230502112233||DATA^TYPE|123456|P|2.5
            EVT|TYPE|20230502112233
            PRS|1|1980010^^^Location^ID||Smith^John^A|||M|19800101|
            DET|1|I|^^MainDepartment^101^Room 1|Common Cold
            `;

      const expected = {
        fullName: {
          lastName: "Smith",
          firstName: "John",
          middleName: "A",
        },
        dateOfBirth: "1980-01-01",
        primaryCondition: "Common Cold",
      };

      const extractor = new PatientDataExtractor(message);
      const result = extractor.extractPatientData();
      expect(result).toEqual(expected);
    });

    test("should correctly extract data when middle name is missing", () => {
      const message = `
            MSG|^~\\&|SenderSystem|Location|ReceiverSystem|Location|20230502112233||DATA^TYPE|123456|P|2.5
            EVT|TYPE|20230502112233
            PRS|1|9876543210^^^Location^ID||Doe^Jane|||F|19901212|
            DET|1|I|^^MainDepartment^101^Room 1|Flu
            `;

      const expected = {
        fullName: {
          lastName: "Doe",
          firstName: "Jane",
        },
        dateOfBirth: "1990-12-12",
        primaryCondition: "Flu",
      };

      const extractor = new PatientDataExtractor(message);
      const result = extractor.extractPatientData();
      expect(result).toEqual(expected);
    });

    test("should correctly extract data when some fields are left empty", () => {
      const message = `
            MSG|^~\\&|SenderSystem|Location|ReceiverSystem|Location|20230502112233||DATA^TYPE|123456|P|2.5
            EVT|TYPE|20230502112233
            PRS||9876543210^^^Location^ID||Doe^Jane|||F|19901212|
            DET|1||^^MainDepartment^101^Room 1|Flu
            `;

      const expected = {
        fullName: {
          lastName: "Doe",
          firstName: "Jane",
        },
        dateOfBirth: "1990-12-12",
        primaryCondition: "Flu",
      };

      const extractor = new PatientDataExtractor(message);
      const result = extractor.extractPatientData();
      expect(result).toEqual(expected);
    });

    test("should correctly extract data when there is an extra delimiter in the name", () => {
      const message = `
            MSG|^~\\&|SenderSystem|Location|ReceiverSystem|Location|20230502112233||DATA^TYPE|123456|P|2.5
            EVT|TYPE|20230502112233
            PRS|1|1234567890^^^Location^ID||Smith^^John^|||M|19800101|
            DET|1|I|^^MainDepartment^101^Room 1|Headache
            `;

      const expected = {
        fullName: {
          lastName: "Smith",
          firstName: "John",
        },
        dateOfBirth: "1980-01-01",
        primaryCondition: "Headache",
      };

      const extractor = new PatientDataExtractor(message);
      const result = extractor.extractPatientData();
      expect(result).toEqual(expected);
    });

    test("should correctly extract data when gender is missing", () => {
      const message = `
            MSG|^~\\&|SenderSystem|Location|ReceiverSystem|Location|20230502112233||DATA^TYPE|123456|P|2.5
            EVT|TYPE|20230502112233
            PRS|1|1234567890^^^Location^ID||Johnson^Emily^^|||19950125|
            DET|1|I|^^MainDepartment^101^Room 1|Migraine
            `;

      const expected = {
        fullName: {
          lastName: "Johnson",
          firstName: "Emily",
        },
        dateOfBirth: "1995-01-25",
        primaryCondition: "Migraine",
      };

      const extractor = new PatientDataExtractor(message);
      const result = extractor.extractPatientData();
      expect(result).toEqual(expected);
    });
  });

  describe("Error handling scenarios", () => {
    test("should throw an error for invalid name format", () => {
      const message = `
            MSG|^~\\&|SenderSystem|Location|ReceiverSystem|Location|20230502112233||DATA^TYPE|123456|P|2.5
            EVT|TYPE|20230502112233
            PRS|1|9876543210^^^Location^ID||InvalidNameFormat|||M|19800101|
            DET|1|I|^^MainDepartment^101^Room 1|Cold
            `;

      const extractor = new PatientDataExtractor(message);
      expect(() => extractor.extractPatientData()).toThrow(
        constants.ERRORS.MISSING_NAME_FORMAT
      );
    });

    test("should throw an error for invalid date format (MMDDYYYY)", () => {
      const message = `
            MSG|^~\\&|SenderSystem|Location|ReceiverSystem|Location|20230502112233||DATA^TYPE|123456|P|2.5
            EVT|TYPE|20230502112233
            PRS|1|9876543210^^^Location^ID||Smith^John^A|||M|01011980|
            DET|1|I|^^MainDepartment^101^Room 1|Cold
            `;

      const extractor = new PatientDataExtractor(message);
      expect(() => extractor.extractPatientData()).toThrow(
        constants.ERRORS.INVALID_DATE_FORMAT
      );
    });

    test("should throw an error for invalid date format (YYYY-MM-DD)", () => {
      const message = `
            MSG|^~\\&|SenderSystem|Location|ReceiverSystem|Location|20230502112233||DATA^TYPE|123456|P|2.5
            EVT|TYPE|20230502112233
            PRS|1|9876543210^^^Location^ID||Smith^John^A|||M|1980-01-01|
            DET|1|I|^^MainDepartment^101^Room 1|Cold
            `;

      const extractor = new PatientDataExtractor(message);
      expect(() => extractor.extractPatientData()).toThrow(
        constants.ERRORS.INVALID_DATE_FORMAT
      );
    });

    test("should handle empty message gracefully", () => {
      const message = "";

      const extractor = new PatientDataExtractor(message);
      expect(() => extractor.extractPatientData()).toThrow(
        constants.ERRORS.EMPTY_MESSAGE
      );
    });

    test("should throw an error if primary condition is missing", () => {
      const message = `
            MSG|^~\\&|SenderSystem|Location|ReceiverSystem|Location|20230502112233||DATA^TYPE|123456|P|2.5
            EVT|TYPE|20230502112233
            PRS|1|1234567890^^^Location^ID||Johnson^Emily^^|||19950125|
            DET|1|I|^^MainDepartment^101^Room 1|
            `;

      const extractor = new PatientDataExtractor(message);
      expect(() => extractor.extractPatientData()).toThrow(
        constants.ERRORS.MISSING_CONDITION_FORMAT
      );
    });

    test("should throw an error if no name in message", () => {
      const message = `
            MSG|^~\\&|SenderSystem|Location|ReceiverSystem|Location|20230502112233||DATA^TYPE|123456|P|2.5
            EVT|TYPE|20230502112233
            PRS|1|1234567890^^^Location^ID||||19950125|
            DET|1|I|^^MainDepartment^101^Room 1|Migraine
            `;

      const extractor = new PatientDataExtractor(message);
      expect(() => extractor.extractPatientData()).toThrow(
        constants.ERRORS.MISSING_NAME_FORMAT
      );
    });

    test("should throw an error for missing PRS segment", () => {
      const message = `
            MSG|^~\\&|SenderSystem|Location|ReceiverSystem|Location|20230502112233||DATA^TYPE|123456|P|2.5
            EVT|TYPE|20230502112233
            DET|1|I|^^MainDepartment^101^Room 1|Cold
            `;

      const extractor = new PatientDataExtractor(message);
      expect(() => extractor.extractPatientData()).toThrow(
        constants.ERRORS.MISSING_PRS_SEGMENT
      );
    });

    test("should throw an error for missing DET segment", () => {
      const message = `
            MSG|^~\\&|SenderSystem|Location|ReceiverSystem|Location|20230502112233||DATA^TYPE|123456|P|2.5
            EVT|TYPE|20230502112233
            PRS|1|1234567890^^^Location^ID||Johnson^Emily^^|||19950125|
            `;

      const extractor = new PatientDataExtractor(message);
      expect(() => extractor.extractPatientData()).toThrow(
        constants.ERRORS.MISSING_DET_SEGMENT
      );
    });
  });
});
