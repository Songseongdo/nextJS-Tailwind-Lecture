import ProductList from "@/components/product-list";
import db from "../../../lib/db";
import { Prisma } from "@/lib/generated/prisma";
import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/solid";
import { PRODUCT_ORDER_BY } from "@/lib/constatns";

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
			created_at: PRODUCT_ORDER_BY,
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
			<Link
				href="/products/add"
				className="bg-orange-500 flex justify-center rounded-full size-16 fixed bottom-24 right-8 text-white items-center transition-colors hover:bg-orange-400"
			>
				<PlusIcon className="size-10" />
			</Link>
		</div>
	);
}
