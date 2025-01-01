'use client';
import {type ReactNode, type FC} from 'react';
import { DirectionProvider } from '@radix-ui/react-direction'

export const Providers: FC<{children: ReactNode}> = ( { children } ) =>
{ 
	return (
		<DirectionProvider dir='rtl'>
		{ children }
		</DirectionProvider>
	)
};