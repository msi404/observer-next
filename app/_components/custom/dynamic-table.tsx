'use client';
import { type FC } from 'react';

import { flexRender } from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/app/_components/ui/table';

import { For } from '@/app/_components/utils/for';
import { Show } from '@/app/_components/utils/show';

interface DynamicTableProps {
  table: any;
}

export const DynamicTable: FC<DynamicTableProps> = ({ table }) => {
  return (
    <Table>
      <TableHeader>
        <For each={table.getHeaderGroups()}>
          {(headerGroup: any) => (
            <TableRow key={headerGroup.id}>
              <For each={headerGroup.headers}>
                {(header: any) => (
                  <TableHead className="text-start" key={header.id}>
                    <Show when={!header.isPlaceholder} fallback={null}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </Show>
                  </TableHead>
                )}
              </For>
            </TableRow>
          )}
        </For>
      </TableHeader>
      <TableBody>
        <Show
          when={table.getRowModel().rows?.length > 0}
          fallback={
            <TableRow>
              <TableCell colSpan={10} className="h-24 text-center">
                لا يوجد بيانات
              </TableCell>
            </TableRow>
          }
        >
          <For each={table.getRowModel().rows}>
            {(row: any) => (
              <TableRow
                className="even:bg-slate-50 dark:even:bg-slate-900 rounded-lg border-none"
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                <For each={row.getVisibleCells()}>
                  {(cell: any) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  )}
                </For>
              </TableRow>
            )}
          </For>
        </Show>
      </TableBody>
    </Table>
  );
};
