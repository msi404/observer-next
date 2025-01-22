'use client';
import { useSelector } from 'react-redux';
import { useElectoralEntityAdminProfileQuery } from '@/app/_services/fetchApi';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
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
import { NavUser } from '@/app/_components/nav-user';
import { NavUserSkeleton } from '@/app/_components/nav-user-skeleton';
import { Show } from '@/app/_components/show';
import { For } from '@/app/_components/for';
import { Dynamic } from '@/app/_components/dynamic';
import { motion } from 'motion/react';

export const AppSidebar = () => {
  // const { data, isLoading } = useProfileQuery("");
  const user = useSelector(selectUser);
  const { data, isLoading } = useElectoralEntityAdminProfileQuery('');
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
        <Show when={!isLoading} fallback={<NavUserSkeleton />}>
          <NavUser user={data?.result} />
        </Show>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};
