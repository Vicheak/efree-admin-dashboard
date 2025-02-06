/**
 *
 * 12345 => $12,345.00
 *
 * @param {String} sign
 * @param {Number} decimals Decimal places
 */

function noDecimalFormat(value, decimals) {
	if (!isFinite(value) || (!value && value !== 0)) value = 0
	if (value % 1 != 0) {
		return value
	} else {
		return parseInt(value)
	}
}

export default noDecimalFormat
