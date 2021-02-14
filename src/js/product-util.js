import productData from "../products.json";

// Returns the price, given in cents, formatted in euros.
export function formatPrice(priceInCents) {
  const euros = Math.floor(priceInCents / 100);
  const cents = priceInCents % 100;
  const formattedCents = cents < 10 ? `0${cents}` : cents;
  return `${euros},${formattedCents}€`;
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
  for (let i = 0; i < productData.length; i += 1) {
    if (productData[i].id === numId) return productData[i];
  }
  return null;
}

// Returns the minimum and maximum price of a product.
export function getPriceRange(product) {
  return product.variants.reduce(
    (minmax, variant) => ({
      min: minmax.min ? Math.min(minmax.min, variant.price) : variant.price,
      max: Math.max(minmax.max, variant.price),
    }),
    { min: 0, max: 0 }
  );
}
