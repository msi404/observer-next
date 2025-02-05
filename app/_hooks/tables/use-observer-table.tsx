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

import {useObserverColumns} from '@/app/_hooks/columns/use-observer-columns'
import {useObserversFilter} from '@/app/_hooks/filters/use-observers-filter'
import { useUsersQuery } from '@/app/_services/fetchApi';

export const useObserversTable = () => {
  const dispatch = useDispatch();

  const currentPage = useSelector(selectCurrentPage);
  const pageSize = useSelector(selectPageSize);
  
  const { data: users, isLoading, isError, isFetching, isSuccess, refetch } =
    useUsersQuery( `Role=104&PageNumber=${ currentPage }&PageSize=${ pageSize }` );
  
  const [ observers, setObservers ] = useState( [] );
  
  const { observersColumns } = useObserverColumns();
    
  const [observersColumnFilter, setObserversColumnFilter] = useState<ColumnFiltersState>([]);
  const [observersSorting, setObserversSorting] = useState<SortingState>([]);

  const observersTable = useReactTable({
    data: observers,
    columns: observersColumns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setObserversColumnFilter,
    onSortingChange: setObserversSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      columnFilters: observersColumnFilter,
      sorting: observersSorting,
    },
  } );

  // ✅ Move the hook here (outside the regular function)
  const { clearFilters: clearObserversFilter } = useObserversFilter(observersTable);
  
  useEffect( () =>
  {
    if ( !isLoading )
    {
      const observersExtracted = users?.data?.items     
      setObservers( observersExtracted )
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
    observers,
    refetch,
    observersColumnFilter,
    clearObserversFilter,
	  observersTable,
  };
};
