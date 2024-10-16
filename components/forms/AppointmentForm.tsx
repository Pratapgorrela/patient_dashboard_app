"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { getAppointmentSchema } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { FormFieldType } from "./PatientForm";
import { Doctors } from "@/constants";
import {
	createAppointment,
	updateAppointment,
} from "@/lib/actions/appointment.actions";
import { Appointment } from "@/types/appwrite.type";

const AppointmentForm = ({
	userId,
	patientId,
	type,
	appointment,
	setOpen = (open: boolean) => open,
}: {
	userId: string;
	patientId: string;
	type: "create" | "cancel" | "schedule";
	appointment?: Appointment;
	setOpen?: (open: boolean) => void;
}) => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const AppointmentFormValidation = getAppointmentSchema(type);

	const form = useForm<z.infer<typeof AppointmentFormValidation>>({
		resolver: zodResolver(AppointmentFormValidation),
		defaultValues: {
			primaryPhysician: appointment?.primaryPhysician || "",
			schedule: appointment ? new Date(appointment.schedule) : new Date(),
			reason: appointment?.reason || "",
			note: appointment?.note || "",
			cancellationReason: "",
		},
	});

	async function onSubmit(values: z.infer<typeof AppointmentFormValidation>) {
		setIsLoading(true);
		try {
			const status =
				type === "schedule"
					? "scheduled"
					: type === "cancel"
					? "cancelled"
					: "pending";

			if (type === "create" && patientId) {
				const appointmentData = {
					userId,
					patient: patientId,
					primaryPhysician: values.primaryPhysician,
					schedule: new Date(values.schedule),
					reason: values.reason!,
					note: values.note,
					status: status as Status,
				};
				const appointment = await createAppointment(appointmentData);
				if (appointment) {
					form.reset();
					router.push(
						`/patients/${userId}/new-appointment/success?appointmentId=${appointment?.$id}`
					);
				}
			} else {
				const appointmentToUpdate = {
					userId,
					appointmentId: appointment?.$id as string,
					appointment: {
						primaryPhysician: values.primaryPhysician,
						schedule: new Date(values.schedule),
						cancellationReason: values?.cancellationReason,
						status: status as Status,
					},
					type,
				};
				const updatedAppointmentData = await updateAppointment(
					appointmentToUpdate
				);
				if (updatedAppointmentData) {
					setOpen(false);
					form.reset();
				}
			}
		} catch (error) {
			console.log(error);
		}
	}

	const getSubmitBtnLabel = () => {
		return type === "create"
			? "Create Appointment"
			: type === "cancel"
			? "Cancel Appointment"
			: "Schedule Appointment";
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
				{type === "create" && (
					<section className="mb-12 space-y-4">
						<h1 className="header">New Appointment</h1>
						<p className="text-dark-700">
							Request a new appointment in 10 seconds
						</p>
					</section>
				)}
				{type !== "cancel" && (
					<div>
						<CustomFormField
							control={form.control}
							fieldType={FormFieldType.SELECT}
							name="primaryPhysician"
							label="Doctor"
							placeholder="Select a Doctor"
							options={Doctors}
						/>
						<CustomFormField
							control={form.control}
							fieldType={FormFieldType.DATE_PICKER}
							name="schedule"
							label="Expected appointment date"
							showTimeSelect
							dateFormat="MM/dd/yyyy - h:mm aa"
						/>
						<div className="flex flex-col gap-6 xl:flex-row">
							<CustomFormField
								control={form.control}
								fieldType={FormFieldType.TEXTAREA}
								name="reason"
								label="Reason for appointment"
								placeholder="Enter reason for appointment"
							/>
							<CustomFormField
								control={form.control}
								fieldType={FormFieldType.TEXTAREA}
								name="note"
								label="Notes"
								placeholder="Enter notes"
							/>
						</div>
					</div>
				)}
				{type === "cancel" && (
					<CustomFormField
						control={form.control}
						fieldType={FormFieldType.TEXTAREA}
						name="cancellationReason"
						label="Reason for cancellation"
						placeholder="Enter reason for cancellation"
					/>
				)}
				<SubmitButton
					isLoading={isLoading}
					className={`${
						type === "cancel" ? "shad-danger-btn" : "shad-primary-btn"
					} w-full`}>
					{getSubmitBtnLabel()}
				</SubmitButton>
			</form>
		</Form>
	);
};

export default AppointmentForm;
