'use client'

import { Spinner } from '@/app/_components/spinner';

export const LoadingIndicator = () =>
{
	return (
		<div className="flex items-center justify-center ">
			<Spinner />
		</div>
	)
};