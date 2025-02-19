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

import { usePossibleVotersColumns } from '@/app/_hooks/columns/use-possible-voter-columns';
import { useVotersQuery } from '@/app/_services/fetchApi';
import { usePossibleVotersFilter } from '@/app/_hooks/filters/use-possible-voters-filter';

export const usePossibleVotersTable = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const currentPage = useSelector(selectCurrentPage);
  const pageSize = useSelector( selectPageSize );
  const electoralEntityId = (user?.electoralEntity as unknown as ElectoralEntity)?.id
  const electoralEntityIdQuery = electoralEntityId !== undefined ? `&ElectoralEntityId=${electoralEntityId}` : '';
  const fetchPossibleVotersQuery = hasPermission(user, 'view:voters')
    ? `State=0&PageNumber=${currentPage}${electoralEntityIdQuery}&PageSize=${pageSize}`
    : skipToken;
  
  const {
    data: possibleVoters,
    isLoading: isLoadingPossibleVoters,
    isError: isErrorPossibleVoters,
    isFetching: isFetchingPossibleVoter,
    isSuccess: isSuccessPossibleVoter,
    refetch: refetchPossibleVoters
  } = useVotersQuery(fetchPossibleVotersQuery ?? skipToken);

  const { possibleVotersColumns } = usePossibleVotersColumns();

  const [possibleVotersColumnFilter, setPossibleVotersColumnFilter] =
    useState<ColumnFiltersState>([]);
  const [possibleVotersSorting, setPossibleVotersSorting] =
    useState<SortingState>([]);

  const possibleVotersTable = useReactTable({
    data: possibleVoters?.items,
    columns: possibleVotersColumns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setPossibleVotersColumnFilter,
    onSortingChange: setPossibleVotersSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      columnFilters: possibleVotersColumnFilter,
      sorting: possibleVotersSorting
    }
  });


  // ✅ Move the hook here (outside the regular function)
  const { clearFilters: clearPossibleVotersFilter } =
    usePossibleVotersFilter(possibleVotersTable);
  useEffect(() => {
    if (!isLoadingPossibleVoters) {
      dispatch(setTotalPages(possibleVoters?.totalPages));
    }
  }, [isLoadingPossibleVoters, possibleVoters, dispatch]);

  return {
    isErrorPossibleVoters,
    isFetchingPossibleVoter,
    isSuccessPossibleVoter,
    isLoadingPossibleVoters,
    possibleVoters,
    refetchPossibleVoters,
    possibleVotersColumnFilter,
    clearPossibleVotersFilter,
    possibleVotersTable,
  };
};
