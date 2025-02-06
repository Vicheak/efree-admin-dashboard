import { createEnum } from "./createEnum";

const value = [
  {
    key: "web",
    value: 1,
  },
  {
    key: "mobile",
    value: 2,
  },
];
const bannerPlatformTypeEnum = createEnum(value);

export default bannerPlatformTypeEnum;
