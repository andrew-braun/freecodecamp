// Must return true for a certain set of 
// valid US phone number strings
//555-555-5555
// (555)555-5555
// (555) 555-5555
// 555 555 5555
// 5555555555
// 1 555 555 5555

// Conditional solution tailored to problem
// Regex solution is a shorter alternative
// In real-world use, a simple character/length check would be more flexible
const telephoneCheck = (str) => {

    let cleanStr = str.replace(/[\D]/g, '');
    let digitCount = cleanStr.length;

    if (digitCount < 10 || digitCount > 11) {
        return false;
    }

    if (str.match(/[^\d-()\s]/gm)) {
        return false;
    }

    let noCountryCodeNum = str.replace(/\s/gm, '');

    if (digitCount === 11 && str[0] === "1") {
        noCountryCodeNum = noCountryCodeNum.slice(1);
    } else if (digitCount !== 10) {
        return false
    }

    let parenCount = noCountryCodeNum.match(/[()]/gm);
    let dashCount = noCountryCodeNum.match(/[-]/);

    if (parenCount) {
        if (parenCount.length > 2 || parenCount.length === 1) {
            return false
        }
    }   if (noCountryCodeNum.indexOf(')') > 4) {
            return false
    }

    if (dashCount) {
        if (dashCount.length > 2) {
        return false
        }
    }
    
    return true;
  }

console.log( telephoneCheck("1 555-555-5555"));  
console.log( telephoneCheck("6054756961"));
console.log( telephoneCheck("1 (555) 555-5555"));
