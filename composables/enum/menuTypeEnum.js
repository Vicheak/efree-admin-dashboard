import { createEnum } from "./createEnum";

const HEADER = 1;

const value = [
	{ key: "header", value: HEADER }
];


const menuTypeEnum = createEnum(value);
export default menuTypeEnum;
