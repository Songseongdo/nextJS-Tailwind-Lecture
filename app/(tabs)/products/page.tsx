import ProductList from "@/components/product-list";
import ListProduct from "../../../components/list-product";
import db from "../../../lib/db";
import { Prisma } from "@/lib/generated/prisma";

async function getInitialProducts() {
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
		take: 1,
	});
	return products;
}

export type InitialProducts = Prisma.PromiseReturnType<typeof getInitialProducts>;

export default async function Product() {
	const initialProducts = await getInitialProducts();

	return (
		<div>
			<ProductList initialProducts={initialProducts} />
		</div>
	);
}
