"use client";

import { useState } from "react";
import RegisterForm from "@/features/userapp/components/forms/RegisterForm";
import AppointmentTable from "@/features/userapp/components/table/AppointmentTable";
import { useSession } from "next-auth/react";
import RegistrationSkeleton from "@/components/skeleton/registrationSkeleton";
import { Items } from "../constants";
import { Dashboard } from "@/components/dashboard/Dashboard";
import Link from "next/link";
import Button from "@/components/ButtonAtom";

export const PatientDashboard = () => {
	const { data: sessionData } = useSession();
	const user = sessionData?.user;

	const [selectedOption, setSelectedOption] = useState("Account");

	const getSidebarMainContent = () => {
		if (selectedOption === "Account")
			return user ? <RegisterForm user={user} /> : <RegistrationSkeleton />;
		else if (selectedOption === "Appointments") return <AppointmentTable />;
		return null;
	};

	const Content = (
		<Link href={"/fortis/patient/appointment"}>
			<Button className="hidden absolute w-fit mt-8 p-5 md:flex right-36">
				Book a New Appointment
			</Button>
		</Link>
	);

	return (
		<Dashboard
			items={Items}
			selectedOption={selectedOption}
			setSelectedOption={setSelectedOption}
			SidebarMainContent={getSidebarMainContent()}
			Content={Content}
		/>
	);
};
