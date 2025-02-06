import { createEnum } from "./createEnum";

const value = [
  {
    key: "check",
    value: 1,
  },
  {
    key: "uncheck",
    value: 0,
  },
];

const checkUserEnum = createEnum(value);
export default checkUserEnum;
