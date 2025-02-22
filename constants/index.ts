export const GenderOptions = [
	{ label: "Male", value: "male" },
	{ label: "Female", value: "female" },
	{ label: "Other", value: "other" },
];

export enum FormFieldType {
	INPUT = "input",
	PHONE_INPUT = "phone",
	CHECKBOX = "checkbox",
	DATE_PICKER = "datepicker",
	TIME_PICKER = "timepicker",
	SKELETON = "skeleton",
	SELECT = "select",
	TEXTAREA = "textarea",
	RADIO_GROUP = "radiogroup",
}

export const AppointmentActionsType: {
	[key: string]: {
		key: AppointmentActionType;
		value: string;
		label: string;
	};
} = {
	CREATE: { key: "create", value: "pending", label: "Create Appointment" },
	UPDATE: { key: "update", value: "pending", label: "Reschedule Appointment" },
	SCHEDULE: {
		key: "schedule",
		value: "scheduled",
		label: "Schedule Appointment",
	},
	CANCEL: { key: "cancel", value: "cancelled", label: "Cancel Appointment" },
	COMPLETE: {
		key: "complete",
		value: "completed",
		label: "Appointment Completed",
	},
};

export const UserTypes = [
	{
		Id: 1,
		name: "admin",
		label: "Admin",
	},
	{
		Id: 2,
		name: "doctor",
		label: "Doctor",
	},
	{
		Id: 3,
		name: "support",
		label: "Support",
	},
	{
		Id: 4,
		name: "user",
		label: "User",
	},
];

export const Clients = [
	{
		Id: 1,
		name: "rainbowSpacility",
		label: "Rainbow Spacility Hospital",
		address: "Hyderabad",
	},
	{
		Id: 2,
		name: "amsterdam",
		label: "Amsterdam Hospital",
		address: "Hyderabad",
	},
	{
		Id: 3,
		name: "fortis",
		label: "Fortis Hospital",
		address: "Hyderabad",
	},
];

export const Doctors = [
	{
		imageSrc: "/assets/images/dr-green.png",
		name: "John Green",
		label: "John Green",
	},
	{
		imageSrc: "/assets/images/dr-cameron.png",
		name: "Leila Cameron",
		label: "Leila Cameron",
	},
	{
		imageSrc: "/assets/images/dr-livingston.png",
		name: "David Livingston",
		label: "David Livingston",
	},
	{
		imageSrc: "/assets/images/dr-peter.png",
		name: "Evan Peter",
		label: "Evan Peter",
	},
	{
		imageSrc: "/assets/images/dr-powell.png",
		name: "Jane Powell",
		label: "Jane Powell",
	},
	{
		imageSrc: "/assets/images/dr-remirez.png",
		name: "Alex Ramirez",
		label: "Alex Ramirez",
	},
	{
		imageSrc: "/assets/images/dr-lee.png",
		name: "Jasmine Lee",
		label: "Jasmine Lee",
	},
	{
		imageSrc: "/assets/images/dr-cruz.png",
		name: "Alyana Cruz",
		label: "Alyana Cruz",
	},
	{
		imageSrc: "/assets/images/dr-sharma.png",
		name: "Hardik Sharma",
		label: "Hardik Sharma",
	},
];

export const StatusMapper = {
	create: "pending",
	update: "pending",
	pending: "pending",
	schedule: "scheduled",
	complete: "completed",
	cancel: "cancelled",
};

export const GUEST_USER_ID = "672ca270002863181621";

export const ERRORS = {
	GLOBAL: {
		USER_NOT_EXIST: "User does not exist! Please signup to create appointment.",
		USER_EXIST: "User already exist! Please login with your phone number.",
		INVALID_OTP: "Invalid OTP. Please try again!",
		UNKNOWN_ERR: "Something went wrong! Please try again after sometime.",
	},
	SIGNUP: {},
	LOGIN: {},
	APPOINTMENT: {},
};

export const DEFAULT_WORKING_HOURS = {
	from: new Date(new Date().setHours(9, 0, 0)),
	till: new Date(new Date().setHours(18, 0, 0)),
};

export const DATE_FORMAT = "dd/MM/yyyy";
