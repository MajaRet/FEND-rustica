function openMenu() {
  let menuContainer = document.querySelector('.navigation');
  menuContainer.classList.add('mobile-menu-window');
}

var menuButton = document.querySelector('.mobile-menu-button');
menuButton.onclick = openMenu;
