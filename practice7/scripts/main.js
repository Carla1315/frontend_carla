import generalCalculator from "./calculator.js";
const screen = document.getElementById("calculatorExpresion");
const bigScreen = document.getElementById("bigScreen");
bigScreen?.addEventListener('keypress', keyboardDisplay);
export function keyboardDisplay(value) {
    let valueFromKey = value.key;
    if(valueFromKey == '/')
        valueFromKey = '÷'
    if(valueFromKey == '*')
        valueFromKey = '×'
    if(valueFromKey == 'Enter')
        valueFromKey = '='
    display(valueFromKey);
    return valueFromKey;
}
const allButtons = document.querySelectorAll('input[name="operationButton"]');
allButtons?.forEach(element => {
    element?.addEventListener('click', buttonDisplay)
})
export function buttonDisplay(value) {
    let valueFromButton = value.srcElement.defaultValue;
    if(valueFromButton == '²√')
        valueFromButton = 'sqrt'
    if(valueFromButton == '×²')
        valueFromButton = 'pow'
    if(valueFromButton == '¹/×')
        valueFromButton = 'fraction'
    display(valueFromButton);
    return valueFromButton;
}
const buttonEraseLastDate = document.getElementById("eraseLastDate");
const buttonEraseAll = document.getElementById("eraseAll");
const buttonChangeSymbol = document.getElementById("changeSymbol");
buttonEraseLastDate?.addEventListener('click', eraseLastDate);
buttonEraseAll?.addEventListener('click', eraseAll);
buttonChangeSymbol?.addEventListener('click', changeSymbol)
let numberComplete;
export function init(){
    if(bigScreen) 
        bigScreen.value = '0';
    numberComplete = '';
    return true;
}

function display(operation) {
    let response = [];
    const value = bigScreen? bigScreen.value: "";
    const beforeValue = screen? screen.value: "";
    console.log(value, beforeValue, operation)
    response = generalCalculator(value, beforeValue, operation);
    if(!isNaN(operation) || operation == '.'){
        numberComplete += operation;
        if(bigScreen)
            bigScreen.value = numberComplete;
    }
    else{
        if(screen)
            screen.value = response.expresion;
        if(bigScreen)
            bigScreen.value = response.result;
        numberComplete = "";
    }
    return true
}
export function eraseLastDate(value) {
    init()
    return value.srcElement.defaultValue;
}
export function eraseAll(value) {
    init()
    if(screen)
        screen.value = "";
    return value.srcElement.defaultValue;
}
export function changeSymbol() {
    if(bigScreen){
        if (bigScreen.value.includes('-'))
            bigScreen.value = bigScreen.value.replace('-', '');
        else
            bigScreen.value = `-${bigScreen.value}`;
    }
    return true
}
init()