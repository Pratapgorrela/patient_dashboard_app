import { dbConfig } from "@/env_config";
import {
	Client,
	Account,
	Messaging,
	Databases,
	Storage,
	Teams,
} from "appwrite";

export const client = new Client();

client.setEndpoint(dbConfig.ENDPOINT!).setProject(dbConfig.PROJECT_ID!);

export const databases = new Databases(client);
export const storage = new Storage(client);
export const messaging = new Messaging(client);
// export const users = new Users(client);
export const account = new Account(client);
export const teams = new Teams(client);
