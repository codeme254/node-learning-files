// class Calculator{
//     add(a, b){
//         return a+b;
//     }
//     multiply(a, b){
//         return a*b;
//     }
//     divide(a, b){
//         return a/b;
//     }
// }
// module.exports = Calculator;

//we can also export this way as an expression
module.exports = class{
    add(a, b){
        return a+b;
    }
    multiply(a, b){
        return a*b;
    }
    divide(a, b){
        return a/b;
    }
}