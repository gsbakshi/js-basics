const defaultValue = 0;
let currentResult = defaultValue;
let storedCalculation = '';
let logEntries = [];

const getEnteredValue = () => {
    const value = userInput.value;
    if (value === '') {
        return parseInt(0);
    // } else if (typeof value !== 'number') {
    //     return;
    } else {
        return parseInt(userInput.value);
    }
};

const writeToEntriesLog = (calculation, result) => {
    const logEntry = {
        calculation: calculation,
        result: result,
    };
    logEntries.push(logEntry);
    console.log(logEntries);
};

const logCalculation = (operator, calculationStored, newValue) => {
    if (storedCalculation === '') {
        storedCalculation = `${newValue}`;
    } else if (operator === '*') {
        storedCalculation = `(${calculationStored}) ${operator} ${newValue}`;
    } else if (operator === '/') {
        storedCalculation = `(${calculationStored}) ${operator} ${newValue}`;
    } else if (operator === '=') {
        storedCalculation = `${newValue}`;
        writeToEntriesLog(calculationStored, newValue);
    } else {
        storedCalculation = `${calculationStored} ${operator} ${newValue}`;
    }
    outputResult(currentResult, storedCalculation);
};

const calculateResult = (operatorType) => {
    const enteredValue = getEnteredValue();
    let mathOperator;
    if (operatorType === 'add') {
        currentResult += enteredValue;
        mathOperator = '+';
    } else if (operatorType === 'subtract') {
        currentResult -= enteredValue;
        mathOperator = '-';
    } else if (operatorType === 'multiply') {
        currentResult *= enteredValue;
        mathOperator = '*';
    } else if (operatorType === 'divide') {
        currentResult /= enteredValue;
        mathOperator = '/';
    } else if (operatorType === 'equate') {
        mathOperator = '=';
    }
    logCalculation(mathOperator, storedCalculation, enteredValue);
};

const add = () => calculateResult('add');

const subtract = () => calculateResult('subtract');

const multiply = () => calculateResult('multiply');

const divide = () => calculateResult('divide');

const equate = () => calculateResult('equate');

addBtn.addEventListener('click', add);
subtractBtn.addEventListener('click', subtract);
multiplyBtn.addEventListener('click', multiply);
divideBtn.addEventListener('click', divide);
equalsToBtn.addEventListener('click', equate);

let calculationDescription = '';
