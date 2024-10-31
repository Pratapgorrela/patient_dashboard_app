"use server";

import { signIn, signOut } from "@/auth";
import { UserSignupFormValidation } from "@/features/userapp/types/validation";
import { AuthError } from "next-auth";
import { z } from "zod";

export async function handleCredentialsSignIn(
	userData: z.infer<typeof UserSignupFormValidation>
) {
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
