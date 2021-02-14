import { addToCart } from "./cart";
import * as Products from "./product-util";

function displayProducts() {
  const productContainer = document.querySelector(".product-container");
  const coffeeImage = productContainer.querySelector(".coffee-image img");
  const icons = productContainer.querySelectorAll(".icons img");

  // TODO: This is terrible. Change it.
  const coffeeImagePath = coffeeImage.src;
  const iconPaths = Array.prototype.map.call(icons, (icon) => icon.outerHTML);
  // Remove image source path information.
  productContainer.innerHTML = "";

  const numOfProducts = Products.numOfProducts();

  const productsElement = document.createElement("div");
  productsElement.classList = ["products"];

  for (let i = 0; i < numOfProducts; i += 4) {
    const productGroupElement = document.createElement("DIV");
    productGroupElement.classList = ["section--selection__group-of-four"];

    for (let j = i; j < Math.min(i + 4, numOfProducts); j += 1) {
      const productElement = document.createElement("DIV");
      productElement.classList = ["section--selection__elem"];

      const product = Products.getByIndex(j);
      const priceRange = Products.getPriceRange(product);
      const productHtml = `<div class="section--selection__elem">
        <div class="coffee-img">
          <img
            src=${coffeeImagePath}
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
                ${iconPaths.join("\n")}
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
        variantAddButton.innerHTML = variant.name;
        variantAddButton.addEventListener("click", () =>
          addToCart(product.id, variant.name)
        );
        addButtonContainer.appendChild(variantAddButton);
      });
    }
    productsElement.appendChild(productGroupElement);
  }
  document.querySelector("main").appendChild(productsElement);
}

displayProducts();
