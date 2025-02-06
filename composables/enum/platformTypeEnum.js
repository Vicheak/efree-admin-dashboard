import { createEnum } from "./createEnum";

const value = [
  {
    key: "home",
    value: {
      slideshow:[
        {
          key: "desktop",
          value: "desktop",
          width: 1600,
          height: 350,
        },
        {
          key: "mobile",
          value: "mobile",
          width: 960,
          height: 350,
        },
      ],
      below_popular_news:[
        {
          key: "desktop",
          value: "desktop",
          width: 480,
          height: 260,
        },
        {
          key: "mobile",
          value: "mobile",
          width: 480,
          height: 260,
        },
      ]
    },
  },
  {
    key: "news",
    value: {
      slideshow:[
        {
          key: "desktop",
          value: "desktop",
          width: 480,
          height: 260,
        },
        {
          key: "mobile",
          value: "mobile",
          width: 480,
          height: 260,
        },
      ],
      banner:[
        {
          key: "desktop",
          value: "desktop",
          width: 790,
          height: 160,
        },
        {
          key: "mobile",
          value: "mobile",
          width: 790,
          height: 160,
        },
      ]
    },
  },
  {
    key: "highlight",
    value: {
      banner:[
        {
          key: "desktop",
          value: "desktop",
          width: 890,
          height: 250,
        },
        {
          key: "mobile",
          value: "mobile",
          width: 890,
          height: 250,
        },
      ],
    },
  },
];
const platformTypeEnum = createEnum(value);

export default platformTypeEnum;
