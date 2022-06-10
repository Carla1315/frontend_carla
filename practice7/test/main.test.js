import { keyboardDisplay, 
    buttonDisplay,
    eraseLastDate,
    eraseAll,
    changeSymbol,
    init
 } from "../scripts/main";
describe('keyboardDisplay', () => {
    test('Enter a slash', () => {
        const response = '÷'; 
        const dataToSend = {key: '/'};
        const act = keyboardDisplay(dataToSend); 
        expect(act).toBe(response);
    });
    test('Enter a *', () => {
        const response = '×'; 
        const dataToSend = {key: '*'};
        const act = keyboardDisplay(dataToSend); 
        expect(act).toBe(response);
    });
    test('Enter a word Enter', () => {
        const response = '='; 
        const dataToSend = {key: 'Enter'};
        const act = keyboardDisplay(dataToSend); 
        expect(act).toBe(response);
    });
    test('Enter a number', () => {
        const response = 5; 
        const dataToSend = {key: 5};
        const act = keyboardDisplay(dataToSend); 
        expect(act).toBe(response);
    });
});
describe('buttonDisplay', () => {
    test('Click on button with value is ²√', () => {
        const response = 'sqrt'; 
        const dataToSend = {srcElement : {defaultValue: '²√'}};
        const act = buttonDisplay(dataToSend); 
        expect(act).toBe(response);
    });
    test('Click on button with value is ×²', () => {
        const response = 'pow'; 
        const dataToSend = {srcElement : {defaultValue: '×²'}};
        const act = buttonDisplay(dataToSend); 
        expect(act).toBe(response);
    });
    test('Click on button with value is ¹/×', () => {
        const response = 'fraction'; 
        const dataToSend = {srcElement : {defaultValue: '¹/×'}};
        const act = buttonDisplay(dataToSend); 
        expect(act).toBe(response);
    });
    test('Click on button with value is =', () => {
        const response = '='; 
        const dataToSend = {srcElement : {defaultValue: '='}};
        const act = buttonDisplay(dataToSend); 
        expect(act).toBe(response);
    });
});
describe('eraseLastDate', () => {
    test('Click on button', () => {
        const response = 'CE'; 
        const dataToSend = {srcElement : {defaultValue: 'CE'}};
        const act = eraseLastDate(dataToSend); 
        expect(act).toBe(response);
    });
});
describe('eraseAll', () => {
    test('Click on button', () => {
        const response = 'C'; 
        const dataToSend = {srcElement : {defaultValue: 'C'}};
        const act = eraseAll(dataToSend); 
        expect(act).toBe(response);
    });
});
describe('changeSymbol', () => {
    test('Click on button', () => {
        const response = true; 
        const act = changeSymbol(); 
        expect(act).toBe(response);
    });
});
describe('init', () => {
    test('Call function init and return true', () => {
        const response = true; 
        const act = init(); 
        expect(act).toBe(response);
    });
});