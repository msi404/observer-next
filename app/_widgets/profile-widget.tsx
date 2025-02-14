'use client';
import { type FC } from 'react'
import { Card } from '@/app/_components/ui/card'
import {Background} from '@/app/_components/background'
import {Profile} from '@/app/_components/profile'
export const ProfileWidget: FC = () =>
{
	return (
		<Card className='p-6 overflow-hidden'>
			<div className='relative mb-12'>
			<Background className='rounded-md'/>
			<div className='absolute -bottom-16 right-14 flex justify-center items-center gap-4'>
				<Profile className='border-4 border-white' />
					<div className='flex flex-col'>
					<h1>فلان الفلاني</h1>
					<p className='text-xs text-gray-600 mt-1'>مرشح بغداد الكرادة</p>
					</div>
			</div>
			</div>
		</Card>
	)
}