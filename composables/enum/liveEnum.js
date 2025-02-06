import { createEnum } from "./createEnum";

const LIVE = 1;
const DISABLE = 0;
const NO_LIVE = 2;

const value = [
	{ key: "live", value: LIVE },
    { key: "no_live", value: NO_LIVE },
    { key: "disable", value: DISABLE },
];


const liveEnum = createEnum(value);
export default liveEnum;
