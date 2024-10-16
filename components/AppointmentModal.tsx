"use client";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Appointment } from "@/types/appwrite.type";
import AppointmentForm from "./forms/AppointmentForm";

const AppointmentModal = ({
	type,
	patientId,
	userId,
	appointment,
}: {
	type: "schedule" | "cancel";
	patientId: string;
	userId: string;
	appointment: Appointment;
}) => {
	const statusMapper = { schedule: "scheduled", cancel: "cancelled" };
	const isActionDisabled = statusMapper?.[type] === appointment?.status;

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
							type === "schedule" ? "text-green-500" : ""
						}`}
						disabled={isActionDisabled}>
						{type}
					</Button>
				)}
			</DialogTrigger>
			<DialogContent className="shad-dialog sm:max-w-md">
				<DialogHeader className="mb-4 space-y-3">
					<DialogTitle className="capitalize">{type} Appointment</DialogTitle>
					<DialogDescription>
						Please fill in the following details to {type} an appointment
					</DialogDescription>
				</DialogHeader>
				<AppointmentForm
					userId={userId}
					patientId={patientId}
					type={type}
					appointment={appointment}
					setOpen={setIsopen}
				/>
			</DialogContent>
		</Dialog>
	);
};

export default AppointmentModal;
