import operations from "../scripts/calculator.js";
describe('Equal Operation', () => {
    test('sum positive numbers and return a positive result', () => {
        const response = 11; 
        const act = operations('5', '6+', '=').result; 
        expect(act).toBe(response);
    });
    test('sum negatives numbers and return a negative result', () => {
        const response = -9; 
        const act = operations('3', '-6-', '=').result; 
        expect(act).toBe(response);
    });
    test('sum a negative and a positive number and return a negative result', () => {
        const response = 3; 
        const act = operations('-3', '6+', '=').result; 
        expect(act).toBe(response);
    });
    test('behaviour of a fraction', () => {
        const response = 25; 
        const act = operations('25', 'sqr(5)', '=').result; 
        expect(act).toBe(response);
    });
});

describe('Basics Operations', () => {
    test('sum positive numbers and return a positive result', () => {
        const response = 11; 
        const act = operations('5', '6+', '+').result; 
        expect(act).toBe(response);
    });
    test('sum negatives numbers and return a negative result', () => {
        const response = -9; 
        const act = operations('3', '-6-', '-').result; 
        expect(act).toBe(response);
    });
    test('sum a negative and a positive number and return a negative result', () => {
        const response = 3; 
        const act = operations('-3', '6+', '÷').result; 
        expect(act).toBe(response);
    });
    test('before number is a negative and return a positive result', () => {
        const response = 2; 
        const act = operations('3', '5-', '-').result; 
        expect(act).toBe(response);
    });
    test('first date is a negative symbol', () => {
        const response = 0; 
        const act = operations('0', '', '-').result; 
        expect(act).toBe(response);
    });
    test('before number is a negative and return a negative result', () => {
        const response = -17; 
        const act = operations('17', '0-', '-').result; 
        expect(act).toBe(response);
    });
});

describe('SQRT Operation', () => {
    test('return root of 25', () => {
        const response = 5; 
        const act = operations('25', '', 'sqrt').result; 
        expect(act).toBe(response);
    });
});

describe('POW Operation', () => {
    test('return 5 squared', () => {
        const response = 25; 
        const act = operations('5', '', 'pow').result; 
        expect(act).toBe(response);
    });
});
describe('Fraction Operation', () => {
    test('return result of 1/2', () => {
        const response = 0.5; 
        const act = operations('2', '', 'fraction').result; 
        expect(act).toBe(response);
    });
    test('insert a fraction in a sum', () => {
        const response = 0.2; 
        const act = operations('5', '10+', 'fraction').result; 
        expect(act).toBe(response);
    });
});