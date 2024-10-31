import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { UserSignupFormValidation } from "./features/userapp/types/validation";

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		Credentials({
			async authorize(credentials) {
				const parsedCredentials =
					UserSignupFormValidation.safeParse(credentials);
				return !parsedCredentials.success ? null : credentials;
			},
		}),
	],
	callbacks: {
		async authorized({ request: { nextUrl }, auth }) {
			const isLoggedIn = !!auth?.user;
			const { pathname } = nextUrl;
			if (pathname.endsWith("/login") && isLoggedIn) {
				return Response.redirect(new URL("/patients", nextUrl));
			}
			return true;
		},
		// async jwt({ token, account }) {
		// 	console.log("token=>>>>>>>>>>>>>>", token, account?.access_token);
		// 	return token;
		// },
	},
	pages: {
		signIn: "/login",
	},
});
