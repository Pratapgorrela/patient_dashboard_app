"use client";

import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SquareMenu } from "lucide-react";
import { Dispatch, ReactNode, SetStateAction } from "react";

interface DashboardProps {
	items: { title: string; url: string; icon: any }[];
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
