import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { UserFormValidation } from "./features/userapp/types/validation";

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		Credentials({
			async authorize(credentials) {
				const parsedCredentials = UserFormValidation.safeParse(credentials);
				return !parsedCredentials.success ? null : credentials;
			},
		}),
	],
	callbacks: {
		// async authorized({ request: { nextUrl }, auth }) {
		// 	const isLoggedIn = !!auth?.user;
		// 	const { pathname } = nextUrl;
		// 	if (pathname.startsWith("/patients") && isLoggedIn) {
		// 		return Response.redirect(new URL("/", nextUrl));
		// 	}
		// 	return true;
		// },
		// async jwt({ token, account }) {
		// 	console.log("token=>>>>>>>>>>>>>>", token, account?.access_token);
		// 	return token;
		// },
	},
	pages: {
		signIn: "/",
	},
});
