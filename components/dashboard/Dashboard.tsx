"use client";

import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useAuthStore } from "@/store/userAuthStore";
import { SquareMenu } from "lucide-react";
import { redirect } from "next/navigation";
import { Dispatch, ReactNode, SetStateAction, useEffect } from "react";

interface DashboardProps {
	items: { title: string; url: string; icon: unknown }[];
	selectedOption: string;
	setSelectedOption: Dispatch<SetStateAction<string>>;
	SidebarMainContent: ReactNode;
	Content?: ReactNode;
}

export const Dashboard = ({
	items,
	selectedOption,
	setSelectedOption,
	SidebarMainContent,
	Content = null,
}: DashboardProps) => {
	const { user } = useAuthStore();

	useEffect(() => {
		if (!user?.$id) {
			redirect("/fortis/patient/login");
		}
	}, [user]);

	return (
		<SidebarProvider className="app-sidebar-provider">
			<AppSidebar
				items={items}
				selectedOption={selectedOption}
				setSelectedOption={setSelectedOption}
			/>
			<main className="md:w-9">
				<SidebarTrigger className="fixed top-1 m-4">
					<SquareMenu className="!w-8 !h-8" />
				</SidebarTrigger>
			</main>
			<section className="w-full p-2 sm:p-10">{SidebarMainContent}</section>
			{Content}
		</SidebarProvider>
	);
};
