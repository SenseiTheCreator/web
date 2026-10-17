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


// task3

const scoreBox3 = document.getElementById("score3");
const nextBtn3 = document.getElementById("nextBtn3");
const questionBox3 = document.getElementById("question3");
const optionsBox3 = document.getElementById("options3");
const resultBox3 = document.getElementById("result3");

const MAX_ATTEMPTS_3 = 10;

let correctCount3 = 0;
let totalCount3 = 0;
let answered3 = false;
let correctAnswer3 = 0;

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateOptions3(correct) {
    const options = [correct];
    while (options.length < 4) {
        const x = randomInt(1, 100);
        if (!options.includes(x)) options.push(x);
    }
    for (let i = options.length - 1; i > 0; i--) {
        const j = randomInt(0, i);
        [options[i], options[j]] = [options[j], options[i]];
    }
    return options;
}

function renderOptions3(options) {
    optionsBox3.textContent = "";

    options.forEach((value) => {
        const label = document.createElement("label");
        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "answer3";
        radio.value = value;
        radio.addEventListener("change", checkAnswer3);

        label.appendChild(radio);
        label.appendChild(document.createTextNode(" " + value));
        optionsBox3.appendChild(label);
    });
}

function generateTask3() {
    if (totalCount3 >= MAX_ATTEMPTS_3) return;

    const num1 = randomInt(1, 10);
    const num2 = randomInt(1, 10);
    correctAnswer3 = num1 * num2;

    questionBox3.textContent = `${num1} × ${num2} =`;
    renderOptions3(generateOptions3(correctAnswer3));
    resultBox3.textContent = "";
    answered3 = false;
}

function updateScore3() {
    const percent = totalCount3 === 0 ? 0 : Math.round(correctCount3 / totalCount3 * 100);
    scoreBox3.textContent =
        `Total score ${percent}% (${correctCount3} correct answers out of ${totalCount3})`;
}

function finishGame3() {
    nextBtn3.disabled = true;
    resultBox3.textContent += ` Game over: you answered ${MAX_ATTEMPTS_3} questions.`;
}

function checkAnswer3(event) {
    if (answered3) return;
    answered3 = true;

    const userAnswer = parseInt(event.target.value, 10);
    totalCount3++;

    if (userAnswer === correctAnswer3) {
        correctCount3++;
        resultBox3.textContent = "Correct!";
    } else {
        resultBox3.textContent = `Error, correct answer is «${correctAnswer3}»`;
    }

    optionsBox3.querySelectorAll("input").forEach((r) => (r.disabled = true));

    updateScore3();

    if (totalCount3 >= MAX_ATTEMPTS_3) {
        finishGame3();
    }
}

nextBtn3.addEventListener("click", generateTask3);

generateTask3();
updateScore3();