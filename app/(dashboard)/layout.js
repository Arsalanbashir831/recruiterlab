'use client'
import { AppSidebar } from "@/components/common/AppSidebar";

import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/contexts/AuthContext";
import { PostsProvider } from "@/contexts/PostsContext";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { RecoilRoot } from "recoil";

export default function Layout({ children }) {
	return (
		<AuthProvider>
		<RecoilRoot>
		<SidebarProvider>
			<PostsProvider>
			<TooltipProvider>			
				<Toaster />
				<AppSidebar />
				<SidebarInset>
					<>{children}</>
				</SidebarInset>
				</TooltipProvider>
			</PostsProvider>
		</SidebarProvider>
		</RecoilRoot>
		</AuthProvider>
	);
}
