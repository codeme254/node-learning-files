const Calc = require('./export-module-1');
const intro = require('./export-module-2')
const { greet, sorry, congragulate } = require('./export-module-3')

const myCalc = new Calc()
console.log(myCalc.add(10,5))
console.log(myCalc.multiply(10,5))
console.log(myCalc.divide(10,5))
console.log(intro("Dennis Otwoma", 34, "Full Stack Web Developer"))
console.log(greet("Otwoma Dennis"));
console.log(sorry("Otwoma Dennis"));
console.log(congragulate("Otwoma Dennis"));