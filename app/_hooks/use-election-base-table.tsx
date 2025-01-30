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
import { useVotersQuery } from '@/app/_services/fetchApi';

export const useElectionBaseTable = () => {
  const { data: confirmedVotrs, isLoading ,isError, isFetching, isSuccess,refetch } =
	 useVotersQuery('');

  const { confirmedVotersColumns } = useColumns();

  const [confirmedVotersColumnFilter, setconfirmedVotersColumnFilter] =
	 useState<ColumnFiltersState>([]);

  const [confirmedVotersSorting, setconfirmedVotersSorting] =
	 useState<SortingState>([]);

  const confirmedVotersTable = useReactTable({
	 data: !isLoading && confirmedVotrs!,
	 columns: confirmedVotersColumns,
	 getCoreRowModel: getCoreRowModel(),
	 getFilteredRowModel: getFilteredRowModel(),
	 getPaginationRowModel: getPaginationRowModel(),
	 onColumnFiltersChange: setconfirmedVotersColumnFilter,
	 onSortingChange: setconfirmedVotersSorting,
	 getSortedRowModel: getSortedRowModel(),
	 state: {
		columnFilters: confirmedVotersColumnFilter,
		sorting: confirmedVotersSorting
	 }
  });

  const clearConfirmedVotersFilters = () => {
	confirmedVotersTable.setColumnFilters([]);
  };

  return {
	 isError,
	 isFetching,
		isSuccess,
	 isLoading,
	 confirmedVotrs,
	 refetch,
	 confirmedVotersColumnFilter,
	 clearConfirmedVotersFilters,
	 confirmedVotersTable
  };
};
