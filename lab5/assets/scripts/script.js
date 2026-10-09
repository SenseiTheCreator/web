const Fahrenheit = document.getElementById("Fahrenheit");
const Celsius = document.getElementById("Celsius");

Fahrenheit.addEventListener("input", () => {
    const fahrenheitValue = parseFloat(Fahrenheit.value);
    Celsius.value = ((5/9) * (fahrenheitValue - 32)).toFixed(2);
});

Celsius.addEventListener("input", () => {
    const celsiusValue = parseFloat(Celsius.value);
    Fahrenheit.value = ((celsiusValue * 9 / 5) + 32).toFixed(2);
});