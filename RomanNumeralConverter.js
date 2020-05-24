function convertToRoman(num) {
    // Store all necessary Roman-Arabic conversions in an object
    let romanNumeralKey = {
        1: "I",
        4: "IV",
        5: "V",
        9: "IX",
        10: "X",
        40: "XL",
        50: "L",
        90: "XC",
        100: "C",
        400: "CD",
        500: "D",
        900: "CM",
        1000: "M"
      }

    // Create array of Arabic numerals to loop through later
    let digits = Object.keys(romanNumeralKey).reverse();
    // Create number copy of input to subtract from as Roman numerals are added
    let counter = Number(num);
    // Array to store converted Roman numerals
    let latinArray = [];
    
    // Reduce the counter down to 0 by adding the largest 
    // possible Roman numeral to latinArray 
    // and subtracting the Arabic equivalent from the counter
    while (counter > 0) {
      for (let digit of digits) {
        if (counter - digit >= 0) {
          latinArray.push(romanNumeralKey[digit]);
          counter -= digit;
          break
        }
      }
    }

    return latinArray.join("");
   }
   
   
console.log(convertToRoman(1024));