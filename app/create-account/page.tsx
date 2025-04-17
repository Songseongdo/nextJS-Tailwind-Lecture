"use client";

import FormInput from "../../components/input";
import FormButton from "../../components/button";
import SocialLogin from "../../components/social-login";
import { useFormState } from "react-dom";
import { createAccount, FormActionResult } from "./actions";
import { inputArr } from "./const";

export default function CreateAccount() {
	const [state, action] = useFormState<FormActionResult, FormData>(createAccount, null);

	return (
		<div className="flex flex-col gap-10 py-8 px-6">
			<div className="flex flex-col gap-2 *:font-medium">
				<h1 className="text-2xl">안녕하세요!</h1>
				<h2 className="text-xl">Fill in the form below to join!</h2>
			</div>
			<form action={action} className="flex flex-col gap-3">
				{inputArr.map((input) => (
					<FormInput
						key={input.name}
						$name={input.name}
						$errors={!state?.success ? state?.fieldErrors[input.name] : []}
						type={input.type}
						required={input.require}
						placeholder={input.placeholder}
						minLength={input.minLength || undefined}
						maxLength={input.maxLength || undefined}
					/>
				))}

				<FormButton $text="Create account" />
			</form>
			<SocialLogin />
		</div>
	);
}
