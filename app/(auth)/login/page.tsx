"use client";

import Link from "next/link";
import FormButton from "../../../components/button";
import FormInput from "../../../components/input";
import SocialLogin from "../../../components/social-login";
import { useFormState } from "react-dom";
import { handleForm } from "./actions";
import { PASSWORD_MIN_LENGTH } from "../../../lib/constatns";
import { getError } from "../../../util";

export default function LogIn() {
	const [state, dispatch] = useFormState(handleForm, null);

	return (
		<div className="flex flex-col gap-10 py-8 px-6">
			<Link href="/">&larr; 홈으로</Link>
			<div className="flex flex-col gap-2 *:font-medium">
				<h1 className="text-2xl">안녕하세요!</h1>
				<h2 className="text-xl">Log in with email and password.</h2>
			</div>
			<form action={dispatch} className="flex flex-col gap-3">
				<FormInput $name="email" type="email" placeholder="Email" required $errors={getError(state, "email")} />
				<FormInput
					$name="password"
					type="password"
					placeholder="Password"
					required
					$errors={getError(state, "password")}
					minLength={PASSWORD_MIN_LENGTH}
				/>
				<FormButton $text="Log in" />
			</form>
			<SocialLogin />
		</div>
	);
}
