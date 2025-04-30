"use server";

import { z } from "zod";
import fs from "fs/promises";
import { File } from "buffer";
import { FormActionResult, FormFields } from "@/util";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const productSchema = z.object({
	photo: z.string({
		required_error: "Photo is required",
	}),
	title: z.string({ required_error: "Title is required" }),
	price: z.coerce.number({ required_error: "Price is required" }),
	description: z.string({ required_error: "Description is required" }),
});

export async function uploadProduct(prevState: any, formData: FormData): Promise<FormActionResult> {
	const data = {
		photo: formData.get("photo"),
		title: formData.get("title"),
		price: formData.get("price"),
		description: formData.get("description"),
	};
	// if (data.photo instanceof File) {
	// 	const photoData = await data.photo.arrayBuffer();
	// 	await fs.appendFile(`./public/${data.photo.name}`, Buffer.from(photoData));

	// 	data.photo = `/${data.photo.name}`;
	// }

	console.log(data);

	return {
		success: true,
	};

	const result = await productSchema.spa(data);
	if (result.success) {
		const session = await getSession();

		if (session.id) {
			const product = await db.product.create({
				data: {
					title: result.data.title,
					description: result.data.description,
					price: result.data.price,
					photo: result.data.photo,
					user: {
						connect: {
							id: session.id,
						},
					},
				},
				select: {
					id: true,
				},
			});

			redirect(`/products/${product.id}`);
			// redirect(`/products`);
		} else {
			return {
				success: true,
			};
		}
	} else {
		return {
			success: false,
			fieldErrors: result.error.flatten().fieldErrors as Partial<Record<FormFields, string[]>>,
		};
	}
}

export async function getUploadUrl() {
	const response = await fetch(
		`https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ACCOUNT_ID}/images/v2/direct_upload`,
		{
			method: "POST",
			headers: {
				Authorization: `Bearer ${process.env.CF_API_TOKEN}`,
			},
		}
	);
	return await response.json();
}

const s3 = new S3Client({
	endpoint: `https://${process.env.CF_ACCOUNT_ID}.r2.cloudflarestorage.com`,
	region: "auto",
	credentials: {
		accessKeyId: `${process.env.CF_R2_ACCESS_KEY}`,
		secretAccessKey: `${process.env.CF_R2_SECRET_KEY}`,
	},
});

export async function handler(req, res) {
	const { filename, contentType } = req.body;
	const command = new PutObjectCommand({
		Bucket: "my-images",
		Key: filename,
		ContentType: contentType,
	});
	const signedUrl = await getSignedUrl(s3, command, { expiresIn: 60 * 5 });

	res.status(200).json({ url: signedUrl });
}
