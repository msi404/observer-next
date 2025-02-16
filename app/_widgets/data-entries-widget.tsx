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

import { useDataEntriesTable } from '@/app/_hooks/tables/use-data-entries-table'

import { AddDataEntryForm } from '@/app/_components/forms/add-data-entry-form';
import {FilterDataEntriesForm} from '@/app/_components/forms/filter-data-entry-form'

import { Retry } from '@/app/_components/retry';

export const DataEntriesWidget = () =>
{
	const dispatch = useDispatch()
	const mounted = useMounted()
  const {
	 isError,
	 isFetching,
	 isSuccess,
	 isLoading,
	 dataEntries,
	 refetch,
	 dataEntriesTable,
	 dataEntriesColumnFilter,
	 clearDataEntriesFilter
  } = useDataEntriesTable();
	
  useEffect( () =>
	{
	  if ( mounted )
	  {
		 dispatch(resetPaginationState())
	  }
	}, [mounted])

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
				  <Match when={isSuccess && dataEntries.length === 0}>
					 <EmptyTable
						Add={<AddDataEntryForm />}
						retry={refetch}
					 />
				  </Match>
				  <Match when={isSuccess && dataEntries.length > 0}>
					 <Table
						Filter={FilterDataEntriesForm}
						Add={AddDataEntryForm}
						Retry={<Retry refetch={refetch} />}
						columnFilter={dataEntriesColumnFilter}
						clearFilter={clearDataEntriesFilter}
						table={dataEntriesTable}
					 />
				  </Match>
				</Switch>
  );
};