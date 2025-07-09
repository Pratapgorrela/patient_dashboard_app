import { Dispatch, SetStateAction } from "react";
import { ChevronUp } from "lucide-react";
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
// import { useSession } from "next-auth/react";
// import { handleSignOut } from "@/lib/actions/auth.actions";
import Image from "next/image";

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
	// const { data: session } = useSession();
	// const user = session?.user;

	return (
		<Sidebar>
			<SidebarContent>
				<SidebarGroup className="sidebar-group p-3">
					<SidebarGroupLabel className="sidebar-header-label mt-2 p-4">
						<Image
							src={"/assets/icons/logo-full.svg"}
							height={1000}
							width={1000}
							alt="patient"
							className="h-10 w-fit"
						/>
					</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu className="sidebar-menu p-3 mt-2 md:mt-6 gap-2">
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
										}}
									>
										<div>
											<item.icon width={24} height={24} className="!h-6 !w-6" />
											<span className="font-semibold text-lg">
												{item.title}
											</span>
										</div>
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
									{/* <User2 /> {user?.name || "Guest"} */}
									<ChevronUp className="ml-auto" />
								</SidebarMenuButton>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								side="top"
								className="w-[--radix-popper-anchor-width]"
							>
								<DropdownMenuItem>
									{/* <span onClick={handleSignOut}>Sign out</span> */}
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
}
