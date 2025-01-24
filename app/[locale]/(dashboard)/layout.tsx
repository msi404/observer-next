
import type { Metadata } from "next";

import {Separator} from '@/app/_components/ui/separator'
import { SidebarProvider, SidebarTrigger, SidebarInset } from '@/app/_components/ui/sidebar'
import { Toaster } from "@/app/_components/ui/toaster";
import { AppSidebar } from "@/app/_components/app-sidebar"
import { AppBreadcrumb } from '@/app/_components/app-breadcrumb'
import {Protected} from '@/app/_components/protected'
import "../../_style/globals.css"

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
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <AppBreadcrumb />
            </div>
          </header>
        <section className="w-full p-4 pt-0">{ children }</section>
              <Toaster />
            </SidebarInset>
      </SidebarProvider>
    </Protected>
  );
}
