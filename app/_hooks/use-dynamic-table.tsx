'use client';
import { useState, useEffect } from 'react';
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

import { confirmedVotersData, possibleVotersData } from '@/app/_utils/faker';

const confirmedVotrs: ConfirmedVoters[] = confirmedVotersData;
const possibleVotrs: PossibleVoters[] = possibleVotersData;

export const useDynamicTable = () => {
  const {
    data,
    isLoading,
    isError,
    isFetching,
    isSuccess,
    refetch } = useElectoralEntitiesQuery( '' );
  
  const { possibleVotersColumns, confirmedVotersColumns } = useColumns();
  const [confirmedVotersColumnFilter, setConfirmedVotersColumnFilter] =
    useState<ColumnFiltersState>([]);
  const [confirmedVotersSorting, setConfirmedVotersSorting] =
    useState<SortingState>([]);

  const [possibleVotersColumnFilter, setPossibledVotersColumnFilter] =
    useState<ColumnFiltersState>([]);

  const [possibleVotersSorting, setPossibleVotersSorting] =
    useState<SortingState>([]);

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
  });

  const electoralEntitiesTable = useReactTable({
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
  });

  const clearConfirmedVotersFilters = () => {
    confirmedVotersTable.setColumnFilters([]);
  };
  const clearPossibleVotersFilters = () => {
    possibleVotersTable.setColumnFilters([]);
  };

  return {
    confirmedVotersColumnFilter,
    possibleVotersColumnFilter,
    confirmedVotersTable,
    possibleVotersTable,
    clearConfirmedVotersFilters,
    clearPossibleVotersFilters
  };
};
