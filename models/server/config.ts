import { dbConfig } from "@/env_config";
import * as sdk from "node-appwrite";

export const serverClient = new sdk.Client();

serverClient
	.setEndpoint(dbConfig.ENDPOINT!)
	.setProject(dbConfig.PROJECT_ID!)
	.setKey(process.env.NEXT_PUBLIC_API_KEY!);

export const serverDatabases = new sdk.Databases(serverClient);
export const serverUsers = new sdk.Users(serverClient);
export const serverAccount = new sdk.Account(serverClient);
export const serversStorage = new sdk.Storage(serverClient);
export const serverMessaging = new sdk.Messaging(serverClient);
