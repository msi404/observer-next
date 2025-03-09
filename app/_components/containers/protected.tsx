'use client'
import { type ReactNode, Fragment, useEffect, useState } from 'react'
import {useRouter} from 'next/navigation'
import { useSelector } from 'react-redux'
import { selectToken } from '@/app/_lib/features/authSlice'

export const Protected = ({children}: {children: ReactNode}) =>
{
	const token = useSelector( selectToken )
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(true);
	
		useEffect(() => {
			const storedUser = localStorage.getItem('user');
			if (!storedUser) {
			  router.replace('/login');
			} else {
			  setIsLoading(false);
			}
		}, [router, token] );
	
		if (isLoading) return null; // Prevent rendering before checking auth state
	
	return (
		<Fragment>
			{children}
		</Fragment>
	)
}