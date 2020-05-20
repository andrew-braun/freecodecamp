function convertToRoman(num) {
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
    let digits = Object.keys(romanNumeralKey).reverse();

    let arabicArray = num.toString()
                      .split("")
                      .map( (num, index, arr) => 
                        Number(num.concat("0".repeat(arr.length-1-index))))
                      .reverse();
    let latinArray = [];

    for (let i=0; i<arabicArray.length; i++) {
      while (arabicArray[i] > 0) {
        for (let digit of digits) {
          if (arabicArray[i] - digit >= 0) {
            console.log(digit)
            latinArray.push(romanNumeralKey[digit])
            arabicArray[i] -= digit;
            break
          } else {
            delete arabicArray[i];
            break
        }
        }
      }
    }
    
    return latinArray;
   }
   
   
console.log(convertToRoman(35));
   

// 325
// 3 2 5
// 300 20 5
// CCC XX V

// 1. Split numbers into array
// 2. 

// let arabicArray = num.toString()
//                       .split("")
//                       .map( (num, index, arr) => 
//                         Number(num.concat("0".repeat(arr.length-1-index))))
//                       .reverse();
    
//     let latinArray = [];

//     for (i=0; i<arabicArray.length; i++) {
//       let arabicNumeral = arabicArray[i];
//       let romanNumeral;

//       if([1, 4, 5, 9].includes(arabicNumeral)) {
//         romanNumeral = romanNumerals[arabicNumeral];
//       } else {
//         romanNumeral = arabicNumeral /2
//       }
//       latinArray.unshift(romanNumeral);

//     }