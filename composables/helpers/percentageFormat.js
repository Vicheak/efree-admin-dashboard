/**
 *  format phone number
 * 
 * '012942924' => '012-942-924'
 */
 function percentageFormat(value, type, isFormat = true, currency_symbol = '$' ) {
     /** Amount */
    if (type == 1) {
        return isFormat? `${value / 100} ${currency_symbol}`: value / 100
    } else {
        return isFormat? `${value} %`: value
    }
}

export default percentageFormat