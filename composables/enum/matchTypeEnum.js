import { createEnum } from "./createEnum";

const value = [
  {
    key: "manual",
    value: 1,
  },
  {
    key: "link_to_match",
    value: 2,
  },
];

const matchTypeEnum = createEnum(value);
export default matchTypeEnum;
