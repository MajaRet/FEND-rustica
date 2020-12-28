// Clicking on the mobile menu button will open the navigation on the same page.
function openMenu() {
  let menuContainer = document.querySelector('.navigation');
  menuContainer.classList.add('mobile-menu-window');
}

function handleScrolling() {
  let nav = document.getElementById('navigation');
  if (window.pageYOffset) {
    nav.classList.remove('navigation--transparent');
    nav.classList.add('navigation--solid');
  } else {
    nav.classList.add('navigation--transparent');
    nav.classList.remove('navigation--solid');
  }
}

function main() {
  // Set up event listeners
  var menuButton = document.querySelector('.mobile-menu-button');
  menuButton.onclick = openMenu;
  // When the website is scrolled down at all, the navigation turns solid.
  // At least I think that's what the design says it should do.
  window.onscroll = handleScrolling;

  // In case the page is already scrolled when it is (re-)loaded
  handleScrolling();
}

window.onload = main;
