const addTwoDigits = (a, b) => {
    return a+b;
}
try{
    console.log(addTwoDigits());
}
catch(error){
    console.log(error)
    console.log("Our code is not working, maybe too few arguements for the function add that we created")
}