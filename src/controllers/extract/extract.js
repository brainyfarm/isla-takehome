import { generateHash } from "../../utils/hashUtil.js";
import {
  findProcessedByHash,
  findPatientById,
  saveProcessedData,
  savePatientData,
} from "../../services/patientService.js";

import PatientDataExtractor from "../../lib/extractor/extractor.js";

class ExtractController {
  static async getHome(req, res) {
    res.sendFile("views/index.html", { root: "./" });
  }

  static async extractData(req, res) {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    const hash = generateHash(text);

    try {
      const processed = await findProcessedByHash(hash);

      if (processed) {
        return ExtractController.sendPatientData(processed.patientId, res);
      }

      return ExtractController.processNewData(text, hash, res);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async sendPatientData(patientId, res) {
    try {
      const patient = await findPatientById(patientId);
      if (patient) {
        const {
          lastName,
          firstName,
          middleName,
          dateOfBirth,
          primaryCondition,
        } = patient;
        const formattedPatientData = {
          fullName: {
            lastName,
            firstName,
            ...(middleName && { middleName }),
          },
          dateOfBirth,
          primaryCondition,
        };
        return res.status(200).json(formattedPatientData);
      } else {
        return res.status(404).json({ error: "Patient not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async processNewData(text, hash, res) {
    try {
      const extractor = new PatientDataExtractor(text);
      const patientData = extractor.extractPatientData();

      if (!patientData) {
        return res
          .status(400)
          .json({ error: "Could not extract patient data" });
      }

      const { fullName, dateOfBirth, primaryCondition } = patientData;

      const patient = await savePatientData({
        lastName: fullName.lastName,
        firstName: fullName.firstName,
        middleName: fullName?.middleName,
        dateOfBirth,
        primaryCondition,
      });
      await saveProcessedData(hash, patient.patientId);

      res.status(200).json(patientData );
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default ExtractController;
