// import { numOfProducts as nOP, cartSize as cS } from "./query";

// Returns the price, given in cents, formatted in euros.
export function formatPrice(priceInCents) {
  const euros = Math.floor(priceInCents / 100);
  const cents = priceInCents % 100;
  const formattedCents = cents < 10 ? `0${cents}` : cents;
  return `${euros},${formattedCents}€`;
}

/*
// Expose selected database functions to other modules importing this module.
export const numOfProducts = nOP;
export const cartSize = cS;
*/

/*
export function getByIndex(i) {
  return productData[i];
}
*/

// Normally, this should be exactly the id'th item, but it's better
// not to rely on that.
// export function getById(id) {}

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

// A pretty string for a price range.
export function showPriceRange(priceRange) {
  return `${formatPrice(priceRange.min)} - ${formatPrice(priceRange.max)}`;
}
