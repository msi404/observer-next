'use client';
import { Fragment } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import {
  BreadCrumb,
  BreadCrumbItem,
  BreadCrumbSeparator
} from '@/app/_components/breadcrumb';
import { Switch, Match } from '@/app/_components/switch';
import { For } from '@/app/_components/for';
import { ChevronRight } from 'lucide-react';

export const AppBreadcrumb = () => {
  const pathname = usePathname();
  const routes = pathname.split('/');
  return (
    <BreadCrumb
      orientation="horizontal"
      variant="ghost"
      className="gap-1 bg-background rounded-lg p-2"
    >
      <For each={routes}>
        {(link, i) => (
          <Fragment key={i}>
            <BreadCrumbSeparator>
              <ChevronRight className="size-3" />
            </BreadCrumbSeparator>
            <BreadCrumbItem className="px-2 h-7" index={0}>
              <Switch>
                <Match when={link === ''}>
                  <Link href='/'>/</Link>
                </Match>
                <Match when={link != ''}>
								  <Link href={ `/${ link }` }>{link}</Link>
                </Match>
              </Switch>
            </BreadCrumbItem>
          </Fragment>
        )}
      </For>
    </BreadCrumb>
  );
};
