import constants from "./constants.js";

class PatientDataExtractor {
  constructor(text) {
    this.text = text;
    this.patientData = {};
  }

  extractPatientData() {
    if (!this.text) throw new Error(constants.ERRORS.EMPTY_MESSAGE);
  
    const lines = this.text
      .trim()
      .split("\n")
      .map((line) => line.trim().replace(/\|+$/, ""));
      
      const lineHandlers = {
        [constants.MESSAGES.PRS]: (line) => this.parsePRSLine(line),
        [constants.MESSAGES.DET]: (line) => this.parseDETLine(line),
      };

    this.validateRequiredSegments(lines);
  
    lines.forEach((line) => {
      const messageType = line.slice(0, 3);
      const handler = lineHandlers[messageType];
      if (handler) {
        handler(line);
      }
    });
  
    return this.patientData;
  }
  
  validateRequiredSegments(lines) {
    const requiredSegments = [
      {
        prefix: constants.MESSAGES.PRS,
        error: constants.ERRORS.MISSING_PRS_SEGMENT,
      },
      {
        prefix: constants.MESSAGES.DET,
        error: constants.ERRORS.MISSING_DET_SEGMENT,
      },
    ];

    const segments = lines.map((line) => line.slice(0, 3));

    for (const { prefix, error } of requiredSegments) {
      if (!segments.some((segment) => segment.startsWith(prefix))) {
        throw new Error(error);
      }
    }
  }

  executeRegexAndHandleError(line, regex, errorMessage) {
    const match = line.match(regex);
    if (!match) {
      throw new Error(`${errorMessage}: ${line}`);
    }
    return match;
  }

  extractPatientName(line) {
    const [, lastName, firstName, middleName] = this.executeRegexAndHandleError(
      line,
      constants.REGEX.NAME,
      constants.ERRORS.MISSING_NAME_FORMAT
    );

    this.patientData.fullName = {
      lastName,
      firstName,
      ...(middleName && { middleName }),
    };
  }

  extractPatientDateOfBirth(line) {
    const [, dateOfBirth] = this.executeRegexAndHandleError(
      line,
      constants.REGEX.DATE,
      constants.ERRORS.MISSING_DATE_FORMAT
    );

    this.patientData.dateOfBirth = dateOfBirth.replace(
      constants.REGEX.DATE_MATCH,
      "$1-$2-$3"
    );
  }

  extractPrimaryCondition(line) {
    const [, primaryCondition] = this.executeRegexAndHandleError(
      line,
      constants.REGEX.PRIMARY_CONDITION,
      constants.ERRORS.MISSING_CONDITION_FORMAT
    );
    this.patientData.primaryCondition = primaryCondition;
  }

  parsePRSLine(line) {
    this.extractPatientName(line);
    this.extractPatientDateOfBirth(line);
  }

  parseDETLine(line) {
    this.extractPrimaryCondition(line);
  }
}

export default PatientDataExtractor;
