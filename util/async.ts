"use server";

import { redirect } from "next/navigation";
import getSession from "../lib/session";
import db from "../lib/db";

export async function goLogin(id: number) {
	const session = await getSession();
	session.id = id;
	await session.save();
	return redirect("/profile");
}

interface ICreateUser {
	username: string;
	github_id?: string | null;
	avatar?: string | null;
	email?: string | null;
}
export async function createUser({ username, github_id = null, avatar = null, email = null }: ICreateUser) {
	try {
		const user = await db.user.create({
			data: {
				username,
				github_id,
				avatar,
				email,
			},
			select: {
				id: true,
			},
		});

		if (user) {
			return goLogin(user.id);
		}
	} catch (error: any) {
		// username 중복시 처리
		if (error.code === "P2002" && error.meta.target[0] === "username") {
			const latest = await db.user.findFirst({
				orderBy: { id: "desc" },
				select: {
					id: true,
				},
			});
			if (latest) {
				return await createUser({
					username: username + `${latest.id + 100}`,
					github_id,
					avatar,
					email,
				});
			}
		}
		throw error;
	}
}
