// Works for short-medium strings; char-by-char comparison more efficient for long strings

const palindrome = (str) => {
  let cleanStr = str.replace(new RegExp(/[\W_]/g), "").toLowerCase();
  let backwards = cleanStr.split("").reverse().join("");

  return backwards;
}

console.log(palindrome("_eye"));
console.log(palindrome("Not a palindrome"));