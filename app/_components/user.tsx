'use client';
import { useDispatch } from 'react-redux';
import { logout } from '@/app/_lib/features/authSlice';
import { ChevronsUpDown, LogOut } from 'lucide-react';
import Avvvatars from 'avvvatars-react';

import {
  Avatar,
  AvatarFallback,
} from '@/app/_components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
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
import { Show } from '@/app/_components/show';
import {Switch, Match} from '@/app/_components/switch'

export const User = ({
  user
}: {
  user: {
    username: string;
    name: string;
    role: number
  };
}) => {
  const dispatch = useDispatch();
  const { isMobile } = useSidebar();

  const onLogoutClick = () => {
    dispatch(logout());
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem className="h-16">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <Show
                  when={user.username}
                  fallback={
                    <AvatarFallback className="rounded-lg">
                      <Avvvatars value="Tatweer" />
                    </AvatarFallback>
                  }
                >
                  <Avvvatars value={user.username} />
                </Show>
              </Avatar>
              <div className="grid flex-1 text-right text-sm leading-tight">
                <span className="truncate font-semibold">
                  {user?.name.toUpperCase()}
                </span>
                <Switch>
                  <Match when={user.role === 100}>
                  <span className="truncate text-xs">مدخل بيانات</span>
                  </Match>
                  <Match when={user.role === 10}>
                  <span className="truncate text-xs">ممثل كيان</span>
                  </Match>
                  <Match when={user.role === 12}>
                  <span className="truncate text-xs">مدير محافظة</span>
                  </Match>
                  <Match when={user.role === 0}>
                  <span className="truncate text-xs">سوبر ادمن</span>
                  </Match>
                </Switch>
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
                <Show
                  when={user.username}
                  fallback={
                    <AvatarFallback className="rounded-lg">
                      <Avvvatars value="Tatweer" />
                    </AvatarFallback>
                  }
                >
                  <Avvvatars value={user.username} />
                </Show>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {user?.username.toUpperCase()}
                  </span>
                  <span className="truncate text-xs">{user?.username}</span>
                </div>
              </div>
            </DropdownMenuLabel>
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
