'use client';
import {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import { useMounted } from '@mantine/hooks'
import {resetPaginationState} from '@/app/_lib/features/paginationSlice'
import { EmptyTable } from '@/app/_components/empty-table';
import { ErrorTable } from '@/app/_components/error-table';
import { FetchTable } from '@/app/_components/fetch-table';
import { Table } from '@/app/_components/custom/table';
import { Switch, Match } from '@/app/_components/utils/switch';
import { LoadingTable } from '@/app/_components/loading-table';

import { usePossibleVotersTable } from '@/app/_hooks/tables/use-possible-voters-table';

import { AddPossibleVoterForm } from '@/app/_components/forms/add-possible-voter-form';
import { FilterPossibleVotersForm } from '@/app/_components/forms/filter-possible-voter-form';

import { Retry } from '@/app/_components/custom/retry';

export const PossibleVotersWidget = () =>
{
  const dispatch = useDispatch()
  const mounted = useMounted()
  const {
    isErrorPossibleVoters,
    isFetchingPossibleVoter,
    isSuccessPossibleVoter,
    isLoadingPossibleVoters,
    possibleVoters,
    refetchPossibleVoters,
    possibleVotersTable,
    possibleVotersColumnFilter,
    clearPossibleVotersFilter
  } = usePossibleVotersTable();

  useEffect( () =>
    {
      if ( mounted )
      {
        dispatch(resetPaginationState())
      }
    }, [mounted])

  return (
    <Switch>
      <Match when={isLoadingPossibleVoters}>
        <LoadingTable />
      </Match>
      <Match when={isErrorPossibleVoters}>
        <ErrorTable retry={refetchPossibleVoters} />
      </Match>
      <Match when={isFetchingPossibleVoter}>
        <FetchTable />
      </Match>
      <Match when={isSuccessPossibleVoter && possibleVoters?.items.length === 0}>
        <EmptyTable permission='view:addVoter' Add={<AddPossibleVoterForm />} retry={refetchPossibleVoters} />
      </Match>
      <Match when={isSuccessPossibleVoter && possibleVoters?.items.length > 0}>
        <Table
          permission='view:addVoter'
          Retry={<Retry refetch={refetchPossibleVoters} />}
          Filter={FilterPossibleVotersForm}
          Add={AddPossibleVoterForm}
          columnFilter={possibleVotersColumnFilter}
          clearFilter={clearPossibleVotersFilter}
          table={possibleVotersTable}
        />
      </Match>
    </Switch>
  );
};
