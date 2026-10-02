let orders = [
  {
    orderId: 1,
    customer: { name: "Vasyl Tkachenko", email: "vasyl.tkachenko@gmail.com" },
    items: [
      { productId: 1, name: "Product 1", price: 10, quantity: 2 },
      { productId: 2, name: "Product 2", price: 20, quantity: 1 },
    ],
    total: 40,
  },
  {
    orderId: 2,
    customer: { name: "Iryna Arabchuk", email: "iryna.arabchuk@gmail.com" },
    items: [{ productId: 3, name: "Product 3", price: 15, quantity: 3 }],
    total: 45,
  },
];

function getTotalSpentByCustomer(ordersArray, customerName) {
  return ordersArray
    .filter((order) => order.customer.name === customerName)
    .reduce((total, order) => total + order.total, 0);
}


let products = [
  { productId: 1, name: "Product 1", price: 10 },
  { productId: 2, name: "Product 2", price: 20 },
  { productId: 3, name: "Product 3", price: 15 },
];

let purchases = [
  { purchaseId: 1, productId: 1, quantity: 2 },
  { purchaseId: 2, productId: 2, quantity: 1 },
  { purchaseId: 3, productId: 3, quantity: 3 },
];

function getTotalSales(productsArray, purchasesArray) {
  return purchasesArray.reduce((sales, purchase) => {
    let product = productsArray.find(
      (p) => p.productId === purchase.productId,
    );
    if (product) {
      sales[product.name] =
        (sales[product.name] || 0) + product.price * purchase.quantity;
    }
    return sales;
  }, {});
}

let vasylTotal = getTotalSpentByCustomer(orders, "Vasyl Tkachenko");
let irynaTotal = getTotalSpentByCustomer(orders, "Iryna Arabchuk");
let sales = getTotalSales(products, purchases);

console.log(`Vasyl Tkachenko spent: ${vasylTotal}`);
console.log(`Iryna Arabchuk spent: ${irynaTotal}`);
console.log(sales);

document.getElementById("out1").innerHTML =
  `Vasyl Tkachenko spent: ${vasylTotal}<br>Iryna Arabchuk spent: ${irynaTotal}`;

let salesText = "";
for (let name in sales) {
  salesText += `${name}: ${sales[name]}<br>`;
}
document.getElementById("out2").innerHTML = salesText;
