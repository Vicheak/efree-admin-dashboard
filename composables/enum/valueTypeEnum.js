import { createEnum } from "./createEnum";

const value = [
	{ key: "fix_value", value: 1 },
	{ key: "percentage", value: 2 },
];

const valueTypeEnum = createEnum(value);
export default valueTypeEnum;
