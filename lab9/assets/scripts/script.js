const loader = document.getElementById("loader");
const answer = document.getElementById("answer");
const result = document.getElementById("result");

loader.style.display = "block";

// Task 4
function compareNumbers(num1, num2) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (num1 > num2) {
        resolve("Перше число більше");
      } else if (num1 < num2) {
        resolve("Друге число більше");
      } else {
        reject("Числа рівні");
      }
    }, 1000);
  });
}

compareNumbers(6, 7)
  .then((message) => {
    answer.textContent = message;
  })
  .catch((error) => {
    answer.textContent = error;
  })
  .finally(() => {
    loader.style.display = "none";
  });

// Task 5
let promises = [
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(Math.floor(Math.random() * 10) + 1);
    }, 1000);
  }),
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(Math.floor(Math.random() * 10) + 1);
    }, 2000);
  }),
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(Math.floor(Math.random() * 10) + 1);
    }, 3000);
  }),
];

Promise.all(promises)
  .then((values) => {
    const sum = values.reduce((acc, val) => acc + val, 0);
    result.textContent = `Сума: ${sum}`;
  })
  .catch((error) => {
    result.textContent = error;
  })
  .finally(() => {
    loader.style.display = "none";
  });