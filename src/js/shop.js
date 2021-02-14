import * as Cart from "./cart";
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
            ${Products.formatPrice(product.price)} - ${Products.formatPrice(
        product.price
      )}
          </div>
              <div class="coffee-text__icons">
                ${iconPaths.join("\n")}
              </div>
        </div>
        <button class="product-button--add">Hinzufügen</button> 
        <button class="product-button--remove">Entfernen</button> 
        <a href="product.html?id=${product.id}">Details</a>
      </div>`;
      productElement.innerHTML = productHtml;
      productGroupElement.appendChild(productElement);
      // Add add and remove functionality to the buttons
      productElement
        .querySelector(".product-button--add")
        .addEventListener("click", () => Cart.addToCart(product.id));
      productElement
        .querySelector(".product-button--remove")
        .addEventListener("click", () => Cart.removeFromCart(product.id));
    }
    productsElement.appendChild(productGroupElement);
  }
  document.querySelector("main").appendChild(productsElement);
}

displayProducts();
Cart.initCartCounter();
