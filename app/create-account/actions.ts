"use server";

import { z } from "zod";
import { fieldNames } from "./const";
import {
	PASSWORD_MIN_LENGTH,
	PASSWORD_REGEX,
	PASSWORD_REGEX_ERROR,
	USERNAME_MAX_LENGTH,
	USERNAME_MIN_LENGTH,
} from "../../lib/constatns";
import { FormActionResult, FormFields } from "../../util";
import db from "../../lib/db";

const checkUserName = (username: string) => {
	return !username.includes("potato");
};

const checkPasswords = ({ password, confirm_password }: { password: string; confirm_password: string }) =>
	password === confirm_password;

const checkDBUsername = async (username: string) => {
	const user = await db.user.findUnique({
		where: {
			username,
		},
		select: {
			id: true,
		},
	});
	return !Boolean(user);
};
const checkDBEmail = async (email: string) => {
	const user = await db.user.findUnique({
		where: {
			email,
		},
		select: {
			id: true,
		},
	});
	return !Boolean(user);
};

const formSchema = z
	.object({
		username: z
			.string()
			.min(USERNAME_MIN_LENGTH, "Way too short!!")
			.max(USERNAME_MAX_LENGTH, "That is too looooong!")
			.toLowerCase()
			.trim()
			.transform((username) => `${username}`)
			.refine(checkUserName, "Nopotatoes allowed!")
			.refine(checkDBUsername, "This username is already taken"),
		email: z.string().email().refine(checkDBEmail, "There is an account aleady registered with that email"),
		password: z.string(),
		// password: z.string().regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
		confirm_password: z.string().min(PASSWORD_MIN_LENGTH),
	})
	.refine(checkPasswords, { message: "Both password should be the same!", path: ["confirm_password"] });

export async function createAccount(prevState: any, formData: FormData): Promise<FormActionResult> {
	// const data = {
	// 	username: formData.get("username"),
	// 	email: formData.get("email"),
	// 	password: formData.get("password"),
	// 	confirm_password: formData.get("confirm_password"),
	// };

	const data = fieldNames.reduce((acc, key) => {
		acc[key] = formData.get(key);
		return acc;
	}, {} as Record<FormFields[number], FormDataEntryValue | null>);

	const result = await formSchema.safeParseAsync(data);

	if (!result.success) {
		return {
			success: false,
			fieldErrors: result.error.flatten().fieldErrors as Partial<Record<FormFields, string[]>>,
		};
	} else {
		// hash password
		// save the user to db (Prisma)
		// log the user in
		// redirect "/home"

		return { success: true };
	}
}
