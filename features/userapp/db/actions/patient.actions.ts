import { ID, Query } from "node-appwrite";
import {
	databases,
	dbConfig,
	storage,
	users,
} from "../../../../lib/types/appwrite.config";
import { parseStringify } from "../../../../lib/types/utils";
import { InputFile } from "node-appwrite/file";

export const createUser = async (user: CreateUserParams) => {
	try {
		const newUser = await users.create(
			ID.unique(),
			user.email,
			user.phone,
			undefined,
			user.name
		);
		return parseStringify(newUser);
	} catch (error: unknown) {
		if (error && error?.["code"] === 409) {
			const documents = await users.list([Query.equal("email", [user.email])]);
			return documents?.users?.[0];
		}
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

export const registerPatient = async ({
	identificationDocument,
	...patient
}: RegisterUserParams) => {
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

export const getPatient = async (userId: string) => {
	try {
		const patient = await databases.listDocuments(
			dbConfig.DATABASE_ID!,
			dbConfig.PATIENT_COLLETION_ID!,
			[Query.equal("userId", userId)]
		);
		return parseStringify(patient.documents[0]);
	} catch (error: unknown) {
		console.log(error);
	}
};
