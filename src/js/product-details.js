import * as Cart from "./cart";
import {
  getPriceRange,
  showPriceRange,
  generateProductHTML,
  combineInnerHTML,
} from "./product-util";
import * as Database from "./query";
import createSlider from "./slider";

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
const product = Database.getProduct(id);

document.getElementById("product-name").innerHTML = product.productName;
document.getElementById("price-range").innerHTML = showPriceRange(
  getPriceRange(product)
);
const blurb = document.getElementById("blurb");
blurb.innerHTML = `${product.productName} ${blurb.innerHTML}`;
document.getElementById("description").innerHTML = product.description;

const coffeeSelect = document.getElementById("coffee-selection");

product.variants.forEach((variant) => {
  const variantOption = document.createElement("option");
  variantOption.value = variant.variantName;
  coffeeSelect.appendChild(variantOption);
});

// Add the selected variant to the cart when the "Warenkorb" button is pressed.
document.getElementById("add-to-cart-button").addEventListener("click", () => {
  if (coffeeSelect.value !== coffeeSelect.options[0].value) {
    Cart.addToCart(product.id, coffeeSelect.value);
  }
});

const sliderContainer = document.querySelector(".product-slider");
const products = combineInnerHTML(generateProductHTML(4, `${id}`));
createSlider(sliderContainer, products);
