declare interface CreateDoctorParams {
	name: string;
	email: string;
	phone: string;
	clientId: string;
	specialization: string;
	status: "active" | "inactive";
}
