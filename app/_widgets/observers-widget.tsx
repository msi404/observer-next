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

import {useObserversTable} from '@/app/_hooks/tables/use-observer-table'

import {AddObserverForm} from '@/app/_components/forms/add-observer-form'
import { FilterObserversForm } from '@/app/_components/forms/filter-observer-form'

import { Retry } from '@/app/_components/custom/retry';

export const ObserversWidget = () =>
{
	const dispatch = useDispatch()
	const mounted = useMounted()
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
				  <Match when={isSuccess && observers.length === 0}>
			  <EmptyTable
				  permission='view:addObserver'
						Add={<AddObserverForm />}
						retry={refetch}
					 />
				  </Match>
				  <Match when={isSuccess && observers.length > 0}>
			  <Table
				  permission='view:addObserver'
						Filter={FilterObserversForm}
						Add={AddObserverForm}
						Retry={<Retry refetch={refetch} />}
						columnFilter={observersColumnFilter}
						clearFilter={clearObserversFilter}
						table={observersTable}
					 />
				  </Match>
				</Switch>
  );
};