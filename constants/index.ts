export const GenderOptions = [
	{ label: "Male", value: "male" },
	{ label: "Female", value: "female" },
	{ label: "Other", value: "other" },
];

export const PatientFormDefaultValues = {
	firstName: "",
	lastName: "",
	email: "",
	phone: "",
	birthDate: new Date(Date.now()),
	gender: "male" as Gender,
	address: "",
	occupation: "",
	emergencyContactName: "",
	emergencyContactNumber: "",
	primaryPhysician: "",
	insuranceProvider: "",
	insurancePolicyNumber: "",
	allergies: "",
	currentMedication: "",
	familyMedicalHistory: "",
	pastMedicalHistory: "",
	identificationType: "Birth Certificate",
	identificationNumber: "",
	identificationDocument: [],
	treatmentConsent: false,
	disclosureConsent: false,
	privacyConsent: false,
};

export const IdentificationTypes = [
	{ name: "Birth Certificate" },
	{ name: "Driver's License" },
	{ name: "Medical Insurance Card/Policy" },
	{ name: "Military ID Card" },
	{ name: "National Identity Card" },
	{ name: "Passport" },
	{ name: "Resident Alien Card (Green Card)" },
	{ name: "Social Security Card" },
	{ name: "State ID Card" },
	{ name: "Student ID Card" },
	{ name: "Voter ID Card" },
];

export const Doctors = [
	{
		imageSrc: "/assets/images/dr-green.png",
		name: "John Green",
	},
	{
		imageSrc: "/assets/images/dr-cameron.png",
		name: "Leila Cameron",
	},
	{
		imageSrc: "/assets/images/dr-livingston.png",
		name: "David Livingston",
	},
	{
		imageSrc: "/assets/images/dr-peter.png",
		name: "Evan Peter",
	},
	{
		imageSrc: "/assets/images/dr-powell.png",
		name: "Jane Powell",
	},
	{
		imageSrc: "/assets/images/dr-remirez.png",
		name: "Alex Ramirez",
	},
	{
		imageSrc: "/assets/images/dr-lee.png",
		name: "Jasmine Lee",
	},
	{
		imageSrc: "/assets/images/dr-cruz.png",
		name: "Alyana Cruz",
	},
	{
		imageSrc: "/assets/images/dr-sharma.png",
		name: "Hardik Sharma",
	},
];

export const StatusIcon = {
	scheduled: "/assets/icons/check.svg",
	pending: "/assets/icons/pending.svg",
	cancelled: "/assets/icons/cancelled.svg",
};
