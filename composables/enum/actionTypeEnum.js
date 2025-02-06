import { createEnum } from "./createEnum";

const value = [
  {
    key: "create",
    value: 1,
  },
  {
    key: "update",
    value: 2,
  },
  {
    key: "delete",
    value: 3,
  },
];
const actionTypeEnum = createEnum(value);

export default actionTypeEnum;
