'use client';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {selectCurrentPage, selectPageSize, setTotalPages} from '@/app/_lib/features/paginationSlice'
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type ColumnFiltersState,
  type SortingState
} from '@tanstack/react-table';
import { useConfirmedVotersColumns } from '@/app/_hooks/columns/use-confirmed-voter-columns';
import { useVotersQuery } from '@/app/_services/fetchApi';

export const useVotersTable = () =>
{
	const dispatch = useDispatch()
	const currentPage = useSelector( selectCurrentPage )
	const pageSize = useSelector(selectPageSize)
  const { data: voters, isLoading ,isError, isFetching, isSuccess,refetch } =
	  useVotersQuery( `PageNumber=${ currentPage }&PageSize=${ pageSize }` );
	
  const { confirmedVotersColumns } = useConfirmedVotersColumns();

  const [confirmedVotersColumnFilter, setconfirmedVotersColumnFilter] =
	 useState<ColumnFiltersState>([]);

  const [confirmedVotersSorting, setconfirmedVotersSorting] =
	 useState<SortingState>([]);

  const confirmedVotersTable = useReactTable({
	 data: !isLoading && voters?.data?.items!,
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
	
	useEffect( () =>
	{
		if ( !isLoading )
		{
			dispatch(setTotalPages(voters?.data?.totalPages))
		}
	}, [isLoading, voters])

  return {
	 isError,
	 isFetching,
	isSuccess,
	 isLoading,
	 voters,
	 refetch,
	 confirmedVotersColumnFilter,
	 clearConfirmedVotersFilters,
	 confirmedVotersTable
  };
};
