"use server";

import { z } from "zod";
import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from "../../lib/constatns";
import { FormActionResult } from "../../util";

const formSchema = z.object({
	email: z.string().email(),
	password: z.string().min(PASSWORD_MIN_LENGTH).toLowerCase().regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
});

export async function handleForm(prevState: any, formData: FormData): Promise<FormActionResult> {
	const data = {
		email: formData.get("email"),
		password: formData.get("password"),
	};

	const result = formSchema.safeParse(data);
	if (result.success) {
		return { success: true };
	} else {
		return {
			success: false,
			fieldErrors: result.error.flatten().fieldErrors,
		};
	}
}
