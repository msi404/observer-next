'use client'
import { ColumnDef } from '@tanstack/react-table';
import {Filter, Plus} from 'lucide-react'

import { Container } from '@/app/_components/container';
import {DataTable} from '@/app/_components/data-table'


import {stateManagersData} from '@/app/utils/faker'
 
type StateMangers = {
	name: string
	phoneNumber: string
	state: string
	entityName: string
}

type StateMangersHeader = {
	name: string
	phoneNumber: string
	state: string
	entityName: string
}
 const stateMangers: StateMangers[] = stateManagersData

const stateMangersColumns: ColumnDef<StateMangersHeader>[] = [
	{
		accessorKey: 'name',
		header: 'الاسم',
	},
	{
		accessorKey: 'phoneNumber',
		header: 'رقم الهاتف',
	},
	{
		accessorKey: 'state',
		header: 'الولاية',
	},
	{
		accessorKey: 'entityName',
		header: 'الكيان',
	},
]
const StateMangersPage = () =>
{
	return (
		<Container>
					<DataTable
						searchPlaceholder='ابحث عن مدير الولاية'
						searchTerm='name'
						primaryActionTitle='تصفية'
				primaryActionIcon={ <Filter /> }
				secondaryActionTitle='اضافة'
				secondaryActionIcon={ <Plus /> }
						columns={ stateMangersColumns }
						data={ stateMangers } />
		</Container>
	)
};

export default StateMangersPage;