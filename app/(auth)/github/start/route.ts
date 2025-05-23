import { URLSearchParams } from "url";

export function GET() {
	const params = {
		client_id: process.env.GITHUB_CLIENT_ID!,
		scope: "read:user, user:email",
		allow_signup: "true",
	};
	const formattedParams = new URLSearchParams(params).toString();
	const oauthUrl = `https://github.com/login/oauth/authorize?${formattedParams}`;
	return Response.redirect(oauthUrl);
}
