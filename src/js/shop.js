import scoopIcon from "../img/icons/Icon Kaffee Schaufel.svg";
import frenchPressIcon from "../img/icons/Icon French Press.svg";
import beanIcon from "../img/icons/Icon Kaffee Bohnen.svg";
import coffeeImagePath from "../img/FEND_Coffee_Costa-Rica 2.png";

import { addToCart } from "./cart";
import * as Products from "./product-util";
import * as Database from "./query";

function getIconName(path) {
  return path.substring(path.lastIndexOf("/") + 1, path.indexOf("."));
}

function createIconImages(iconPaths) {
  return iconPaths
    .map(
      (path) =>
        `<img src="${path}" alt="${getIconName(
          path
        )}", class="coffee-text__icon">`
    )
    .join(" ");
}

function displayProducts() {
  const productContainer = document.querySelector(".product-container");
  //  const coffeeImage = productContainer.querySelector(".coffee-image img");
  //  const icons = productContainer.querySelectorAll(".icons img");

  // TODO: This is terrible. Change it.
  const iconPaths = [beanIcon, frenchPressIcon, scoopIcon];
  const iconImages = createIconImages(iconPaths);
  // Remove image source path information.
  productContainer.innerHTML = "";

  const numOfProducts = Database.numOfProducts();

  const productsElement = document.createElement("div");
  productsElement.classList = ["products"];

  for (let i = 0; i < numOfProducts; i += 4) {
    const productGroupElement = document.createElement("DIV");
    productGroupElement.classList = ["section--selection__group-of-four"];

    for (let j = i; j < Math.min(i + 4, numOfProducts); j += 1) {
      const productElement = document.createElement("DIV");
      productElement.classList = ["section--selection__elem"];

      const product = Database.getProduct(j);
      const priceRange = Products.getPriceRange(product);
      const productHtml = `<div class="section--selection__elem">
        <div class="coffee-img">
          <img
            src="${coffeeImagePath}"
            alt="${product.productName} Kaffee"
          />
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
                ${iconImages}
              </div>
        </div>
        <div class="add-buttons"></div>
        <a href="product.html?id=${product.id}">Details</a>
      </div>`;
      productElement.innerHTML = productHtml;
      productGroupElement.appendChild(productElement);

      const addButtonContainer = productElement.querySelector(".add-buttons");
      product.variants.forEach((variant) => {
        // Create an add button for each variant
        const variantAddButton = document.createElement("button");
        variantAddButton.classList = ["product-button--add"];
        variantAddButton.innerHTML = variant.variantName;
        variantAddButton.addEventListener("click", () =>
          addToCart(product.id, variant.variantName)
        );
        addButtonContainer.appendChild(variantAddButton);
      });
    }
    productsElement.appendChild(productGroupElement);
  }
  document.querySelector("main").appendChild(productsElement);
}

displayProducts();
