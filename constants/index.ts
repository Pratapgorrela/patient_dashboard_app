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
	SKELETON = "skeleton",
	SELECT = "select",
	TEXTAREA = "textarea",
	RADIO_GROUP = "radiogroup",
}

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

export const StatusIcon = {
	scheduled: "/assets/icons/check.svg",
	pending: "/assets/icons/pending.svg",
	cancelled: "/assets/icons/cancelled.svg",
};

export const StatusMapper = {
	schedule: "scheduled",
	cancel: "cancelled",
	pending: "pending",
	complete: "completed",
};
