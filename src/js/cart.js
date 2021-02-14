import Overlay from "./overlay";
import { getByIndex, formatPrice } from "./product-util";

const openCartButton = document.querySelector(".open-cart-button");
const closeCartButton = document.querySelector(".close-cart-button");
const billingArea = document.querySelector(".cart__billing");
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
  cartOverlay.openOverlay();
  closeCartButton.classList.remove("u-hidden");
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

function displayProduct(container, product) {
  // A product including all variants.
  const p = getVariantData(product);
  const node = document.createElement("p");
  node.innerHTML = `${p.productName}, ${p.name}, ${p.amount}, ${formatPrice(
    p.price * p.amount
  )}`;
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("product-button--delete");
  deleteButton.classList.add("icon-button");

  // TODO: need the icon here. Paths, yuck.
  deleteButton.innerHTML = `x`;
  deleteButton.addEventListener("click", () => {
    // eslint-disable-next-line no-use-before-define
    removeFromCart(product);
  });
  container.appendChild(node);
  container.appendChild(deleteButton);
}

function displayProducts() {
  const container = document.querySelector(".cart__product-list");
  // Empty the container
  container.innerHTML = "";
  getCartProducts().forEach((product) => displayProduct(container, product));
}

// Computes and displays the price information at the bottom of the cart.
function displayBilling() {
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
    console.log(`Added item ${productId} to cart.`);
  }
  localStorage.setItem("cart", JSON.stringify(jsonObj));
  displayProducts();
  displayBilling();
}

export function removeFromCart(product) {
  const jsonObj = getCart();
  const jsonCart = jsonObj.productList;
  console.log(jsonCart);
  console.log(product);
  console.log(jsonCart.includes(product));
  const newProductList = jsonCart.filter(
    (p) => !(p.id === product.id && p.name === product.name)
  );
  if (newProductList.length === jsonCart.length) {
    console.log("Das Produkt ist nicht im Warenkorb.");
  } else {
    // Remove the given id from the list of products in the cart
    jsonObj.productList = newProductList;
    decrementCartItemCount();
    console.log(`Removed item ${product} from the cart.`);
    localStorage.setItem("cart", JSON.stringify(jsonObj));
    displayProducts();
    displayBilling();
  }
}

export function initCart() {
  cartOverlay = new Overlay(document.querySelector(".cart-overlay"));

  initCartCounter();
  displayProducts();
  displayBilling();

  openCartButton.addEventListener("click", openCart);
  closeCartButton.addEventListener("click", closeCart);
}
