function* randomGenerator(min, max) {
  while (true) {
    const number = Math.floor(Math.random() * (max - min + 1)) + min;
    yield number;
  }
}

// питаєм межі у юзера
let min = Number(prompt("Enter minimum number:", 1));
let max = Number(prompt("Enter maximum number:", 100));

// екземпляр генератора
const gen = randomGenerator(min, max);

const button = document.getElementById("next");
const out = document.getElementById("out");

out.textContent = `Range: ${min} – ${max}. Press the button!`;

button.addEventListener("click", () => {
  const result = gen.next();
  out.textContent = `Random number: ${result.value}`;
});
