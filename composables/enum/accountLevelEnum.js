import { createEnum } from "./createEnum";

const value = [
  {
    key: 'good',
    value: 1
  },
  {
    key: 'very_good',
    value: 2
  },
  {
    key: 'the_best',
    value: 3
  },
  {
    key: 'normal',
    value: 4
  },
  {
    key: 'not_good',
    value: 5
  }
]

const accountLevelEnum = createEnum(value)
export default accountLevelEnum