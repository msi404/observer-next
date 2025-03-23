'use client';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '@/app/_lib/features/authSlice';
import {
  selectCurrentPage,
  selectPageSize,
  setTotalPages,
  setCurrentPage
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

import { useCandidateColumns } from '@/app/_hooks/columns/use-candidate-columns';
import { useCandidatesFilter } from '@/app/_hooks/filters/use-candidates-filter';
import { useUsersQuery } from '@/app/_services/fetchApi';

export const useCandidatesTable = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const currentPage = useSelector(selectCurrentPage);
  const pageSize = useSelector(selectPageSize);
  const electoralEntityId = (
    user?.electoralEntity as unknown as ElectoralEntity
  )?.id;
  const electoralEntityIdQuery =
    electoralEntityId !== undefined
      ? `&ElectoralEntityId=${electoralEntityId}`
      : '';
  const {
    data: users,
    isLoading,
    isError,
    isFetching,
    isSuccess,
    refetch
  } = useUsersQuery(
    `Role=102&PageNumber=${currentPage}${electoralEntityIdQuery}&PageSize=${pageSize}`
  );

  const [candidates, setCandidates] = useState([]);

  const { candidatesColumns } = useCandidateColumns();

  const [candidatesColumnFilter, setCandidatesColumnFilter] =
    useState<ColumnFiltersState>([]);
  const [candidatesSorting, setCandidatesSorting] = useState<SortingState>([]);

  const candidatesTable = useReactTable({
    data: candidates,
    columns: candidatesColumns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    onColumnFiltersChange: setCandidatesColumnFilter,
    onSortingChange: setCandidatesSorting,
    getSortedRowModel: getSortedRowModel(),
    renderFallbackValue: <h1>لا يوجد</h1>,
    pageCount: users?.totalPages,
    state: {
      pagination: { pageIndex: currentPage, pageSize },
      columnFilters: candidatesColumnFilter,
      sorting: candidatesSorting
    },
    onPaginationChange: setCurrentPage,
  });

  // ✅ Move the hook here (outside the regular function)
  const { clearFilters: clearCandidatesFilter } =
    useCandidatesFilter(candidatesTable);

  useEffect(() => {
    if (!isLoading) {
      const candidatesExtracted = users?.data?.items;
      setCandidates(candidatesExtracted);
    }
  }, [isLoading, users, isFetching]);

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
    candidates,
    refetch,
    candidatesColumnFilter,
    clearCandidatesFilter,
    candidatesTable
  };
};
