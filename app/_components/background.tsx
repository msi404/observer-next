'use client';
import { type FC } from 'react'
import Image from 'next/image'
import { Zoom } from '@/app/_components/zoom'
import PlaceholderBackground from '@/app/_assets/images/placeholderBackground.jpg'
import {cn} from '@/app/_lib/utils'

export const Background: FC<{className?: string}> = ({className}) =>
{
	return (
		<div>
			<Image alt='background' width={300} height={300} objectFit='cover' className={cn(className, 'h-44 w-full object-cover')} src={PlaceholderBackground.src} />
		</div>
	)
}