export type FormFields =
	| "email"
	| "password"
	| "username"
	| "confirm_password"
	| "phonenumber"
	| "verifycode"
	| "title"
	| "price"
	| "description"
	| "photo";
export type FormActionResult =
	| null
	| { success: true; token?: boolean }
	| { success: false; token?: boolean; fieldErrors: Partial<Record<FormFields, string[]>> };

export function getError(state: FormActionResult, name: FormFields): string[] {
	if (state && !state.success && state.fieldErrors) {
		return state.fieldErrors[name] ?? [];
	}
	return [];
}

export function formatToWon(price: number): string {
	return price.toLocaleString("ko-KR");
}

export function formatToTimeAgo(date: string): string {
	const dayInMs = 1000 * 60 * 60 * 24;
	const time = new Date(date).getTime();
	const now = new Date().getTime();
	const diff = Math.round((time - now) / dayInMs);

	const formatter = new Intl.RelativeTimeFormat("ko");
	return formatter.format(diff, "days");
}
