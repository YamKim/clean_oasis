const { setupMaster } = require("cluster");

console.log(Math.round(1.6));
console.log(Math.round(1.4));

function sum(num1, num2) {
    return num1 + num2;
}

console.log(sum(2, 4));