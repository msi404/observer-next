'use client';
import { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type ColumnFiltersState,
  type SortingState
} from '@tanstack/react-table';
import { useColumns } from '@/app/_hooks/use-columns';
import { useElectoralEntitiesQuery } from '@/app/_services/fetchApi';

import { confirmedVotersData } from '@/app/_utils/faker';

const confirmedVotrs: ConfirmedVoters[] = confirmedVotersData;

export const useElectoralEntitiesTable = () => {
  const { data, isError, isFetching, isSuccess,refetch } =
    useElectoralEntitiesQuery('');

  const { confirmedVotersColumns } = useColumns();

  const [electoralEntitiesColumnFilter, setElectoralEntitiesColumnFilter] =
    useState<ColumnFiltersState>([]);

  const [electoralEntitiesSorting, setElectoralEntitiesSorting] =
    useState<SortingState>([]);

  const electoralEntitiesTable = useReactTable({
    data: confirmedVotrs,
    columns: confirmedVotersColumns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setElectoralEntitiesColumnFilter,
    onSortingChange: setElectoralEntitiesSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      columnFilters: electoralEntitiesColumnFilter,
      sorting: electoralEntitiesSorting
    }
  });

  const clearElectoralEntitiesFilters = () => {
    electoralEntitiesTable.setColumnFilters([]);
  };

  return {
    isError,
    isFetching,
    isSuccess,
    data,
    refetch,
    electoralEntitiesColumnFilter,
    clearElectoralEntitiesFilters,
    electoralEntitiesTable
  };
};
