/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useEffect, useState, useCallback } from 'react';
// import { useSelector } from 'react-redux';
// import {
//   selectCurrentPage,
//   selectPageSize
// } from '@/app/_lib/features/paginationSlice';
import { type Table, ColumnFiltersState } from '@tanstack/react-table';
import { Filter } from 'lucide-react';
import {
  useLazyElectoralEntitiesQuery,
} from '@/app/_services/fetchApi';

interface Filter {
  id: string;
  value: string;
}

export const usePartiesRepresentersFilter = ( table: Table<any> ) =>
{
  const [electoralEntitiesCurrentPage, setElectoralEntitiesCurrentPage] =
  useState(1);
const [electoralEntitiessTotalPages, setElectoralEntitiesTotalPages] =
  useState(1);
const pageSize = 10; // Fixed page size

// const globalPageSize = useSelector(selectPageSize);
//   const globalCurrentPage = useSelector( selectCurrentPage );
  
  const updateFilter = (
    filters: Filter[],
    id: string,
    value: string
  ): Filter[] => {
    const existingFilter = filters.find((filter) => filter.id === id);
    if (existingFilter) {
      return filters.map((filter) =>
        filter.id === id ? { ...filter, value } : filter
      );
    }
    return [...filters, { id, value }];
  };

  const [electoralEntitiesSearch, setElectoralEntitiesSearch] = useState<
  { value: string; label: string }[]
    >( [] );
  
    const [
      fetchElectoralEntities,
      { data: lazyElectoralEntities, isFetching: isFetchingLazyElectoralEntities }
    ] = useLazyElectoralEntitiesQuery();

    // Fetch Initial
    useEffect(() => {
      fetchElectoralEntities(`PageNumber=${ electoralEntitiesCurrentPage }&PageSize=${ pageSize }`);
     }, [] );
  

  const [filters, setFilters] = useState<Filter[]>([]);
  const [open, setOpen] = useState(false);

  const applyFilters = useCallback(() => {
    table.setColumnFilters( filters as ColumnFiltersState );
    setOpen(false);
  }, [ table, filters ] );
  
  const clearFilters = () => {
    setFilters([]);                    // Clear filter state
    table.setColumnFilters([]);        // Clear filters in the table
  };

  // Update When Data Changes
  useEffect(() => {
    if (lazyElectoralEntities) {
      setElectoralEntitiesSearch((prev) => [
        ...prev,
        ...lazyElectoralEntities.items.map((electoralEntity: any) => ({
          value: electoralEntity.name,
          label: electoralEntity.name
        }))
      ]);
      setElectoralEntitiesTotalPages(lazyElectoralEntities.totalPages);
    }
  }, [ lazyElectoralEntities ] );
  
  // Scroll Event Handler for Infinite Scroll
const onElectoralEntitiesScrollEnd = () => {
  if (electoralEntitiesCurrentPage < electoralEntitiessTotalPages && !isFetchingLazyElectoralEntities) {
    setElectoralEntitiesCurrentPage((prev) => prev + 1);
    fetchElectoralEntities(`PageNumber=${ electoralEntitiesCurrentPage + 1}&PageSize=${ pageSize }`);
  }
};


  return {
    open,
    setOpen,
    electoralEntitiesSearch,
    onElectoralEntitiesScrollEnd,
    filters,
    updateFilter,
    setFilters,
    applyFilters,
    clearFilters
  };
};
