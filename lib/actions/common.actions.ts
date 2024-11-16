import { ID } from "node-appwrite";
import { account, messaging } from "../types/appwrite.config";
import { parseStringify } from "../utils";

export const sendSMSNotification = async (userId: string, content: string) => {
	try {
		const message = await messaging.createSms(
			ID.unique(),
			content,
			[],
			[userId]
		);
		return parseStringify(message);
	} catch (error: unknown) {
		console.log(error);
	}
};

export const generatePhoneToken = async (phone: string) => {
	try {
		const token = await account.createPhoneToken(ID.unique(), phone);
		return token;
	} catch (error: unknown) {
		console.log(error);
		return error;
	}
};

export const sendOTPToUser = async (phone: string) => {
	try {
		const res = await fetch("/api/sendMessage", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ phone }),
		});
		return await res.json();
	} catch (error: unknown) {
		console.log(error);
	}
};
