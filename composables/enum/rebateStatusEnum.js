import { createEnum } from "./createEnum";

const value = [
  {
    key: "only_new_transaction",
    value: 0,
  },
  {
    key: "already_give_rebate",
    value: 1,
  },
];
const rebateStatusEnum = createEnum(value);

export default rebateStatusEnum;
