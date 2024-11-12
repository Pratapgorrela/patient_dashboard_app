import { Models } from "node-appwrite";

export interface Patient extends Models.Document {
	clientId: string;
	userId: string;
	name: string;
	email: string;
	phone: string;
	birthDate?: Date;
	gender?: Gender;
	address?: string;
	occupation?: string;
	emergencyContactName?: string;
	emergencyContactNumber?: string;
	primaryPhysicianId?: string;
	insuranceProvider?: string;
	insurancePolicyNumber?: string;
	allergies?: string;
	currentMedication?: string;
	familyMedicalHistory?: string;
	pastMedicalHistory?: string;
	identificationType?: string;
	identificationNumber?: string;
	identificationDocumentId?: string;
	identificationDocumentUrl?: string;
	privacyConsent: boolean;
	treatmentConsent: boolean;
	disclosureConsent: boolean;
}

export interface Appointment extends Models.Document {
	clientId: string;
	userId: string;
	patientId?: string;
	primaryPhysicianId?: string;
	name: string;
	phone: string;
	email?: string;
	gender: Gender;
	reason: string;
	schedule: Date;
	status: Status;
	note?: string;
	cancellationReason: string | null;
}
