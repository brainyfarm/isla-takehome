import { Patient, Processed } from '../models/index.js';

export async function findProcessedByHash(hash) {
    return Processed.findOne({ where: { hash } });
}

export async function findPatientById(patientId) {
    return Patient.findOne({ where: { patientId } });
}

export async function saveProcessedData(hash, patientId) {
    return Processed.create({ hash, patientId });
}

export async function savePatientData(patientData) {
    return Patient.create(patientData);
}

