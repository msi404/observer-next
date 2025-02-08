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

import { useProvniceAdminsColumns } from '@/app/_hooks/columns/use-province-admins-columns'
import {useProvinceAdminsFilter} from '@/app/_hooks/filters/use-province-admins-filter'
import { useUsersQuery } from '@/app/_services/fetchApi'

export const useProvinceAdminsTable = () => {
  const dispatch = useDispatch();

  const currentPage = useSelector(selectCurrentPage);
  const pageSize = useSelector(selectPageSize);
  
  const { data: users, isLoading, isError, isFetching, isSuccess, refetch } =
    useUsersQuery( `Role=12&PageNumber=${ currentPage }&PageSize=${ pageSize }` );
  
  const [ provinceAdmins, setProvinceAdmins ] = useState( [] );
  
  const { provinceAdminsColumns } = useProvniceAdminsColumns();
    
  const [provinceAdminsColumnFilter, setProvinceAdminsColumnFilter] = useState<ColumnFiltersState>([]);
  const [provinceAdminsSorting, setProvinceAdminsSorting] = useState<SortingState>([]);

  const provinceAdminsTable = useReactTable({
    data: provinceAdmins,
    columns: provinceAdminsColumns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setProvinceAdminsColumnFilter,
    onSortingChange: setProvinceAdminsSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      columnFilters: provinceAdminsColumnFilter,
      sorting: provinceAdminsSorting,
    },
  } );

  // ✅ Move the hook here (outside the regular function)
  const { clearFilters: clearProvinceAdminsFilter } = useProvinceAdminsFilter(provinceAdminsTable);
  
  useEffect( () =>
  {
    if ( !isLoading )
    {
      const provinceAdminsExtracted = users?.data?.items     
      setProvinceAdmins( provinceAdminsExtracted )
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
    provinceAdmins,
    refetch,
    provinceAdminsColumnFilter,
    clearProvinceAdminsFilter,
	  provinceAdminsTable,
  };
};
