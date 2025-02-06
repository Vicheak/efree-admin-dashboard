export default function convertToSlug(string, separator = '-') {

    if (typeof string !== 'string') {
        throw new TypeError('The first parameter must be a string.');
    }

   
    return string
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, separator) 
        .replace(new RegExp(`\\${separator}+`, 'g'), separator) 
        .replace(new RegExp(`^\\${separator}|\\${separator}$`, 'g'), ''); 
}