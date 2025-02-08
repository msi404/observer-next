'use client';
import { useTranslation } from 'react-i18next';
import { EmptyTable } from '@/app/_components/empty-table';
import { ErrorTable } from '@/app/_components/error-table';
import { FetchTable } from '@/app/_components/fetch-table';
import { Table } from '@/app/_components/table';
import { Switch, Match } from '@/app/_components/switch';
import { LoadingTable } from '@/app/_components/loading-table';

import { useVotersTable } from '@/app/_hooks/tables/use-voters-table';

import { AddConfirmVoterForm } from '@/app/_components/forms/add-confirm-voter-form';
import { FilterConfirmedVotersForm } from '@/app/_components/forms/filter-confirmed-voter-form';

import { Retry } from '@/app/_components/retry';

export const ConfirmedVotersWidget = () => {
  const {
    isError,
    isFetching,
    isSuccess,
    isLoading,
    confirmedVoters,
    refetch,
    confirmedVotersTable,
    confirmedVotersColumnFilter,
    clearConfirmedVotersFilter
  } = useVotersTable();

  const { t } = useTranslation();

  return (
            <Switch>
              <Match when={isError}>
                <ErrorTable retry={refetch} />
              </Match>
              <Match when={isLoading}>
                <LoadingTable />
              </Match>
              <Match when={isFetching}>
                <FetchTable />
              </Match>
              <Match when={isSuccess && confirmedVoters.length === 0}>
                <EmptyTable
                  Add={<AddConfirmVoterForm />}
                  retry={refetch}
                />
              </Match>
              <Match when={isSuccess && confirmedVoters.length > 0}>
                <Table
                  Filter={FilterConfirmedVotersForm}
                  Add={AddConfirmVoterForm}
                  Retry={<Retry refetch={refetch} />}
                  columnFilter={confirmedVotersColumnFilter}
                  clearFilter={clearConfirmedVotersFilter}
                  table={confirmedVotersTable}
                />
              </Match>
            </Switch>
  );
};