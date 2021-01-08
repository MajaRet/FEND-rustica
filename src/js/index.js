import initNavigation from "./navigation";

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
window.onscroll = handleScrolling;
// Activate the functionality of the mobile menu button
initNavigation();

// In case the page is already scrolled when it is (re-)loaded
handleScrolling();
