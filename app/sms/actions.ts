"use server";

import crypto from "crypto";
import { z } from "zod";
import { FormActionResult, FormFields } from "../../util";
import validator from "validator";
import { redirect } from "next/navigation";
import db from "../../lib/db";
import getSession from "../../lib/session";
import twilio from "twilio";

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

async function tokenExists(token: number) {
	const exits = await db.sMSToken.findUnique({
		where: {
			token: token.toString(),
		},
		select: {
			id: true,
		},
	});
	return Boolean(exits);
}

const verifyCodeSchema = z.coerce
	.number()
	.min(100000)
	.max(999999)
	.superRefine(async (val, ctx) => {
		const exists = await tokenExists(val);
		if (!exists) {
			ctx.addIssue({
				code: "custom",
				message: "인증코드를 확인해 주세요.",
				path: ["verifycode"],
			});
		}
	});

async function getToken() {
	const token = crypto.randomInt(100000, 999999).toString();
	const exists = await db.sMSToken.findUnique({
		where: {
			token,
		},
		select: {
			id: true,
		},
	});
	if (exists) {
		return getToken();
	} else {
		return token;
	}
}

export async function smsVerification(prevState: FormActionResult, formData: FormData): Promise<FormActionResult> {
	if (prevState?.success && !prevState.token) {
		const phone = formData.get("phonenumber");
		const result = await phoneSchema.spa(phone);

		if (result.success) {
			// 이전 토큰 삭제
			await db.sMSToken.deleteMany({
				where: {
					user: {
						phone: result.data,
					},
				},
			});

			const token = await getToken();

			// 연결된 유저가 없으면 생성
			await db.sMSToken.create({
				data: {
					token,
					user: {
						connectOrCreate: {
							where: {
								phone: result.data,
							},
							create: {
								username: crypto.randomBytes(10).toString("hex"),
								phone: result.data,
							},
						},
					},
				},
			});

			// twilioo 를 통해서 토큰 발송
			const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
			await client.messages.create({
				body: `Your Karrot verification code is: ${token}`,
				from: process.env.TWILIO_PHONE_NUMBER!,
				to: process.env.MY_PHONE_NUMBER!,
			});

			return { success: true, token: true };
		} else {
			return {
				success: false,
				token: false,
				fieldErrors: result.error.flatten().fieldErrors as Partial<Record<FormFields, string[]>>,
			};
		}
	} else {
		const verifycode = formData.get("verifycode");
		const result = await verifyCodeSchema.spa(verifycode);

		if (result.success) {
			const token = await db.sMSToken.findUnique({
				where: {
					token: result.data.toString(),
				},
				select: {
					id: true,
					userId: true,
				},
			});

			if (token) {
				const session = await getSession();
				session.id = token.userId;
				await session.save();

				await db.sMSToken.delete({
					where: {
						id: token.id,
					},
				});

				redirect("/profile");
			} else {
				return {
					success: false,
					fieldErrors: { verifycode: ["인증코드를 확인해 주세요."] },
				};
			}
		} else {
			return {
				success: false,
				token: true,
				fieldErrors: result.error.flatten().fieldErrors as Partial<Record<FormFields, string[]>>,
			};
		}
	}
}
