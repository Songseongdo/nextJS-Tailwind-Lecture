"use client";

import Link from "next/link";
import FormButton from "../../components/button";
import FormInput from "../../components/input";
import { FormActionResult, getError } from "../../util";
import { useFormState } from "react-dom";
import { smsVerification } from "./actions";

const initialState: FormActionResult = {
	success: true,
	token: false,
};

export default function SMSLogin() {
	const [state, dispatch] = useFormState<FormActionResult, FormData>(smsVerification, initialState);

	console.log(state);

	return (
		<div className="flex flex-col gap-10 py-8 px-6">
			<Link href="/login">&larr; 로그인으로</Link>
			<div className="flex flex-col gap-2 *:font-medium">
				<h1 className="text-2xl">SMS Log in</h1>
				<h2 className="text-xl">Verify your phone number.</h2>
			</div>
			<form action={dispatch} className="flex flex-col gap-3">
				{state?.success && state.token ? (
					<FormInput
						key="verifycode"
						$name="verifycode"
						type="number"
						placeholder="Verification code"
						required
						$errors={getError(state, "verifycode")}
						min={100000}
						max={999999}
					/>
				) : (
					<FormInput
						key="phonenumber"
						$name="phonenumber"
						type="number"
						placeholder="Phone number"
						required
						$errors={getError(state, "phonenumber")}
					/>
				)}

				<FormButton $text={state?.success && state.token ? "Send SMS Code" : "Verify"} />
			</form>
		</div>
	);
}
