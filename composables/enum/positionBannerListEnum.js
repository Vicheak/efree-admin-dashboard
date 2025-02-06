import { createEnum } from "./createEnum";

const value = [
  {
    key: "home",
    value: [
      {
        key: "slideshow",
        value: "slideshow",
        id: 1,
      },
      {
        key: "below_popular_news",
        value: "below_popular_news",
        id: 2,
      },
    ],
  },
  {
    key: "news",
    value: [
      {
        key: "slideshow",
        value: "slideshow",
        id: 1,
      },
      {
        key: "banner",
        value: "banner",
        id: 2,
      },
    ],
  },
  {
    key: "highlight",
    value: [
      {
        key: "banner",
        value: "banner",
        id: 1,
      },
    ],
  },
];
const positionBannerListEnum = createEnum(value);

export default positionBannerListEnum;
