const screen = document.getElementById("calculatorExpresion");
const bigScreen = document.getElementById("bigScreen");
bigScreen.value = 0;
class Calculator {
    constructor(){}
    operation(value, beforeValue, operation){
        let result = 0;
        let expresion = "";
        if(operation == 'sqrt'){
            result = Math.sqrt(value);
            expresion = this.expresionSpecialOperation(beforeValue, `√${value}`);
        }
        if(operation == 'pow'){
            result = Math.pow(value, 2);
            expresion = this.expresionSpecialOperation(beforeValue, `sqr(${value})`);
        }
        if(operation == 'fraction'){
            result = eval(`1/(${value})`);
            expresion = this.expresionSpecialOperation(beforeValue, `1/(${value})`);
        }
        if(operation == '+' || operation == '-' || operation == '×' || operation == '÷'){
            result = this.resultBasicOperation(beforeValue, value).result;
            expresion = `${result}${operation}`
        }
        if(operation == '='){
            var response = this.resultBasicOperation(beforeValue, value);
            beforeValue = response.beforeValue;
            result = response.result;
            expresion = `${beforeValue}${value}${operation}`
        }
        return {
            result : result,
            expresion : expresion
        }
    }
    expresionSpecialOperation(beforeValue, value){
        let findIndexSymbol = false; 
        const symbolOperation = ['÷','+','-','×'];
        symbolOperation.forEach(element => {
            if(beforeValue.indexOf(element) != -1 && !beforeValue.includes('='))
                findIndexSymbol = true;
        });
        return findIndexSymbol ?`${beforeValue}${value}`:`${value}`;
    }
    resultBasicOperation (beforeValue, value) {
        let findIndexSymbol; 
        const symbolOperation = ['-','+','×','÷'];
        symbolOperation.forEach(element => {
            if(beforeValue.indexOf(element) != -1 && !beforeValue.includes('='))
                findIndexSymbol = beforeValue.indexOf(element)
        });
        console.log(findIndexSymbol)
        console.log(beforeValue, beforeValue)
        beforeValue = findIndexSymbol != -1?
                      beforeValue.slice(0, findIndexSymbol+1) : 
                      beforeValue = "0+";
        beforeValue = beforeValue.replace('÷', '/')
        beforeValue = beforeValue.replace('×', '*')
        return {
            result: eval(`${beforeValue}${value}`),
            beforeValue: beforeValue
        };
    }
}
let numberComplete = "";
function display(operation) {
    const calculator = new Calculator();
    let response = [];
    const value = bigScreen.value;
    const beforeValue = screen.value;
    response = calculator.operation(value, beforeValue, operation);
    if(!isNaN(operation) || operation == '.'){
        numberComplete += operation;
        bigScreen.value = numberComplete;
    }
    else{
        screen.value = response.expresion;
        bigScreen.value = response.result;
        numberComplete = "";
    }
}
function eraseLastDate() {
    bigScreen.value = 0;
    numberComplete = "";
}
function eraseAll() {
    bigScreen.value = 0;
    screen.value = "";
    numberComplete = "";
}
function changeSymbol() {
    bigScreen.value = `-${bigScreen.value}`;
}