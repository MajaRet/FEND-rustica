// Clicking on the mobile menu button will open the navigation on the same page.
function openMenu() {
  var menuContainer = document.getElementById('navigation');
  var menuButton = document.getElementById('mobile-menu-button');
  var closeButton = document.getElementById('mobile-menu-close-button');

  menuContainer.classList.add('mobile-menu-open');
  closeButton.classList.remove('u-hidden');
  menuButton.classList.add('u-hidden');
  // Disable vertical scrolling
  document.body.classList.add('u-disable-scroll');
}

function closeMenu() {
  var menuContainer = document.getElementById('navigation');
  var menuButton = document.getElementById('mobile-menu-button');
  var closeButton = document.getElementById('mobile-menu-close-button');

  menuContainer.classList.remove('mobile-menu-open');
  closeButton.classList.add('u-hidden');
  menuButton.classList.remove('u-hidden');
  // Enable vertical scrolling
  document.body.classList.remove('u-disable-scroll');
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

var menuContainer, menuButton, closeButton;

function main() {
  var menuButton = document.getElementById('mobile-menu-button');
  var closeButton = document.getElementById('mobile-menu-close-button');

  // Set up event listeners
  menuButton.onclick = openMenu;
  closeButton.onclick = closeMenu;
  // When the website is scrolled down at all, the navigation turns solid.
  // At least I think that's what the design says it should do.
  window.onscroll = handleScrolling;

  // Make sure that the mobile menu overlay is closed when a link is clicked in it.
  var menuLinks = document.querySelectorAll('.menu-link');
  menuLinks.forEach(function (el) {
    el.onclick = closeMenu;
  });

  // In case the page is already scrolled when it is (re-)loaded
  handleScrolling();
}

window.onload = main;
