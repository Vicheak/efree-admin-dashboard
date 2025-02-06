import { createEnum } from "./createEnum";

const KDAC = 1;

const KDAS = 2;

const value = [
	{ key: "kdac", value: KDAC }, 
	{ key: "kdas", value: KDAS },
];


const businessTypeEnum = createEnum(value);
export default businessTypeEnum;
