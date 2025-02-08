'use client';
import { EmptyTable } from '@/app/_components/empty-table';
import { ErrorTable } from '@/app/_components/error-table';
import { FetchTable } from '@/app/_components/fetch-table';
import { Table } from '@/app/_components/table';
import { Switch, Match } from '@/app/_components/switch';
import { LoadingTable } from '@/app/_components/loading-table';

import {useProvinceAdminsTable} from '@/app/_hooks/tables/use-province-admins-table'

import { AddProvinceAdminForm } from '@/app/_components/forms/add-province-admin-form'
import {FilterProvinceAdminForm} from '@/app/_components/forms/filter-province-admin-form'
import { Retry } from '@/app/_components/retry';

export const ProvinceAdminsWidget = () => {
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
						Add={<AddProvinceAdminForm />}
						retry={refetch}
					 />
				  </Match>
				  <Match when={isSuccess && provinceAdmins.length > 0}>
					 <Table
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
