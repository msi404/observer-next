'use client';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentPage, selectPageSize, setTotalPages } from '@/app/_lib/features/paginationSlice';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type ColumnFiltersState,
  type SortingState
} from '@tanstack/react-table';

import {useDataEntryColumns} from '@/app/_hooks/columns/use-data-entery-columns'
import { useUsersQuery } from '@/app/_services/fetchApi';
import {useDataEntriesFilter} from '@/app/_hooks/filters/use-data-entries-filter'

export const useDataEntriesTable = () => {
  const dispatch = useDispatch();

  const currentPage = useSelector(selectCurrentPage);
  const pageSize = useSelector(selectPageSize);
  
  const { data: voters, isLoading, isError, isFetching, isSuccess, refetch } =
    useUsersQuery( `Role=100&PageNumber=${ currentPage }&PageSize=${ pageSize }` );
  
  const [ dataEntries, setDataEntries ] = useState( [] );
  
  const { dataEntriesColumns } = useDataEntryColumns();
    
  const [dataEntriesColumnFilter, setDataEntriesColumnFilter] = useState<ColumnFiltersState>([]);
  const [dataEntriesSorting, setDataEntriesSorting] = useState<SortingState>([]);

  const dataEntriesTable = useReactTable({
    data: dataEntries,
    columns: dataEntriesColumns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setDataEntriesColumnFilter,
    onSortingChange: setDataEntriesSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      columnFilters: dataEntriesColumnFilter,
      sorting: dataEntriesSorting,
    },
  } );

  // ✅ Move the hook here (outside the regular function)
  const { clearFilters: clearDataEntriesFilter } = useDataEntriesFilter(dataEntriesTable);
  
  useEffect( () =>
  {
    if ( !isLoading )
    {
      const dataEntriesExtracted = voters?.data?.items     
      setDataEntries( dataEntriesExtracted )
    }
  }, [ isLoading, voters, isFetching ] )
  
  useEffect(() => {
    if (!isLoading) {
      dispatch(setTotalPages(voters?.data?.totalPages));
    }
  }, [isLoading, voters, dispatch]);

  return {
    isError,
    isFetching,
    isSuccess,
    isLoading,
    dataEntries,
    refetch,
    dataEntriesColumnFilter,
    clearDataEntriesFilter,
	  dataEntriesTable,
  };
};
