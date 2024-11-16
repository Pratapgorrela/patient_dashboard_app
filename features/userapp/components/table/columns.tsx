"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Appointment } from "@/types/appwrite.type";
import StatusBadge from "@/components/StatusBadge";
import { formatDateTime } from "@/lib/utils";
import Image from "next/image";
import AppointmentModal from "../AppointmentModal";

export const columns: ColumnDef<Appointment>[] = [
	{
		header: "ID",
		cell: ({ row }) => <p className="text-14-regular">{row.index + 1}</p>,
	},
	{
		accessorKey: "patient",
		header: "Patient",
		cell: ({ row }) => (
			<p className="text-14-regular">
				{row.original?.patient?.name || row.original?.name}
			</p>
		),
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => (
			<div className="min-w-[115px]">
				<StatusBadge status={row.original.status} />
			</div>
		),
	},
	{
		accessorKey: "schedule",
		header: "Appointment",
		cell: ({ row }) => (
			<p className="text-14-regular min-w-[100px]">
				{formatDateTime(row.original.schedule).dateTime}
			</p>
		),
	},
	{
		accessorKey: "primaryPhysician",
		header: "Doctor",
		cell: ({ row }) => {
			const primaryPhysician = row?.original?.primaryPhysician;
			return (
				<div className="flex items-center gap-3">
					{primaryPhysician?.$id ? (
						<>
							<Image
								src={primaryPhysician?.profileImgUrl || ""}
								alt={primaryPhysician?.name || ""}
								width={32}
								height={32}
								className="size-8"
							/>
							<p className="whitespace-nowrap">Dr. {primaryPhysician?.name}</p>
						</>
					) : null}
				</div>
			);
		},
	},
	{
		id: "actions",
		header: () => <div className="pl-4">Actions</div>,
		cell: ({ row: { original: data } }) => {
			return (
				<div className="flex gap-1">
					<AppointmentModal
						type="update"
						appointment={data}
						isReadonly={true}
					/>
					<AppointmentModal
						type="cancel"
						appointment={data}
						isDisabled={data?.status === "completed"}
					/>
				</div>
			);
		},
	},
];
