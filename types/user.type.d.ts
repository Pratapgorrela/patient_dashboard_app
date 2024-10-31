declare interface CreateUserParams {
	name: string;
	email: string;
	phone: string;
}

declare interface User extends CreateUserParams {
	$id: string;
}

declare interface RegisterUserParams extends CreateUserParams {
	userId: string;
	birthDate: Date;
	gender: Gender;
	address: string;
	occupation: string;
	emergencyContactName: string;
	emergencyContactNumber: string;
	primaryPhysician: string;
	insuranceProvider: string;
	insurancePolicyNumber: string;
	allergies?: string | undefined;
	currentMedication?: string | undefined;
	familyMedicalHistory?: string | undefined;
	pastMedicalHistory?: string | undefined;
	identificationType?: string | undefined;
	identificationNumber?: string | undefined;
	identificationDocument: FormData | undefined;
	privacyConsent: boolean;
}

declare type CreateAppointmentParams = {
	clientId: string;
	userId: string;
	patientId?: string;
	primaryPhysicianId?: string;
	name: string;
	phone: string;
	email?: string;
	gender: string;
	reason: string;
	schedule: Date;
	status: Status;
	note?: string;
};

declare type UpdateAppointmentParams = {
	appointmentId: string;
	userId: string;
	appointment: Appointment;
	type: string;
};
