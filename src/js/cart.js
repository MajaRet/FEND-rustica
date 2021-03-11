import Overlay from "./overlay";
import { formatPrice } from "./product-util";
import * as Database from "./query";

const openCartButton = document.querySelector(".open-cart-button");
const closeCartButton = document.querySelector(".close-cart-button");
const billingArea = document.querySelector(".cart__billing");
const cartOverlay = new Overlay(document.querySelector(".cart-overlay"));
// Counts how many items have been added since the last viewing of the cart.
let recentlyAddedCounter = 0;

let openCart;

function updateRecentlyAddedMessage() {
  const recentlyAddedMessage = document.querySelector(".cart .add-message");
  if (recentlyAddedCounter) {
    let was;
    let product;
    let fromOrTo;
    let action;

    if (Math.abs(recentlyAddedCounter) === 1) {
      was = "wurde";
      product = "Produkt";
    } else {
      was = "wurden";
      product = "Produkte";
    }

    if (recentlyAddedCounter < 0) {
      fromOrTo = "aus dem";
      action = "entfernt";
    } else {
      fromOrTo = "zum";
      action = "hinzugefügt";
    }

    recentlyAddedMessage.innerHTML = `${Math.abs(
      recentlyAddedCounter
    )} ${product} ${was} erfolgreich ${fromOrTo} Warenkorb ${action}.`;
    recentlyAddedMessage.classList.remove("u-hidden");
  } else {
    recentlyAddedMessage.classList.add("u-hidden");
  }
  recentlyAddedCounter = 0;
}

// Sets a class on the count's parent signaling that the cart is empty.
function emptyCart(cart) {
  cart.parentNode.classList.add("cart__product-count--empty");
  cart.parentNode.classList.remove("cart__product-count--nonempty");
}

// Sets a class on the count's parent signaling that the cart is not empty.
function fillCart(cart) {
  cart.parentNode.classList.add("cart__product-count--nonempty");
  cart.parentNode.classList.remove("cart__product-count--empty");
}

// Adds n to the cart counter.
function modifyCartItemCount(n) {
  const productCountElems = document.querySelectorAll(".cart__product-count");
  const productCount = parseInt(productCountElems[0].innerHTML, 10);
  productCountElems.forEach((el) => {
    const elem = el;
    elem.innerHTML = productCount + n;
    if (productCount + n <= 0) {
      emptyCart(elem);
    } else if (productCount === 0 && n > 0) {
      fillCart(elem);
    }
  });
  recentlyAddedCounter += n;
  if (cartOverlay.isOpen()) {
    updateRecentlyAddedMessage();
  }
}

/*
function incrementCartItemCount() {
  modifyCartItemCount(1);
  recentlyAddedCounter += 1;
}

function decrementCartItemCount() {
  modifyCartItemCount(-1);
}
*/

// Sets the cart count to n.
function setCartItemCount(n) {
  document.querySelectorAll(".cart__product-count").forEach((el) => {
    const elem = el;
    elem.innerHTML = n;
    if (n === 0) {
      emptyCart(elem);
    } else {
      fillCart(elem);
    }
  });
}

function getCartOverlay() {
  return cartOverlay;
}

// Set the cart counter to the number of products currently in the
// cart.
function initCartCounter() {
  setCartItemCount(
    Database.getCartData().reduce((total, item) => item.amount + total, 0)
  );
}

function closeCart() {
  cartOverlay.closeOverlay();
  closeCartButton.classList.add("u-hidden");
}

// Modifies the amount by the specified amount. Returns whether an entry was updated.
function modifyAmount(id, variantName, amount) {
  if (
    Database.update(
      (e) => {
        const entry = e;
        entry.amount += amount;
      },
      (e) => e.id === id && e.variantName === variantName
    )
  ) {
    modifyCartItemCount(amount);
    return true;
  }
  return false;
}

function updateCartProduct(container, product) {
  const currProduct = product;
  const node = document.createElement("p");
  node.innerHTML = `${product.productName}, ${product.variantName}, ${
    product.amount
  }, ${formatPrice(product.price)}`;

  // Make buttons to delete a product from the cart and to
  // increase or decrease the amount to buy.
  const deleteButton = document.createElement("button");
  const decreaseAmountButton = document.createElement("button");
  const increaseAmountButton = document.createElement("button");
  deleteButton.classList.add("product-button--delete");
  deleteButton.classList.add("icon-button");
  increaseAmountButton.classList.add("product-button--increase-amount");
  increaseAmountButton.classList.add("icon-button");
  decreaseAmountButton.classList.add("product-button--decrease-amount");
  decreaseAmountButton.classList.add("icon-button");

  // TODO: need the icon here.
  deleteButton.innerHTML = `x`;
  increaseAmountButton.innerHTML = ">";
  decreaseAmountButton.innerHTML = "<";

  // eslint-disable-next-line no-use-before-define
  deleteButton.onclick = removeFromCart.bind(
    null,
    product.id,
    product.variantName
  );

  decreaseAmountButton.addEventListener("click", () => {
    currProduct.amount = Math.max(0, product.amount - 1);

    if (currProduct.amount <= 0) {
      // eslint-disable-next-line no-use-before-define
      removeFromCart(currProduct.id, currProduct.variantName);
    } else {
      modifyAmount(currProduct.id, currProduct.variantName, -1);
      node.innerHTML = `${product.productName}, ${product.variantName}, ${
        product.amount
      }, ${formatPrice(product.price)}`;

      // eslint-disable-next-line no-use-before-define
      updateBilling();
    }
  });

  increaseAmountButton.addEventListener("click", () => {
    currProduct.amount += 1;
    // eslint-disable-next-line no-use-before-define
    modifyAmount(currProduct.id, currProduct.variantName, 1);

    node.innerHTML = `${product.productName}, ${product.variantName}, ${
      product.amount
    }, ${formatPrice(product.price)}`;

    // eslint-disable-next-line no-use-before-define
    updateBilling();
  });

  container.appendChild(node);
  container.appendChild(deleteButton);
  container.appendChild(decreaseAmountButton);
  container.appendChild(increaseAmountButton);
}

function updateCartProducts() {
  const container = document.querySelector(".cart__product-list");
  // Empty the container
  container.innerHTML = "";
  Database.read().forEach((product) => updateCartProduct(container, product));
  // Since the overlay has changed, it must be refreshed
  cartOverlay.refresh();
}

// Computes and displays the price information at the bottom of the cart.
function updateBilling() {
  // Compute price data (in cents)
  const data = Database.read(["price", "amount"]);
  const priceSum = data.reduce(
    (sum, product) => product.price * product.amount + sum,
    0
  );
  const shippingCost = priceSum > 0 ? 360 : 0;
  const totalCost = priceSum + shippingCost;

  // Display price data
  billingArea.querySelector(".price-sum").innerHTML = formatPrice(priceSum);
  billingArea.querySelector(".shipping").innerHTML = formatPrice(shippingCost);
  billingArea.querySelector(".total").innerHTML = formatPrice(totalCost);
}

function updateCart() {
  // Define the openCart function in the correct context
  openCart = function openShoppingCart() {
    // eslint-disable-next-line no-use-before-define
    displayCart();
    updateRecentlyAddedMessage();
    getCartOverlay().openOverlay();
    closeCartButton.classList.remove("u-hidden");
  };

  openCartButton.onclick = openCart;
}

function displayCart() {
  updateCartProducts();
  updateBilling();
  updateCart();
}

export function addToCart(id, variantName, amount = 1) {
  if (!modifyAmount(id, variantName, 1)) {
    Database.insertEntry({ id, variantName, amount });
    modifyCartItemCount(amount);
  }

  if (cartOverlay.isOpen()) {
    displayCart();
  } else {
    updateCart();
  }
}

export function removeFromCart(id, variantName) {
  const entry = Database.readCart(
    ["amount"],
    (e) => e.id === id && e.variantName === variantName
  );
  if (!entry) return;
  Database.deleteEntry((e) => e.id === id && e.variantName === variantName);
  modifyCartItemCount(-entry[0].amount);
  if (cartOverlay.isOpen()) {
    displayCart();
  } else {
    updateCart();
  }
}

export function initCart() {
  closeCartButton.onclick = closeCart;

  initCartCounter();
  updateCart();
}
