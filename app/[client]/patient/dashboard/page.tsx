"use client";

import { useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import Button from "@/components/ButtonAtom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import RegisterForm from "@/features/userapp/components/forms/RegisterForm";
import AppointmentTable from "@/features/userapp/components/table/AppointmentTable";
import {
	Calendar,
	Home,
	Inbox,
	Settings,
	BookHeart,
	LifeBuoy,
	SquareMenu,
	ReceiptText,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import RegistrationSkeleton from "@/components/skeleton/registrationSkeleton";

export default function PatientDashboard() {
	const { data: sessionData } = useSession();
	const user = sessionData?.user;

	// Menu items.
	const items = [
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

	const [selectedOption, setSelectedOption] = useState("Account");

	const getSidebarMainContent = () => {
		if (selectedOption === "Account")
			return user ? <RegisterForm user={user} /> : <RegistrationSkeleton />;
		else if (selectedOption === "Appointments") return <AppointmentTable />;
		return null;
	};

	return (
		<div className="flex h-screen max-h-screen">
			<SidebarProvider className="app-sidebar-provider">
				<AppSidebar
					items={items}
					selectedOption={selectedOption}
					setSelectedOption={setSelectedOption}
				/>
				<main className="w-9">
					<SidebarTrigger className="fixed top-1 m-4">
						<SquareMenu className="!w-8 !h-8" />
					</SidebarTrigger>
				</main>
				<section className="w-full md:w-[70%] p-2 md:p-10">
					{getSidebarMainContent()}
				</section>
				<Link href={"/fortis/patient/appointment"}>
					<Button className="hidden absolute w-fit mt-8 p-5 md:flex right-36">
						Book a New Appointment
					</Button>
				</Link>
			</SidebarProvider>
		</div>
	);
}
