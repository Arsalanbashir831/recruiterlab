import { AppSidebar } from "@/components/common/AppSidebar";

import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { PostsProvider } from "@/contexts/PostsContext";
import { TooltipProvider } from "@radix-ui/react-tooltip";

export default function Layout({ children }) {
	return (
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
	);
}
