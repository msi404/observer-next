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

import { useCandidatesTable } from '@/app/_hooks/tables/use-candidates-table'

import { AddCandidateForm } from '@/app/_components/forms/add-candidate-form';
import {FilterCandidateForm} from '@/app/_components/forms/filter-candidate-form'
import { Retry } from '@/app/_components/retry';

export const CandidatesWidget = () =>
{
	const dispatch = useDispatch()
	const mounted = useMounted()
  const {
	 isError,
	 isFetching,
	 isSuccess,
	 isLoading,
	 candidates,
	 refetch,
	 candidatesTable,
	 candidatesColumnFilter,
	 clearCandidatesFilter
  } = useCandidatesTable();
	
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
				  <Match when={isSuccess && candidates.length === 0}>
			  <EmptyTable
				  permission='view:addCandidate'
						Add={<AddCandidateForm />}
						retry={refetch}
					 />
				  </Match>
				  <Match when={isSuccess && candidates.length > 0}>
			  <Table
				  permission='view:addCandidate'
						Filter={FilterCandidateForm}
						Add={AddCandidateForm}
						Retry={<Retry refetch={refetch} />}
						columnFilter={candidatesColumnFilter}
						clearFilter={clearCandidatesFilter}
						table={candidatesTable}
					 />
				  </Match>
				</Switch>
  );
};
