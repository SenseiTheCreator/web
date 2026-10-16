const Fahrenheit = document.getElementById("fahrenheit");
const Celsius = document.getElementById("celsius");

Fahrenheit.addEventListener("input", () => {
  const fahrenheitValue = parseFloat(fahrenheit.value);
  Celsius.value = ((5 / 9) * (fahrenheitValue - 32)).toFixed(2);
});

Celsius.addEventListener("input", () => {
  const celsiusValue = parseFloat(celsius.value);
  Fahrenheit.value = ((celsiusValue * 9) / 5 + 32).toFixed(2);
});

//task2

const textBox = document.getElementById("textBox");
const nextTaskBtn = document.getElementById("nextTaskBtn");
const checkBtn = document.getElementById("checkBtn");
const answerInput = document.getElementById("answer");
const questionText = document.getElementById("question");
const resultTextBox = document.getElementById("resultTextBox");
const MAX_ATTEMPTS = 10;

let correctCount = 0;
let totalCount = 0;
let answered = false;
let num1 = 0;
let num2 = 0;

function generateTask() {
  if (totalCount >= MAX_ATTEMPTS) return;
  num1 = Math.floor(Math.random() * 10) + 1;
  num2 = Math.floor(Math.random() * 10) + 1;
  questionText.textContent = `${num1} x ${num2} =`;
  answerInput.value = "";
  answerInput.disabled = false;
  resultTextBox.textContent = "";
  answered = false;
}

function updateScore() {
  const percent =
    totalCount === 0 ? 0 : Math.round((correctCount / totalCount) * 100);
  textBox.textContent = `Total score ${percent}% (${correctCount} correct answers out of ${totalCount})`;
}

function finishGame() {
  nextTaskBtn.disabled = true;
  checkBtn.disabled = true;
  answerInput.disabled = true;
  questionText.textContent = "Game Over";
  resultTextBox.textContent += ` You answered ${MAX_ATTEMPTS} questions.`;
}

function checkAnswer() {
  if (answered) return;

  const userAnswer = parseInt(answerInput.value, 10);
  if (isNaN(userAnswer)) {
    resultTextBox.textContent = "Please enter a number";
    return;
  }
  const correctAnswer = num1 * num2;
  answered = true;
  totalCount++;

  if (userAnswer === correctAnswer) {
    correctCount++;
    resultTextBox.textContent = "Correct!";
  } else {
    resultTextBox.textContent = `Error, the correct answer is «${correctAnswer}»`;
  }

  answerInput.disabled = true;
  updateScore();

  if (totalCount >= MAX_ATTEMPTS) {
    finishGame();
  }
}

nextTaskBtn.addEventListener("click", generateTask);
checkBtn.addEventListener("click", checkAnswer);

generateTask();
updateScore();
