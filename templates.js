// Template for a product description.
// TODO Find out if the icons may change, in that case they
// may need to be passed as an argument list.
function generateSelectionData(originCountry, priceFrom, priceTo) {
  let html = `<div class="coffee-text__origin">${originCountry}</div>
  <div class="coffee-text__price-range">${priceFrom}€ - ${priceTo}€</div>
  <div class="coffee-text__icons">`;
  document.write(html);
  getSelectionIcons();
  document.write('</div>');
}
