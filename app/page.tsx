import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Tailwind CSS",
};

export default async function RootPage() {
	return (
		<div className="flex flex-col items-center justify-between min-h-screen p-5">
			<div className="my-auto *:font-medium flex flex-col	items-center gap-3">
				<span className="text-9xl">🥕</span>
				<h1 className="text-4xl mt-3">당근</h1>
				<h2 className="text-2xl">당근 마켓에 어서오세요!</h2>
			</div>
			<div className="flex flex-col items-center gap-3 w-full ">
				<Link
					href="/create-account"
					className="w-full bg-orange-500 text-white py-2.5 rounded-md text-center hover:bg-orange-400 transition-colors"
				>
					시작하기
				</Link>
				<div className="flex gap-2">
					<span>이미 계정이 있나요?</span>
					<Link href={"/login"} className="hover:underline">
						로그인
					</Link>
				</div>
			</div>
		</div>
	);
}
