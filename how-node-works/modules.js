const Calc = require('./test-module-1');
// const social = require('./test-modules-2')

//es6 destructuring to destructure the returned object
const {wave, sayBye, greet} = require('./test-modules-2')
const calc1 = new Calc()
console.log(calc1.add(12,15))
console.log(calc1.multiply(12,15))
console.log(calc1.divide(12,15))
console.log(wave('dennis'))
console.log(sayBye('dennis'))
console.log(greet('dennis'))


