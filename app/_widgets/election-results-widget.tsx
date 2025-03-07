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

import { useElectionResultsTable } from '@/app/_hooks/tables/use-election-results-table'
import { FilterConfirmedVotersForm } from '@/app/_components/forms/filter-confirmed-voter-form';

import { Retry } from '@/app/_components/custom/retry';

export const ElectionResultsWidget = () =>
{
	const dispatch = useDispatch()
	const mounted = useMounted()
  const {
	 isError,
	 isFetching,
	 isSuccess,
	 isLoading,
	 electionResults,
	 refetch,
	 electionResultsTable,
	 electionResultsColumnFilter,
	 clearElectionResultsFilter
  } = useElectionResultsTable();
	
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
				  <Match when={isSuccess && electionResults.length === 0}>
			  <EmptyTable
				  permission='view:addCandidate'
						retry={refetch}
					 />
				  </Match>
				  <Match when={isSuccess && electionResults.length > 0}>
			  <Table
				  permission='view:addCandidate'
						Filter={FilterConfirmedVotersForm}
						Retry={<Retry refetch={refetch} />}
						columnFilter={electionResultsColumnFilter}
						clearFilter={clearElectionResultsFilter}
						table={electionResultsTable}
					 />
				  </Match>
				</Switch>
  );
};