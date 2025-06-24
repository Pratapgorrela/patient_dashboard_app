import { ID, Models, Query } from "node-appwrite";
import { parseStringify } from "../utils";
import { account, teams } from "@/models/client/config";
import { serverUsers } from "@/models/server/config";

export const createUser = async (user: CreateUserParams) => {
	try {
		const newUser = await serverUsers.create(
			ID.unique(),
			user?.email,
			user.phone,
			undefined,
			user.name
		);
		return parseStringify(newUser);
	} catch (error: unknown) {
		console.log(error, error?.["code"]);
		if (error && error?.["code"] === 409) {
			// const documents = await users.list([
			// 	Query.equal("email", [user?.email || ""]),
			// ]);
			// return documents?.users?.[0];
			return { error: "A user with the same email, or phone already exists." };
		}
		return null;
	}
};

export const getUser = async (userId: string) => {
	try {
		const user = await serverUsers.get(userId);
		return parseStringify(user);
	} catch (error: unknown) {
		console.log(error);
	}
};

export const getUsers = async () => {
	try {
		const result = await serverUsers.list();
		return parseStringify(result);
	} catch (error: unknown) {
		console.log(error);
		return [];
	}
};

export const getUserByPhone = async (phone: string) => {
	try {
		const data = await serverUsers.list([Query.equal("phone", phone)]);
		return data.users.length ? parseStringify(data.users[0]) : null;
	} catch (error: unknown) {
		console.log(error);
		return null;
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

export const validatePhoneToken = async (userId: string, secret: string) => {
	try {
		return await account.createSession(userId, secret);
	} catch (error: unknown) {
		console.log(error);
		return null;
	}
};

export const createUserSession = async (userId: string, passKey: string) => {
	try {
		const session = await account.createSession(userId, passKey);
		return session;
	} catch (error: unknown) {
		console.log(error);
		return null;
	}
};

export const createUserSessionByEmail = async () => {
	try {
		const session = await account.createEmailPasswordSession(
			"ranapratap129@gmail.com",
			"Pratap!7129"
		);
		if (session) {
			// cookies().set("appwrite-session", session.secret, {
			// 	path: "/",
			// 	httpOnly: true,
			// 	sameSite: "strict",
			// 	secure: process.env.NODE_ENV === "production",
			// });
			// const sessionCookie = (await cookies()).get("appwrite-session");
			// client.setSession(session.secret);
			// const result = await account.get();
			// console.log("result=>>", result);
		}
		return session;
	} catch (error: unknown) {
		console.log(error);
		return null;
	}
};

export const getUserTeamsAndMemberships = async (userId: string) => {
	try {
		// 1. List all the teams the current user is a member of
		const teamsList = await teams.list();
		const userTeams = teamsList?.teams || [];

		// 2. For each team, list the memberships to find the user's role and membership details
		const userMemberships: {
			teamId: string;
			membership: Models.Membership;
		}[] = [];
		for (const team of userTeams) {
			const membershipsList = await teams.listMemberships(team.$id, [
				Query.equal("userId", userId),
			]);
			if (membershipsList?.memberships?.length > 0) {
				userMemberships.push({
					teamId: team.$id,
					membership: membershipsList.memberships[0],
				});
			}
		}

		return { teams: userTeams, memberships: userMemberships };
	} catch (error) {
		console.error("Error fetching user teams and memberships:", error);
		return { teams: [], memberships: [] };
	}
};

export const getTeam = async (teamName: string) => {
	const result = await teams.list([Query.equal("name", teamName)]);
	// const result = await teams.listMemberships("6806ffd900109e4d2978", [
	// 	Query.equal("userId", `6807dc2f00116c0235f2`),
	// ]);
	return result;
};

export const getAccount = async () => {
	const result = await account.get();
	console.log("result=>>", result);
	return result;
};

export const getSessions = async () => {
	try {
		const result = await account.get();
		return result;
	} catch (error: unknown) {
		console.log(error);
		return null;
	}
};

// export const sendSMSNotification = async (userId: string, content: string) => {
// 	try {
// 		const message = await messaging.createSms(
// 			ID.unique(),
// 			content,
// 			[],
// 			[userId]
// 		);
// 		return parseStringify(message);
// 	} catch (error: unknown) {
// 		console.log(error);
// 	}
// };
