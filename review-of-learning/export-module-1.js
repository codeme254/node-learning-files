class Calculator{
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
//this is how we will export the above module
module.exports = Calculator;