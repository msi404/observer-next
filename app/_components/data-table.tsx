"use client";
import { type ReactNode, useState } from "react";
import {
	type ColumnDef,
	type ColumnFiltersState,
	getFilteredRowModel,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/app/_components/ui/table";
import { Card, CardContent } from "@/app/_components/ui/card";

import { Input } from "@/app/_components/ui/input";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	searchTerm?: string;
	searchPlaceholder?: string;
	primaryAction?: ReactNode
	secondaryAction?: ReactNode
}

export function DataTable<TData, TValue>({
	columns,
	data,
	searchPlaceholder,
	searchTerm,
	primaryAction,
}: DataTableProps<TData, TValue>) {
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

	const table = useReactTable({
		data,
		columns,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		state: {
			columnFilters,
		},
	});

	return (
		<Card className="p-4">
			<CardContent className="flex flex-col lg:flex-row gap-5 justify-between">
				<div className="lg:w-1/2 flex flex-col lg:flex-row gap-5">
					{searchTerm && searchPlaceholder && (
						<Input
							value={
								(table
									.getColumn(searchTerm!)
									?.getFilterValue() as string) ?? ""
							}
							onChange={event =>
								table
									.getColumn(searchTerm!)
									?.setFilterValue(event.target.value)
							}
							type="text"
							placeholder={searchPlaceholder}
						/>
					)}
						{primaryAction}
				</div>
				{/* {secondaryActionTitle && secondaryActionIcon && (
					<div className="w-full lg:w-2/3 justify-end flex flex-col lg:flex-row gap-5">
						<ThemedButton>
							{secondaryActionTitle} {secondaryActionIcon}
						</ThemedButton>
					</div>
				)} */}
			</CardContent>
			<CardContent>
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map(headerGroup => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map(header => {
									return (
										<TableHead
											className="text-start"
											key={header.id}
										>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef
															.header,
														header.getContext()
												  )}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map(row => (
								<TableRow
									className="even:bg-slate-50 dark:even:bg-slate-900 rounded-lg border-none"
									key={row.id}
									data-state={
										row.getIsSelected() && "selected"
									}
								>
									{row.getVisibleCells().map(cell => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									لا يوجد بيانات
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}
