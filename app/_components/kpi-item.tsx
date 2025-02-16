'use client';
import { ReactElement, type FC } from 'react';
import {Dynamic} from '@/app/_components/dynamic'

export const KpiItem: FC<{Icon: ReactElement, title: string, kpi: number}> = ({Icon, title, kpi}) => {
  return (
    <div className='flex flex-col gap-2 justify-center items-center bg-secondary rounded-md p-5'>
		  <div className='flex gap-4'>
			 <Dynamic component={Icon}/>
			  <h1>{title}</h1>
		  </div>
		  <h1 className='text-4xl font-bold'>{kpi}</h1>
    </div>
  );
};
