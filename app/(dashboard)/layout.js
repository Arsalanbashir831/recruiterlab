"use client";
import { AppSidebar } from "@/components/common/AppSidebar";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { AiGenerationProvider } from "@/contexts/AiGenerationContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { PostsProvider } from "@/contexts/PostsContext";
import { PromptProvider } from "@/contexts/PromptContext";
import { RefreshProvider } from "@/contexts/refreshContext";
import { TooltipProvider } from "@radix-ui/react-tooltip";

export default function Layout({ children }) {
	
  return (
    <AuthProvider>
      <SidebarProvider>
        <PostsProvider>
          <TooltipProvider>
            <Toaster />
            <AppSidebar />
            <SidebarInset>
              <PromptProvider>
                <AiGenerationProvider>
				<RefreshProvider>
                  <>{children}</>
				</RefreshProvider>
                </AiGenerationProvider>
              </PromptProvider>
            </SidebarInset>
          </TooltipProvider>
        </PostsProvider>
      </SidebarProvider>
    </AuthProvider>
  );
}
