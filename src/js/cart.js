import Overlay from "./overlay";
import { getByIndex, formatPrice } from "./product-util";

const openCartButton = document.querySelector(".open-cart-button");
const closeCartButton = document.querySelector(".close-cart-button");
const billingArea = document.querySelector(".cart__billing");
const cartOverlay = new Overlay(document.querySelector(".cart-overlay"));
// Counts how many items have been added since the last viewing of the cart.
let recentlyAddedCounter = 0;

// Sets a class signaling that the cart is empty.
function emptyCart(cart) {
  cart.classList.add("cart__product-count--empty");
  cart.classList.remove("cart__product-count--nonempty");
}

// Sets a class signaling that the cart is not empty.
function fillCart(cart) {
  cart.classList.add("cart__product-count--nonempty");
  cart.classList.remove("cart__product-count--empty");
}

// Adds n to the cart counter.
export function modifyCartItemCount(n) {
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
}

export function incrementCartItemCount() {
  modifyCartItemCount(1);
  recentlyAddedCounter += 1;
}

export function decrementCartItemCount() {
  modifyCartItemCount(-1);
}

// Sets the cart count to n.
export function setCartItemCount(n) {
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

// Creates an empty cart.
export function createEmptyCart() {
  return {
    productList: [],
  };
}

// Reads the cart from local storage and parses it, or creates
// an empty cart if no cart currently exists.
export function getCart() {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : createEmptyCart();
}

export function getCartProducts() {
  return getCart().productList;
}

// Returns a reference to the object, or null if it is not
// in the product list.
function getProductVariant(productList, id, name) {
  const queryResult = productList.filter(
    (product) => product.id === id && product.name === name
  );
  return queryResult.length ? queryResult[0] : null;
}

// Set the cart counter to the number of products currently in the
// cart.
export function initCartCounter() {
  const cart = getCartProducts();
  setCartItemCount(cart.length);
}

function openCart() {
  // Updates the cart
  // eslint-disable-next-line no-use-before-define
  updateCart();
  getCartOverlay().openOverlay();
  closeCartButton.classList.remove("u-hidden");
  recentlyAddedCounter = 0;
}

function closeCart() {
  cartOverlay.closeOverlay();
  closeCartButton.classList.add("u-hidden");
}

// Returns the price of a given variant.
function getVariantData(product) {
  const baseProduct = getByIndex(product.id);
  const variantList = baseProduct.variants.filter(
    (v) => v.name === product.name
  );
  if (variantList.length > 0) {
    const variant = variantList[0];
    return {
      productName: baseProduct.productName,
      description: baseProduct.description,
      name: variant.name,
      price: variant.price,
      weight: variant.weight,
      amount: product.amount,
    };
  }
  return null;
}

function updateCartProduct(container, product) {
  const currProduct = product;
  // A product including all variants.
  const p = getVariantData(product);
  const node = document.createElement("p");
  node.innerHTML = `${p.productName}, ${p.name}, ${p.amount}, ${formatPrice(
    p.price * p.amount
  )}`;

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

  // TODO: need the icon here. Paths, yuck.
  deleteButton.innerHTML = `x`;
  increaseAmountButton.innerHTML = ">";
  decreaseAmountButton.innerHTML = "<";

  // eslint-disable-next-line no-use-before-define
  deleteButton.onclick = removeFromCart.bind(null, product);

  // TODO: That doesn't work. I need to put it into localStorage.
  decreaseAmountButton.addEventListener("click", () => {
    currProduct.amount = Math.max(0, product.amount - 1);
    // TODO: display new amount by getting the amount element from the DOM
  });

  increaseAmountButton.addEventListener("click", () => {
    currProduct.amount = product.amount + 1;
    // TODO: display new amount by getting the amount element from the DOM
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
  getCartProducts().forEach((product) => updateCartProduct(container, product));
  // Since the overlay has changed, it must be refreshed
  cartOverlay.refresh();
}

// Computes and displays the price information at the bottom of the cart.
function updateBilling() {
  // Compute price data (in cents)
  const priceSum = getCartProducts().reduce((sum, product) => {
    const { price, amount } = getVariantData(product);
    return price * amount + sum;
  }, 0);
  const shippingCost = priceSum > 0 ? 360 : 0;
  const totalCost = priceSum + shippingCost;

  // Display price data
  billingArea.querySelector(".price-sum").innerHTML = formatPrice(priceSum);
  billingArea.querySelector(".shipping").innerHTML = formatPrice(shippingCost);
  billingArea.querySelector(".total").innerHTML = formatPrice(totalCost);
}

function updateCart() {
  document.querySelector(".cart .add-message").innerHTML = recentlyAddedCounter;
  updateCartProducts();
  updateBilling();

  // Put the button listener into the correct context
  openCartButton.onclick = openCart;
}

export function addToCart(productId, variantName, amount = 1) {
  console.log(`Add ${variantName} of ${productId} ${amount} times to cart.`);
  const jsonObj = getCart();
  const jsonCart = jsonObj.productList;
  const product = getProductVariant(jsonCart, productId, variantName);
  if (product) {
    product.amount += amount;
  } else {
    jsonCart.push({ id: productId, name: variantName, amount });
    incrementCartItemCount();
  }
  localStorage.setItem("cart", JSON.stringify(jsonObj));
  updateCart();
}

export function removeFromCart(product) {
  const jsonObj = getCart();
  const jsonCart = jsonObj.productList;
  const newProductList = jsonCart.filter(
    (p) => !(p.id === product.id && p.name === product.name)
  );
  if (newProductList.length === jsonCart.length) {
    console.log("Das Produkt ist nicht im Warenkorb.");
  } else {
    // Remove the given id from the list of products in the cart
    jsonObj.productList = newProductList;
    decrementCartItemCount();
    localStorage.setItem("cart", JSON.stringify(jsonObj));
    updateCart();
  }
}

export function initCart() {
  closeCartButton.onclick = closeCart;

  initCartCounter();
  updateCart();
}
