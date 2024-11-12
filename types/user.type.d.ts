declare interface CreateUserParams {
	name: string;
	email?: string;
	phone: string;
}

declare interface UserObj extends CreateUserParams {
	$id: string;
}

declare interface RegisterPatientParams extends CreateUserParams {
	userId: string;
	email: string;
	gender: Gender;
	birthDate?: Date;
	address?: string;
	occupation?: string;
	emergencyContactName?: string;
	emergencyContactNumber?: string;
	primaryPhysician?: string;
	insuranceProvider?: string;
	insurancePolicyNumber?: string;
	allergies?: string;
	currentMedication?: string;
	familyMedicalHistory?: string;
	pastMedicalHistory?: string;
	identificationType?: string;
	identificationNumber?: string;
	identificationDocument?: FormData;
	treatmentConsent: boolean;
	disclosureConsent: boolean;
	privacyConsent: boolean;
	// createdBy: string;
	// updatedBy?: string;
}

declare type UpdatePatientParams = {
	patientId: string;
	patient: Patient;
	identificationDocument: FormData;
};

declare type CreateAppointmentParams = {
	clientId: string;
	userId: string;
	patientId?: string;
	primaryPhysician?: string;
	name: string;
	phone: string;
	email?: string;
	gender: string;
	reason: string;
	schedule: Date;
	status: Status;
	note?: string;
	createdBy: string;
};

declare type UpdateAppointmentParams = {
	appointmentId: string;
	userId: string;
	appointment: Appointment;
	type: string;
	updatedBy?: string;
};
