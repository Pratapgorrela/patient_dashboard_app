import { databases, dbConfig } from "@/lib/types/appwrite.config";

export const getDoctorsList: () => Promise<
	CreateDoctorParams[] | undefined
> = async () => {
	try {
		const doctors = await databases.listDocuments(
			dbConfig.DATABASE_ID!,
			dbConfig.DOCTOR_COLLECTION_ID!
		);
		return doctors.documents as unknown as CreateDoctorParams[];
	} catch (error: unknown) {
		console.log(error);
	}
};
