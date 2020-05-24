function checkCashRegister(price, cash, cid) {
    let denominationValue = {
        PENNY: 0.01,
        NICKEL: 0.05,
        DIME: 0.10,
        QUARTER: 0.25,
        ONE: 1,
        FIVE: 5,
        TEN: 10,
        TWENTY: 20,
        "FIFTY": 50,
        "ONE HUNDRED": 100
    }    
    
    let cashDrawer = {};

    for (let initialBalance of cid) {
        cashDrawer[initialBalance[0]] = initialBalance[1];
     }

    let totalCID = Math.fround((Object.values(cashDrawer)).reduce( (a, b) => a+b)).toFixed(2);

    let changeDue = cash - price;

    
    if (changeDue > totalCID) {
        let statusObject = {
            status: "INSUFFICIENT_FUNDS",
            change: []
        }
        return statusObject
    } else if (changeDue == totalCID) {
        let statusObject = {
            status: "CLOSED",
            change: cid
        }
        return statusObject
    } else {
        let changeObj = {...cashDrawer};
        for (let key in changeObj) {
            changeObj[key] = 0;
        }
        
        let changeCounter = Object.assign(changeDue);
        let denominationArray = Object.keys(denominationValue).reverse();

        while (changeCounter > 0) { 
            for (let denomination of denominationArray) {
                if (changeCounter - denominationValue[denomination] >= 0 && cashDrawer[denomination > 0])  {
                    changeObj[denomination] = Number(changeObj[denomination]) + denominationValue[denomination];
                    cashDrawer[denomination] -= denominationValue[denomination];
                    changeCounter -= denominationValue[denomination];
                    break
                } else if(changeCounter > 0) {
                    let insufficientFunds = {
                        status: "INSUFFICIENT_FUNDS",
                        change: []
                    }
                    return insufficientFunds
                }
                
            }
        }
        
        let change = Object.entries(changeObj).filter(key => key[1] !== 0)
        let statusObject = {
            status: "OPEN",
            change: change
        }


        return(statusObject)
    }
  }
  
  
let test = checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], 
["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], 
["TWENTY", 60], ["ONE HUNDRED", 100]]);

console.log(test)

let test2 = checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])
console.log(test2)
// create object to store cash in drawer (in dollar denominations)
// find total dollar value of cash in drawer
// Calculate total change due
// Check for sufficient funds (insufficient/closed)
// Create change using larger denominations first
// Return object