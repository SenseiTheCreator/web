function calculate() {
  let result = 6;

  if (true) {
    let result = 7;
    console.log(`Result within if: ${result}`);
  }
  console.log(`Result without if: ${result}`);
}
calculate();

const task2 = document.getElementById("task2");
task2.addEventListener("click", () => {
  const secretNumber = 15 % 10;
  const userInput = prompt("Enter a number between 0 and 9:");
  if (userInput < 0 || userInput > 9) {
    alert("Please enter a valid number between 0 and 9.");
    return;
  }
  if (userInput == secretNumber) {
    alert("Correct!");
  } else {
    alert("Wrong!");
  }
});

const task3 = document.getElementById("task3");
task3.addEventListener("click", () => {
  let name = prompt("Enter your name:");
  let firstNumber = prompt("Enter your first number:");
  let secondNumber = prompt("Enter your second number:");
  let sum = parseInt(firstNumber) + parseInt(secondNumber);
  if (name === null || firstNumber === null || secondNumber === null) return;
  if (
    name.trim() === "" ||
    firstNumber.trim() === "" ||
    secondNumber.trim() === "" ||
    isNaN(firstNumber) ||
    isNaN(secondNumber)
  ) {
    alert("Please enter valid values.");
    return;
  } else {
    console.log(
      `Hello, ${name}! The sum of ${firstNumber} and ${secondNumber} is: ${sum}`,
    );
  }
});
