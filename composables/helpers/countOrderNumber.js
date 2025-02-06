function countOrdersNumber(index, pagination) {
  let countOrdersNumber = (pagination?.current_page - 1) * pagination?.per_page + index + 1;
  return countOrdersNumber;
}

export default countOrdersNumber
