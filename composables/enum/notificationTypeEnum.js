import { createEnum } from "./createEnum";

const DEPOSIT_CHECK_BANK = 1;
const DEPOSIT_TOPUP = 2;
const WITHDRAW_CHECK_BANK = 3;
const WITHDRAW_TOPUP = 4;
const NEW_ACCOUNT_REGISTRATION = 5;
const DEPOSIT_COMPLETE = 6;
const WITHDRAW_COMPLETE = 7;
const WITHDRAW_REJECT = 8;
const DEPOSIT_REJECT = 9;

const value = [
  {
    key: "deposit_check_bank",
    value: DEPOSIT_CHECK_BANK,
  },
  {
    key: "deposit_topup",
    value: DEPOSIT_TOPUP,
  },
  {
    key: "withdraw_check_bank",
    value: WITHDRAW_CHECK_BANK,
  },
  {
    key: "withdraw_topup",
    value: WITHDRAW_TOPUP,
  },
  {
    key: "new_account_registration",
    value: NEW_ACCOUNT_REGISTRATION,
  },
  {
    key: "deposit_complete",
    value: DEPOSIT_COMPLETE,
  },
  {
    key: "withdraw_complete",
    value: WITHDRAW_COMPLETE,
  },
  {
    key: "withdraw_reject",
    value: WITHDRAW_REJECT,
  },
  {
    key: "deposit_reject",
    value: DEPOSIT_REJECT,
  },
];

const notificationTypeEnum = createEnum(value);
export default notificationTypeEnum;
