import type { Metadata } from "next";
import { SidebarProvider, SidebarTrigger, SidebarInset } from '@/app/_components/ui/sidebar'
import { Toaster } from "@/app/_components/ui/sonner";
import { AppSidebar } from "@/app/_components/app-sidebar"
import { Protected } from '@/app/_components/containers/protected'
import {FullscreenButton} from '@/app/_components/custom/fullscreen-button'
import "../_style/globals.css"

export const metadata: Metadata = {
  title: "برنامج المراقب",
  description: "برنامج المراقب الخاص بادارة العملية الانتخابية.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}> )
{
  return (
    <Protected>
      <SidebarProvider>
        <AppSidebar />
          <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <FullscreenButton />
              <SidebarTrigger className="-ml-1 print:hidden" />
            </div>
          </header>
        <section className="w-full p-4 pt-0">{ children }</section>
              <Toaster  richColors />
            </SidebarInset>
      </SidebarProvider>
    </Protected>
  );
}
