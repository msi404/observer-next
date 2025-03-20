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

import {useElectionsResultsColumns} from '@/app/_hooks/columns/use-election-results-columns'
import {useElectionResultsFilter} from '@/app/_hooks/filters/use-election-results-filter'
import { useUsersQuery } from '@/app/_services/fetchApi'

export const useElectionResultsTable = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser)
  const currentPage = useSelector(selectCurrentPage);
  const pageSize = useSelector(selectPageSize);
  const electoralEntityId = (user?.electoralEntity as unknown as ElectoralEntity)?.id
  const electoralEntityIdQuery = electoralEntityId !== undefined ? `&ElectoralEntityId=${electoralEntityId}` : '';
  const { data: users, isLoading, isError, isFetching, isSuccess, refetch } =
    useUsersQuery( `Role=102&PageNumber=${ currentPage }${electoralEntityIdQuery}&PageSize=${ pageSize }` );
  
  const [ electionResults, setElectionResults ] = useState( [] );
  
  const { electionResultsColumns } = useElectionsResultsColumns();
    
  const [electionResultsColumnFilter, setElectionResultsColumnFilter] = useState<ColumnFiltersState>([]);
  const [electionResultsSorting, setElectionResultsSorting] = useState<SortingState>([]);

  const electionResultsTable = useReactTable({
    data: electionResults,
    columns: electionResultsColumns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setElectionResultsColumnFilter,
    onSortingChange: setElectionResultsSorting,
    getSortedRowModel: getSortedRowModel(),
    renderFallbackValue: <h1>لا يوجد</h1>,
    state: {
      columnFilters: electionResultsColumnFilter,
      sorting: electionResultsSorting,
    },
  } );

  // ✅ Move the hook here (outside the regular function)
  const { clearFilters: clearElectionResultsFilter } = useElectionResultsFilter(electionResultsTable);
  
  useEffect( () =>
  {
    if ( !isLoading )
    {
      const electionResultsExtracted = users?.data?.items     
      setElectionResults( electionResultsExtracted )
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
    electionResults,
    refetch,
    electionResultsColumnFilter,
    clearElectionResultsFilter,
	  electionResultsTable,
  };
};
