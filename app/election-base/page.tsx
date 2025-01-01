'use client'
import Image from 'next/image'
import { ColumnDef } from '@tanstack/react-table';
import {Filter} from 'lucide-react'

import { Container } from '@/app/_components/container';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/_components/ui/tabs'
import {DataTable} from '@/app/_components/data-table'


import { possibleVotersData, confirmedVotersData } from '@/app/utils/faker'
import Placeholder from '@/app/_assets/images/placeholder.png'
 
type ConfirmedVoters = {
	name: string
	address: string
	state: string
	pollingCenter: string
	dataEntry: string
	candidate: string
	candidateNumber: number
	cardPhoto: string
}

type ConfirmedVotersHeader = {
	name: string
	address: string
	state: string
	pollingCenter: string
	dataEntry: string
	candidate: string
	candidateNumber: number
	cardPhoto: string
}
 
type PossibleVoters = {
	name: string
	address: string
	state: string
	pollingCenter: string
	dataEntry: string
	candidate: string
}

type PossibleVotersHeader = {
	name: string
	address: string
	state: string
	pollingCenter: string
	dataEntry: string
	candidate: string
}

const possibleVoters: PossibleVoters[] = possibleVotersData

const possibleVotersColumns: ColumnDef<PossibleVotersHeader>[] = [
	{
		accessorKey: 'name',
		header: 'الاسم',
	},
	{
		accessorKey: 'address',
		header: 'العنوان',
	},
	{
		accessorKey: 'state',
		header: 'المحافظة',
	},
	{
		accessorKey: 'pollingCenter',
		header: 'مركز الاقتراع',
	},
	{
		accessorKey: 'dataEntry',
		header: 'اسم مدخل البيانات',
	},
	{
		accessorKey: 'candidate',
		header: 'اسم المرشح',
	},
]
 
const confirmedVoters: ConfirmedVoters[] = confirmedVotersData

const confirmedVotersColumns: ColumnDef<ConfirmedVotersHeader>[] = [
	{
		accessorKey: 'name',
		header: 'الاسم',
	},
	{
		accessorKey: 'address',
		header: 'العنوان',
	},
	{
		accessorKey: 'state',
		header: 'المحافظة',
	},
	{
		accessorKey: 'pollingCenter',
		header: 'مركز الاقتراع',
	},
	{
		accessorKey: 'dataEntry',
		header: 'اسم مدخل البيانات',
	},
	{
		accessorKey: 'candidate',
		header: 'اسم المرشح',
	},
	{
		accessorKey: 'candidateNumber',
		header: 'رقم المرشح',
	},
	{
		accessorKey: 'cardPhoto',
		header: 'صورة البطاقة',
		cell: ( { row } ) =>
		{
			const photoUrl = row.getValue( 'cardPhoto' );
			return <Image
				placeholder='blur'
				blurDataURL={ Placeholder.blurDataURL }
				width={ 48 }
				height={ 48 }
				src={ photoUrl as string }
				alt='صورة البطاقة'
				className='w-12 h-12 rounded-lg' />;
		}
	},
 ]
const ElectionBasePage = () =>
{
	return (
		<Container>
			<Tabs defaultValue='political-entities'>
				<TabsList className='grid w-full grid-cols-2 mb-6'>
					<TabsTrigger value='political-entities'>الناخبين المؤكدين</TabsTrigger>
					<TabsTrigger value='electoral-distribution'>الناخبين المحتملين</TabsTrigger>
				</TabsList>
				<TabsContent value='political-entities'>
					<DataTable
						searchPlaceholder='بحث عن الناخبين المحتملين'
						searchTerm='name'
						primaryActionTitle='تصفية'
						primaryActionIcon={<Filter />}
						columns={ confirmedVotersColumns }
						data={ confirmedVoters } />
				</TabsContent>
				<TabsContent value='electoral-distribution'>
				<DataTable
						searchPlaceholder='بحث عن الناخبين المؤكدين'
						searchTerm='name'
						primaryActionTitle='تصفية'
						primaryActionIcon={<Filter />}
						columns={ possibleVotersColumns }
						data={ possibleVoters } />
				</TabsContent>
			</Tabs>
		</Container>
	)
};

export default ElectionBasePage;