"use server";

import { signIn, signOut } from "@/auth";
import { Patient } from "@/types/appwrite.type";
import { AuthError, User } from "next-auth";

export async function handleCredentialsSignIn(userData: Patient | User) {
	try {
		await signIn("credentials", { ...userData, redirect: false });
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case "CredentialsSignin":
					return {
						message: "Invalid credentials",
					};
				default:
					return {
						message: "Something went wrong..",
					};
			}
		}
		throw error;
	}
}

export async function handleSignOut() {
	await signOut({ redirect: false });
}
