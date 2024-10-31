"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField from "../../../../components/CustomFormField";
import Button from "../../../../components/ButtonAtom";
import { useState } from "react";
import { getAppointmentSchema } from "@/features/userapp/types/validation";
import { useRouter } from "next/navigation";
import {
	Doctors,
	FormFieldType,
	GenderOptions,
	StatusMapper,
} from "@/constants";
import {
	createAppointment,
	updateAppointment,
} from "../../db/actions/appointment.actions";
import { Appointment } from "@/types/appwrite.type";
import { addDays } from "date-fns";

const client = { id: "12345", name: "fortis" };
const AppointmentForm = ({
	userId,
	patientId,
	type,
	appointment,
	setOpen = (open: boolean) => open,
}: {
	userId: string;
	patientId: string;
	type: "create" | "cancel" | "schedule" | "complete";
	appointment?: Appointment;
	setOpen?: (open: boolean) => void;
}) => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const AppointmentFormValidation = getAppointmentSchema(type);

	const form = useForm<z.infer<typeof AppointmentFormValidation>>({
		resolver: zodResolver(AppointmentFormValidation),
		defaultValues: {
			name: appointment?.name || "",
			phone: appointment?.phone || "",
			email: appointment?.email || "",
			gender: appointment?.gender || "male",
			primaryPhysicianId: appointment?.primaryPhysicianId || "",
			schedule: appointment ? new Date(appointment.schedule) : new Date(),
			reason: appointment?.reason || "",
			note: appointment?.note || "",
			cancellationReason: "",
		},
	});

	async function onSubmit(values: z.infer<typeof AppointmentFormValidation>) {
		setIsLoading(true);
		try {
			const status = StatusMapper?.[type];

			if (type === "create" && patientId) {
				const appointmentData = {
					clientId: client?.id || "",
					userId,
					patientId: patientId || "",
					name: values.name,
					phone: values.phone,
					email: values?.email,
					gender: values.gender,
					primaryPhysicianId: values.primaryPhysicianId,
					schedule: new Date(values.schedule),
					reason: values.reason,
					note: values.note,
					status: status as Status,
				};
				const appointment = await createAppointment(appointmentData);
				if (appointment) {
					form.reset();
					router.push(
						`/patients/fortis/new-appointment/success?appointmentId=${appointment?.$id}`
					);
				}
			} else {
				const appointmentToUpdate = {
					userId,
					appointmentId: appointment?.$id as string,
					appointment: {
						primaryPhysicianId: values.primaryPhysicianId,
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

	const HeaderContent = (
		<section className="mb-12 space-y-4">
			<h1 className="header">New Appointment</h1>
			<p className="text-dark-700">Request a new appointment in 10 seconds</p>
		</section>
	);

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
				{type === "create" && HeaderContent}
				{type !== "cancel" && (
					<div className="flex gap-4 flex-col">
						<div className="flex flex-col gap-6 xl:flex-row">
							<CustomFormField
								control={form.control}
								fieldType={FormFieldType.INPUT}
								name="name"
								label="Full name"
								placeholder="Full name"
								iconSrc="/assets/icons/user.svg"
								iconAlt="user"
							/>
							<CustomFormField
								control={form.control}
								fieldType={FormFieldType.PHONE_INPUT}
								name="phone"
								label="Phone number"
								placeholder="123 456 7890"
							/>
						</div>
						<div className="flex flex-col gap-6 xl:flex-row">
							<CustomFormField
								control={form.control}
								fieldType={FormFieldType.INPUT}
								name="email"
								label="Email"
								placeholder="pratap@gmail.com"
								iconSrc="/assets/icons/email.svg"
								iconAlt="email"
							/>
							<CustomFormField
								control={form.control}
								fieldType={FormFieldType.RADIO_GROUP}
								name="gender"
								label="Gender"
								options={GenderOptions}
							/>
						</div>
						<div className="flex flex-col gap-6 xl:flex-row">
							<CustomFormField
								control={form.control}
								fieldType={FormFieldType.SELECT}
								name="primaryPhysicianId"
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
								minDate={new Date()}
								maxDate={addDays(new Date(), 15)}
							/>
						</div>
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
				<Button
					isLoading={isLoading}
					className={`${
						type === "cancel" ? "shad-danger-btn" : "shad-primary-btn"
					} w-full`}>
					{getSubmitBtnLabel()}
				</Button>
			</form>
		</Form>
	);
};

export default AppointmentForm;
