'use client';
import { useTranslation } from 'react-i18next';
import { EmptyTable } from '@/app/_components/empty-table';
import { ErrorTable } from '@/app/_components/error-table';
import { FetchTable } from '@/app/_components/fetch-table';
import { Table } from '@/app/_components/table';
import { Switch, Match } from '@/app/_components/switch';
import { LoadingTable } from '@/app/_components/loading-table';

import { useVotersTable } from '@/app/_hooks/tables/use-voters-table';

import { AddPossibleVoterForm } from '@/app/_components/forms/add-possible-voter-form';
import { FilterPossibleVotersForm } from '@/app/_components/forms/filter-possible-voter-form';

import { Retry } from '@/app/_components/retry';

export const PossibleVotersWidget = () => {
  const {
    isError,
    isFetching,
    isSuccess,
    isLoading,
    possibleVoters,
    refetch,
    possibleVotersTable,
    possibleVotersColumnFilter,
    clearPossibleVotersFilter
  } = useVotersTable();

  const { t } = useTranslation();

  return (
    <Switch>
      <Match when={isLoading}>
        <LoadingTable />
      </Match>
      <Match when={isError}>
        <ErrorTable retry={refetch} />
      </Match>
      <Match when={isFetching}>
        <FetchTable />
      </Match>
      <Match when={isSuccess && possibleVoters.length === 0}>
        <EmptyTable Add={<AddPossibleVoterForm />} retry={refetch} />
      </Match>
      <Match when={isSuccess && possibleVoters.length > 0}>
        <Table
          Retry={<Retry refetch={refetch} />}
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
