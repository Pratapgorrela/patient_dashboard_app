import "next-auth";

declare module "next-auth" {
	interface User {
		$id?: string;
		name?: string;
		email?: string;
		image?: string;
		phone?: string;
		gender?: Gender;
		clientId?: string;
		userId?: string;
	}

	interface Session {
		user: User;
	}
}
