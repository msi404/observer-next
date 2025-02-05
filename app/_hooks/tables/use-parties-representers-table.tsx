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

import { usePartiesRepresentersColumns } from '@/app/_hooks/columns/use-parties-representers-columns'
import {usePartiesRepresentersFilter} from '@/app/_hooks/filters/use-parties-representers-filter'
import { useUsersQuery } from '@/app/_services/fetchApi'

export const usePartiesRepresentersTable = () => {
  const dispatch = useDispatch();

  const currentPage = useSelector(selectCurrentPage);
  const pageSize = useSelector(selectPageSize);
  
  const { data: users, isLoading, isError, isFetching, isSuccess, refetch } =
    useUsersQuery( `Role=10&PageNumber=${ currentPage }&PageSize=${ pageSize }` );
  
  const [ partiesRepresenters, setPartiesRepresenters ] = useState( [] );
  
  const { partiesRepresentersColumns } = usePartiesRepresentersColumns();
    
  const [partiesRepresentersColumnFilter, setPartiesRepresentersColumnFilter] = useState<ColumnFiltersState>([]);
  const [partiesRepresenterssSorting, setPartiesRepresentersSorting] = useState<SortingState>([]);

  const partiesRepresentersTable = useReactTable({
    data: partiesRepresenters,
    columns: partiesRepresentersColumns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setPartiesRepresentersColumnFilter,
    onSortingChange: setPartiesRepresentersSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      columnFilters: partiesRepresentersColumnFilter,
      sorting: partiesRepresenterssSorting,
    },
  } );

  // ✅ Move the hook here (outside the regular function)
  const { clearFilters: clearPartiesRepresentersFilter } = usePartiesRepresentersFilter(partiesRepresentersTable);
  
  useEffect( () =>
  {
    if ( !isLoading )
    {
      const partiesRepresentersExtracted = users?.data?.items     
      setPartiesRepresenters( partiesRepresentersExtracted )
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
    partiesRepresenters,
    refetch,
    partiesRepresentersColumnFilter,
    clearPartiesRepresentersFilter,
	  partiesRepresentersTable,
  };
};
