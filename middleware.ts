import { NextRequest, NextResponse } from "next/server";
import getSession from "./lib/session";

interface IRoutes {
	[key: string]: boolean;
}
const publicOnyUrls: IRoutes = {
	"/": true,
	"/login": true,
	"/sms": true,
	"/create-account": true,
	"/github/start": true,
	"/github/complete": true,
	"/profile": true,
	"/chats": true,
	"/life": true,
	"/live": true,
	"/products": true,
};

export async function middleware(request: NextRequest) {
	const session = await getSession();
	const exists = publicOnyUrls[request.nextUrl.pathname];
	if (!session.id) {
		if (!exists) {
			return NextResponse.redirect(new URL("/", request.url));
		}
	} else {
		if (!exists) {
			return NextResponse.redirect(new URL("/product", request.url));
		}
	}
}

export const config = {
	// matcher: ["/", "/profile", "/create-account", "/user/:path*"],
	matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
