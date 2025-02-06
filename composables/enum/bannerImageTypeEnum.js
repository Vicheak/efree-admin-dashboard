import { createEnum } from "./createEnum";

const value = [
  {
    key: "square",
    value: 1,
  },
  {
    key: "rectangle",
    value: 2,
  },
];
const bannerImageTypeEnum = createEnum(value);

export default bannerImageTypeEnum;
