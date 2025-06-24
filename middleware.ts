import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
	const session = cookies().get("appwrite-session");
	console.log("session============>>", session);
	const user = true;
	if (!user) {
		return NextResponse.redirect(new URL("/fortis/patient/login", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/fortis/patient/dashboard"],
};
