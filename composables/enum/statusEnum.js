import { createEnum } from "./createEnum";

const ENABLE = 1;
const DISABLE = 0;

const value = [
	{ key: "enable", value: ENABLE },
	{ key: "disable", value: DISABLE },
];


const statusEnum = createEnum(value);
export default statusEnum;
