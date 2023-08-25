//переменные
let firstNumber = "";
let secondNumber = "";
let operation = false;
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

// <Функции базовых операторов + , - , * , /
let addition = (a, b) => a + b;
let subtraction = (a, b) => a - b;
let multiplication = (a, b) => a * b;
let division = (a, b) => a / b;

//Основная функция калькулятор

let operate = (number1, number2, method) => method(number1, number2);

// функция для смены подсветки активной клавиши
let events = ["mouseover", "mouseout", "mouseup", "mousedown"];
let colors = ["rgb(172, 163, 163)", "white", "white", "rgb(139, 132, 132)"];
events.forEach((event, index) => {
  buttons.addEventListener(event, function (e) {
    e.target.style.backgroundColor = colors[index];
  });
});

//вызывается, когда нажата соответствующая кнопка с цифрой для передачи данных в переменную и обновления экрана
function updateNumber(buttonValue) {
  if (!operation) {
    firstNumber += buttonValue;
    input.value = firstNumber;
  } else {
    secondNumber += buttonValue;
    input.value = secondNumber;
  }
  console.log("1 number " + firstNumber);
  console.log("2 number " + secondNumber);
}

//функция сброса
let clear = () => {
  firstNumber = "";
  secondNumber = "";
  operation = false;
  input.value = 0;
  temporaryScreen.textContent = "";
};

//функция для ввода значений с калькулятора
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
      let test = input.value;
      if (secondNumber == "" && firstNumber.length > 1) {
        firstNumber = firstNumber.slice(0, firstNumber.length - 1);
        input.value = test.slice(0, test.length - 1);
        console.log(firstNumber);
      } else if (secondNumber == "" && firstNumber.length == 1) {
        firstNumber = "";
        input.value = 0;
        console.log(firstNumber);
      } else if (firstNumber.length > 0 && secondNumber.length > 1) {
        secondNumber = secondNumber.slice(0, secondNumber.length - 1);
        input.value = test.slice(0, test.length - 1);
        console.log(secondNumber);
      } else if (secondNumber.length == 1 && firstNumber.length > 0) {
        secondNumber = "";
        input.value = 0;
        console.log(firstNumber);
      }
      break;
    case "plus":
      if (operation) {
        firstNumber = operate(
          Number(firstNumber),
          Number(secondNumber),
          addition
        );
        firstNumber = firstNumber.toString();
        secondNumber = "";
      }
      operation = true;
      input.value = 0;
      temporaryScreen.textContent = firstNumber;
      console.log("1 number " + firstNumber);
      console.log("2 number " + secondNumber);
      console.log(operation);
      break;
  }
});
