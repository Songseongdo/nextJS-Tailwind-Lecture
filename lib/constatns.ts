export const PASSWORD_MIN_LENGTH = 4;
export const USERNAME_MIN_LENGTH = 3;
export const USERNAME_MAX_LENGTH = 10;
export const PASSWORD_REGEX = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{4,}$/gm);
export const PASSWORD_REGEX_ERROR = `A password must have lowercase, UPPERCASE, a number, at least ${PASSWORD_MIN_LENGTH} characters,  and special characters`;

export const PRODUCT_PAGE_SIZE = 1;
export const PRODUCT_ORDER_BY = "desc"; // "asc"
