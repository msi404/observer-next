'use client';
import { type NextPage } from 'next';

import { Container } from '@/app/_components/container';

import { EmptyTable } from '@/app/_components/empty-table';
import { ErrorTable } from '@/app/_components/error-table';
import { FetchTable } from '@/app/_components/fetch-table';
import { Table } from '@/app/_components/table';
import { Switch, Match } from '@/app/_components/switch';
import { LoadingTable } from '@/app/_components/loading-table';

import { usePartiesRepresentersTable } from '@/app/_hooks/tables/use-parties-representers-table'
import {AddPartiesRepresentersForm} from '@/app/_components/forms/add-parties-representers-form'
import {FilterPartiesRepresentersForm} from '@/app/_components/forms/filter-parties-representers-form'
import { Retry } from '@/app/_components/retry';

const PartiesRepresentersPage: NextPage = () => {
  const {
    isError,
    isFetching,
    isSuccess,
    isLoading,
    partiesRepresenters,
    refetch,
    partiesRepresentersTable,
    partiesRepresentersColumnFilter,
    clearPartiesRepresentersFilter
  } = usePartiesRepresentersTable();

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
              <Match when={isSuccess && partiesRepresenters.length === 0}>
                <EmptyTable
                  Add={<AddPartiesRepresentersForm />}
                  retry={refetch}
                />
              </Match>
              <Match when={isSuccess && partiesRepresenters.length > 0}>
                <Table
                  Filter={FilterPartiesRepresentersForm}
                  Add={AddPartiesRepresentersForm}
                  Retry={<Retry refetch={refetch} />}
                  columnFilter={partiesRepresentersColumnFilter}
                  clearFilter={clearPartiesRepresentersFilter}
                  table={partiesRepresentersTable}
                />
              </Match>
            </Switch>
          </div>
    </Container>
  );
};

export default PartiesRepresentersPage;