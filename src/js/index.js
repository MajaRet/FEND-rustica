import initNavigation, { handleNavigationScrolling } from "./navigation";

function handleScrolling() {
  handleNavigationScrolling();
}

// Set up event handlers
window.onscroll = handleScrolling;
// Activate the functionality of the mobile menu button
initNavigation();

// In case the page is already scrolled when it is (re-)loaded
handleScrolling();
