import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";
import { unstable_cache as nextCache, revalidatePath, revalidateTag } from "next/cache";
import Image from "next/image";
import { UserIcon } from "@heroicons/react/24/solid";
import { formatToWon } from "@/util";
import Link from "next/link";

async function getProduct(id: number) {
	const product = await db.product.findUnique({
		where: {
			id,
		},
		include: {
			user: {
				select: {
					username: true,
					avatar: true,
				},
			},
		},
	});
	return product;
}

const getCachedProduct = nextCache(getProduct, ["product-detail"], {
	tags: ["product-detail"],
});

async function getIsOwner(userId: number) {
	const session = await getSession();

	console.log(session.id, userId);

	if (session.id) {
		return session.id === userId;
	}
	return false;
}

async function getProductTitle(id: number) {
	const product = await db.product.findUnique({
		where: {
			id,
		},
		select: {
			title: true,
		},
	});
	return product;
}

const getCachedProductTitle = nextCache(getProductTitle, ["product-title"], {
	tags: ["product-title"],
});

export async function generateMetadata({ params }: { params: { id: string } }) {
	const product = await getCachedProductTitle(Number(params.id));
	return {
		title: product?.title,
	};
}

export default async function ProductDetail({ params }: { params: { id: string } }) {
	const id = Number(params.id);
	if (isNaN(id)) {
		return notFound();
	}

	const product = await getProduct(id);
	if (!product) {
		return notFound();
	}

	const isOwner = await getIsOwner(product.userId);
	const revalidate = async () => {
		"use server";
		revalidateTag("xxxx");
	};
	// const createChatRoom = async () => {
	// 	"use server";
	// 	const session = await getSession();
	// 	const room = await db.chatRoom.create({
	// 		data: {
	// 			users: {
	// 				connect: [
	// 					{
	// 						id: product.userId,
	// 					},
	// 					{
	// 						id: session.id,
	// 					},
	// 				],
	// 			},
	// 		},
	// 		select: {
	// 			id: true,
	// 		},
	// 	});
	// 	redirect(`/chats/${room.id}`);
	// };

	return (
		<div className="pb-40">
			<div className="relative aspect-square">
				<Image className="object-cover" fill src={`${product.photo}`} alt={product.title} />
			</div>
			<div className="p-5 flex items-center gap-3 border-b border-neutral-700">
				<div className="size-10 overflow-hidden rounded-full">
					{product.user.avatar !== null ? (
						<Image src={product.user.avatar} width={40} height={40} alt={product.user.username} />
					) : (
						<UserIcon />
					)}
				</div>
				<div>
					<h3>{product.user.username}</h3>
				</div>
			</div>
			<div className="p-5">
				<h1 className="text-2xl font-semibold">{product.title}</h1>
				<p>{product.description}</p>
			</div>
			<div className="fixed w-full bottom-0 p-5 pb-10 bg-neutral-800 flex justify-between items-center max-w-screen-sm">
				<span className="font-semibold text-xl">{formatToWon(product.price)}원</span>
				{isOwner ? (
					<button className="bg-orange-500 px-5 py-2.5 rounded-md text-white font-semibold">
						Delete product
					</button>
				) : null}
				<Link className="bg-orange-500 px-5 py-2.5 rounded-md text-white font-semibold" href={``}>
					채팅하기
				</Link>

				{/* {isOwner ? (
					<form action={revalidate}>
						<button className="bg-red-500 px-5 py-2.5 rounded-md text-white font-semibold">
							Revalidate title cache
						</button>
					</form>
				) : null}
				<form action={createChatRoom}>
					<button className="bg-orange-500 px-5 py-2.5 rounded-md text-white font-semibold">채팅하기</button>
				</form> */}
			</div>
		</div>
	);
}
