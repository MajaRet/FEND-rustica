var navigation, focusableItems, firstItem, lastItem;

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
  trapFocusInMenu();
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
  releaseMenuFocusTrap();
}

// When the website is scrolled down at all, the navigation turns solid.
// At least I think that's what the design says it should do.
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

// Could be generalized with parameters, but we only need this keyboard trap for now.
function trapFocusInMenu() {
  firstItem.focus();
  navigation.addEventListener('keydown', trapFocus);
}

function releaseMenuFocusTrap() {
  navigation.removeEventListener('keydown', trapFocus);
}

// Listens for Tab or Shift + Tab and wraps focus around if necessary.
function trapFocus(e) {
  if (e.key == 'Tab') {
    if (e.shiftKey && document.activeElement === firstItem) {
      // wrap around backwards
      e.preventDefault();
      lastItem.focus();
    } else if (!e.shiftKey && document.activeElement === lastItem) {
      // wrap around forwards
      e.preventDefault();
      firstItem.focus();
    }
  }
}

function main() {
  var menuButton = document.getElementById('mobile-menu-button');
  var closeButton = document.getElementById('mobile-menu-close-button');

  // Set up event listeners
  menuButton.onclick = openMenu;
  closeButton.onclick = closeMenu;
  window.onscroll = handleScrolling;

  // Make sure that the mobile menu overlay is closed when a link is clicked in it.
  var menuLinks = document.querySelectorAll('.menu-link');
  menuLinks.forEach(function (el) {
    el.onclick = closeMenu;
  });

  // Initialize global variables
  navigation = document.getElementById('navigation');

  // All focusable items in the mobile menu overlay as an array.
  focusableItems = Array.prototype.slice.call(
    document.querySelectorAll('.menu-link, #mobile-menu-close-button'),
    0
  );

  firstItem = focusableItems[0];
  lastItem = focusableItems[focusableItems.length - 1];

  // In case the page is already scrolled when it is (re-)loaded
  handleScrolling();
}

window.onload = main;
