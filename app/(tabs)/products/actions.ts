"use server";

import { PRODUCT_ORDER_BY, PRODUCT_PAGE_SIZE } from "@/lib/constatns";
import db from "@/lib/db";

export async function getMoreProducts(page: number) {
	new Promise((resolve) => setTimeout(() => resolve, 5000));

	const products = await db.product.findMany({
		select: {
			title: true,
			price: true,
			created_at: true,
			photo: true,
			id: true,
		},
		orderBy: {
			created_at: PRODUCT_ORDER_BY,
		},
		skip: page * PRODUCT_PAGE_SIZE,
		take: PRODUCT_PAGE_SIZE,
	});
	return products;
}
