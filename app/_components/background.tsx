'use client';
import {type FC} from 'react'
import { Zoom } from '@/app/_components/zoom'
import PlaceholderBackground from '@/app/_assets/images/placeholderBackground.png'
import {cn} from '@/app/_lib/utils'

export const Background: FC<{className?: string}> = ({className}) =>
{
	return (
		<div>
			<Zoom width={PlaceholderBackground.width} height={PlaceholderBackground.height} className={cn(className, 'h-44 object-cover')} preview={PlaceholderBackground.src} />
		</div>
	)
}