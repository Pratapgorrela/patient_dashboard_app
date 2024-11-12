"use client";

import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	useReactTable,
} from "@tanstack/react-table";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	isLoading?: boolean;
}

export function DataTable<TData, TValue>({
	columns,
	data,
	isLoading = false,
}: DataTableProps<TData, TValue>) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
	});

	const renderSkeleton = () =>
		[1, 2, 3].map(() => (
			<TableRow>
				{columns.map(() => (
					<TableCell key={1}>
						<Skeleton className="h-[125px]" />
					</TableCell>
				))}
			</TableRow>
		));

	return (
		<div className="data-table">
			<Table className="shad-table">
				<TableHeader className="bg-dark-200">
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id} className="shad-table-row-header">
							{headerGroup.headers.map((header) => {
								return (
									<TableHead key={header.id}>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext()
											  )}
									</TableHead>
								);
							})}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows?.length && !isLoading ? (
						table.getRowModel().rows.map((row) => (
							<TableRow
								key={row.id}
								data-state={row.getIsSelected() && "selected"}
								className="shad-table-row">
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))
					) : isLoading ? (
						renderSkeleton()
					) : (
						<TableRow>
							<TableCell colSpan={columns.length} className="h-24 text-center">
								No results.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
			<div className="table-actions">
				<Button
					variant="outline"
					size="sm"
					onClick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}
					className="shad-gray-btn">
					<Image
						src="/assets/icons/arrow.svg"
						alt="arrow"
						height={24}
						width={24}
					/>
				</Button>
				<Button
					variant="outline"
					size="sm"
					onClick={() => table.nextPage()}
					disabled={!table.getCanNextPage()}
					className="shad-gray-btn">
					<Image
						src="/assets/icons/arrow.svg"
						alt="arrow"
						height={24}
						width={24}
						className="rotate-180"
					/>
				</Button>
			</div>
		</div>
	);
}
