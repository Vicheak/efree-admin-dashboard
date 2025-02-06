import { createEnum } from "./createEnum";

const value = [
  {
    key: 'male', value: 1
  },
  {
    key: 'female', value: 2
  },
  {
    key: 'other', value: 3
  }
]

const genderEnum = createEnum(value)
export default genderEnum