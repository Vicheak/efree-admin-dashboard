import { createEnum } from "./createEnum";
const REJECT = 0;
const PENDING = 1;
const COMPLETE = 2;
const CHECK_BANK = 3;
const TOPUP = 4;
const APPROVED = 5;

const value = [
  {
    key: "reject",
    value: REJECT,
  },
  {
    key: "pending",
    value: PENDING,
  },
  {
    key: "complete",
    value: COMPLETE,
  },
  {
    key: "check_bank",
    value: CHECK_BANK,
  },
  {
    key: "topup",
    value: TOPUP,
  },
  {
    key: "approved",
    value: APPROVED,
  },
];
const transactionStatusEnum = createEnum(value);

export default transactionStatusEnum;
