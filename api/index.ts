"use server";

interface IResAccessToken {
	access_token: string;
	scope: string;
	token_type: string;
	error?: string;
}
export async function getGithubAccesToken(code: string): Promise<IResAccessToken> {
	const accessTokenParams = {
		client_id: process.env.GITHUB_CLIENT_ID!,
		client_secret: process.env.GITHUB_CLIENT_SECRET!,
		code,
	};
	const formattedParams = new URLSearchParams(accessTokenParams).toString();
	const accessTokenUrl = `https://github.com/login/oauth/access_token?${formattedParams}`;

	return await (
		await fetch(accessTokenUrl, {
			method: "POST",
			headers: {
				Accept: "application/json",
			},
		})
	).json();
}

interface GithubUserPlan {
	name: string;
	space: number;
	private_repos: number;
	collaborators: number;
}

export interface IGithubUser {
	login: string;
	id: number;
	node_id: string;
	avatar_url: string;
	gravatar_id: string;
	url: string;
	html_url: string;
	followers_url: string;
	following_url: string;
	gists_url: string;
	starred_url: string;
	subscriptions_url: string;
	organizations_url: string;
	repos_url: string;
	events_url: string;
	received_events_url: string;
	type: string;
	site_admin: boolean;
	name: string | null;
	company: string | null;
	blog: string;
	location: string | null;
	email: string | null;
	hireable: boolean | null;
	bio: string | null;
	twitter_username: string | null;
	public_repos: number;
	public_gists: number;
	followers: number;
	following: number;
	created_at: string;
	updated_at: string;
	private_gists: number;
	total_private_repos: number;
	owned_private_repos: number;
	disk_usage: number;
	collaborators: number;
	two_factor_authentication: boolean;
	plan: GithubUserPlan;
}

export async function getGithubProfile(access_token: string): Promise<IGithubUser> {
	return await (
		await fetch(`https://api.github.com/user`, {
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
			cache: "no-cache",
		})
	).json();
}

export interface IGithubEmail {
	email: string;
	verified: boolean;
	primary: boolean;
	visibility: string;
}
export async function getGithubEmail(access_token: string) {
	const emails = await (
		await fetch(`https://api.github.com/user/emails`, {
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
			cache: "no-cache",
		})
	).json();
	return emails.find((e: any) => e.primary && e.verified)?.email;
}
