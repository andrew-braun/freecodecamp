// ROT13 cipher using string replace and UTF-16 characters

const rot13 = (str)  => {
    let rot13 = str
        .replace(/[\w]/g, char => 
            String.fromCharCode(char.charCodeAt(0) % 26 + 65));

    return rot13;
  }

  
// ROT13 using basic string and array methods

const rot13_2 = (str)  => {
    let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    let rot13 = str
        .split("")
        .map(char => {
            if (char.match(/[\w]/)) {
                let letterIndex = (alphabet.indexOf(char) + 13);
                if (letterIndex > 25) {
                    return(alphabet[letterIndex-26]);
                } else {
                    return(alphabet[letterIndex])
                }
            } else {
                return(char)
            }
        }
    ).join("")

return rot13;
  }

console.log(rot13_2("SERR PBQR PNZC"));
console.log(rot13("SERR PBQR PNZC"));
