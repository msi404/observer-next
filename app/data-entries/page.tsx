'use client'
import { ColumnDef } from '@tanstack/react-table';
import {Filter} from 'lucide-react'

import { Container } from '@/app/_components/container';
import {DataTable} from '@/app/_components/data-table'


import {dataEntriesData} from '@/app/utils/faker'
 
type DataEntry = {
	name: string
	phoneNumber: string
	state: string
	entityName: string
}

type DataEntriesHeader = {
	name: string
	phoneNumber: string
	state: string
	entityName: string
}
 const dataEntries: DataEntry[] = dataEntriesData

const dataEntriesColumns: ColumnDef<DataEntriesHeader>[] = [
	{
		accessorKey: 'name',
		header: 'الاسم الكامل',
	},
	{
		accessorKey: 'phoneNumber',
		header: 'رقم الهاتف',
	},
	{
		accessorKey: 'entityName',
		header: 'اسم الكيان',
	},
	{
		accessorKey: 'state',
		header: 'الولاية',
	},
	{
		accessorKey: 'stateManger',
		header: 'مدير الولاية',
	},
]
const DataEntriesPage = () =>
{
	return (
		<Container>
					<DataTable
						searchPlaceholder='ابحث عن موظفين'
						searchTerm='name'
						primaryActionTitle='تصفية'
						primaryActionIcon={ <Filter /> }
						columns={ dataEntriesColumns }
						data={ dataEntries } />
		</Container>
	)
};

export default DataEntriesPage;