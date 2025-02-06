import { createEnum } from "./createEnum";

const value = [
  {
    key: "link",
    value: 1,
  },
  {
    key: "detail",
    value: 2,
  },
];
const bannerTypeEnum = createEnum(value);

export default bannerTypeEnum;
