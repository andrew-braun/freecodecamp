// Works for short-medium strings; char-by-char comparison more efficient for long strings

const palindrome = (str) => {
  let cleanStr = str.replace(new RegExp(/[\W_]/g), "").toLowerCase();
  let backwards = cleanStr.split("").reverse().join("");
  console.log(backwards);

  return backwards === cleanStr;
}

console.log(palindrome(""));
console.log(palindrome("Not a palindrome"));