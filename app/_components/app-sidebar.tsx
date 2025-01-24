'use client';
import { useSelector } from 'react-redux';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import {useCurrentUserQuery} from '@/app/_services/fetchApi'
import { selectUser } from '@/app/_lib/features/authSlice';
import { hasPermission } from '@/app/_auth/auth-rbac';
import { SIDEBAR_ITEMS } from '@/app/_constants/sidebar.constant';

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
import {Separator} from '@/app/_components/ui/separator'
import { User } from '@/app/_components/user';
import { SkeletonUser } from '@/app/_components/skeleton-user';
import { ErrorUser } from '@/app/_components/error-user'
import {FetchUser} from '@/app/_components/fetch-user'
import { Show } from '@/app/_components/show';
import { For } from '@/app/_components/for';
import {Switch, Match} from '@/app/_components/switch'
import { Dynamic } from '@/app/_components/dynamic';
import { motion } from 'motion/react';

export const AppSidebar = () =>
{
  const {data, isLoading, isError, isSuccess, isFetching, refetch} = useCurrentUserQuery('')
  const user = useSelector(selectUser);
  const pathname = usePathname();
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  return (
    <Sidebar
      collapsible="icon"
      side={currentLanguage === 'ar' ? 'right' : 'left'}
    >
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarContent>
            <SidebarMenu>
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
                        <SidebarMenuButton size="lg" asChild>
                          <Link
                            className={`${
                              pathname === item.url ? 'bg-slate-400/20' : ''
                            } hover:bg-slate-200/20`}
                            href={item.url}
                          >
                            <Dynamic
                              component={item.icon}
                              className="mx-2"
                              size={50}
                            />
                            <span>{t(item.title)}</span>
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
        <Match when={ isLoading }>
            <SkeletonUser />
          </Match>
          <Match when={isError}>
              <ErrorUser retry={refetch}/>
          </Match>
          <Match when={isSuccess}>
              <User user={data?.data}/>
          </Match>
          <Match when={isFetching}>
            <FetchUser />
          </Match>
      </Switch>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};
