"use strict";
const answerBoxOne = document.getElementById("answer-box1");
const answerBoxTwo = document.getElementById("answer-box2");
const btnArr = [];
let equation = [];
for (let i = 0; i < 18; i++) {
    btnArr.push(document.getElementById("btn" + i));
}
const calculateResult = () => {
    if (!answerBoxOne && !answerBoxTwo)
        return;
    // if there is only one element in equation just render the result
    if (answerBoxOne && answerBoxOne.innerHTML.length === 0) {
        equation.pop();
        if (equation.length === 1 && answerBoxTwo) {
            answerBoxOne.innerHTML = equation[0];
            answerBoxTwo.innerHTML = "";
            equation = [];
            return;
        }
    }
    // otherwise do the calculation
    if (answerBoxOne && answerBoxTwo) {
        //add last element to equation
        equation.push(answerBoxOne.innerHTML);
        // perform algorithm, three different parts: beginning, middle or end
        // start with *
        let arrMult = operate(equation, "*", "÷");
        //let arrDiv: string[] = operate(arrMult, "÷");
        let arrAdd = operate(arrMult, "+", "-");
        //let arrSub: string[] = operate(arrAdd, "-");
        answerBoxOne.innerHTML = arrAdd[0];
        answerBoxTwo.innerHTML = "";
        equation = [];
    }
};
const operate = (equation, operator1, operator2) => {
    // need to know original starting and ending index in equation,
    // start at i = 1
    let j;
    let k;
    let newArr = [];
    while (equation.includes(operator1) || equation.includes(operator2)) {
        for (let i = 1; i < equation.length - 1; i++) {
            if (equation[i] === operator1 || equation[i] === operator2) {
                j = i - 1;
                k = i + 1;
                // turn both new indexes to numbers
                let operand1 = parseFloat(convertToString(equation[j]));
                let operand2 = parseFloat(convertToString(equation[k]));
                let result;
                // either * or division / + or -
                if (equation[i] === operator1) {
                    if (operator1 === "÷")
                        result = operand1 / operand2;
                    else if (operator1 === "*")
                        result = operand1 * operand2;
                    else if (operator1 === "+")
                        result = operand1 + operand2;
                    else
                        result = operand1 - operand2;
                }
                else {
                    if (operator2 === "÷")
                        result = operand1 / operand2;
                    else if (operator2 === "*")
                        result = operand1 * operand2;
                    else if (operator2 === "+")
                        result = operand1 + operand2;
                    else
                        result = operand1 - operand2;
                }
                let finalFormat = new Intl.NumberFormat("en-US", {
                    maximumFractionDigits: 20,
                }).format(result);
                //push result and rest of array
                newArr.push(finalFormat);
                for (let m = k + 1; m <= equation.length - 1; m++)
                    newArr.push(equation[m]);
                //reset equation and newArr
                equation = newArr;
                newArr = [];
                break;
            }
            let removedElement = equation[i - 1];
            if (removedElement)
                newArr.push(removedElement);
        }
    }
    return equation;
};
/**
 * renders and formats literals
 * @param btn
 * @returns
 */
const register = (btn) => {
    if (!answerBoxOne)
        return;
    const inputElement = btn.innerText;
    const currentOperand = answerBoxOne.innerHTML;
    const formattedStr = convertToString(currentOperand + inputElement);
    if (answerBoxOne.innerHTML.length >= 20) {
        alert("You have reached the maximum number length");
        return;
    }
    // change txt-field to number
    console.log(formattedStr);
    let num = parseFloat(formattedStr);
    let finalFormat = new Intl.NumberFormat("en-US", {
        maximumFractionDigits: 20,
    }).format(num);
    answerBoxOne.innerHTML = finalFormat;
};
/**
 *
 * @param num formatted with commas
 */
const convertToString = (num) => {
    return num.replace(/,/g, "");
};
const renderDecimal = (btn) => {
    if (!answerBoxOne)
        return;
    // check if decimal already in string
    let currentOperand = answerBoxOne.innerHTML;
    if (currentOperand.includes(btn.innerText))
        return;
    currentOperand += btn.innerText;
    answerBoxOne.innerHTML = currentOperand;
};
const deleteCharacter = () => {
    if (answerBoxOne && answerBoxOne.innerHTML.length >= 1) {
        let newResult = answerBoxOne.innerHTML.substring(0, answerBoxOne.innerHTML.length - 1);
        answerBoxOne.innerHTML = newResult;
    }
};
const allClear = () => {
    if (answerBoxOne && answerBoxTwo) {
        answerBoxOne.innerHTML = "";
        answerBoxTwo.innerHTML = "";
        equation = [];
    }
};
const clearOne = (txtBox) => {
    if (txtBox) {
        txtBox.innerHTML = "";
        return true;
    }
    return false;
};
const renderOperator = (btn) => {
    if (!answerBoxTwo || !answerBoxOne)
        return;
    // get operator and number from box2
    const operator = ` ${btn.innerText} `;
    const pureOperator = btn.innerText;
    let value = answerBoxOne.innerText;
    console.log(pureOperator);
    // if the value is 1 then its only an operator
    if (value.length === 0 && equation.length === 0)
        return;
    // if user wants to correct operator
    if (answerBoxOne.innerHTML === "") {
        equation[equation.length - 1] = pureOperator;
        // update values
        let updatedResult = answerBoxTwo.innerHTML.substring(0, answerBoxTwo.innerHTML.length - 2) +
            pureOperator +
            " ";
        answerBoxTwo.innerHTML = updatedResult;
        return;
    }
    // move first operand up and reset it then
    equation.push(value);
    equation.push(pureOperator);
    answerBoxTwo.innerHTML += value + operator;
    clearOne(answerBoxOne);
    console.log(equation);
};
const reverseWords = (str) => {
    if (str.length === 0)
        return "";
    return str[str.length - 1] + reverseWords(str.substring(0, str.length - 1));
};
//# sourceMappingURL=index.js.map