import * as Cart from "./cart";
import * as Products from "./product-util";

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
console.log(id);
const product = Products.getById(id);
console.log(product);
console.log(`Hello! I am the details page for ${id}`);

document.getElementById("product-name").innerHTML = product.productName;
document.getElementById("price-range").innerHTML = `${Products.formatPrice(
  product.price
)} - ${Products.formatPrice(product.price)}`;
const blurb = document.getElementById("blurb");
blurb.innerHTML = `${product.productName} ${blurb.innerHTML}`;
document.getElementById("description").innerHTML = product.description;

document.querySelector(".product-button--add").addEventListener("click", () => {
  Cart.addToCart(product.id);
});

Cart.initCartCounter();
