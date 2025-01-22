'use client';
import { useState} from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState
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
import { DataTableColumnHeader } from '@/app/_components/table-header';
import { DynamicTable } from '@/app/_components/dynamic-table';
import { DataTablePagination } from '@/app/_components/table-pagination';
import { confirmedVotersData, possibleVotersData } from '@/app/_utils/faker';
import Placeholder from '@/app/_assets/images/placeholder.png';
import { Dynamic } from '@/app/_components/dynamic';
import { Show } from '@/app/_components/show';
import {useAddConfirmedVoterDialog } from '@/app/_hooks/use-add-confirmed-voter-dialog'
import { useAddPossibleVoterDialog } from '@/app/_hooks/use-add-possible-voter-dialog'
import { useConfirmedVotersFilter } from '@/app/_hooks/use-confirmed-voter-filter'
import {usePossibleVotersFilter} from '@/app/_hooks/use-possible-voter-filter'

const ElectionBasePage = () =>
{
  const AddConfirmedVoter = useAddConfirmedVoterDialog()
  const AddPossibleVoter = useAddPossibleVoterDialog()
  const [confirmedVotersColumnFilter, setConfirmedVotersColumnFilter] =
    useState<ColumnFiltersState>([]);
  const [possibleVotersColumnFilter, setPossibledVotersColumnFilter] =
    useState<ColumnFiltersState>([]);
  const [confirmedVotersSorting, setConfirmedVotersSorting] =
    useState<SortingState>([]);
  const [possibleVotersSorting, setPossibleVotersSorting] =
    useState<SortingState>([]);
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
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t('electionBase:possibleVoters.table.header.candidateName')}
        />
      )
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
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t('electionBase:confirmedVoters.table.header.candidateName')}
        />
      )
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
    onSortingChange: setConfirmedVotersSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      columnFilters: confirmedVotersColumnFilter,
      sorting: confirmedVotersSorting
    }
  });
  const possibleVotersTable = useReactTable({
    data: possibleVotrs,
    columns: possibleVotersColumns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setPossibledVotersColumnFilter,
    onSortingChange: setPossibleVotersSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      columnFilters: possibleVotersColumnFilter,
      sorting: possibleVotersSorting
    }
  } );
  
  const FilterConfirmedVoters = useConfirmedVotersFilter(confirmedVotersTable)
  const FilterPossibleVoters = usePossibleVotersFilter( possibleVotersTable )
  
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
                  <Dynamic
                    component={FilterConfirmedVoters}
                  />
                  <Show when={confirmedVotersColumnFilter.length > 0}>
                    <Button
                      onClick={clearConfirmedVotersFilters}
                      variant="ghost"
                    >
                      الغاء التصفية
                    </Button>
                  </Show>
                </div>
                <Dynamic component={AddConfirmedVoter} />
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
                  <Dynamic
                    component={FilterPossibleVoters}
                  />
                  <Show when={possibleVotersColumnFilter.length > 0}>
                    <Button
                      onClick={clearPossibleVotersFilters}
                      variant="ghost"
                    >
                      الغاء التصفية
                    </Button>
                  </Show>
                </div>
                <Dynamic component={AddPossibleVoter} />
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
