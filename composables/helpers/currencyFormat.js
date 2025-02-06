// function currencyFormat(value) {
//     let number = +(Math.round(value + 'e+3') + 'e-3')
//     return (parseFloat(number.toFixed(3))).toString().replace(/\d(?=(\d{3})+\.)/g, '$&,')
// }

// function currencyFormat(value) {
//   let number = +(Math.round(value + 'e+3') + 'e-3')
//   let result = 0
//   if (number === +number && number !== (number | 0)) {
//     // is Float
//     result = parseFloat(number)
//       .toString()
//       .replace(/\d(?=(\d{3})+\.)/g, '$&,')
//   } else {
//     // is Int
//     result = number.toLocaleString()
//   }
//   return result
// }
function currencyFormat(value, symbol = '$') {
	let number = +(Math.round(value + 'e+3') + 'e-3');
	let result = 0;
	if (number === +number && number !== (number | 0)) {
	  // is Float
	  result = parseFloat(number)
		.toString()
		.replace(/\d(?=(\d{3})+\.)/g, '$&,');
	} else {
	  // is Int
	  result = number.toLocaleString();
	}
	return `${symbol} ${result}`;
  }
  
  export default currencyFormat
