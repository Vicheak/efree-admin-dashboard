/**
 *  format phone number
 * 
 * '012942924' => '(012) 942-924'
 */
function phoneFormat(value) {
    if (!value || typeof value !== 'string') return '';
    const numericPhoneNumber = value.replace(/\D/g, '');
    const formattedPhoneNumber = numericPhoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    return formattedPhoneNumber;
}

export default phoneFormat