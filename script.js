//переменные
let firstNumber = "";
let secondNumber = "";
let start_operation = false;
let operation;
let input = document.getElementById("input");
let temporaryScreen = document.getElementById("right_view");
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

// Функции базовых операторов + , - , * , /
let addition = (a, b) => a + b;
let subtraction = (a, b) => a - b;
let multiplication = (a, b) => a * b;
let division = (a, b) => a / b;

// функции для не числовых клавиш
let clear = () => {
  firstNumber = "";
  secondNumber = "";
  start_operation = false;
  input.value = 0;
  temporaryScreen.textContent = "";
};

let buttonBackspace = function () {
  let test = input.value;
  if (firstNumber.length > 1 && secondNumber == "") {
    firstNumber = firstNumber.slice(0, firstNumber.length - 1);
    input.value = test.slice(0, test.length - 1);
    console.log(firstNumber);
  } else if (firstNumber.length == 1 && secondNumber == "") {
    firstNumber = "";
    input.value = 0;
    console.log(firstNumber);
  } else if (firstNumber.length > 0 && secondNumber.length > 1) {
    secondNumber = secondNumber.slice(0, secondNumber.length - 1);
    input.value = test.slice(0, test.length - 1);
    console.log(secondNumber);
  } else if (firstNumber.length > 0 && secondNumber.length == 1) {
    secondNumber = "";
    input.value = 0;
    console.log(firstNumber);
  }
};

let buttonPlus = function () {
  if (start_operation) {
    firstNumber = operate(Number(firstNumber), Number(secondNumber), operation);
    firstNumber = firstNumber.toString();
    secondNumber = "";
  }
  operation = addition;
  start_operation = true;
  input.value = 0;
  temporaryScreen.textContent = firstNumber;
};

let buttonSubtract = function () {
  if (start_operation) {
    firstNumber = operate(Number(firstNumber), Number(secondNumber), operation);
    firstNumber = firstNumber.toString();
    secondNumber = "";
  }
  operation = subtraction;
  start_operation = true;
  input.value = 0;
  temporaryScreen.textContent = firstNumber;
};

//Основная функция калькулятор
let operate = (number1, number2, method) => method(number1, number2);

//вызывается, когда нажата соответствующая кнопка с цифрой для передачи данных в переменную и обновления экрана
function updateNumber(buttonValue) {
  if (!start_operation) {
    firstNumber += buttonValue;
    input.value = firstNumber;
  } else {
    secondNumber += buttonValue;
    input.value = secondNumber;
  }
  console.log("1 number " + firstNumber);
  console.log("2 number " + secondNumber);
}

//функция для нажатия клавиш
buttons.addEventListener("click", function (e) {
  if (e.target.className in buttonValues) {
    updateNumber(buttonValues[e.target.className]);
    return;
  }
  switch (e.target.className) {
    case "clear":
      clear();
      break;
    case "backspace":
      buttonBackspace();
      break;
    case "plus":
      buttonPlus();
      break;
    case "subtract":
      buttonSubtract();
      break;
  }
});

//функция для ручного ввода цифр
input.addEventListener("change", function () {
  start_operation ? (secondNumber = input.value) : (firstNumber = input.value);
});

// функция для смены подсветки активной клавиши
let events = ["mouseover", "mouseout", "mouseup", "mousedown"];
let colors = ["rgb(172, 163, 163)", "white", "white", "rgb(139, 132, 132)"];
events.forEach((event, index) => {
  buttons.addEventListener(event, function (e) {
    e.target.style.backgroundColor = colors[index];
  });
});
