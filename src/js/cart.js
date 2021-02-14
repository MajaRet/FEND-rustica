import Overlay from "./overlay";

const openCartButton = document.querySelector(".open-cart-button");
const closeCartButton = document.querySelector(".close-cart-button");
let cartOverlay;

// Adds n to the cart counter.
export function modifyCartItemCount(n) {
  const productCountElems = document.querySelectorAll(".cart__product-count");
  const productCount = parseInt(productCountElems[0].innerHTML, 10);
  productCountElems.forEach((el) => {
    const elem = el;
    elem.innerHTML = productCount + n;
  });
}

export function incrementCartItemCount() {
  modifyCartItemCount(1);
}

// Not currently in use. Will be used later.

export function decrementCartItemCount() {
  modifyCartItemCount(-1);
}

// Sets the cart count to n.
export function setCartItemCount(n) {
  document.querySelectorAll(".cart__product-count").forEach((el) => {
    const elem = el;
    elem.innerHTML = n;
  });
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

export function addToCart(productId) {
  const jsonObj = getCart();
  const jsonCart = jsonObj.productList;
  if (jsonCart.includes(productId)) {
    console.log("Das Produkt ist bereits im Warenkorb.");
  } else {
    jsonCart.push(productId);
    incrementCartItemCount();
    console.log(`Added item ${productId} to cart.`);
  }
  localStorage.setItem("cart", JSON.stringify(jsonObj));
}

export function removeFromCart(productId) {
  const jsonObj = getCart();
  const jsonCart = jsonObj.productList;
  if (!jsonCart.includes(productId)) {
    console.log("Das Produkt ist nicht im Warenkorb.");
  } else {
    // Remove the given id from the list of products in the cart
    jsonObj.productList = jsonCart.filter((e) => e !== productId);
    decrementCartItemCount();
    console.log(`Removed item ${productId} from the cart.`);
  }
  localStorage.setItem("cart", JSON.stringify(jsonObj));
}

// Set the cart counter to the number of products currently in the
// cart.
export function initCartCounter() {
  const cart = getCartProducts();
  setCartItemCount(cart.length);
}

function openCart() {
  cartOverlay.openOverlay();
  closeCartButton.classList.remove("u-hidden");
}

function closeCart() {
  cartOverlay.closeOverlay();
  closeCartButton.classList.add("u-hidden");
}

export function initCart() {
  console.log("Initializing cart");
  cartOverlay = new Overlay(document.querySelector(".cart-overlay"));

  initCartCounter();

  openCartButton.addEventListener("click", openCart);
  closeCartButton.addEventListener("click", closeCart);
}
