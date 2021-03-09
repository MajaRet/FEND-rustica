import coffeeImagePath from "../img/FEND_Coffee_Costa-Rica 2.png";

import { addToCart } from "./cart";
import * as Products from "./product-util";
import * as Database from "./query";

// Include fs module
const fs = require("fs");

function createIcons(properties) {
  return properties
    .map((prop) => {
      // Switch statement because filenames must be static
      switch (prop) {
        case "mild":
          return fs.readFileSync("./src/img/icons/Icon Kaffee Schaufel.svg", {
            encoding: "utf8",
            flag: "r",
          });
        case "filtered":
          return fs.readFileSync("./src/img/icons/Icon French Press.svg", {
            encoding: "utf8",
            flag: "r",
          });
        case "ground":
          return fs.readFileSync("./src/img/icons/Icon Kaffee Bohnen.svg", {
            encoding: "utf8",
            flag: "r",
          });
        default:
          return "";
      }
    })
    .join(" ");
}

function displayProducts() {
  const productContainer = document.querySelector(".product-display");
  //  const coffeeImage = productContainer.querySelector(".coffee-image img");
  //  const icons = productContainer.querySelectorAll(".icons img");

  const products = Database.getProductData();
  const numOfProducts = products.length;

  for (let i = 0; i < numOfProducts; i += 4) {
    const productGroupElement = document.createElement("DIV");
    productGroupElement.classList = ["four-product-group"];

    for (let j = i; j < Math.min(i + 4, numOfProducts); j += 1) {
      const product = products[j];

      const productElement = document.createElement("A");
      productElement.href = `product.html?id=${product.id}`;
      productElement.classList = ["product"];

      const priceRange = Products.getPriceRange(product);
      const icons = createIcons(product.properties);
      const productHtml = `
        <div class="coffee-img">
          <img
            src="${coffeeImagePath}"
            alt="${product.productName} Kaffee"
          />
          <div class="add-buttons"></div>
        </div>
        <div class="coffee-text">
          <div class="coffee-text__origins subhead-m">
            ${product.productName}
          </div>
          <div class="coffee-text__price-range">
            ${Products.formatPrice(priceRange.min)} - ${Products.formatPrice(
        priceRange.max
      )}
          </div>
              <div class="coffee-text__icons">
                ${icons}
              </div>
        </div>`;
      productElement.innerHTML = productHtml;
      productGroupElement.appendChild(productElement);

      const addButtonContainer = productElement.querySelector(".add-buttons");
      product.variants.forEach((variant) => {
        // Create an add button for each variant
        const variantAddButton = document.createElement("button");
        variantAddButton.classList = ["product-button--add"];
        const variantButtonText = document.createElement("P");
        variantButtonText.innerHTML = variant.variantName;
        variantAddButton.appendChild(variantButtonText);
        variantAddButton.addEventListener("click", (e) => {
          addToCart(product.id, variant.variantName);
          e.preventDefault();
        });
        addButtonContainer.appendChild(variantAddButton);
      });
    }
    productContainer.appendChild(productGroupElement);
  }
}

displayProducts();
