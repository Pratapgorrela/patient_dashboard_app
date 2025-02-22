/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";

import { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField from "@/components/CustomFormField";
import Button from "@/components/ButtonAtom";
import { getAppointmentSchema } from "@/features/userapp/types/validation";
import { useRouter } from "next/navigation";
import {
	AppointmentActionsType,
	ERRORS,
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
import { getIcons, ICON_NAMES } from "@/lib/service";
import PasskeyModal from "@/components/PasskeyModal";
import AlertNote from "@/components/AlertNote";
import { app_constants } from "@/constants/config";

const AppointmentForm = ({
	type = "create",
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
	const [token, setToken] = useState<string | null>(null);
	const firstRender = useRef(true);
	const icons = getIcons([ICON_NAMES.user, ICON_NAMES.email]);

	const { WARNING_ALERT_CONFIG } = app_constants;

	const status = StatusMapper?.[type];
	const userId = user?.userId || GUEST_USER_ID;
	const createAction = AppointmentActionsType.CREATE;
	const updateAction = AppointmentActionsType.UPDATE;
	const cancelAction = AppointmentActionsType.CANCEL;
	// const scheduleAction = AppointmentActionsType.SCHEDULE;

	const isCancelled = appointment?.status === cancelAction.value;
	const isUpdateDisabled = appointment?.status !== createAction.value;
	const [isAlertOpen, setIsAlertOpen] = useState(isUpdateDisabled);

	const APPOINTMENT_ERRORS = { ...ERRORS.GLOBAL, ...ERRORS.APPOINTMENT };

	const AppointmentFormValidation = getAppointmentSchema(type);

	const getDefaultValues = () => {
		const data =
			type === createAction.key && user?.$id
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

	const handleCreateAppointment = async (
		values: z.infer<typeof AppointmentFormValidation>
	) => {
		try {
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
				return true;
			}
			return null;
		} catch (err: unknown) {
			console.log(err);
			setIsLoading(false);
			return null;
		}
	};

	const handleUpdateAppointment = async (
		values: z.infer<typeof AppointmentFormValidation>
	) => {
		try {
			const appointmentToUpdate = {
				userId,
				appointmentId: appointment?.$id as string,
				appointment: {
					primaryPhysician: values?.primaryPhysicianId || "",
					schedule: new Date(values.schedule),
					cancellationReason: values?.cancellationReason || "",
					reason: values.reason,
					status: status as Status,
					patient: user?.$id || "",
					note: values?.note || "",
					updatedBy: userId,
				},
				type: type === updateAction.key ? createAction.key : type,
			};
			const updatedAppointmentData = await updateAppointment(
				appointmentToUpdate
			);
			if (updatedAppointmentData) {
				setOpen && setOpen(false);
				form.reset();
				if (!setOpen && type === updateAction.key) {
					router.push(
						`/fortis/patient/appointment/success?appointmentId=${appointment?.$id}&isUpdated=true`
					);
				}
				return true;
			}
			return null;
		} catch (err: unknown) {
			console.log(err);
			setIsLoading(false);
			return null;
		}
	};

	const handleGuestAppointmentChanges = () => {
		// TODO: API integration to send OTP.
		setToken("123321");
		return;
	};

	async function onSubmit(values: z.infer<typeof AppointmentFormValidation>) {
		setIsLoading(true);
		setToken(null);
		try {
			if (!user?.userId) {
				return handleGuestAppointmentChanges();
			} else if (type === createAction.key) {
				await handleCreateAppointment(values);
			} else if (appointment?.$id) {
				await handleUpdateAppointment(values);
			}
		} catch (error) {
			console.log(error);
			setIsLoading(false);
			setToken(null);
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
		router.push(`/fortis/patient/dashboard`);
	};

	const validatePasskey = async (passkey: string) => {
		return token && passkey === token
			? "Success"
			: APPOINTMENT_ERRORS.INVALID_OTP;
	};

	const handleOtpValidateSuccess = async () => {
		const result: boolean | null = appointment?.$id
			? await handleUpdateAppointment(form.getValues())
			: await handleCreateAppointment(form.getValues());
		// TODO: Result Filure Alert.
		return result;
	};

	return (
		<>
			{token && (
				<PasskeyModal
					validatePasskey={validatePasskey}
					title={
						appointment?.$id
							? "Appointment Update Verification"
							: "Appointment Create Verification"
					}
					onSuccess={handleOtpValidateSuccess}
					onClose={() => setIsLoading(false)}
				/>
			)}
			<AlertNote
				open={isAlertOpen}
				setIsopen={setIsAlertOpen}
				{...{
					...WARNING_ALERT_CONFIG,
					description: `Appointment is in ${appointment?.status} status. Please reach out to support team for any changes.`,
				}}
			/>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-6 flex-1 h-80 overflow-scroll md:h-full md:overflow-auto">
					{type === createAction.key && HeaderContent}
					{type === updateAction.key &&
						!isReadonly &&
						!setOpen &&
						UpdateHeaderContent}
					{type !== cancelAction.key && (
						<div className="flex gap-8 flex-col">
							<div className="flex flex-col gap-6 xl:flex-row">
								<CustomFormField
									control={form.control}
									fieldType={FormFieldType.INPUT}
									required
									name="name"
									label="Full name"
									placeholder="Full name"
									icon={icons?.[ICON_NAMES.user]}
									disabled={isReadonly || type === updateAction.key}
								/>
								<CustomFormField
									control={form.control}
									fieldType={FormFieldType.PHONE_INPUT}
									required
									name="phone"
									label="Phone"
									placeholder="123 456 7890"
									disabled={isReadonly || type === updateAction.key}
								/>
							</div>
							<div className="flex flex-col gap-6 xl:flex-row">
								<CustomFormField
									control={form.control}
									fieldType={FormFieldType.INPUT}
									name="email"
									label="Email"
									placeholder="email@gmail.com"
									icon={icons?.[ICON_NAMES.email]}
									disabled={isReadonly || type === updateAction.key}
								/>
								<CustomFormField
									control={form.control}
									fieldType={FormFieldType.RADIO_GROUP}
									required
									name="gender"
									label="Gender"
									options={GenderOptions}
									disabled={isReadonly || type === updateAction.key}
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
									disabled={isReadonly || isUpdateDisabled}
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
									disabled={isReadonly || isUpdateDisabled}
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
									disabled={isReadonly || isUpdateDisabled}
								/>
								<CustomFormField
									control={form.control}
									fieldType={FormFieldType.TEXTAREA}
									name="note"
									label="Notes"
									placeholder="Enter notes"
									disabled={isReadonly || isUpdateDisabled}
								/>
							</div>
						</div>
					)}
					{(type === cancelAction.key || (isReadonly && isCancelled)) && (
						<CustomFormField
							control={form.control}
							fieldType={FormFieldType.TEXTAREA}
							required
							name="cancellationReason"
							label="Reason for cancellation"
							placeholder="Enter reason for cancellation"
							disabled={isReadonly || isUpdateDisabled}
						/>
					)}
					{!isReadonly && (
						<div className="flex flex-col gap-6 xl:flex-row md:mt-20px ">
							{type !== cancelAction.key && (
								<Button
									variant="ghost"
									className="shad-gray-btn w-full md:p-6"
									onClick={handleCancel}
									type="button">
									Cancel
								</Button>
							)}
							<Button
								isLoading={isLoading}
								className={`${
									type === cancelAction.key
										? "shad-danger-btn"
										: "shad-primary-btn"
								} w-full md:p-6`}
								disabeld={isUpdateDisabled}>
								{getSubmitBtnLabel()}
							</Button>
						</div>
					)}
				</form>
			</Form>
		</>
	);
};

export default AppointmentForm;
