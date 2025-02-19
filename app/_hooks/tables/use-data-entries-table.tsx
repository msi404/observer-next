'use client';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '@/app/_lib/features/authSlice';
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
import { useDataEntriesFilter } from '@/app/_hooks/filters/use-data-entries-filter'
import { useUsersQuery } from '@/app/_services/fetchApi'

export const useDataEntriesTable = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser)
  const currentPage = useSelector(selectCurrentPage);
  const pageSize = useSelector(selectPageSize);
  const electoralEntityId = (user?.electoralEntity as unknown as ElectoralEntity)?.id
  const electoralEntityIdQuery = electoralEntityId !== undefined ? `&ElectoralEntityId=${electoralEntityId}` : '';
  const { data: users, isLoading, isError, isFetching, isSuccess, refetch } =
    useUsersQuery( `Role=100&PageNumber=${ currentPage }${electoralEntityIdQuery}&PageSize=${ pageSize }` );
  
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
      const dataEntriesExtracted = users?.data?.items     
      setDataEntries( dataEntriesExtracted )
    }
  }, [ isLoading, users, isFetching ] )
  
  useEffect(() => {
    if (!isLoading) {
      dispatch(setTotalPages(users?.data?.totalPages));
    }
  }, [isLoading, users, dispatch]);

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
