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

import { usePartiesRepresentersTable } from '@/app/_hooks/tables/use-parties-representers-table'
import {AddPartiesRepresentersForm} from '@/app/_components/forms/add-parties-representers-form'
import {FilterPartiesRepresentersForm} from '@/app/_components/forms/filter-parties-representers-form'
import { Retry } from '@/app/_components/retry';

export const PartiesRepresentersWidget = () =>
{
	const dispatch = useDispatch()
	const mounted = useMounted()
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
				  <Match when={isSuccess && partiesRepresenters.length === 0}>
					 <EmptyTable
					 permission='view:addElectoralEntityAdmin'
						Add={<AddPartiesRepresentersForm />}
						retry={refetch}
					 />
				  </Match>
				  <Match when={isSuccess && partiesRepresenters.length > 0}>
					 <Table
					 permission='view:addElectoralEntityAdmin'
						Filter={FilterPartiesRepresentersForm}
						Add={AddPartiesRepresentersForm}
						Retry={<Retry refetch={refetch} />}
						columnFilter={partiesRepresentersColumnFilter}
						clearFilter={clearPartiesRepresentersFilter}
						table={partiesRepresentersTable}
					 />
				  </Match>
				</Switch>
  );
};