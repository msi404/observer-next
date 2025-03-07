'use client'
import { useContext } from 'react';
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux';
import {selectIsFullScreen, setFullScreen} from '@/app/_lib/features/fullscreenSlice'
import { SidebarContext } from '@/app/_components/ui/sidebar';
import {Monitor} from 'lucide-react'

export const FullscreenButton = () =>
{
	const isFullScreen = useSelector( selectIsFullScreen );
	const dispatch = useDispatch();
	function useSidebar() {
		const context = useContext(SidebarContext);
		if (!context) {
		  throw new Error('useSidebar must be used within a SidebarProvider.');
		}
		return context;
	 }
	const { toggleSidebar } = useSidebar();
	
	return (
		<div className='hover:bg-slate-100 hover:cursor-pointer rounded-md p-1' onClick={() => [dispatch(setFullScreen(!isFullScreen)), toggleSidebar()]}>
			<Link href='/fullscreen'>
			<Monitor className='size-5 text-slate-700'/>
			</Link>
		</div>
	)
}