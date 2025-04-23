import db from "../../lib/db";
import getSession from "../../lib/session";
import Button from "../../components/button";
import { notFound, redirect } from "next/navigation";

async function getUser() {
	const sesstion = await getSession();
	if (sesstion.id) {
		return await db.user.findUnique({
			where: {
				id: sesstion.id,
			},
		});
	} else {
		notFound();
	}
}

export default async function Profile() {
	const user = await getUser();
	const logout = async () => {
		"use server";
		const session = await getSession();
		await session.destroy();

		redirect("/");
	};
	return (
		<div>
			<h1>welcome {user?.username}</h1>
			<form action={logout}>
				<Button $text="Log Out"></Button>
			</form>
		</div>
	);
}
