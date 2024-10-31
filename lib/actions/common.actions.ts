import { ID } from "node-appwrite";
import { messaging } from "../types/appwrite.config";
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
