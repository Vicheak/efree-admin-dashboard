import { createEnum } from "./createEnum";

const value = [
    {
        key: "custom",
        value: 0
    },
    {
        key: "API",
        value: 1,
    }
];

const syncMatchTypeEnum = createEnum(value);
export default syncMatchTypeEnum;
