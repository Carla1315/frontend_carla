function generalOperations(value, beforeValue, operation){
    let result = 0;
    let expresion = "";
    if(operation == 'sqrt'){
        result = Math.sqrt(value);
        expresion = expresionSpecialOperation(beforeValue, `√${value}`);
    }
    if(operation == 'pow'){
        result = Math.pow(value, 2);
        expresion = expresionSpecialOperation(beforeValue, `sqr(${value})`);
    }
    if(operation == 'fraction'){
        result = 1 / value;
        expresion = expresionSpecialOperation(beforeValue, `1/(${value})`);
    }
    if(operation == '+' || operation == '-' || operation == '×' || operation == '÷'){
        result = resultBasicOperation(beforeValue, value).result;
        expresion = `${result}${operation}`
    }
    if(operation == '='){
        var response = resultBasicOperation(beforeValue, value);
        beforeValue = response.beforeValue;
        result = response.result;
        expresion = `${beforeValue}${value}${operation}`
    }
    return {
        result : result,
        expresion : expresion
    }
}
function expresionSpecialOperation(beforeValue, value){
    let findIndexSymbol = false; 
    const symbolOperation = ['÷','+','-','×'];
    symbolOperation.forEach(element => {
        if(beforeValue.indexOf(element) != -1 && !beforeValue.includes('='))
            findIndexSymbol = true;
    });
    return findIndexSymbol ?`${beforeValue}${value}`:`${value}`;
}
function resultBasicOperation (beforeValue, value) {
    let findIndexSymbol; 
    const symbolOperation = ['-','+','×','÷'];
    symbolOperation.forEach(element => {
        if(beforeValue.lastIndexOf(element) != -1 && !beforeValue.includes('='))
            findIndexSymbol = beforeValue.lastIndexOf(element)
    });
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
export default generalOperations;