import { CalendarCheck, CalendarDays, UserRoundCheck } from "lucide-react";

// Menu items.
export const Items = [
	{
		title: "Profile",
		url: "#",
		icon: UserRoundCheck,
	},
	{
		title: "Calendar",
		url: "#",
		icon: CalendarDays,
	},
	{
		title: "Appointments",
		url: "#",
		icon: CalendarCheck,
	},
];

export const TimeCardStatusTypes = [
	{ name: "Working Day", value: "workingDay" },
	{ name: "Limited Availability", value: "timeoff" },
	{ name: "Personal Leave", value: "personalLeave" },
	{ name: "Week-off", value: "weekoff" },
	{ name: "compensatory off", value: "compoff" },
	{ name: "Company Holiday", value: "companyHoliday" },
	{ name: "Available for Emergency", value: "emergencyAvailability" },
];

export const AvailabilityOptions = [
	{ label: "Available", value: "available" },
	{ label: "Unavailable", value: "unavailable" },
];
