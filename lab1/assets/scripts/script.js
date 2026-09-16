const task1 = document.getElementById("task1");
task1.addEventListener("click", () => {
    alert("Default window");
    const output = document.getElementById("output");
    const name = "Tkachenko Vasyl";
    output.textContent = `Hello, ${name}!`;
});

const task2 = document.getElementById("task2");
task2.addEventListener("click", () => {
    const name = "Vasyl";
    const list = document.getElementById("name-list");
    list.textContent = "";

    name.split("").forEach(letter => {
        const li = document.createElement("li");
        li.textContent = letter;
        li.addEventListener("mouseenter", () => {
            alert(`Letter: ${letter}`);
        });
        list.appendChild(li);
    });
});

const task3 = document.getElementById("task3");
task3.addEventListener("click", () => {
    const output = document.getElementById("output");

    while (true) {
        const surname = prompt("Enter surname:");
        if (surname === null) break;
        const firstname = prompt("Enter first name:");
        if (firstname === null) break;

        const p = document.createElement("p");
        p.textContent = `${surname} ${firstname}`;
        output.appendChild(p);
    }
});

const task4 = document.getElementById("task4");
task4.addEventListener("click", () => {
    const letters = document.getElementById("letters");

    if (letters.children.length > 0) {
        letters.textContent = "";
        return;
    }

    const surname = "Tkachenko";

    for (const letter of surname) {
        const div = document.createElement("div");
        div.textContent = letter;
        div.addEventListener("mouseenter", () => {
            alert(`This is letter ${letter}`);
        });
        letters.appendChild(div);
    }
});