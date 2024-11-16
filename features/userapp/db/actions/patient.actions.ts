/* eslint-disable @typescript-eslint/no-explicit-any */
import { ID, Query } from "node-appwrite";
import {
	account,
	databases,
	dbConfig,
	storage,
	users,
} from "@/lib/types/appwrite.config";
import { parseStringify } from "@/lib/utils";
import { InputFile } from "node-appwrite/file";

export const createUser = async (user: CreateUserParams) => {
	try {
		const newUser = await users.create(
			ID.unique(),
			user?.email,
			user.phone,
			undefined,
			user.name
		);
		return parseStringify(newUser);
	} catch (error: unknown) {
		console.log(error);
		return null;
		// if (error && error?.["code"] === 409) {
		// 	const documents = await users.list([
		// 		Query.equal("email", [user?.email || ""]),
		// 	]);
		// 	return documents?.users?.[0];
		// }
	}
};

export const getUser = async (userId: string) => {
	try {
		const user = await users.get(userId);
		return parseStringify(user);
	} catch (error: unknown) {
		console.log(error);
	}
};

export const getUsers = async () => {
	try {
		const result = await users.list();
		return parseStringify(result);
	} catch (error: unknown) {
		console.log(error);
		return [];
	}
};

export const getUserByPhone = async (phone: string) => {
	try {
		const data = await users.list([Query.equal("phone", phone)]);
		return data.users.length ? parseStringify(data.users[0]) : null;
	} catch (error: any) {
		console.log(error);
		return null;
	}
};

export const registerPatient = async ({
	identificationDocument,
	...patient
}: RegisterPatientParams) => {
	try {
		let file;
		if (identificationDocument) {
			const inputFile = InputFile.fromBuffer(
				identificationDocument?.get("blobFile") as Blob,
				identificationDocument?.get("fileName") as string
			);

			file = await storage.createFile(
				dbConfig.BUCKET_ID!,
				ID.unique(),
				inputFile
			);
		}
		const newPatient = await databases.createDocument(
			dbConfig.DATABASE_ID!,
			dbConfig.PATIENT_COLLETION_ID!,
			ID.unique(),
			{
				identificationDocumentId: file?.$id || null,
				identificationDocumentUrl: `${dbConfig.ENDPOINT}/storage/buckets/${dbConfig.BUCKET_ID}/files/${file?.$id}/view?project=${dbConfig.PROJECT_ID}`,
				...patient,
			}
		);
		return parseStringify(newPatient);
	} catch (error: unknown) {
		console.log(error);
	}
};

export const updatePatient = async ({
	patientId,
	patient,
	identificationDocument,
}: UpdatePatientParams) => {
	try {
		let file;
		if (identificationDocument) {
			const inputFile = InputFile.fromBuffer(
				identificationDocument?.get("blobFile") as Blob,
				identificationDocument?.get("fileName") as string
			);

			file = await storage.createFile(
				dbConfig.BUCKET_ID!,
				ID.unique(),
				inputFile
			);
			patient = {
				...patient,
				identificationDocumentId: file?.$id || null,
				identificationDocumentUrl: `${dbConfig.ENDPOINT}/storage/buckets/${dbConfig.BUCKET_ID}/files/${file?.$id}/view?project=${dbConfig.PROJECT_ID}`,
			};
		}
		const updatePatient = await databases.updateDocument(
			dbConfig.DATABASE_ID!,
			dbConfig.PATIENT_COLLETION_ID!,
			patientId,
			patient
		);

		if (!updatePatient) {
			throw new Error(`Patient not found!`);
		}
		return parseStringify(updatePatient);
	} catch (error: unknown) {
		console.log("error", error);
	}
};

export const getPatient = async (userId: string) => {
	try {
		const patient = await databases.listDocuments(
			dbConfig.DATABASE_ID!,
			dbConfig.PATIENT_COLLETION_ID!,
			[Query.equal("userId", userId)]
		);
		return patient?.documents?.length
			? parseStringify(patient.documents[0])
			: null;
	} catch (error: unknown) {
		console.log(error);
		return null;
	}
};

// export const getDoctors = async () => {
// 	try {
// 		const doctors = await databases.listDocuments(
// 			dbConfig.DATABASE_ID!,
// 			dbConfig.DOCTOR_COLLECTION_ID!,
// 			[]
// 		);
// 		return doctors.documents;
// 	} catch (error: unknown) {
// 		console.log(error);
// 	}
// };

// export const createDoctor = async (doctor: CreateDoctorParams) => {
// 	try {
// 		const result = await databases.createDocument(
// 			dbConfig.DATABASE_ID!,
// 			dbConfig.DOCTOR_COLLECTION_ID!,
// 			ID.unique(),
// 			doctor
// 		);
// 		return parseStringify(result);
// 	} catch (error: unknown) {
// 		console.log(error);
// 	}
// };

export const validateUserLogin = async (userId: string, passKey: string) => {
	try {
		const session = await account.createSession(userId, passKey);
		return session;
	} catch (error: unknown) {
		console.log(error);
		return null;
	}
};
