function checkCashRegister(price, cash, cid) {
  // Assign each denomination name a numeric value
  let denominationValue = {
    PENNY: 0.01,
    NICKEL: 0.05,
    DIME: 0.1,
    QUARTER: 0.25,
    ONE: 1,
    FIVE: 5,
    TEN: 10,
    TWENTY: 20,
    FIFTY: 50,
    "ONE HUNDRED": 100,
  };

  // Create a cashdrawer object and fill it with the input from cid
  let cashDrawer = {};

  for (let initialBalance of cid) {
    cashDrawer[initialBalance[0]] = initialBalance[1];
  }

  // Find the total of the cash in the cash drawer
  let totalCID = Math.fround(
    Object.values(cashDrawer).reduce((a, b) => a + b)
  ).toFixed(2);

  // Calculate change due
  let changeDue = cash - price;

  // Create an object to return in case of insufficient funds
  let insufficientFunds = {
    status: "INSUFFICIENT_FUNDS",
    change: [],
  };

  // check for insufficient funds as a case of simple cash < change due
  if (changeDue > totalCID) {
    return insufficientFunds;
  }
  
  // check for the exact change case
  if (changeDue == totalCID) {
    let changeStatus = {
      status: "CLOSED",
      change: cid,
    };
    return changeStatus;
  } 

  // Copy the changeDue number
  let changeCounter = Number(Object.assign(changeDue));
  // Set up an array containing the keys to look up denomination number values
  let valueArray = Object.keys(denominationValue)
  // Create an object to hold the change values
  let changeObject = {};

  // Loop over changeCounter until it reaches 0
  while (changeCounter > 0) {
      // find the largest value that fits
      for (key of valueArray) {
          if (changeCounter - denominationValue[key] >= 0 && cashDrawer[key] - denominationValue[key] >= 0) {
            changeObject[key] = (changeObject[key] || 0);
            changeObject[key] += denominationValue[key];
            changeCounter -= denominationValue[key];
            console.log(changeObject)
          }
      }
    } changeCounter -= .1;
}

let test = checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])
console.log(test);

let test2 = checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])
console.log(test2);

let test3 = checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])
console.log(test3)