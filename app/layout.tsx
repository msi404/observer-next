import type { Metadata } from "next";
import { Rubik, Inter } from "next/font/google";
import {Providers} from '@/app/_providers/providers'
import {Separator} from '@/app/_components/ui/separator'
import { SidebarProvider, SidebarTrigger, SidebarInset } from '@/app/_components/ui/sidebar'
import { AppSidebar } from "./_components/app-sidebar"
import {AppBreadcrumb} from '@/app/_components/app-breadcrumb'
import "./_style/globals.css"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
} );

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["arabic"],
});

export const metadata: Metadata = {
  title: "برنامج المراقب",
  description: "برنامج المراقب الخاص بادارة العملية الانتخابية.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}> )
{
  return (
    <html lang="en" dir="rtl">
      <body
        className={`${rubik.className} ${inter.className} antialiased`}
      >
        <Providers>
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
            <main className="w-full">{ children }</main>
            </SidebarInset>
        </SidebarProvider>
       </Providers>
      </body>
    </html>
  );
}
