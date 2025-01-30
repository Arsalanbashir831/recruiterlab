import { AppSidebar } from "@/components/common/AppSidebar";

import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { PostsProvider } from "@/contexts/PostsContext";

export default function Layout({ children }) {
	return (
		<SidebarProvider>
			<PostsProvider>
				<Toaster />
				<AppSidebar />
				<SidebarInset>
					<>{children}</>
				</SidebarInset>
			</PostsProvider>
		</SidebarProvider>
	);
}
