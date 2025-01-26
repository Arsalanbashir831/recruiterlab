import { AppSidebar } from "@/components/common/AppSidebar"

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/toaster"

export default function Layout({children}) {
  return (
    <SidebarProvider>
     <Toaster />
      <AppSidebar />
      <SidebarInset>
       <>
        {children}
       </>
      </SidebarInset>
    </SidebarProvider>
  )
}
