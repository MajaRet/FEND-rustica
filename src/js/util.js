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
      lastItem.focus();
    } else if (!e.shiftKey && document.activeElement === lastItem) {
      // wrap around forwards
      e.preventDefault();
      // Prevent the next item from receiving focus
      firstItem.focus();
    }
  }
}

export default trapFocus;
