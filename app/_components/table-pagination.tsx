'use client';
import {useTranslation} from 'react-i18next'
import { Table } from "@tanstack/react-table";
import {
  SkipForward,
  SkipBack,
  CircleChevronRight,
  CircleChevronLeft
} from "lucide-react"

import { Button } from "@/app/_components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select"
import {cn} from '@/app/_lib/utils'
import { Show } from '@/app/_components/show';
interface DataTablePaginationProps<TData> {
	table: Table<TData>
	className?: string
}

export function DataTablePagination<TData>({
	table,
	className
}: DataTablePaginationProps<TData> )
{
  const { i18n } = useTranslation()
  const currentLanguage = i18n.language
  return (
    <div className={cn('flex items-center justify-between px-2', className)}>
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredRowModel().rows.length} صف
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center rtl:ml-2 space-x-2">
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value))
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <p className="text-sm font-medium">صف للصفحة</p>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          صفحة {table.getState().pagination.pageIndex + 1} من{" "}
          {table.getPageCount()}
        </div>
        <div className="flex items-center">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex rtl:ml-2 ltr:mr-2"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <Show when={currentLanguage === 'en'} fallback={<SkipForward />}>
            <SkipBack />
            </Show>
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0 rounded-full ltr:mr-1 rtl:ml-1"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <Show when={currentLanguage === 'en'} fallback={<CircleChevronRight />}>
            <CircleChevronLeft />
           </Show>
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0 rounded-full ltr:ml-1 lrt:mr-1"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <Show when={currentLanguage === 'en'} fallback={<CircleChevronLeft />}>
            <CircleChevronRight />
           </Show>
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex rtl:mr-2 ltr:ml-2"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <Show when={currentLanguage === 'en'} fallback={<SkipBack />}>
            <SkipForward />
            </Show>
          </Button>
        </div>
      </div>
    </div>
  )
}
