"use client";

import { PhotoIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import Input from "@/components/input";
import Button from "@/components/button";
import { getUploadUrl, uploadProduct } from "./actions";
import { FormActionResult } from "@/util";
import { useFormState } from "react-dom";

export default function AddProduct() {
	const [preview, setPreview] = useState("");
	const [uploadUrl, setUploadUrl] = useState("");
	const [imgId, setImgId] = useState("");
	const interceptAction = async (_: any, formData: FormData): Promise<FormActionResult> => {
		// CF 에 이미지 업로드
		const file = formData.get("photo");
		if (!file) {
			return { success: false, fieldErrors: { photo: [""] } };
		}

		const cludflareForm = new FormData();
		cludflareForm.append("file", file);
		const rs = await fetch(uploadUrl, {
			method: "post",
			body: cludflareForm,
		});
		console.log(await rs.text());

		if (rs.status !== 200) {
			return { success: false, fieldErrors: { photo: [""] } };
		}

		// foromData의 'photo' 변경
		const photoUrl = `https://imagedelivery.net/TeHP-r32HG40VLQR4IWtfQ/${imgId}`;
		formData.set("photo", photoUrl);

		// 업로드 product 호출
		return uploadProduct(_, formData);
	};
	const [state, dispatch] = useFormState<FormActionResult, FormData>(interceptAction, null);

	const onImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const {
			target: { files },
		} = event;
		if (!files) {
			return;
		}

		const file = files[0];
		if (!file.type.startsWith("image/")) {
			alert("이미지 파일만 등록 가능합니다.");
		}
		const MAX_SIZE = 5 * 1024 * 1024 * 1024;
		if (file.size > MAX_SIZE) {
			alert("5GB 미만의 파일만 등록 가능합니다.");
		}

		const url = URL.createObjectURL(file);
		setPreview(url);

		const { success, result } = await getUploadUrl();
		if (success) {
			const { id, uploadURL } = result;
			setUploadUrl(uploadURL);
			setImgId(id);
		}
	};

	return (
		<div>
			<form action={dispatch} className="p-5 flex flex-col gap-5">
				<label
					htmlFor="photo"
					className="border-2 aspect-square flex items-center justify-center flex-col text-neutral-300 border-neutral-300 rounded-md border-dashed cursor-pointer"
					style={{
						backgroundImage: `url(${preview})`,
						backgroundSize: "cover",
						backgroundPosition: "center",
					}}
				>
					{preview === "" ? (
						<>
							<PhotoIcon className="w-20" />
							<div className="text-neutral-400 text-sm">사진을 추가해주세요.</div>
						</>
					) : null}
				</label>
				<input
					onChange={onImageChange}
					type="file"
					id="photo"
					name="photo"
					accept="image/*"
					className="hidden"
				/>
				<Input $name="title" required placeholder="제목" type="text" />
				<Input $name="price" type="number" required placeholder="가격" />
				<Input $name="description" type="text" required placeholder="자세한 설명" />
				<Button $text="작성 완료" />
			</form>
		</div>
	);
}
