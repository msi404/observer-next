'use client';
import { useEffect, useState } from 'react';
import { skipToken } from '@reduxjs/toolkit/query/react';
import { useSelector, useDispatch } from 'react-redux';
import { hasPermission } from '@/app/_auth/auth-rbac';
import { selectUser } from '@/app/_lib/features/authSlice';
import {
  selectCurrentPage,
  selectPageSize,
  setTotalPages,
} from '@/app/_lib/features/paginationSlice';
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
import { useConfirmedVotersFilter } from '@/app/_hooks/filters/use-confirmed-voters-filter';

export const useConfirmedVotersTable = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const currentPage = useSelector(selectCurrentPage);
  const pageSize = useSelector( selectPageSize );
  const electoralEntityId = (user?.electoralEntity as unknown as ElectoralEntity)?.id
  const electoralEntityIdQuery = electoralEntityId !== undefined ? `&ElectoralEntityId=${electoralEntityId}` : '';
  const fetchConfirmedVotersQuery = hasPermission(user, 'view:voters')
    ? `State=2&PageNumber=${currentPage}${electoralEntityIdQuery}&PageSize=${pageSize}`
    : skipToken;
  
  const {
    data: confirmedVoters,
    isLoading: isLoadingConfirmedVoters,
    isError: isErrorConfirmedVoters,
    isFetching: isFetchingConfirmedVoter,
    isSuccess: isSuccessConfirmedVoter,
    refetch: refetchConfirmedVoters
  } = useVotersQuery(fetchConfirmedVotersQuery ?? skipToken);
  const { confirmedVotersColumns } = useConfirmedVotersColumns();

  const [confirmedVotersColumnFilter, setConfirmedVotersColumnFilter] =
    useState<ColumnFiltersState>([]);
  const [confirmedVotersSorting, setConfirmedVotersSorting] =
    useState<SortingState>([]);

  const confirmedVotersTable = useReactTable({
    data: confirmedVoters?.items,
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

  // ✅ Move the hook here (outside the regular function)
  const { clearFilters: clearConfirmedVotersFilter } =
    useConfirmedVotersFilter(confirmedVotersTable);

  useEffect(() => {
    if (!isLoadingConfirmedVoters) {
      dispatch(setTotalPages(confirmedVoters?.totalPages));
    }
  }, [ isLoadingConfirmedVoters, confirmedVoters, dispatch ] );
  return {
    isErrorConfirmedVoters,
    isFetchingConfirmedVoter,
    isSuccessConfirmedVoter,
    isLoadingConfirmedVoters,
    confirmedVoters,
    refetchConfirmedVoters,
    confirmedVotersColumnFilter,
    clearConfirmedVotersFilter,
    confirmedVotersTable
  };
};
