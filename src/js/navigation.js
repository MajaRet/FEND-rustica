import trapFocus from "./util";

const menuContainer = document.getElementById("navigation");
const menuButton = document.getElementById("mobile-menu-button");
const closeButton = document.getElementById("mobile-menu-close-button");
const navigation = document.getElementById("navigation");
const focusableNavOverlayItems = Array.prototype.slice.call(
  document.querySelectorAll(".menu-link, #mobile-menu-close-button"),
  0
);
const [firstNavOverlayItem] = focusableNavOverlayItems;
const lastNavOverlayItem =
  focusableNavOverlayItems[focusableNavOverlayItems.length - 1];

// Partial application of trapFocus to trap focus in the menu overlay.
const trapMenuFocus = trapFocus.bind(
  null,
  firstNavOverlayItem,
  lastNavOverlayItem
);

// Activates the mobile menu keyboard trap.
function trapFocusInMenu() {
  firstNavOverlayItem.focus();
  navigation.addEventListener("keydown", trapMenuFocus);
}

// Disables the mobile menu keyboard trap.
function releaseMenuFocusTrap() {
  navigation.removeEventListener("keydown", trapMenuFocus);
}

// Clicking on the mobile menu button will open the navigation on the same page.
function openMenu() {
  menuContainer.classList.add("mobile-menu-open");
  closeButton.classList.remove("u-hidden");
  menuButton.classList.add("u-hidden");
  // Disable vertical scrolling
  document.body.classList.add("u-disable-scroll");
  // Enable focus trap
  trapFocusInMenu();
}

function closeMenu() {
  menuContainer.classList.remove("mobile-menu-open");
  closeButton.classList.add("u-hidden");
  menuButton.classList.remove("u-hidden");
  // Enable vertical scrolling
  document.body.classList.remove("u-disable-scroll");

  releaseMenuFocusTrap();
}

// Adds the mobile menu button's functionality.
function activateMenuButton() {
  menuButton.onclick = openMenu;
  closeButton.onclick = closeMenu;
}

export default activateMenuButton;
