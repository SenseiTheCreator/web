let MyPromise = new Promise((resolve, reject) => {
    let x = 5;
    if (x >3) {
        resolve("Значення більше 3");
    } else {
        reject("Значення менше або дорівнює 3");
    }
})

MyPromise
    .then((result) => {
        console.log("Успішно: " + result);
    })
    .catch((error) => {
        console.log("Помилка: " + error);
});

function delay (ms) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(`Затримка ${ms} мс завершена`), ms);
    });
}

delay(1000)
    .then((message) => {
        console.log(message);
        return delay(500);
    })
    .then((message) => {
        console.log(message);
    })
    .catch((error) => {
        console.log("Помилка: " + error);
    });

let promise1 = new Promise((resolve) => setTimeout(() => resolve(10), 1000));
let promise2 = new Promise((resolve) => setTimeout(() => resolve(20), 2000));
let promise3 = new Promise((resolve) => setTimeout(() => resolve(30), 3000));

Promise.all([promise1, promise2, promise3])
    .then((values) => {
        console.log("Всі значення: " + values);
    })
    .catch((error) => {
        console.log("Помилка: " + error);
    });