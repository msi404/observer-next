'use client'
import Image from 'next/image';
import { ContactRound, TrendingUp, Hash } from 'lucide-react'
import { ColumnDef } from '@tanstack/react-table';

import { Container } from "@/app/_components/container"
import {DataCard} from '@/app/_components/data-card'
import { DataTable } from '@/app/_components/data-table'

import {candidatesData} from '@/app/utils/faker'
import Placeholder from '@/app/_assets/images/placeholder.png'
 
type Candidate = {
	photo: string,
	name: string,
	number: number,
	state: string,
	listNumber: number,
	votes: number,
	listIndex: number,
}

type CandidateHeader = {
	photo: string,
	name: string,
	number: number,
	state: string,
	listNumber: number,
	votes: number,
	listIndex: number,
}
 
const candidates: Candidate[] = candidatesData

const candidatesColumns: ColumnDef<CandidateHeader>[] = [
	{
		accessorKey: 'photo',
		header: 'صورة الشخصية',
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
				className='w-12 h-12 rounded-lg' />;
		}
	},
	{
		accessorKey: 'name',
		header: 'الاسم',
	},
	{
		accessorKey: 'number',
		header: 'رقم المرشح',
	},
	{
		accessorKey: 'state',
		header: 'الولاية',
	},
	{
		accessorKey: 'listNumber',
		header: 'رقم القائمة',
	},
	{
		accessorKey: 'votes',
		header: () =>
		{
			return (
				<div className='flex justify-center items-center gap-4'>
					<TrendingUp />
					<div>عدد الاصوات</div>
				</div>
			)
		},
		cell: ( { row } ) =>
			{
				const votes = row.getValue( 'votes' ) as number;
			return <div className='text-center'>{votes}</div>
			}
	},
	{
		accessorKey: 'listIndex',
		header: () =>
			{
				return (
					<div className='flex justify-center items-center gap-4'>
						<Hash />
						<div>تسلسل القائمة</div>
					</div>
				)
		},
		cell: ( { row } ) =>
			{
			const listIndex = row.getValue( 'listIndex' ) as number;
			return <div className='text-center'>{listIndex}</div>
			}
	}
 ]

const ElectionResultsPage = () => {
	return (
		<Container>
			<div className='space-y-6'>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<DataCard description="المرشحون" total={5} icon={<ContactRound size={40}/>} />
				<DataCard description="عدد اصوات القائمة" total={10} icon={<TrendingUp size={40}/>} />
			</div>
			<DataTable
						searchPlaceholder='ابحث عن اسم المرشح'
						searchTerm='name'
						columns={ candidatesColumns }
						data={ candidates } />
			</div>
		</Container>
	);
};

export default ElectionResultsPage;
