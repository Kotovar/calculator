//переменные
let firstNumber = "";
let secondNumber = "";
let operation = false;
let input = document.getElementById("input");

let buttons = document.getElementById("panel");

const buttonValues = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  zero: 0,
};

// <Функции базовых операторов + , - , * , /
let addition = (a, b) => a + b;
let subtraction = (a, b) => a - b;
let multiplication = (a, b) => a * b;
let division = (a, b) => a / b;

//Основная функция калькулятор

let operate = (number1, number2, method) => method(number1, number2);

// alert(operate(5, 5, addition));
buttons.addEventListener("mouseover", function (e) {
  e.target.style.backgroundColor = "rgb(172, 163, 163)";
});

buttons.addEventListener("mouseout", function (e) {
  e.target.style.backgroundColor = "white";
});

buttons.addEventListener("mouseup", function (e) {
  e.target.style.backgroundColor = "white";
});

buttons.addEventListener("mousedown", function (e) {
  e.target.style.backgroundColor = "rgb(139, 132, 132)";
});

//вызывается, когда нажата соответствующая кнопка с цифрой для передачи данных в переменную и обновления экрана
function updateNumber(buttonValue) {
  if (operation) {
    firstNumber += buttonValue;
    input.value = firstNumber;
  } else {
    secondNumber += buttonValue;
    input.value = secondNumber;
  }
}

//функция для ввода значений с калькулятора
buttons.addEventListener("click", function (e) {
  if (e.target.className in buttonValues) {
    updateNumber(buttonValues[e.target.className]);
    return;
  }
  switch (e.target.className) {
    case "clear":
      firstNumber = "";
      secondNumber = "";
      operation = false;
      input.value = 0;
      break;
    case "backspace":
      firstNumber = "";
      secondNumber = "";
      let test = input.value;
      if (input.value.length == 1) {
        input.value = 0;
      } else {
        input.value = test.slice(0, test.length - 1);
        console.log(input.value);
      }
      break;
  }
});
