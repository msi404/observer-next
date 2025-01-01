'use client'
import Image from 'next/image';
import { ColumnDef } from '@tanstack/react-table';
import {Filter} from 'lucide-react'

import { Container } from '@/app/_components/container';
import {DataTable} from '@/app/_components/data-table'


import { observersData } from '@/app/utils/faker'
import Placeholder from '@/app/_assets/images/placeholder.png'
 
type Observer = {
	photo: string
	name: string
	phoneNumber: string
	gender: string
	dataEntry: string
	state: string
	pollingCenter: string
	stationNumber: number
}

type ObserversHeader = {
	photo: string
	name: string
	phoneNumber: string
	gender: string
	dataEntry: string
	state: string
	pollingCenter: string
	stationNumber: number
}
 const observers: Observer[] = observersData

const observerColumns: ColumnDef<ObserversHeader>[] = [
	{
		accessorKey: 'photo',
		header: 'صورة المراقب',
		cell: ( { row } ) =>
			{
				const photoUrl = row.getValue( 'photo' );
				return <Image
					placeholder='blur'
					blurDataURL={ Placeholder.blurDataURL }
					width={ 48 }
					height={ 48 }
					src={ photoUrl as string }
					alt='صورة الشخصية للمرشح'
					className='w-12 h-12 rounded-full' />;
			}
	},
	{
		accessorKey: 'name',
		header: 'الاسم الكامل',
	},
	{
		accessorKey: 'phoneNumber',
		header: 'رقم الهاتف',
	},
	{
		accessorKey: 'gender',
		header: 'الجنس',
	},
	{
		accessorKey: 'dataEntry',
		header: 'مدخل البيانات',
	},
	{
		accessorKey: 'state',
		header: 'الولاية',
	},
	{
		accessorKey: 'pollingCenter',
		header: 'مركز الاقتراع',
	},
	{
		accessorKey: 'stationNumber',
		header: 'رقم المحطة',
	}
]
const ObserversPage = () =>
{
	return (
		<Container>
					<DataTable
						searchPlaceholder='ابحث عن مراقبين'
						searchTerm='name'
						primaryActionTitle='تصفية'
						primaryActionIcon={ <Filter /> }
						columns={ observerColumns }
						data={ observers } />
		</Container>
	)
};

export default ObserversPage;