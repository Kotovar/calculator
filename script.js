//переменные
let firstNumber;
let secondNumber;
let operation;
let buttons = document.getElementById("panel");

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
