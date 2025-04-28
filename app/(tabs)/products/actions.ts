"use server";

import db from "@/lib/db";

const pageSize = 1;
export async function getMoreProducts(page: number) {
	const products = await db.product.findMany({
		select: {
			title: true,
			price: true,
			created_at: true,
			photo: true,
			id: true,
		},
		orderBy: {
			created_at: "asc",
		},
		skip: page * pageSize,
		take: pageSize,
	});
	return products;
}
