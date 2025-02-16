'use client';
import { type FC } from 'react'
import {cn} from '@/app/_lib/utils'
import { Zoom } from '@/app/_components/zoom'
import Placeholder from '@/app/_assets/images/placeholder.png'

export const Profile: FC<{className?: string, image: string}> = ({className, image}) =>
{
	return (
			<Zoom className={cn(className, 'rounded-md h-20 w-20')} preview={image} />
	)
}