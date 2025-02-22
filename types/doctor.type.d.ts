declare interface DoctorParams {
	name: string;
	phone: string;
	email: string;
	status: "active" | "inactive";
	specialization: string;
	profileImgUrl?: string;
	client?: string;
	departmentId?: string;
	address?: string;
	awards?: string;
	updatedBy?: string;
}

declare type CreateDoctorParams = DoctorParams & {};

declare type UpdateDoctorParams = DoctorParams & { $id: string };

declare interface DoctorCalendarParams {
	doctor: string;
	leaves: string;
	slots: string;
	defaultTimeSlot: string;
}
