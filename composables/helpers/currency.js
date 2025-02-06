/**
 *
 * 12345 => $12,345.00
 *
 * @param {String} sign
 * @param {Number} decimals Decimal places
 */

function currency(value, currency, decimals) {
  var digitsRE = /(\d{3})(?=\d)/g;
  value = parseFloat(value);
  if (!isFinite(value) || (!value && value !== 0)) value = 0;
  currency = currency != null ? currency : "฿";
  //   decimals = decimals != null ? decimals : 2;

  //   var stringified = Math.abs(value).toFixed(decimals);
  //   var _int = decimals ? stringified.slice(0, -1 - decimals) : stringified;
  //   var i = _int.length % 3;
  //   var head = i > 0 ? _int.slice(0, i) + (_int.length > 3 ? "," : "") : "";
  //   var _float = decimals ? stringified.slice(-1 - decimals) : "";
  //   var sign = value < 0 ? "-" : "";

  let result =
    currency +
    " " +
    value.toLocaleString("en-US", { minimumFractionDigits: 2 });

  return result;
}

export default currency;
