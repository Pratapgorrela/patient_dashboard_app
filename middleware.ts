import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function middleware(request: NextRequest) {
	// const user = true;
	// if (!user) {
	// 	return NextResponse.redirect(new URL("/fortis/patient/login", request.url));
	// }

	return NextResponse.next();
}

// export const config = {
// 	matcher: ["/fortis/patient/dashboard"],
// };
