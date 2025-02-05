"use client";

import * as React from "react";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
} from "@/components/ui/sidebar";
import { NavUser } from "./NavUser";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AuthContext } from "@/contexts/AuthContext";

const data = {
	versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
	navMain: [
		{
			title: "Home",
			url: "#",
			items: [
				{ title: "Create Post", url: "/" },
				{ title: "Your Posts", url: "/your-post" },
			],
		},
	],
};

export function AppSidebar({ ...props }) {
	const currentPath = usePathname();
const {userInfo} = React.useContext(AuthContext)
console.log(userInfo);

	return (
		<Sidebar {...props}>
			<SidebarHeader>
				<h1 className='text-2xl font-bold'>Recruiter Labs</h1>
			</SidebarHeader>
			<SidebarContent>
				{data.navMain.map((item) => (
					<SidebarGroup key={item.title}>
						<SidebarGroupLabel>{item.title}</SidebarGroupLabel>
						<SidebarGroupContent>
							<SidebarMenu>
								{item.items.map((item) => (
									<SidebarMenuItem key={item.title}>
										<SidebarMenuButton
											asChild
											isActive={currentPath === item.url} // Check if the current path matches the item URL
										>
											<Link href={item.url}>{item.title}</Link>
										</SidebarMenuButton>
									</SidebarMenuItem>
								))}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				))}
			</SidebarContent>
			<SidebarRail />
			<SidebarFooter>
				<NavUser
					user={{
						name: userInfo?.username,
						email: userInfo?.email,
						avatar: "/vercel.jpg",
					}}
				/>
			</SidebarFooter>
		</Sidebar>
	);
}
