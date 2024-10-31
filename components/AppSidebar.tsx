import { Dispatch, SetStateAction } from "react";
import { ChevronUp, User2 } from "lucide-react";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import clsx from "clsx";

export function AppSidebar({
	items = [],
	selectedOption,
	setSelectedOption,
}: {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	items: { title: string; url: string; icon: any }[];
	selectedOption: string;
	setSelectedOption: Dispatch<SetStateAction<string>>;
}) {
	return (
		<Sidebar>
			<SidebarContent>
				<SidebarGroup className="sidebar-group p-3">
					<SidebarGroupLabel className="sidebar-header-label p-3">
						CarePulse
					</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu className="sidebar-menu p-3 gap-2">
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton
										asChild
										className={clsx({
											"h-12 text-base": true,
											"bg-green-500 hover:bg-green-500":
												selectedOption === item.title,
										})}
										onClick={() => {
											setSelectedOption(item.title);
										}}>
										<a href={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</a>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<SidebarMenuButton className="text-base h-12">
									<User2 /> Username
									<ChevronUp className="ml-auto" />
								</SidebarMenuButton>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								side="top"
								className="w-[--radix-popper-anchor-width]">
								<DropdownMenuItem>
									<span>Sign out</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
}
