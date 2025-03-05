'use client';
import {useContext} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { usePathname } from 'next/navigation';
import { DocumentFullScreen } from '@chiragrupani/fullscreen-react';
import Image from 'next/image';
import Link from 'next/link';
import {SidebarContext} from '@/app/_components/ui/sidebar'
import {
  useCurrentUserQuery,
  useUnseenNotificationQuery
} from '@/app/_services/fetchApi';
import { selectUser } from '@/app/_lib/features/authSlice';
import {
  setFullScreen,
  selectIsFullScreen
} from '@/app/_lib/features/fullscreenSlice';
import { hasPermission } from '@/app/_auth/auth-rbac';
import { SIDEBAR_ITEMS } from '@/app/_constants/sidebar.constant';
import CompanyLogo from '@/app/_assets/company.png';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail
} from '@/app/_components/ui/sidebar';
import { Badge } from '@/app/_components/ui/badge';
import { Separator } from '@/app/_components/ui/separator';
import { User } from '@/app/_components/user';
import { SkeletonUser } from '@/app/_components/skeleton-user';
import { ErrorUser } from '@/app/_components/error-user';
import { FetchUser } from '@/app/_components/fetch-user';
import { Show } from '@/app/_components/show';
import { For } from '@/app/_components/for';
import { Switch, Match } from '@/app/_components/switch';
import { Dynamic } from '@/app/_components/dynamic';
import { motion } from 'motion/react';

export const AppSidebar = () =>
{
function useSidebar() {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }
  return context
}
  const { toggleSidebar } = useSidebar()
  const dispatch = useDispatch();
  const isFullScreen = useSelector(selectIsFullScreen);
  const { data, isLoading, isError, isSuccess, isFetching, refetch } =
    useCurrentUserQuery('');
  const { data: notes, isSuccess: isSuccessNotes } = useUnseenNotificationQuery(
    '',
    { pollingInterval: 10000, skipPollingIfUnfocused: true }
  );
  const user = useSelector(selectUser);
  const pathname = usePathname();

  return (
    <DocumentFullScreen
      isFullScreen={isFullScreen}
      onChange={(isFull: boolean) => {
        dispatch(setFullScreen(isFull));
      }}
    >
      <Sidebar collapsible="icon" side="right">
        <SidebarHeader />
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="flex justify-center items-center mb-6">
              <Image
                src={CompanyLogo.src}
                width={120}
                height={100}
                alt="Company Logo"
              />
            </SidebarGroupLabel>
            <SidebarContent>
              <SidebarMenu className="overflow-x-hidden">
                <For each={SIDEBAR_ITEMS}>
                  {(item, index) => (
                    <Show
                      when={hasPermission(user, item.persmission)}
                      key={index}
                    >
                      <SidebarMenuItem>
                        <motion.div
                          whileHover={{
                            scale: 1.1,
                            transition: {
                              damping: 0,
                              ease: 'linear',
                              duration: 0.2
                            }
                          }}
                        >
                          <SidebarMenuButton
                            onClick={() =>
                              item.isFullscreen
                                ? [dispatch(setFullScreen(!isFullScreen)), toggleSidebar()]
                                : null
                            }
                            size="lg"
                            asChild
                          >
                            <Link
                              className={`${
                                pathname === item.url ? 'bg-slate-400/20' : ''
                              } hover:bg-slate-200/20`}
                              href={item.url}
                            >
                              <Show
                                when={
                                  item.isNotes &&
                                  notes?.data > 0 &&
                                  isSuccessNotes
                                }
                              >
                                <Badge className="bg-red-500">
                                  {notes?.data}
                                </Badge>
                              </Show>
                              <Dynamic
                                component={item.icon}
                                className="mx-2"
                                size={50}
                              />
                              <span>{item.title}</span>
                            </Link>
                          </SidebarMenuButton>
                        </motion.div>
                      </SidebarMenuItem>
                    </Show>
                  )}
                </For>
              </SidebarMenu>
            </SidebarContent>
          </SidebarGroup>
        </SidebarContent>
        <Separator />
        <SidebarFooter>
          <Switch>
            <Match when={isLoading}>
              <SkeletonUser />
            </Match>
            <Match when={isError}>
              <ErrorUser retry={refetch} />
            </Match>
            <Match when={isSuccess}>
              <User user={data?.data} />
            </Match>
            <Match when={isFetching}>
              <FetchUser />
            </Match>
          </Switch>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </DocumentFullScreen>
  );
};
