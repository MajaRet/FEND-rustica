import { getFocusableChildren, trapFocus } from "./focus";

export default class Overlay {
  constructor(overlayElem, openClassElem = overlayElem) {
    this.openClassElem = openClassElem;
    this.overlayElem = overlayElem;
    this.focusableNavOverlayItems = getFocusableChildren(overlayElem);
    [this.firstNavOverlayItem] = this.focusableNavOverlayItems;
    this.lastNavOverlayItem = this.focusableNavOverlayItems[
      this.focusableNavOverlayItems.length - 1
    ];

    // The overlay listens for Tab or Shift + Tab to trap focus.
    overlayElem.addEventListener(
      "keydown",
      trapFocus.bind(null, this.firstNavOverlayItem, this.lastNavOverlayItem)
    );

    // The overlay is initially hidden from view.
    this.overlayElem.ariaHidden = true;

    // Initially, the overlay links are not focusable.
    this.disableOverlayFocus();
  }

  // Activates the mobile menu keyboard trap.
  enableOverlayFocus() {
    this.focusableNavOverlayItems.forEach(function makeFocusable(e) {
      e.tabIndex = 0;
    });
    this.firstNavOverlayItem.focus();
  }

  // Disables the mobile menu keyboard trap.
  disableOverlayFocus() {
    this.focusableNavOverlayItems.forEach(function makeUnfocusable(e) {
      e.tabIndex = -1;
    });
  }

  openOverlay() {
    this.openClassElem.classList.add("overlay-open");
    this.overlayElem.ariaHidden = false;
    this.overlayElem.scrollTop = 0;

    // Disable vertical scrolling
    document.querySelector("html").classList.add("u-disable-scroll");

    // Trap focus in the overlay
    this.enableOverlayFocus();
  }

  closeOverlay() {
    this.openClassElem.classList.remove("overlay-open");
    this.overlayElem.ariaHidden = false;
    document.querySelector("html").classList.remove("u-disable-scroll");
    this.disableOverlayFocus();
  }
}
