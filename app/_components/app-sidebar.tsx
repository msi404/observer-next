'use client';
import { useSelector, useDispatch } from 'react-redux';
import { usePathname } from 'next/navigation';
import { DocumentFullScreen } from '@chiragrupani/fullscreen-react';
import Image from 'next/image';
import Link from 'next/link';
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
import CompanyLogo from '@/app/_assets/tatweer.png';
import Logo from '@/app/_assets/logo.png';

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
import { User } from '@/app/_components/custom/user';
import { SkeletonUser } from '@/app/_components/skeleton-user';
import { ErrorUser } from '@/app/_components/error-user';
import { FetchUser } from '@/app/_components/fetch-user';
import { Show } from '@/app/_components/utils/show';
import { For } from '@/app/_components/utils/for';
import { Switch, Match } from '@/app/_components/utils/switch';
import { Dynamic } from '@/app/_components/utils/dynamic';
import { motion } from 'motion/react';
export const AppSidebar = () => {
  const isFullScreen = useSelector(selectIsFullScreen);
  const dispatch = useDispatch();
  const { data, isLoading, isError, isSuccess, isFetching, refetch } =
    useCurrentUserQuery('');
  const { data: notes, isSuccess: isSuccessNotes } = useUnseenNotificationQuery(
    '',
    { pollingInterval: 10000, skipPollingIfUnfocused: true }
  );
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const user: Partial<User> = useSelector(selectUser);
  const pathname = usePathname();

  return (
    <DocumentFullScreen
      isFullScreen={isFullScreen}
      onChange={(isFull: boolean) => {
        dispatch(setFullScreen(isFull));
      }}
    >
      <Show when={!isFullScreen}>
        <Sidebar collapsible="icon" side="right">
          <SidebarHeader />
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="flex  items-center mb-6">
                <Switch>
                  <Match when={user.role == 0}>
                    <Image
                      src={Logo.src}
                      width={40}
                      height={30}
                      alt="Company Logo"
                    />
                  </Match>
                  <Match
                    when={user.role !== 0 && user.electoralEntity?.logo !== ''}
                  >
                    {user.electoralEntity?.logo ? (
                      <Image
                        src={user.electoralEntity.logo}
                        width={40}
                        height={30}
                        blurDataURL={Logo.blurDataURL}
                        alt="Company Logo"
                      />
                    ) : null}
                  </Match>
                </Switch>
              </SidebarGroupLabel>
              <SidebarContent>
                <SidebarMenu className="overflow-x-hidden">
                  <For each={SIDEBAR_ITEMS}>
                    {(item, index) => (
                      <Show
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
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
                            <SidebarMenuButton size="lg" asChild>
                              <Link
                                className={`${
                                  pathname === item.url ? 'bg-blue-400/20 text-blue-700' : ''
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
                                <span className="font-medium">
                                  {item.title}
                                </span>
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
          <div className="flex justify-center items-center mb-6">
            <Image
              src={CompanyLogo.src}
              width={120}
              height={100}
              alt="Company Logo"
            />
          </div>
          <SidebarRail />
        </Sidebar>
      </Show>
    </DocumentFullScreen>
  );
};
