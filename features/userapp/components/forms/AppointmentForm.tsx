"use client";

import { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField from "../../../../components/CustomFormField";
import Button from "../../../../components/ButtonAtom";
import { getAppointmentSchema } from "@/features/userapp/types/validation";
import { useRouter } from "next/navigation";
import {
	AppointmentActionsType,
	FormFieldType,
	GenderOptions,
	GUEST_USER_ID,
	StatusMapper,
} from "@/constants";
import {
	createAppointment,
	updateAppointment,
} from "../../db/actions/appointment.actions";
import { Appointment } from "@/types/appwrite.type";
import { addDays } from "date-fns";
import { User } from "next-auth";
import { getDoctorsList } from "@/features/docapp/db/doctor.actions";

const AppointmentForm = ({
	type,
	user,
	appointment,
	setOpen,
	isReadonly = false,
}: {
	type: AppointmentActionType;
	user?: User;
	appointment?: Appointment;
	setOpen?: (open: boolean) => void;
	isReadonly?: boolean;
}) => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [doctors, setDoctors] = useState<CreateDoctorParams[] | []>([]);
	const firstRender = useRef(true);

	const createAction = AppointmentActionsType.CREATE.key;
	const updateAction = AppointmentActionsType.UPDATE.key;
	const cancelAction = AppointmentActionsType.CANCEL.key;
	const scheduleAction = AppointmentActionsType.SCHEDULE.key;

	const AppointmentFormValidation = getAppointmentSchema(type);

	const getDefaultValues = () => {
		const data =
			type === createAction && user?.$id
				? user
				: appointment?.$id
				? appointment
				: {};
		return {
			name: data?.name || "",
			phone: data?.phone || "",
			email: data?.email || "",
			gender: data?.gender || "male",
			primaryPhysicianId: appointment?.primaryPhysician?.$id || "",
			schedule: appointment ? new Date(appointment?.schedule) : new Date(),
			reason: appointment?.reason || "",
			note: appointment?.note || "",
			cancellationReason: isReadonly
				? appointment?.cancellationReason || ""
				: "",
		};
	};

	const form = useForm<z.infer<typeof AppointmentFormValidation>>({
		resolver: zodResolver(AppointmentFormValidation),
		defaultValues: getDefaultValues(),
	});

	useEffect(() => {
		try {
			const fetchDoctors = async () => {
				firstRender.current = false;
				const data: CreateDoctorParams[] | undefined = await getDoctorsList();
				setDoctors(data || []);
			};
			// eslint-disable-next-line @typescript-eslint/no-unused-expressions
			firstRender.current && fetchDoctors();
		} catch (err: unknown) {
			console.log(err);
		}
	}, []);

	async function onSubmit(values: z.infer<typeof AppointmentFormValidation>) {
		setIsLoading(true);
		try {
			const userId = user?.userId || GUEST_USER_ID;
			const status = StatusMapper?.[type];
			if (type === createAction) {
				const appointmentData = {
					clientId: user?.clientId || "",
					userId,
					patient: user?.$id || "",
					name: values.name,
					phone: values.phone,
					email: values?.email,
					gender: values.gender,
					primaryPhysician: values?.primaryPhysicianId || "",
					schedule: new Date(values.schedule),
					reason: values.reason,
					note: values?.note || "",
					status: status as Status,
					createdBy: userId,
				};
				const appointment = await createAppointment(userId, appointmentData);
				if (appointment) {
					form.reset();
					router.push(
						`/fortis/patient/appointment/success?appointmentId=${appointment?.$id}`
					);
				}
			} else {
				const appointmentToUpdate = {
					userId,
					appointmentId: appointment?.$id as string,
					appointment: {
						primaryPhysician: values?.primaryPhysicianId || "",
						schedule: new Date(values.schedule),
						cancellationReason: values?.cancellationReason || "",
						reason: values.reason,
						status: status as Status,
						updatedBy: userId,
					},
					type: type === updateAction ? createAction : type,
				};
				const updatedAppointmentData = await updateAppointment(
					appointmentToUpdate
				);
				if (updatedAppointmentData) {
					setOpen && setOpen(false);
					form.reset();
					if (type === updateAction) {
						router.push(
							`/fortis/patient/appointment/success?appointmentId=${appointment?.$id}&isUpdated=true`
						);
					}
				}
			}
		} catch (error) {
			console.log(error);
		}
	}

	const getSubmitBtnLabel = () => {
		return AppointmentActionsType[type?.toUpperCase()].label || "";
	};

	const HeaderContent = (
		<section className="mb-12 space-y-4">
			<h1 className="header">New Appointment</h1>
			<p className="text-dark-700">Request a new appointment in 10 seconds</p>
		</section>
	);

	const UpdateHeaderContent = (
		<section className="mb-12 space-y-4">
			<h1 className="header">Reschedule Appointment</h1>
			<p className="text-dark-700">Request a change in your appointment</p>
		</section>
	);

	const handleCancel = () => {
		if (setOpen) {
			setOpen(false);
			return;
		}
		user?.$id
			? router.push(`/fortis/patient/dashboard`)
			: router.push(`/fortis`);
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-6 flex-1 h-80 overflow-scroll md:h-full md:overflow-auto">
				{type === createAction && HeaderContent}
				{type === updateAction && !isReadonly && UpdateHeaderContent}
				{type !== cancelAction && (
					<div className="flex gap-8 flex-col">
						<div className="flex flex-col gap-6 xl:flex-row">
							<CustomFormField
								control={form.control}
								fieldType={FormFieldType.INPUT}
								required
								name="name"
								label="Full name"
								placeholder="Full name"
								iconSrc="/assets/icons/user.svg"
								iconAlt="user"
								disabled={isReadonly}
							/>
							<CustomFormField
								control={form.control}
								fieldType={FormFieldType.PHONE_INPUT}
								required
								name="phone"
								label="Phone"
								placeholder="123 456 7890"
								disabled={isReadonly}
							/>
						</div>
						<div className="flex flex-col gap-6 xl:flex-row">
							<CustomFormField
								control={form.control}
								fieldType={FormFieldType.INPUT}
								name="email"
								label="Email"
								placeholder="email@gmail.com"
								iconSrc="/assets/icons/email.svg"
								iconAlt="email"
								disabled={isReadonly}
							/>
							<CustomFormField
								control={form.control}
								fieldType={FormFieldType.RADIO_GROUP}
								required
								name="gender"
								label="Gender"
								options={GenderOptions}
								disabled={isReadonly}
							/>
						</div>
						<div className="flex flex-col gap-6 xl:flex-row">
							<CustomFormField
								control={form.control}
								fieldType={FormFieldType.SELECT}
								name="primaryPhysicianId"
								selectKey="$id"
								optionLabel="name"
								label="Doctor"
								placeholder="Select a Doctor"
								options={doctors}
								disabled={isReadonly}
							/>
							<CustomFormField
								control={form.control}
								fieldType={FormFieldType.DATE_PICKER}
								required
								name="schedule"
								label="Expected appointment date"
								showTimeSelect
								dateFormat="MM/dd/yyyy - h:mm aa"
								minDate={new Date()}
								maxDate={addDays(new Date(), 15)}
								disabled={isReadonly}
							/>
						</div>
						<div className="flex flex-col gap-6 xl:flex-row">
							<CustomFormField
								control={form.control}
								fieldType={FormFieldType.TEXTAREA}
								required
								name="reason"
								label="Reason for appointment"
								placeholder="Enter reason for appointment"
								disabled={isReadonly}
							/>
							<CustomFormField
								control={form.control}
								fieldType={FormFieldType.TEXTAREA}
								name="note"
								label="Notes"
								placeholder="Enter notes"
								disabled={isReadonly}
							/>
						</div>
					</div>
				)}
				{(type === cancelAction || isReadonly) && (
					<CustomFormField
						control={form.control}
						fieldType={FormFieldType.TEXTAREA}
						required
						name="cancellationReason"
						label="Reason for cancellation"
						placeholder="Enter reason for cancellation"
						disabled={isReadonly}
					/>
				)}
				{!isReadonly && (
					<div className="flex flex-col gap-6 xl:flex-row md:mt-20px ">
						<Button
							isLoading={isLoading}
							className={`${
								type === cancelAction ? "shad-danger-btn" : "shad-primary-btn"
							} w-full md:p-6`}>
							{getSubmitBtnLabel()}
						</Button>
						{type !== cancelAction && (
							<Button
								variant="ghost"
								className="shad-gray-btn w-full md:p-6"
								onClick={handleCancel}
								type="button">
								Cancel
							</Button>
						)}
					</div>
				)}
			</form>
		</Form>
	);
};

export default AppointmentForm;
