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
				return Response.redirect(new URL("/fortis/patient/dashboard", nextUrl));
			}
			return true;
		},
		async jwt({ token, user }) {
			if (user) {
				token.$id = user.$id as string;
				token.userId = user.userId as string;
				token.clientId = user.clientId as string;
				token.phone = user.phone as string;
				token.gender = user.gender as Gender;
			}
			return token;
		},

		session({ session, token }) {
			session.user.$id = token.$id as string;
			session.user.userId = token.userId as string;
			session.user.clientId = token.clientId as string;
			session.user.phone = token.phone as string;
			session.user.gender = token.gender as Gender;
			return session;
		},
	},
	pages: {
		signIn: "/login",
	},
});
