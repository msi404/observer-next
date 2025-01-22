'use client';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  type ColumnDef,
  type ColumnFiltersState,
  type Table
} from '@tanstack/react-table';

import { Container } from '@/app/_components/container';
import { Card, CardContent } from '@/app/_components/ui/card';
import { Input } from '@/app/_components/ui/input';
import { Button } from '@/app/_components/ui/button';
import { BasicDialog } from '@/app/_components/basic-dialog';
import { DynamicTable } from '@/app/_components/dynamic-table';
import { DataTablePagination } from '@/app/_components/table-pagination';
import { Dynamic } from '@/app/_components/dynamic';
import { Show } from '@/app/_components/show';
import { Filter } from 'lucide-react';

import { candidatesData } from '@/app/_utils/faker';

interface Filter {
  id: string;
  value: string;
}

const useDialog = (table: Table<any>) => {
  const [filters, setFilters] = useState<Filter[]>([]);
  const [open, setOpen] = useState(false);

  const applyFilters = useCallback(() => {
    table.setColumnFilters(filters);
    setOpen(false);
    setFilters([]);
  }, [table, filters]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') applyFilters();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [applyFilters]);

  const DialogComponent = useMemo(
    () => (
      <BasicDialog
        open={open}
        onOpenChange={setOpen}
        buttonLabel="تصفية"
        buttonIcon={<Filter />}
        title="تصفية"
        description="ادخل المعطيات الاتية لتصفية العناصر"
      >
        <Input
          placeholder="رقم المرشح"
          onChange={(event) =>
            setFilters(() => [
              ...filters,
              { id: 'candidateNumber', value: event.target.value }
            ])
          }
        />
        <Input
          placeholder="رقم الهاتف"
          onChange={(event) =>
            setFilters(() => [
              ...filters,
              { id: 'phoneNumber', value: event.target.value }
            ])
          }
        />
        <Input
          placeholder="المحافظة"
          onChange={(event) =>
            setFilters(() => [
              ...filters,
              { id: 'state', value: event.target.value }
            ])
          }
        />
        <Input
          placeholder="الكيان"
          onChange={(event) =>
            setFilters(() => [
              ...filters,
              { id: 'party', value: event.target.value }
            ])
          }
        />
      </BasicDialog>
    ),
    [applyFilters, filters, open]
  );

  return DialogComponent;
};

const CandidatesPage = () => {
  const [filter, setFilter] = useState<ColumnFiltersState>([]);
  const { t } = useTranslation();

  const candidates: Candidate[] = candidatesData;

  const candidatesColumns: ColumnDef<CandidatesHeader>[] = [
    {
      accessorKey: 'name',
      header: t('candidates:table.header.name')
    },
    {
      accessorKey: 'phoneNumber',
      header: t('candidates:table.header.phoneNumber')
    },
    {
      accessorKey: 'candidateNumber',
      header: t('candidates:table.header.candidateNumber')
    },
    {
      accessorKey: 'entityName',
      header: t('candidates:table.header.party')
    },
    {
      accessorKey: 'state',
      header: t('candidates:table.header.governorate')
    }
  ];

  const table = useReactTable({
    data: candidates,
    columns: candidatesColumns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setFilter,
    state: {
      columnFilters: filter
    }
  });

  const clearFilters = () => {
    table.setColumnFilters([]);
  };

  return (
    <Container>
      <Card className="p-4">
        <CardContent className="flex flex-col lg:flex-row gap-5 justify-between">
          <div className="lg:w-1/2 flex flex-col lg:flex-row gap-5">
            <Input
              value={
                (table.getColumn('name')?.getFilterValue() as string) ?? ''
              }
              onChange={(event) =>
                table.getColumn('name')?.setFilterValue(event.target.value)
              }
              type="text"
              placeholder="ابحث عن مرشحين"
            />
            <Dynamic component={useDialog(table)} />
            <Show when={filter.length > 0}>
              <Button onClick={clearFilters} variant="ghost">
                الغاء التصفية
              </Button>
            </Show>
          </div>
        </CardContent>
        <CardContent>
          <DynamicTable table={table} />
          <DataTablePagination className="mt-12" table={table} />
        </CardContent>
      </Card>
    </Container>
  );
};

export default CandidatesPage;
