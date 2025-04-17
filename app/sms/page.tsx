import Link from "next/link";
import FormButton from "../../components/button";
import FormInput from "../../components/input";

export default function SMSLogin() {
	return (
		<div className="flex flex-col gap-10 py-8 px-6">
			<Link href="/login">&larr; 로그인으로</Link>
			<div className="flex flex-col gap-2 *:font-medium">
				<h1 className="text-2xl">SMS Log in</h1>
				<h2 className="text-xl">Verify your phone number.</h2>
			</div>
			<form className="flex flex-col gap-3">
				<FormInput $name="phonenumber" type="number" placeholder="Phone number" required />
				<FormInput $name="verifycode" type="number" placeholder="Verification code" required />
				<FormButton $text="Verify" />
			</form>
		</div>
	);
}
