"use server";

import { z } from "zod";
import { fieldNames } from "./const";

const checkUserName = (username: string) => {
	return !username.includes("potato");
};

const checkPasswords = ({ password, confirm_password }: { password: string; confirm_password: string }) =>
	password === confirm_password;

const passwordRegex = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm);

const formSchema = z
	.object({
		username: z
			.string()
			.min(3, "Way too short!!")
			.max(10, "That is too looooong!")
			.toLowerCase()
			.trim()
			.transform((username) => `${username}🔥`)
			.refine(checkUserName, "Nopotatoes allowed!"),
		email: z.string().email(),
		password: z
			.string()
			.regex(
				passwordRegex,
				"A password must have lowercase, UPPERCASE, a number, at least 10 characters,  and special characters"
			),
		confirm_password: z.string().min(8),
	})
	.refine(checkPasswords, { message: "Both password should be the same!", path: ["confirm_password"] });

export type FormFields = z.infer<typeof formSchema>;
export type FormActionResult =
	| null
	| { success: true }
	| { success: false; fieldErrors: Partial<Record<keyof FormFields, string[]>> };

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
	}, {} as Record<(typeof fieldNames)[number], FormDataEntryValue | null>);

	const result = formSchema.safeParse(data);

	if (!result.success) {
		return {
			success: false,
			fieldErrors: result.error.flatten().fieldErrors as Partial<Record<keyof FormFields, string[]>>,
		};
	}

	return { success: true };
}
