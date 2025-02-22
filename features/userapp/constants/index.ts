import {
	BookHeart,
	Calendar,
	Home,
	Inbox,
	LifeBuoy,
	ReceiptText,
	Settings,
} from "lucide-react";

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
	identificationType: "",
	identificationNumber: "",
	identificationDocument: [],
	treatmentConsent: false,
	disclosureConsent: false,
	privacyConsent: false,
};

export const IdentificationTypes = [
	{ name: "Aadhaar card" },
	{ name: "Driver's License" },
	{ name: "Birth Certificate" },
	{ name: "Medical Insurance Card/Policy" },
	{ name: "Military ID Card" },
	{ name: "National Identity Card" },
	{ name: "Passport" },
	{ name: "Student ID Card" },
	{ name: "Voter ID Card" },
];

// Menu items.
export const Items = [
	{
		title: "Account",
		url: "#",
		icon: Home,
	},
	{
		title: "Appointments",
		url: "#",
		icon: Inbox,
	},
	{
		title: "Reports",
		url: "#",
		icon: Calendar,
	},
	{
		title: "Billing details",
		url: "#",
		icon: ReceiptText,
	},
	{
		title: "Settings",
		url: "#",
		icon: Settings,
	},
	{
		title: "Support",
		url: "#",
		icon: LifeBuoy,
	},
	{
		title: "Feedback",
		url: "#",
		icon: BookHeart,
	},
];
