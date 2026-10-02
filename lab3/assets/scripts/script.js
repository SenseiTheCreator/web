function* randomGenerator(min, max) {
  while (true) {
    yield Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

let min = Number(prompt("Enter min number:"));
let max = Number(prompt("Enter max number:"));

let generator = randomGenerator(min, max);

document.getElementById("next").addEventListener("click", function () {
  let number = generator.next().value;
  document.getElementById("out").textContent = `Random number: ${number}`;
});

function* passwordGenerator() {
  let password = "";

  while (true) {
    let symbol = yield;

    if (symbol === "done") {
      return password;
    }

    password += symbol;
  }
}

let passGen = passwordGenerator();
passGen.next();

let result = passGen.next(prompt("Enter a symbol (or 'done' to finish):"));

while (!result.done) {
  result = passGen.next(prompt("Enter a symbol (or 'done' to finish):"));
}

alert(`Your password: ${result.value}`);
console.log(`Your password: ${result.value}`);

function* chatBot() {
  let name = yield "Hi! What is your name?";
  yield `Nice to meet you, ${name}! How are you?`;
  yield "Goodbye!";
}

let bot = chatBot();

let step = bot.next();

while (!step.done) {
  if (step.value === "Goodbye!") {
    alert(step.value);
    step = bot.next();
  } else {
    let answer = prompt(step.value);
    step = bot.next(answer);
  }
}

let userName = prompt("Enter your name:");

let user = {
  name: userName,
  say() {
    alert(`Hello, ${this.name}`);
  },
};

document.getElementById("hello").onclick = user.say.bind(user);
