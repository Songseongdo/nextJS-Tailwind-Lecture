import { notFound } from "next/navigation";
import { NextRequest } from "next/server";

import { createUser, goLogin } from "@/util/async";
import { getGithubAccesToken, getGithubEmail, getGithubProfile } from "@/api";
import db from "@/lib/db";

export async function GET(request: NextRequest) {
	const code = request.nextUrl.searchParams.get("code");
	if (!code) {
		notFound();
	}

	const { error, access_token } = await getGithubAccesToken(code);
	if (error) {
		return new Response(null, {
			status: 400,
		});
	}

	const { id, avatar_url, login } = await getGithubProfile(access_token);
	const email = await getGithubEmail(access_token);

	const user = await db.user.findUnique({
		where: {
			github_id: id + "",
		},
		select: {
			id: true,
		},
	});

	if (user) {
		return goLogin(user.id);
	} else {
		return await createUser({
			username: login,
			github_id: id + "",
			avatar: avatar_url,
			email,
		});
	}
}
