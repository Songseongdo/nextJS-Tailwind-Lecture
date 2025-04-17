export const fieldNames = ["username", "email", "password", "confirm_password"] as const;

type InputName = (typeof fieldNames)[number];

export const inputArr: {
	name: InputName;
	type: string;
	require: boolean;
	placeholder: string;
	minLength?: number;
	maxLength?: number;
}[] = [
	{
		name: "username",
		type: "text",
		require: true,
		placeholder: "Username",
		minLength: 3,
		maxLength: 10,
	},
	{
		name: "email",
		type: "email",
		require: true,
		placeholder: "Email",
	},
	{
		name: "password",
		type: "password",
		require: true,
		placeholder: "Password",
	},
	{
		name: "confirm_password",
		type: "password",
		require: true,
		placeholder: "Confirm Password",
		minLength: 8,
	},
];
