import { CircleCheck, CircleX } from "lucide-react";

export const app_constants = {
	DEFAULT_ALERT_CONFIG: {
		headerLabel: "Success",
		description: "Your changes saved successfully!",
		colour: "#4AC97E",
		icon: CircleCheck,
	},
	ERROR_ALERT_CONFIG: {
		headerLabel: "Error",
		description: "Your changes are not saved. Please try again after sometime!",
		colour: "#800000",
		icon: CircleX,
	},
};
