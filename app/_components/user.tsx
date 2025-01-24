'use client';
import { useDispatch } from 'react-redux';
import { logout } from '@/app/_lib/features/authSlice';
import { ChevronsUpDown, LogOut } from 'lucide-react';

import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from '@/app/_components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/app/_components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from '@/app/_components/ui/sidebar';

import { LanguageSwitcher } from '@/app/_components/language-switcher';

export const User = ({
  user
}: {
  user: {
    fullName: string;
    userName: string;
    avatar?: string;
  };
}) => {
  const dispatch = useDispatch();
  const { isMobile } = useSidebar();

  const onLogoutClick = () =>
  {
    dispatch( logout() );
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src="f" alt={user?.fullName} />
                <AvatarFallback className="rounded-lg">TW</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user?.fullName}</span>
                <span className="truncate text-xs">{user?.userName}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src="ff" alt={user?.fullName} />
                  <AvatarFallback className="rounded-lg">TW</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {user?.fullName}
                  </span>
                  <span className="truncate text-xs">{user?.userName}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <LanguageSwitcher />
                <p>اللغة</p>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onLogoutClick}>
              <LogOut />
              تسجيل الخروج
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
