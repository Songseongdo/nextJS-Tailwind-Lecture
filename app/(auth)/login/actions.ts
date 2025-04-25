"use server";

import bcrypt from "bcrypt";
import { z } from "zod";
import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from "../../../lib/constatns";
import { FormActionResult } from "../../../util";
import db from "../../../lib/db";
import { redirect } from "next/navigation";
import getSession from "../../../lib/session";

const checkEmailExitsts = async (email: string) => {
	const user = await db.user.findUnique({
		where: {
			email: email,
		},
		select: {
			id: true,
		},
	});
	return Boolean(user);
};

const formSchema = z.object({
	email: z.string().toLowerCase().email().refine(checkEmailExitsts, "An account with this email does not exist."),
	password: z.string({
		required_error: "Password is required",
	}),

	// .min(PASSWORD_MIN_LENGTH).toLowerCase().regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
});

export async function handleForm(prevState: any, formData: FormData): Promise<FormActionResult> {
	const data = {
		email: formData.get("email"),
		password: formData.get("password"),
	};

	const result = await formSchema.spa(data);
	if (result.success) {
		const user = await db.user.findUnique({
			where: {
				email: result.data.email,
			},
			select: {
				id: true,
				password: true,
			},
		});

		const ok = await bcrypt.compare(result.data.password, user!.password ?? "");
		if (ok) {
			const session = await getSession();
			session.id = user!.id;
			await session.save();

			redirect("/profile");
		} else {
			return {
				success: false,
				fieldErrors: { password: ["Wrong password."] },
			};
		}
	} else {
		return {
			success: false,
			fieldErrors: result.error.flatten().fieldErrors,
		};
	}
}
