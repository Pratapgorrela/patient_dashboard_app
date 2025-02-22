import { databases, dbConfig } from "@/lib/types/appwrite.config";
import { parseStringify } from "@/lib/utils";
import { Query } from "node-appwrite";

export const getDoctorsList: () => Promise<
	DoctorParams[] | undefined
> = async () => {
	try {
		const doctors = await databases.listDocuments(
			dbConfig.DATABASE_ID!,
			dbConfig.DOCTOR_COLLECTION_ID!
		);
		return doctors.documents as unknown as DoctorParams[];
	} catch (error: unknown) {
		console.log(error);
	}
};

export const updateDoctorInfo = async ({
	$id,
	...docData
}: UpdateDoctorParams) => {
	try {
		const updateDoctorData = await databases.updateDocument(
			dbConfig.DATABASE_ID!,
			dbConfig.DOCTOR_COLLECTION_ID!,
			$id,
			docData
		);
		if (!updateDoctorData) {
			throw new Error(`Doctor not found!`);
		}
		return parseStringify(updateDoctorData);
	} catch (error: unknown) {
		console.log("error", error);
		return null;
	}
};

export const getDoctorCalendar = async (doctorId: string) => {
	try {
		const docCalendarData = await databases.listDocuments(
			dbConfig.DATABASE_ID!,
			dbConfig.DOCTOR_CALENDAR_COLLECTION_ID!,
			[Query.equal("doctor", doctorId)]
		);
		return docCalendarData.documents.length
			? (docCalendarData.documents?.[0] as unknown as DoctorCalendarParams)
			: null;
	} catch (error: unknown) {
		console.log(error);
	}
};
