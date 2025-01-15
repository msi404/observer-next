'use client';
import { useState, useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/app/_components/ui/tabs';
import { Input } from '@/app/_components/ui/input';
import { Button } from '@/app/_components/ui/button';
import { BasicDialog } from '@/app/_components/basic-dialog';
import { DataTableColumnHeader } from '@/app/_components/table-header';
import { DynamicTable } from '@/app/_components/dynamic-table';
import { DataTablePagination } from '@/app/_components/table-pagination';
import { confirmedVotersData, possibleVotersData } from '@/app/_utils/faker';
import Placeholder from '@/app/_assets/images/placeholder.png';
import { Dynamic } from '@/app/_components/dynamic';
import { Show } from '@/app/_components/show';
import { Filter } from 'lucide-react';

interface Filter { id: string; value: string; }

const useConfirmedVotersDialog = (table: Table<any>) => {
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

  const DialogComponent = useMemo(() => (
    <BasicDialog
      open={open}
      onOpenChange={setOpen}
      buttonLabel="تصفية"
      buttonIcon={<Filter />}
      title="تصفية"
      description="ادخل المعطيات الاتية لتصفية العناصر"
      primaryAction={<Button type="submit" onClick={applyFilters}>تصفية</Button>}
      secondaryAction={<Button variant="outline">الغاء</Button>}
    >
        <Input
          placeholder="العنوان"
          onChange={(event) =>
            setFilters(() => [
              ...filters,
              { id: 'address', value: event.target.value }
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
      <Input placeholder="مركز الاقتراع"
        onChange={ ( event ) => 
          setFilters( () => [
            ...filters, 
            {id: 'pollingCenter', value: event.target.value}
          ])
        }
      />
      <Input placeholder="مدخل البيانات"
        onChange={ ( event ) => 
          setFilters( () => [
            ...filters,
            {id: 'dataEntry', value: event.target.value}
          ])
        }
      />
      <Input placeholder="المرشح"
        onChange={ ( event ) => 
          setFilters( () => [
            ...filters,
            {id: 'candidate', value: event.target.value}
          ])
        }
      />
    </BasicDialog>
  ), [applyFilters, filters, open]);

  return DialogComponent;
};

const usePossibleVotersDialog = (table: Table<any>) => {
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

  const DialogComponent = useMemo(() => (
    <BasicDialog
      open={open}
      onOpenChange={setOpen}
      buttonLabel="تصفية"
      buttonIcon={<Filter />}
      title="تصفية"
      description="ادخل المعطيات الاتية لتصفية العناصر"
      primaryAction={<Button type="submit" onClick={applyFilters}>تصفية</Button>}
      secondaryAction={<Button variant="outline">الغاء</Button>}
    >
        <Input
          placeholder="العنوان"
          onChange={(event) =>
            setFilters(() => [
              ...filters,
              { id: 'address', value: event.target.value }
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
        <Input placeholder="مركز الاقتراع" />
        <Input placeholder="مدخل البيانات" />
        <Input placeholder="المرشح" />
    </BasicDialog>
  ), [applyFilters, filters, open]);

  return DialogComponent;
};

const ElectionBasePage = () => {
  const [confirmedVotersColumnFilter, setConfirmedVotersColumnFilter] =
    useState<ColumnFiltersState>([]);
  const [possibleVotersColumnFilter, setPossibledVotersColumnFilter] =
    useState<ColumnFiltersState>([]);
  const { t } = useTranslation();

  const confirmedVotrs: ConfirmedVoters[] = confirmedVotersData;
  const possibleVotrs: PossibleVoters[] = possibleVotersData;

  const possibleVotersColumns: ColumnDef<PossibleVotersHeader>[] = [
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t('electionBase:possibleVoters.table.header.name')}
        />
      )
    },
    {
      accessorKey: 'address',
      header: t('electionBase:possibleVoters.table.header.address')
    },
    {
      accessorKey: 'state',
      header: t('electionBase:possibleVoters.table.header.governorate')
    },
    {
      accessorKey: 'pollingCenter',
      header: t('electionBase:possibleVoters.table.header.pollingCenter')
    },
    {
      accessorKey: 'dataEntry',
      header: t('electionBase:possibleVoters.table.header.dataEntry')
    },
    {
      accessorKey: 'candidate',
      header: t('electionBase:possibleVoters.table.header.candidateName')
    }
  ];

  const confirmedVotersColumns: ColumnDef<ConfirmedVotersHeader>[] = [
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t('electionBase:confirmedVoters.table.header.name')}
        />
      )
    },
    {
      accessorKey: 'address',
      header: t('electionBase:confirmedVoters.table.header.address')
    },
    {
      accessorKey: 'state',
      header: t('electionBase:confirmedVoters.table.header.governorate')
    },
    {
      accessorKey: 'pollingCenter',
      header: t('electionBase:confirmedVoters.table.header.pollingCenter')
    },
    {
      accessorKey: 'dataEntry',
      header: t('electionBase:confirmedVoters.table.header.dataEntry')
    },
    {
      accessorKey: 'candidate',
      header: t('electionBase:confirmedVoters.table.header.candidateName')
    },
    {
      accessorKey: 'candidateNumber',
      header: t('electionBase:confirmedVoters.table.header.candidateNumber')
    },
    {
      accessorKey: 'cardPhoto',
      header: t('electionBase:confirmedVoters.table.header.cardPhoto'),
      cell: ({ row }) => (
        <Image
          placeholder="blur"
          blurDataURL={Placeholder.blurDataURL}
          width={48}
          height={48}
          src={row.getValue('cardPhoto') as string}
          alt="صورة البطاقة"
          className="w-12 h-12 rounded-lg"
        />
      )
    }
  ];

  const confirmedVotersTable = useReactTable({
    data: confirmedVotrs,
    columns: confirmedVotersColumns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setConfirmedVotersColumnFilter,
    state: {
      columnFilters: confirmedVotersColumnFilter
    }
  });
  const possibleVotersTable = useReactTable({
    data: possibleVotrs,
    columns: possibleVotersColumns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setPossibledVotersColumnFilter,
    state: {
      columnFilters: possibleVotersColumnFilter
    }
  });

  const clearConfirmedVotersFilters = () => {
    confirmedVotersTable.setColumnFilters([]);
  };
  const clearPossibleVotersFilters = () => {
    possibleVotersTable.setColumnFilters([]);
  };
  return (
    <Container>
      <Tabs defaultValue="political-entities">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger className="w-full" value="political-entities">
            {t('electionBase:confirmedVoters.tabTitle')}
          </TabsTrigger>
          <TabsTrigger value="electoral-distribution">
            {t('electionBase:possibleVoters.tabTitle')}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="political-entities">
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0, transition: { damping: 0, ease: 'easeOut' } }}
          >
            <Card className="p-4">
              <CardContent className="flex flex-col lg:flex-row gap-5 justify-between">
                <div className="lg:w-1/2 flex flex-col lg:flex-row gap-5">
                  <Input
                    value={
                      (confirmedVotersTable
                        .getColumn('name')
                        ?.getFilterValue() as string) ?? ''
                    }
                    onChange={(event) =>
                      confirmedVotersTable
                        .getColumn('name')
                        ?.setFilterValue(event.target.value)
                    }
                    type="text"
                    placeholder="ابحث عن ناخبين مؤكدين"
                  />
                  <Dynamic component={ useConfirmedVotersDialog( confirmedVotersTable ) } />
                    <Show when={ confirmedVotersColumnFilter.length > 0 }>
                    <Button
                      onClick={clearConfirmedVotersFilters}
                      variant="ghost"
                    >
                      الغاء التصفية
                    </Button>
                    </Show>
                </div>
              </CardContent>
              <CardContent>
                <DynamicTable table={confirmedVotersTable} />
                <DataTablePagination
                  className="mt-12"
                  table={confirmedVotersTable}
                />
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
        <TabsContent value="electoral-distribution">
          <motion.div
            initial={{ x: 300 }}
            animate={{ x: 0, transition: { damping: 0, ease: 'easeOut' } }}
          >
            <Card className="p-4">
              <CardContent className="flex flex-col lg:flex-row gap-5 justify-between">
                <div className="lg:w-1/2 flex flex-col lg:flex-row gap-5">
                  <Input
                    value={
                      (possibleVotersTable
                        .getColumn('name')
                        ?.getFilterValue() as string) ?? ''
                    }
                    onChange={(event) =>
                      possibleVotersTable
                        .getColumn('name')
                        ?.setFilterValue(event.target.value)
                    }
                    type="text"
                    placeholder="ابحث عن ناخبين محتملين"
                  />
                  <Dynamic component={usePossibleVotersDialog(possibleVotersTable)} />
                  <Show when={possibleVotersColumnFilter.length > 0}>
                    <Button
                      onClick={clearPossibleVotersFilters}
                      variant="ghost"
                    >
                      الغاء التصفية
                    </Button>
                  </Show>
                </div>
              </CardContent>
              <CardContent>
                <DynamicTable table={possibleVotersTable} />
                <DataTablePagination
                  className="mt-12"
                  table={possibleVotersTable}
                />
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </Container>
  );
};

export default ElectionBasePage;
