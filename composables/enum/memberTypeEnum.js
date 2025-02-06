import { createEnum } from "./createEnum";

const value = [
	{ key: "normal", value: 1 },
	{ key: "new_member", value: 2 },
	{ key: "new_user_casino", value: 3 },
	{ key: "special_hour", value: 4 },
	{ key: "special_new_day", value: 5 },
	{ key: "user_not_pay", value: 6 },
	{ key: "free_credit", value: 7 },
];

const memberTypeEnum = createEnum(value);
export default memberTypeEnum;
