import * as sdk from "node-appwrite";

export const dbConfig = {
	PROJECT_ID: process.env.NEXT_PUBLIC_PROJECT_ID,
	API_KEY: process.env.NEXT_PUBLIC_API_KEY,
	DATABASE_ID: process.env.NEXT_PUBLIC_DATABASE_ID,
	PATIENT_COLLETION_ID: process.env.NEXT_PUBLIC_PATIENT_COLLETION_ID,
	DOCTOR_COLLECTION_ID: process.env.NEXT_PUBLIC_DOCTOR_COLLECTION_ID,
	APPOINTMENT_COLLECTION_ID: process.env.NEXT_PUBLIC_APPOINTMENT_COLLECTION_ID,
	BUCKET_ID: process.env.NEXT_PUBLIC_BUCKET_ID,
	ENDPOINT: process.env.NEXT_PUBLIC_ENDPOINT,
};

const client = new sdk.Client();

client
	.setEndpoint(dbConfig.ENDPOINT!)
	.setProject(dbConfig.PROJECT_ID!)
	.setKey(dbConfig.API_KEY!);

export const databases = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const messaging = new sdk.Messaging(client);
export const users = new sdk.Users(client);
export const account = new sdk.Account(client);
