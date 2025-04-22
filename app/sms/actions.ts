"use server";

import { z } from "zod";
import { FormActionResult, FormFields } from "../../util";
import validator from "validator";
import { redirect } from "next/navigation";

// const phoneSchema = z
// 	.string()
// 	.trim()
// 	.refine((phone) => validator.isMobilePhone(phone, "ko-KR"));

const phoneSchema = z
	.string()
	.trim()
	.superRefine((val, ctx) => {
		if (!validator.isMobilePhone(val, "ko-KR")) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "유효한 휴대폰 번호를 입력해주세요.",
				path: ["phonenumber"],
			});
		}
	});

const verifyCodeSchema = z.coerce.number().min(100000).max(999999);

export async function smsVerification(prevState: FormActionResult, formData: FormData): Promise<FormActionResult> {
	if (prevState?.success && !prevState.token) {
		const phone = formData.get("phonenumber");
		const result = phoneSchema.safeParse(phone);

		if (result.success) {
			return { success: true, token: true };
		} else {
			return {
				success: false,
				fieldErrors: result.error.flatten().fieldErrors as Partial<Record<FormFields, string[]>>,
			};
		}
	} else {
		const verifycode = formData.get("verifycode");
		const result = verifyCodeSchema.safeParse(verifycode);

		if (result.success) {
			return redirect("/");
		} else {
			return {
				success: false,
				fieldErrors: result.error.flatten().fieldErrors as Partial<Record<FormFields, string[]>>,
			};
		}
	}
}
