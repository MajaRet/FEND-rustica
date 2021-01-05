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

/*  Traps focus between the given elements by listening for Tab or Shift + Tab
 *   and wrapping focus around if necessary.
 *
 *  Parameters:
 *  firstItem: the first focusable item in the modal or overlay
 *  lastItem: the last focusable item in the modal or overlay
 *  e: a keydown event
 */
function trapFocus(firstItem, lastItem, e) {
  if (e.key === "Tab") {
    if (e.shiftKey && document.activeElement === firstItem) {
      // wrap around backwards
      e.preventDefault();
      // Prevent the previous item from receiving focus
      lastNavOverlayItem.focus();
    } else if (!e.shiftKey && document.activeElement === lastItem) {
      // wrap around forwards
      e.preventDefault();
      // Prevent the next item from receiving focus
      firstNavOverlayItem.focus();
    }
  }
}

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

// When the website is scrolled down at all, the navigation turns solid.
// At least I think that's what the design says it should do.
function handleScrolling() {
  const nav = document.getElementById("navigation");
  if (window.pageYOffset) {
    nav.classList.remove("navigation--transparent");
    nav.classList.add("navigation--solid");
  } else {
    nav.classList.add("navigation--transparent");
    nav.classList.remove("navigation--solid");
  }
}

// Set up event handlers
menuButton.onclick = openMenu;
closeButton.onclick = closeMenu;
window.onscroll = handleScrolling;

// In case the page is already scrolled when it is (re-)loaded
handleScrolling();
