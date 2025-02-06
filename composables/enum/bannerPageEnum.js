import { createEnum } from "./createEnum";

const value = [
  {
    key: "home",
    value: 1,
  },
  {
    key: "news",
    value: 2,
  },
  {
    key: "highlight",
    value: 3,
  },
];
const bannerPageEnum = createEnum(value);

export default bannerPageEnum;
