'use client';
import { type FC, type ComponentType, type ReactElement, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '@/app/_lib/features/authSlice';
import { Card, CardContent } from '@/app/_components/ui/card';
import { Input } from '@/app/_components/ui/input';
import { Button } from '@/app/_components/ui/button';
import { Show } from '@/app/_components/show';
import { Dynamic } from '@/app/_components//dynamic';
import { DynamicTable } from '@/app/_components/dynamic-table';
import { hasPermission } from '@/app/_auth/auth-rbac';
import { DynamicPagination } from '@/app/_components/dynamic-pagination';
import {type Permission} from '@/app/_auth/auth-rbac'
export const Table: FC<{
  table: any;
  clearFilter: VoidFunction;
  permission: Permission;
  Add?: ComponentType;
  Retry: ReactElement;
  Filter: (table: any) => ReactElement;
  columnFilter: any;
}> = ({ table, clearFilter, Add, Filter, columnFilter, Retry, permission }) => {
  const user = useSelector(selectUser);
  return (
    <Card className="p-4">
      <CardContent className="flex flex-col lg:flex-row gap-5 justify-between">
        <div className="lg:w-1/2 flex flex-col lg:flex-row gap-5">
          <Input
            value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
            onChange={(event) =>
              table.getColumn('name')?.setFilterValue(event.target.value)
            }
            type="text"
            placeholder="ابحث عن اسم"
          />
          <Dynamic component={Filter(table)} />
          <Show when={columnFilter.length > 0}>
            <Button onClick={clearFilter} variant="ghost">
              الغاء التصفية
            </Button>
          </Show>
        </div>
        <div>
            {Retry}
          <Show when={hasPermission(user, permission)} fallback={<Fragment />}>
            {Add && <Dynamic component={<Add />} />}
          </Show>
        </div>
      </CardContent>
      <CardContent>
        <DynamicTable table={table} />
        <DynamicPagination />
      </CardContent>
    </Card>
  );
};
