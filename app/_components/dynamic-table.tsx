'use client';
import {type FC, useState} from 'react'

import
	{
		flexRender,
} from '@tanstack/react-table';
	
import
	{
		Table,
		TableBody,
		TableCell,
		TableHead,
		TableHeader,
		TableRow,
} from '@/app/_components/ui/table';

import { Card, CardContent } from '@/app/_components/ui/card'
import { For } from '@/app/_components/for'
import { Show } from '@/app/_components/show'

interface DynamicTableProps
{
	table: any;
}

export const DynamicTable: FC<DynamicTableProps> = ({table}) =>
{
	return (
		<Card className='p-4'>
			<CardContent>
				<Table>
					<TableHeader>
						<For each={table.getHeaderGroups()}>
							{ ( headerGroup: any ) => (
								<TableRow key={headerGroup.id}>
									<For each={headerGroup.headers}>
										{ ( header: any ) => (
											<TableHead key={header.id}>
												<Show when={!header.isPlaceholder} fallback={null}>
													{flexRender(header.column.columnDef.header, header.getContext())}
												</Show>
											</TableHead>
										)}
									</For>
								</TableRow>
							)}
						</For>
					</TableHeader>
					<TableBody>
						<Show when={table.getRowModel().rows?.length} fallback={null}>
							<For each={table.getRowModel().rows}>
								{ ( row: any ) => (
									<TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
										<For each={row.getVisibleCells()}>
											{ ( cell: any ) => (
												<TableCell key={cell.id}>
													{flexRender(cell.column.columnDef.cell, cell.getContext())}
												</TableCell>
											)}
										</For>
									</TableRow>
								)}
							</For>
						</Show>
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	)
}