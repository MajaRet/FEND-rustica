import productData from "../products.json";

// Returns the price, given in cents, formatted in euros.
export function formatPrice(priceInCents) {
  const euros = Math.floor(priceInCents / 100);
  const cents = priceInCents % 100;
  return `${euros},${cents}€`;
}

export function numOfProducts() {
  return productData.length;
}

export function getByIndex(i) {
  return productData[i];
}

// Normally, this should be exactly the id'th item, but it's better
// not to rely on that.
export function getById(id) {
  const numId = parseInt(id, 10);
  console.log(`Looking for ${typeof id}`);
  for (let i = 0; i < productData.length; i += 1) {
    console.log(`Current id: ${typeof productData[i].id}`);
    if (productData[i].id === numId) return productData[i];
  }
  return null;
}
