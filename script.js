//переменные
let firstNumber = "";
let secondNumber = "";
let start_operation = false;
let operation;
let lastOperation;
let dotUse = false;
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
  dot: ".",
};

// Функции базовых операторов + , - , * , /
let addition = (a, b) => a + b;
let subtraction = (a, b) => a - b;
let multiplication = (a, b) => a * b;
let division = (a, b) => a / b;

// функция сброс
let clear = () => {
  firstNumber = "";
  secondNumber = "";
  start_operation = false;
  input.value = 0;
  temporaryScreen.textContent = "";
};

//функция для замены знака -+
let buttonChange = function () {
  let signNumber = 1;
  signNumber = -signNumber;
  if (!start_operation) {
    firstNumber = firstNumber * signNumber;
    input.value = firstNumber;
  } else {
    secondNumber = secondNumber * signNumber;
    input.value = secondNumber;
  }
  signNumber = -signNumber;
};

//функция для кнопки =
let buttonEquals = function () {
  if (start_operation && secondNumber !== "") {
    let result = operate(Number(firstNumber), Number(secondNumber), operation);
    input.style.fontWeight = "bold";
    if (result % 1 !== 0 && lastOperation == division) {
      firstNumber = result.toFixed(7);
    } else if (result % 1 !== 0) {
      firstNumber = result.toFixed(5);
    } else {
      firstNumber = result;
    }
  }
  secondNumber = "";
  input.value = firstNumber;
};

//функция для backspace
let buttonBackspace = function () {
  firstNumber = firstNumber.toString();
  secondNumber = secondNumber.toString();
  if (firstNumber.length > 1 && secondNumber == "" && !start_operation) {
    firstNumber = firstNumber.slice(0, firstNumber.length - 1);
    input.value = firstNumber;
  } else if (firstNumber.length == 1 && secondNumber == "") {
    firstNumber = "";
    input.value = 0;
  } else if (firstNumber.length > 0 && secondNumber.length > 1) {
    secondNumber = secondNumber.slice(0, secondNumber.length - 1);
    input.value = secondNumber;
  } else if (firstNumber.length > 0 && secondNumber.length == 1) {
    secondNumber = "";
    input.value = 0;
  }
};

//функция для операций = - * /
let buttonAction = function (action) {
  if (start_operation && secondNumber !== "") {
    let result = operate(Number(firstNumber), Number(secondNumber), operation);
    if (result % 1 !== 0 && lastOperation == division) {
      firstNumber = result.toFixed(7);
    } else if (result % 1 !== 0) {
      firstNumber = result.toFixed(5);
    } else {
      firstNumber = result;
    }
  }
  if (firstNumber !== "") {
    operation = action;
    start_operation = true;
    input.value = 0;
    temporaryScreen.textContent = firstNumber;
  }
  secondNumber = "";
  lastOperation = action;
};

//Основная функция калькулятора с проверкой деления на 0 и некорректного ввода
let operate = (number1, number2, method) => {
  if (isNaN(number1) || isNaN(number2)) {
    alert("Ошибка: неверный формат числа");
    clear();
    return "";
  }
  if (method == division && number2 == 0) {
    alert("Ошибка: деление на ноль");
    clear();
    return "";
  }
  return method(number1, number2);
};

//вызывается, когда нажата соответствующая кнопка с цифрой для передачи данных в переменную и обновления экрана
function updateNumber(buttonValue) {
  if (buttonValue == ".") {
    if (!start_operation && firstNumber.indexOf(".") == -1) {
      input.value = firstNumber;
      firstNumber += buttonValue;
    } else if (start_operation && secondNumber.indexOf(".") == -1) {
      input.value = secondNumber;
      secondNumber += buttonValue;
    }
  } else if (!start_operation) {
    firstNumber += buttonValue;
    input.value = firstNumber;
  } else {
    secondNumber += buttonValue;
    input.value = secondNumber;
  }
}

//функция для нажатия клавиш
buttons.addEventListener("click", function (e) {
  input.style.fontWeight = "400";
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
      buttonAction(addition);
      break;
    case "subtract":
      buttonAction(subtraction);
      break;
    case "multiply":
      buttonAction(multiplication);
      break;
    case "divide":
      buttonAction(division);
      break;
    case "change":
      buttonChange();
      break;
    case "equals":
      buttonEquals();
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
