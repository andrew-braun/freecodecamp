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
    "ONE HUNDRED": 100,
  };

  // Create a cashdrawer object and fill it with the input from cid
  let cashDrawer = {};

  for (let initialBalance of cid) {
    cashDrawer[initialBalance[0]] = initialBalance[1];
  }

  // Find the total of the cash in the cash drawer
  let totalCID = Number(
    Object.values(cashDrawer)
      .reduce((a, b) => a + b)
      .toFixed(2)
  );

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

  // Copy changeDue number to decrement as change is added
  let changeCounter = Number(Object.assign(changeDue));
  // Create an array that holds the denominations to look up
  let valueArray = Object.keys(denominationValue).reverse();
  // Initiate an object to store the change keys and values
  let changeObject = {};

  for (let key of valueArray) {
    // Store value of current denomination
    let cashValue = Number(denominationValue[key].toFixed(2));
    // Check if changeCounter and cashDrawer can both accommodate adding the change
    if (changeCounter - cashValue >= 0 && cashDrawer[key] > 0) {
      while (changeCounter - cashValue >= 0 && cashDrawer[key] > 0) {
        // If denomination doesn't exist in changeObject, initiate it as 0
        changeObject[key] = changeObject[key] || 0;
        // Increment changeObject
        changeObject[key] += cashValue;

        // decrement changeCounter
        changeCounter -= cashValue;
        changeCounter = Number(changeCounter.toFixed(2));

        // Decrement cashDrawer
        cashDrawer[key] -= cashValue;
      }
    }
  }

  if (changeCounter > 0) {
    return insufficientFunds;
  }

  let statusObject = {
    status: "OPEN",
    change: Object.entries(changeObject),
  };

  return statusObject;
}

let test = checkCashRegister(3.26, 100, [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
]);
console.log(test);

let test2 = checkCashRegister(19.5, 20, [
  ["PENNY", 0.01],
  ["NICKEL", 0],
  ["DIME", 0],
  ["QUARTER", 0],
  ["ONE", 1],
  ["FIVE", 0],
  ["TEN", 0],
  ["TWENTY", 0],
  ["ONE HUNDRED", 0],
]);
console.log(test2);