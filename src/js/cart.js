// Adds n to the cart counter.
export function modifyCartItemCount(n) {
  const productCountElem = document.querySelector(".cart__product-count");
  const productCount = parseInt(productCountElem.innerHTML, 10);
  productCountElem.innerHTML = productCount + n;
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
  document.querySelector(".cart__product-count").innerHTML = n;
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
