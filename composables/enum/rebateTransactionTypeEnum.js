import { createEnum } from "./createEnum";

const value = [
  {
    key: "reject",
    value: 0,
  },
  {
    key: "pending",
    value: 1,
  },
  {
    key: "approved",
    value: 5,
  },
];
const rebateTransactionTypeEnum = createEnum(value);

export default rebateTransactionTypeEnum;
