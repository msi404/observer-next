'use client';
import {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import { useMounted } from '@mantine/hooks'
import {resetPaginationState} from '@/app/_lib/features/paginationSlice'
import { EmptyTable } from '@/app/_components/empty-table';
import { ErrorTable } from '@/app/_components/error-table';
import { FetchTable } from '@/app/_components/fetch-table';
import { Table } from '@/app/_components/table';
import { Switch, Match } from '@/app/_components/switch';
import { LoadingTable } from '@/app/_components/loading-table';

import {useConfirmedVotersTable} from '@/app/_hooks/tables/use-confirmed-voters-table'
import { AddConfirmVoterForm } from '@/app/_components/forms/add-confirm-voter-form';
import { FilterConfirmedVotersForm } from '@/app/_components/forms/filter-confirmed-voter-form';

import { Retry } from '@/app/_components/retry';

export const ConfirmedVotersWidget = () =>
{
  const dispatch = useDispatch()
  const mounted = useMounted()
  const {
    isErrorConfirmedVoters,
    isFetchingConfirmedVoter,
    isSuccessConfirmedVoter,
    isLoadingConfirmedVoters,
    confirmedVoters,
    refetchConfirmedVoters,
    confirmedVotersTable,
    confirmedVotersColumnFilter,
    clearConfirmedVotersFilter
  } = useConfirmedVotersTable();

  useEffect( () =>
  {
    if ( mounted )
    {
      dispatch(resetPaginationState())
    }
  }, [mounted])

  return (
            <Switch>
              <Match when={isErrorConfirmedVoters}>
                <ErrorTable retry={refetchConfirmedVoters} />
              </Match>
              <Match when={isLoadingConfirmedVoters}>
                <LoadingTable />
              </Match>
              <Match when={isFetchingConfirmedVoter}>
                <FetchTable />
              </Match>
              <Match when={isSuccessConfirmedVoter && confirmedVoters?.items.length === 0}>
        <EmptyTable
          permission='view:addVoter'
                  Add={<AddConfirmVoterForm />}
                  retry={refetchConfirmedVoters}
                />
              </Match>
              <Match when={isSuccessConfirmedVoter && confirmedVoters?.items.length > 0}>
        <Table
          permission='view:addVoter'
                  Filter={FilterConfirmedVotersForm}
                  Add={AddConfirmVoterForm}
                  Retry={<Retry refetch={refetchConfirmedVoters} />}
                  columnFilter={confirmedVotersColumnFilter}
                  clearFilter={clearConfirmedVotersFilter}
                  table={confirmedVotersTable}
                />
              </Match>
            </Switch>
  );
};