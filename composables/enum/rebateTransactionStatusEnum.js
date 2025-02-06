import { createEnum } from "./createEnum";

const value = [
  {
    key: "pending",
    value: 1,
  },
  {
    key: "complete",
    value: 2,
  },
  {
    key: "reject",
    value: 0,
  },
];
const rebateTransactionStatusEnum = createEnum(value);

export default rebateTransactionStatusEnum;
