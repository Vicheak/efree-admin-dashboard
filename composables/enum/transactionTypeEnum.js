import { createEnum } from "./createEnum";

const value = [
  {
    key: "deposit_admin_bank",
    value: 1,
  },
  {
    key: "withdraw_admin_bank",
    value: 2,
  },
  {
    key: "transfer_in_admin_bank",
    value: 3,
  },
  {
    key: "transfer_out_admin_bank",
    value: 4,
  },
  {
    key: "product_cash_in",
    value: 5,
  },
  {
    key: "product_cash_out",
    value: 6,
  },
  {
    key: "account_deposit",
    value: 7,
  },
  {
    key: "account_withdraw",
    value: 8,
  },
  {
    key: "account_rebate",
    value: 9,
  },
  {
    key: "account_bonus",
    value: 10,
  },
  {
    key: "expense_admin_bank",
    value: 11,
  },
  {
    key: "cash_back_admin_bank",
    value: 12,
  },
  {
    key: "product_rebate",
    value: 13,
  },
  {
    key: "product_withdraw",
    value: 14,
  },
  {
    key: "product_deposit",
    value: 15,
  },
  {
    key: "credit_correction",
    value: 16,
  },
];
const transactionTypeEnum = createEnum(value);

export default transactionTypeEnum;
