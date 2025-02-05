'use client';
import { type NextPage } from 'next';

import { Container } from '@/app/_components/container';

import { EmptyTable } from '@/app/_components/empty-table';
import { ErrorTable } from '@/app/_components/error-table';
import { FetchTable } from '@/app/_components/fetch-table';
import { Table } from '@/app/_components/table';
import { Switch, Match } from '@/app/_components/switch';
import { LoadingTable } from '@/app/_components/loading-table';

import {useObserversTable} from '@/app/_hooks/tables/use-observer-table'

import {AddObserverForm} from '@/app/_components/forms/add-observer-form'
import { FilterObserversForm } from '@/app/_components/forms/filter-observer-form'

import { Retry } from '@/app/_components/retry';

const ObserversPage: NextPage = () => {
  const {
    isError,
    isFetching,
    isSuccess,
    isLoading,
    observers,
    refetch,
    observersTable,
    observersColumnFilter,
    clearObserversFilter
  } = useObserversTable();

  return (
    <Container>
          <div>
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
              <Match when={isSuccess && observers.length === 0}>
                <EmptyTable
                  Add={<AddObserverForm />}
                  retry={refetch}
                />
              </Match>
              <Match when={isSuccess && observers.length > 0}>
                <Table
                  Filter={FilterObserversForm}
                  Add={AddObserverForm}
                  Retry={<Retry refetch={refetch} />}
                  columnFilter={observersColumnFilter}
                  clearFilter={clearObserversFilter}
                  table={observersTable}
                />
              </Match>
            </Switch>
          </div>
    </Container>
  );
};

export default ObserversPage;
