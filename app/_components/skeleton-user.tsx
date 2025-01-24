import {Skeleton} from '@/app/_components/ui/skeleton'
import {
  ChevronsUpDown,
} from "lucide-react"

import {
  Avatar,
} from "@/app/_components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/app/_components/ui/sidebar"
export const SkeletonUser = () =>
{
  return (
    <SidebarMenu>
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger disabled asChild>
          <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
      <Avatar className="h-8 w-8 rounded-lg">
              <Skeleton className='h-12 w-12 rounded-lg' />
            </Avatar>
          <div className="grid flex-1 space-y-2">
              <Skeleton className="h-2 w-1/2" />
              <Skeleton className="h-2 w-10/12" />
            </div>
            <ChevronsUpDown className="ml-auto size-4" />
          </SidebarMenuButton>
         </DropdownMenuTrigger>
       </DropdownMenu>
     </SidebarMenuItem>
   </SidebarMenu>
     )
}