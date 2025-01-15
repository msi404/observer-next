'use client'
import { type ReactNode, Fragment } from 'react'
import {permanentRedirect} from 'next/navigation'
import { useSelector } from 'react-redux'
import { selectToken } from '@/app/_lib/features/auth/authSlice'

export const Protected = ({children}: {children: ReactNode}) =>
{
	const token = useSelector( selectToken )
	
	if ( !token ) return permanentRedirect( '/login' )
	
	return (
		<Fragment>
			{children}
		</Fragment>
	)
}