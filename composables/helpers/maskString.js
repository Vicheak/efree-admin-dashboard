export function maskString(input = "") {
  // Extract the first three characters
  if (input) {
    var firstThreeChars = input.substring(0, 3);

    // Replace the rest of the characters with asterisks
    var maskedString = input.substring(3).replace(/./g, "*");

    // Concatenate the first three characters with the masked string
    return firstThreeChars + "******";
  }
  return "";
}
