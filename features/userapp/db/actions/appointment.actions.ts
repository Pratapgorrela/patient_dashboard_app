"use server";

import { ID, Query } from "node-appwrite";
import { databases, dbConfig } from "@/lib/types/appwrite.config";
import { parseStringify } from "@/lib/utils";
import { Appointment } from "@/types/appwrite.type";
import { revalidatePath } from "next/cache";
// import { sendSMSNotification } from "@/lib/actions/common.actions";

export const getAppointment = async (appointmentId: string) => {
	try {
		const appointment = await databases.getDocument(
			dbConfig.DATABASE_ID!,
			dbConfig.APPOINTMENT_COLLECTION_ID!,
			appointmentId
		);
		return parseStringify(appointment);
	} catch (error: unknown) {
		console.log(error);
	}
};

export const getRecentAppointmentList = async () => {
	try {
		const appointments = await databases.listDocuments(
			dbConfig.DATABASE_ID!,
			dbConfig.APPOINTMENT_COLLECTION_ID!,
			[Query.orderDesc("$createdAt")]
		);

		const initialCounts = {
			scheduledCount: 0,
			pendingCount: 0,
			completedCount: 0,
			cancelledCount: 0,
		};

		const counts = (appointments.documents as Appointment[]).reduce(
			(acc, appointment) => {
				if (appointment.status === "scheduled") {
					acc.scheduledCount += 1;
				} else if (appointment.status === "pending") {
					acc.pendingCount += 1;
				} else if (appointment.status === "completed") {
					acc.completedCount += 1;
				} else if (appointment.status === "cancelled") {
					acc.cancelledCount += 1;
				}
				return acc;
			},
			initialCounts
		);

		const data = {
			totalCount: appointments.total,
			...counts,
			documents: appointments.documents,
		};
		return data;
	} catch (err) {
		console.log(err);
		return {
			totalCount: 0,
			scheduledCount: 0,
			pendingCount: 0,
			completedCount: 0,
			cancelledCount: 0,
			documents: [],
		};
	}
};

export const createAppointment = async (
	userId: string,
	appointment: CreateAppointmentParams
) => {
	try {
		const newAppointment = await databases.createDocument(
			dbConfig.DATABASE_ID!,
			dbConfig.APPOINTMENT_COLLECTION_ID!,
			ID.unique(),
			appointment
		);

		// const smsMessage = `Hi, it's Curepulse. ${`Your appointment has been created for ${
		// 	formatDateTime(appointment.schedule!).dateTime
		// } ${
		// 	newAppointment.primaryPhysician
		// 		? `with Dr.${newAppointment.primaryPhysician?.name} `
		// 		: ""
		// }`}  `;

		// await sendSMSNotification(userId, smsMessage);
		return parseStringify(newAppointment);
	} catch (error: unknown) {
		console.log(error);
	}
};

export const updateAppointment = async ({
	userId,
	appointmentId,
	appointment,
	type,
}: UpdateAppointmentParams) => {
	try {
		const updateAppointment = await databases.updateDocument(
			dbConfig.DATABASE_ID!,
			dbConfig.APPOINTMENT_COLLECTION_ID!,
			appointmentId,
			appointment
		);
		if (!updateAppointment) {
			throw new Error(`Appointment not found!`);
		}

		// const smsMessage = `Hi, it's Curepulse. ${
		// 	type === "cancel"
		// 		? `We regret to inform you that your appointment has been cancelled for following reason: ${appointment.cancellationReason}`
		// 		: `Your appointment has been scheduled for ${
		// 				formatDateTime(appointment.schedule!).dateTime
		// 		  } ${
		// 				appointment.primaryPhysician
		// 					? `with Dr.${appointment.primaryPhysician?.name}`
		// 					: ""
		// 		  }`
		// }  `;

		// await sendSMSNotification(userId, smsMessage);
		revalidatePath(`/fortis/patient/appointment/success`);
		return parseStringify(updateAppointment);
	} catch (error: unknown) {
		console.log("error", error);
	}
};
