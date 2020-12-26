// Contains the code for the used svgs. They can be included in the HTML
// and manipulated using CSS.

// TODO Rename them to "write[etc]" instead of get? That's more accurate.

// Inserts the vector code for the logo svg.
function getLogoSVG() {
  let svg = `<svg width="145" height="145" 
viewBox="0 0 145 145" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M72.4914 0L0 72.4914L72.4914 144.983L144.983 72.4914L72.4914 
0ZM14.7913 72.4914L72.4914 14.7913L130.191 72.4914L72.4914 130.191L14.7913 
72.4914Z" fill="black"/>
<path d="M72.4914 28.8414C55.6313 28.8414 40.2883 49.6493 40.2883 
72.4914C40.2883 95.3335 55.6313 116.141 72.4914 116.141C89.3515 116.141 
104.694 95.3335 104.694 72.4914C104.694 49.6493 89.3515 28.8414 72.4914 
28.8414ZM50.7698 72.4914C50.7698 62.4581 54.6487 52.5455 60.1136 
46.2014C59.5964 48.4942 59.3205 50.856 59.3205 53.2695C59.3205 61.9237 
62.6995 70.0606 68.8022 76.1806C76.8012 84.1796 77.3184 96.8506 70.371 
105.453C60.1653 103.539 50.7698 88.1619 50.7698 72.4914ZM84.852 
98.8158C87.1965 88.3343 84.3348 76.9219 76.1978 68.7849C68.1988 60.7859 
67.6816 48.115 74.6291 39.5125C84.8175 41.4434 94.2302 56.8208 94.2302 
72.4914C94.2302 82.5592 90.3341 92.489 84.852 98.8158Z" fill="black"/>
</svg>`;

  document.write(svg);
}

function getCoffeeBeansSVG() {
  let svg = `<svg width="18" height="20" viewBox="0 0 18 20" fill="none" 
  xmlns="http://www.w3.org/2000/svg">
    <path d="M10.6293 16.4031C11.4588 14.4166 10.0881 11.8761 7.56773 
    10.7287C5.04732 9.58125 2.33163 10.2615 1.50206 12.248C0.672496 
    14.2345 2.04319 16.775 4.5636 17.9224C7.08401 19.0699 9.7997 18.3896 
    10.6293 16.4031Z" stroke="white" stroke-miterlimit="10" 
    stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M1.83435 12.1525C1.83435 12.1525 4.03241 14.7046 5.74906 
    14.4786C7.46571 14.2527 8.39121 14.9579 10.3542 16.9139" stroke="white" 
    stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M7.11121 10.4418C7.13733 8.51309 8.91742 6.86489 11.3767 
    6.39342C14.0823 5.87519 16.5752 7.1844 16.9521 9.31576C17.329 11.4471 
    15.4407 13.5941 12.7351 14.1123C12.0596 14.2409 11.3954 14.2565 10.7759 
    14.1746" stroke="white" stroke-miterlimit="10" stroke-linecap="round" 
    stroke-linejoin="round"/>
    <path d="M16.7245 9.58849C16.7245 9.58849 13.5337 8.75465 12.2351 
    9.94307C10.9326 11.1315 9.91011 11.0691 7.23438 10.5899" stroke="white" 
    stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M7.26003 7.96968C9.74949 7.49243 11.4879 5.51491 11.1428 
    3.55276C10.7978 1.59062 8.49994 0.386875 6.01049 0.864128C3.52103 
    1.34138 1.78265 3.3189 2.1277 5.28105C2.47275 7.24319 4.77058 8.44693 
    7.26003 7.96968Z" stroke="white" stroke-miterlimit="10" 
    stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M10.9363 3.80609C10.9363 3.80609 7.99934 3.03848 6.80141 
    4.13339C5.60349 5.22829 4.54737 5.18543 2.08435 4.74513" stroke="white" 
    stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;

  document.write(svg);
}

function getCoffeeScoopSVG() {
  let svg = `<svg width="19" height="20" viewBox="0 0 19 20" fill="none" 
  xmlns="http://www.w3.org/2000/svg">
  <path d="M7.5924 17.1096C7.66795 16.0655 6.62495 15.1367 5.2628 
  15.0351C3.90065 14.9334 2.73517 15.6973 2.65962 16.7413C2.58407 17.7854 
  3.62707 18.7141 4.98922 18.8158C6.35137 18.9175 7.51685 18.1536 7.5924 
  17.1096Z" stroke="white" stroke-miterlimit="10" stroke-linecap="round" 
  stroke-linejoin="round"/>
  <path d="M2.80347 16.6425C2.80347 16.6425 4.23724 17.44 5.00344 
  17.047C5.77343 16.6579 6.31583 16.8235 7.54478 17.3899" stroke="white" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M5.00348 14.982C4.71142 14.0998 5.28796 13.048 6.36519 
  12.4239C7.55241 11.7342 8.92549 11.9153 9.43755 12.8245C9.94962 
  13.7338 9.40342 15.0282 8.2162 15.7179C7.92034 15.8912 7.6131 16.0068 
  7.30966 16.0723" stroke="white" stroke-miterlimit="10" 
  stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M9.37685 12.9825C9.37685 12.9825 7.74963 13.1366 7.3286 
  13.8956C6.90757 14.6546 6.41827 14.7971 5.08691 15.0283" stroke="white" 
  stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M4.68118 13.832C5.7723 13.1984 6.27503 12.0064 5.80406 
  11.1697C5.33309 10.3329 4.06677 10.1682 2.97565 10.8019C1.88453 11.4355 
  1.3818 12.6274 1.85277 13.4642C2.32374 14.3009 3.59006 14.4656 4.68118 
  13.832Z" stroke="white" stroke-miterlimit="10" stroke-linecap="round" 
  stroke-linejoin="round"/>
  <path d="M5.75069 11.3181C5.75069 11.3181 4.25244 11.4568 3.86555 
  12.158C3.47486 12.8592 2.97418 13.0171 1.74902 13.2252" stroke="white" 
  stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M3.78232 8.75658C5.03206 8.62011 5.96294 7.73255 5.8615 
  6.77417C5.76005 5.81579 4.6647 5.1495 3.41496 5.28597C2.16522 5.42245 
  1.23434 6.31 1.33578 7.26839C1.43722 8.22677 2.53258 8.89306 3.78232 
  8.75658Z" stroke="white" stroke-miterlimit="10" stroke-linecap="round" 
  stroke-linejoin="round"/>
  <path d="M5.75082 6.88758C5.75082 6.88758 4.32463 6.406 3.69119 
  6.89143C3.05775 7.37301 2.5381 7.31522 1.33191 7.01087" stroke="white" 
  stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M16.4039 17.1226C17.1627 16.1048 17.1645 14.8081 16.408 
  14.2262C15.6515 13.6443 14.4231 13.9976 13.6643 15.0154C12.9055 16.0331 
  12.9037 17.3299 13.6602 17.9118C14.4167 18.4937 15.6451 18.1403 16.4039 
  17.1226Z" stroke="white" stroke-miterlimit="10" stroke-linecap="round" 
  stroke-linejoin="round"/>
  <path d="M16.4169 14.3849C16.4169 14.3849 15.0931 15.113 15.0059 
  15.9105C14.9187 16.708 14.5166 17.0548 13.4735 17.7367" stroke="white" 
  stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M3.03491 14.2L4.35868 15.0976" stroke="white" 
  stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M7.57138 17.2743L9.28963 18.4417L15.1423 11.5993C16.5344 9.48423 
  16.0754 7.14952 13.993 5.7356L13.7844 5.59305C11.702 4.17912 8.86102 
  4.75702 7.47276 6.87213L5.12866 10.4358" stroke="white" 
  stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M3.03491 14.2L4.35868 15.0976" stroke="white" 
  stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M7.73828 17.3898L9.0355 18.2682L12.8172 12.5162C13.9361 10.8134 
  13.481 8.49406 11.8044 7.35753L11.6337 7.24195C9.95721 6.10542 7.6738 
  6.56774 6.55485 8.27061L5.12866 10.4397" stroke="white" 
  stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M14.7554 6.29042C14.7554 6.29042 17.6002 3.82472 17.9226 
  2.81148C18.245 1.79823 17.4561 1.26656 17.4561 1.26656C17.4561 1.26656 
  16.724 0.661694 15.8668 1.27427C15.0095 1.88684 13.5416 5.3812 13.5416 
  5.3812" stroke="white" stroke-miterlimit="10" stroke-linecap="round" 
  stroke-linejoin="round"/>
  </svg>
  `;

  document.write(svg);
}

function getFrenchPressSVG() {
  let svg = `<svg width="16" height="19" viewBox="0 0 16 19" fill="none" 
  xmlns="http://www.w3.org/2000/svg">
  <path d="M10.6721 18H3.99941C3.21393 18 2.57861 17.3902 2.57861 
  16.6363V5.505H12.0929V16.6363C12.0929 17.3902 11.4576 18 10.6721 18Z" 
  stroke="white" stroke-miterlimit="10" stroke-linecap="round" 
  stroke-linejoin="round"/>
  <path d="M12.093 3.85669H1C1 4.76582 1.76622 5.50126 2.71342 
  5.50126H12.0891V3.85669H12.093Z" stroke="white" stroke-miterlimit="10" 
  stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M12.0929 3.85676H2.57861V3.38372C2.57861 2.6298 3.21393 2.02002 
  3.99941 2.02002H10.6721C11.4576 2.02002 12.0929 2.6298 12.0929 
  3.38372V3.85676Z" stroke="white" stroke-miterlimit="10" 
  stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M8.11546 2.02H6.04395V1.99413C6.04395 1.44717 6.50599 1 7.0797 
  1C7.64956 1 8.11546 1.44348 8.11546 1.99413V2.02Z" stroke="white" 
  stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M13.4945 14.8883H12.0968V5.505H13.4945C14.3262 5.505 15 6.15175 
  15 6.95001V13.4433C15 14.2378 14.3262 14.8883 13.4945 14.8883Z" 
  stroke="white" stroke-miterlimit="10" stroke-linecap="round" 
  stroke-linejoin="round"/>
  <path d="M12.0929 11.0078H2.57861V12.1313H12.0929V11.0078Z" 
  stroke="white" stroke-miterlimit="10" stroke-linecap="round" 
  stroke-linejoin="round"/>
  <path d="M7.07971 5.64917V10.7307" stroke="white" stroke-miterlimit="10" 
  stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  `;

  document.write(svg);
}

function getBurgerMenuSVG() {
  let svg = `<svg width="24" height="16" viewBox="0 0 24 16" fill="none" 
  xmlns="http://www.w3.org/2000/svg">
  <path d="M0 2H23.5M0 8H23.5M0 14.5H16.5" stroke="white" stroke-width="3"/>
  </svg>
  `;

  document.write(svg);
}

function getSelectionIcons() {
  getCoffeeBeansSVG();
  getFrenchPressSVG();
  getCoffeeScoopSVG();
}
