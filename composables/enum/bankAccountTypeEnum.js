import { createEnum } from "./createEnum";

const value = [
  {
    key: "all",
    value: 1,
  },
  {
    key: "withdraw",
    value: 2,
  },
  {
    key: "deposit",
    value: 3,
  },
];
const bankAccountTypeEnum = createEnum(value);

export default bankAccountTypeEnum;
