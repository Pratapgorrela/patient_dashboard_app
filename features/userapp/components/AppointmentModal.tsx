"use client";

import { useEffect, useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Appointment } from "@/types/appwrite.type";
import AppointmentForm from "./forms/AppointmentForm";

const AppointmentModal = ({
	type,
	appointment,
	isDisabled = false,
	isReadonly = false,
}: {
	type: "schedule" | "cancel" | "update";
	patientId: string;
	userId: string;
	appointment: Appointment;
	isDisabled?: boolean;
	isReadonly?: boolean;
}) => {
	const statusMapper = { schedule: "scheduled", cancel: "cancelled" };
	const isActionDisabled =
		isDisabled || statusMapper?.[type] === appointment?.status;

	const [open, setIsopen] = useState(false);
	const [initialRenderComplete, setInitialRenderComplete] = useState(false);

	useEffect(() => {
		setInitialRenderComplete(true);
	}, []);

	const onDialogTrigger = (value: boolean) => {
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		!isActionDisabled && setIsopen(value);
	};

	return (
		<Dialog open={open} onOpenChange={onDialogTrigger}>
			<DialogTrigger>
				{initialRenderComplete && (
					<Button
						variant="ghost"
						className={`capitalize ${
							type === "schedule" || isReadonly ? "text-green-500" : ""
						}`}
						disabled={isActionDisabled}>
						{isReadonly ? "details" : type}
					</Button>
				)}
			</DialogTrigger>
			<DialogContent
				className={`shad-dialog sm:max-w-md ${
					type !== "cancel" && "md:max-w-7xl"
				}`}>
				<DialogHeader className="mb-4 space-y-3">
					<DialogTitle className="capitalize md:text-2xl">
						{!isReadonly ? type : ""} Appointment {!isReadonly ? "" : " Details"}
					</DialogTitle>
					{!isReadonly && (
						<DialogDescription className="md:text-lg">
							Please fill in the following details to {type} an appointment
						</DialogDescription>
					)}
				</DialogHeader>
				<AppointmentForm
					type={type}
					appointment={appointment}
					setOpen={setIsopen}
					isReadonly={isReadonly}
				/>
			</DialogContent>
		</Dialog>
	);
};

export default AppointmentModal;
