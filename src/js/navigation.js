import trapFocus from "./util";

const navigation = document.getElementById("navigation");
const menuButton = document.getElementById("mobile-menu-button");
const menuOverlay = document.querySelector(".nav--overlay");
const closeButton = document.getElementById("mobile-menu-close-button");
const focusableNavOverlayItems = Array.prototype.slice.call(
  document.querySelectorAll(
    ".nav--overlay .menu-link, #mobile-menu-close-button"
  ),
  0
);
const [firstNavOverlayItem] = focusableNavOverlayItems;
const lastNavOverlayItem =
  focusableNavOverlayItems[focusableNavOverlayItems.length - 1];

let navBarTransparent = true;
let transparentNavBarEnabled;

// Partial application of trapFocus to trap focus in the menu overlay.
const trapMenuFocus = trapFocus.bind(
  null,
  firstNavOverlayItem,
  lastNavOverlayItem
);

// Activates the mobile menu keyboard trap.
function enableOverlayFocus() {
  focusableNavOverlayItems.forEach(function makeFocusable(e) {
    e.tabIndex = 0;
  });
  firstNavOverlayItem.focus();
}

// Disables the mobile menu keyboard trap.
function disableOverlayFocus() {
  focusableNavOverlayItems.forEach(function makeUnfocusable(e) {
    e.tabIndex = -1;
  });
}

// Clicking on the mobile menu button will open the navigation on the same page.
function openMenu() {
  navigation.classList.add("mobile-menu-open");
  closeButton.classList.remove("u-hidden");
  menuButton.classList.add("u-hidden");
  // Disable vertical scrolling
  document.querySelector("html").classList.add("u-disable-scroll");

  menuOverlay.ariaHidden = false;
  // Scroll to the top of the menu overlay in case it was scrolled down before.
  menuOverlay.scrollTop = 0;

  // Trap focus in the overlay
  enableOverlayFocus();
}

function closeMenu() {
  navigation.classList.remove("mobile-menu-open");
  closeButton.classList.add("u-hidden");
  menuButton.classList.remove("u-hidden");
  // Enable vertical scrolling
  document.querySelector("html").classList.remove("u-disable-scroll");

  menuOverlay.ariaHidden = true;

  disableOverlayFocus();
}

// When the website is scrolled down at all, the navigation turns solid white.
export function handleNavigationScrolling() {
  if (window.pageYOffset && navBarTransparent) {
    navigation.classList.remove("nav--transparent");
    navigation.classList.add("nav--solid");
    navBarTransparent = false;
  } else if (!window.pageYOffset && transparentNavBarEnabled) {
    navigation.classList.add("nav--transparent");
    navigation.classList.remove("nav--solid");
    navBarTransparent = true;
  }
}

function initNavBarAppearance() {
  // If the header contains a header image, the navigation
  // bar should be transparent if the page is not scrolled down.
  transparentNavBarEnabled = document.querySelector(".header--image") !== null;
  if (transparentNavBarEnabled && !window.pageYOffset) {
    navigation.classList.add("nav--transparent");
  } else {
    navigation.classList.add("nav--solid");
  }
}
function initNavigation() {
  // Adds the mobile menu button's functionality.
  menuButton.onclick = openMenu;
  closeButton.onclick = closeMenu;
  // The overlay listens for Tab or Shift + Tab to trap focus.
  menuOverlay.addEventListener("keydown", trapMenuFocus);
  // Initially, the overlay links are not focusable.
  disableOverlayFocus();
  initNavBarAppearance();
}

export default initNavigation;
