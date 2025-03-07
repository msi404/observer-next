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

import {useProvinceAdminsTable} from '@/app/_hooks/tables/use-province-admins-table'

import { AddProvinceAdminForm } from '@/app/_components/forms/add-province-admin-form'
import {FilterProvinceAdminForm} from '@/app/_components/forms/filter-province-admin-form'
import { Retry } from '@/app/_components/custom/retry';

export const ProvinceAdminsWidget = () =>
{
	const dispatch = useDispatch()
	const mounted = useMounted()
  const {
	 isError,
	 isFetching,
	 isSuccess,
	 isLoading,
	 provinceAdmins,
	 refetch,
	 provinceAdminsTable,
	 provinceAdminsColumnFilter,
	 clearProvinceAdminsFilter
  } = useProvinceAdminsTable();
	
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
				  <Match when={isSuccess && provinceAdmins.length === 0}>
			  <EmptyTable
				  permission='view:addProvinceAdmin'
						Add={<AddProvinceAdminForm />}
						retry={refetch}
					 />
				  </Match>
				  <Match when={isSuccess && provinceAdmins.length > 0}>
			  <Table
				  permission='view:addProvinceAdmin'
						Filter={FilterProvinceAdminForm}
						Add={AddProvinceAdminForm}
						Retry={<Retry refetch={refetch} />}
						columnFilter={provinceAdminsColumnFilter}
						clearFilter={clearProvinceAdminsFilter}
						table={provinceAdminsTable}
					 />
				  </Match>
				</Switch>
  );
};
