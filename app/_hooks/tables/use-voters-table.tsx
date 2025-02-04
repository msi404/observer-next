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

import { useConfirmedVotersColumns } from '@/app/_hooks/columns/use-confirmed-voter-columns';
import {usePossibleVotersColumns} from '@/app/_hooks/columns/use-possible-voter-columns'
import { useVotersQuery } from '@/app/_services/fetchApi';
import {usePossibleVotersFilter} from '@/app/_hooks/filters/use-possible-voters-filter'
import { useConfirmedVotersFilter } from '@/app/_hooks/filters/use-confirmed-voters-filter';

export const useVotersTable = () => {
  const dispatch = useDispatch();

  const currentPage = useSelector(selectCurrentPage);
  const pageSize = useSelector(selectPageSize);
  
  const { data: voters, isLoading, isError, isFetching, isSuccess, refetch } =
    useVotersQuery( `PageNumber=${ currentPage }&PageSize=${ pageSize }` );
  
  const [ confirmedVoters, setConfirmedVoters ] = useState( [] );
  const [ possibleVoters, setPossibleVoters ] = useState( [] );
  
  const {possibleVotersColumns} = usePossibleVotersColumns()
  const { confirmedVotersColumns } = useConfirmedVotersColumns();
  
  const [possibleVotersColumnFilter, setPossibleVotersColumnFilter] = useState<ColumnFiltersState>([]);
  const [ possibleVotersSorting, setPossibleVotersSorting ] = useState<SortingState>( [] );
  
  const [confirmedVotersColumnFilter, setConfirmedVotersColumnFilter] = useState<ColumnFiltersState>([]);
  const [confirmedVotersSorting, setConfirmedVotersSorting] = useState<SortingState>([]);

  const possibleVotersTable = useReactTable({
    data: possibleVoters,
    columns: possibleVotersColumns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setPossibleVotersColumnFilter,
    onSortingChange: setPossibleVotersSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      columnFilters: possibleVotersColumnFilter,
      sorting: possibleVotersSorting,
    },
  } );

  const confirmedVotersTable = useReactTable({
    data: confirmedVoters,
    columns: confirmedVotersColumns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setConfirmedVotersColumnFilter,
    onSortingChange: setConfirmedVotersSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      columnFilters: confirmedVotersColumnFilter,
      sorting: confirmedVotersSorting,
    },
  } );

  // ✅ Move the hook here (outside the regular function)
  const { clearFilters: clearConfirmedVotersFilter } = useConfirmedVotersFilter(confirmedVotersTable);
  const { clearFilters: clearPossibleVotersFilter } = usePossibleVotersFilter( possibleVotersTable );
  
  useEffect( () =>
  {
    if ( !isLoading )
    {
      const confirmedVotersFiltered = voters?.data?.items.filter((voter: any) => voter.state === 2)
      const possibleVotersFiltered = voters?.data?.items.filter( ( voter: any ) => voter.state === 0 )
      
      setPossibleVoters( possibleVotersFiltered )
      setConfirmedVoters( confirmedVotersFiltered )
    }
  }, [ isLoading, voters, isFetching ] )
  
  useEffect(() => {
    if (!isLoading) {
      dispatch(setTotalPages(voters?.data?.totalPages));
    }
  }, [isLoading, voters, dispatch]);

  return {
    isError,
    isFetching,
    isSuccess,
    isLoading,
    confirmedVoters,
    possibleVoters,
    refetch,
    possibleVotersColumnFilter,
    clearPossibleVotersFilter,
    possibleVotersTable,
    confirmedVotersColumnFilter,
    clearConfirmedVotersFilter,
	  confirmedVotersTable,
  };
};
