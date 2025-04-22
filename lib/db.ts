import { PrismaClient } from "./generated/prisma";

const db = new PrismaClient();

// async function test() {
// 	const user = await db.user.create({
// 		data: {
// 			username: "asdf",
// 		},
// 	});

// 	console.log(user);
// }

async function test() {
	const user = await db.user.findMany({
		where: {
			username: {
				contains: "est",
			},
		},
	});

	console.log(user);
}

// test();

// async function test1() {
// 	const token = await db.sMSToken.create({
// 		data: {
// 			token: "123123",
// 			user: {
// 				connect: {
// 					id: 1,
// 				},
// 			},
// 		},
// 	});
// 	console.log(token);
// }
async function test1() {
	const token = await db.sMSToken.findUnique({
		where: {
			id: 1,
		},
		include: {
			user: true,
		},
	});
	console.log(token);
}

test1();

export default db;
