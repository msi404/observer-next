/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useEffect, useState, useCallback } from 'react';
import { type Table, ColumnFiltersState } from '@tanstack/react-table';
import { Filter } from 'lucide-react';
import {
  useUsersQuery,
  useProvincesQuery,
  usePollingCentersQuery
} from '@/app/_services/fetchApi';

interface Filter {
  id: string;
  value: string;
}

export const usePossibleVotersFilter = ( table: Table<any> ) =>
{
  
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
  
  const { data: pollingCenters, isLoading: isLoadingPollingCenters } =
    usePollingCentersQuery('');
  const { data: provinces, isLoading: isLoadingProvinces } =
    useProvincesQuery('');
  const { data: users, isLoading: isLoadingUsers } = useUsersQuery('Role=102');

  const [governoratesSearch, setGovernoratesSearch] = useState<
    { label: string; value: string }[]
  >([]);
  const [usersSearch, setUsersSearch] = useState<
    { value: string; label: string }[]
  >([]);
  const [pollingCentersSearch, setPollingCentersSearch] = useState<
    { value: string; label: string }[]
  >([]);

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

  useEffect(() => {
    if (!isLoadingProvinces) {
      const governorates = provinces?.data.items.map(
        (province: { name: string }) => ({
          label: province.name,
          value: province.name
        })
      );
      setGovernoratesSearch(governorates);
    }
  }, [provinces, isLoadingProvinces]);

  useEffect(() => {
    if (!isLoadingUsers) {
      const candidates = users?.data.items.map((user: { name: string }) => ({
        label: user.name,
        value: user.name
      }));
      setUsersSearch(candidates);
    }
  }, [users, isLoadingUsers]);

  useEffect(() => {
    if (!isLoadingPollingCenters) {
      const centers = pollingCenters?.items.map(
        (center: { name: string }) => ({
          label: center.name,
          value: center.name
        })
      );
      setPollingCentersSearch(centers);
    }
  }, [pollingCenters, isLoadingPollingCenters]);

  return {
    open,
    setOpen,
    governoratesSearch,
    pollingCentersSearch,
    usersSearch,
    filters,
    updateFilter,
    setFilters,
    applyFilters,
    clearFilters
  };
};
