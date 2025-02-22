"use client";

import { useState } from "react";
// import { useSession } from "next-auth/react";
import { Items } from "../constants";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { DocCalendar } from "./DocCalendar";

export const DocDashboard = () => {
	// const { data: sessionData } = useSession();
	// const user = sessionData?.user;

	const [selectedOption, setSelectedOption] = useState("Calendar");

	const getSidebarMainContent = () => {
		if (selectedOption === "Calendar") return <DocCalendar />;
		return null;
	};

	return (
		<Dashboard
			items={Items}
			selectedOption={selectedOption}
			setSelectedOption={setSelectedOption}
			SidebarMainContent={getSidebarMainContent()}
		/>
	);
};
