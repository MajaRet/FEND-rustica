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

// Listens for Tab or Shift + Tab and wraps focus around if necessary.
function trapFocus(e) {
  if (e.key === "Tab") {
    if (e.shiftKey && document.activeElement === firstNavOverlayItem) {
      // wrap around backwards
      e.preventDefault();
      // Prevent the previous item from receiving focus
      lastNavOverlayItem.focus();
    } else if (!e.shiftKey && document.activeElement === lastNavOverlayItem) {
      // wrap around forwards
      e.preventDefault();
      // Prevent the next item from receiving focus
      firstNavOverlayItem.focus();
    }
  }
}

// Could be generalized with parameters, but we only need this keyboard trap for now.
function trapFocusInMenu() {
  firstNavOverlayItem.focus();
  navigation.addEventListener("keydown", trapFocus);
}

function releaseMenuFocusTrap() {
  navigation.removeEventListener("keydown", trapFocus);
}

// Clicking on the mobile menu button will open the navigation on the same page.
function openMenu() {
  menuContainer.classList.add("mobile-menu-open");
  closeButton.classList.remove("u-hidden");
  menuButton.classList.add("u-hidden");
  // Disable vertical scrolling
  document.body.classList.add("u-disable-scroll");
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
