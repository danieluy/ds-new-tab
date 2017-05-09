// DOM cache
const link_card_headers = document.getElementsByClassName('link-card-header');
const context_menu = document.getElementById('context-menu');
const context_menu_background = document.getElementById('context-menu-background');


const showContextMenu = (evt) => {
  evt.preventDefault();
  const screen_width = window.innerWidth;
  const x = screen_width - evt.clientX < 200 ? evt.clientX : evt.clientX -= 200;
  const y = evt.clientY;
  context_menu.setAttribute('style', `display:inherit; top:${y}px; left:${x}px`);
  context_menu_background.setAttribute('style', 'display:inherit');
}


const hideContextMenu = (evt) => {
  evt.preventDefault();
  context_menu.setAttribute('style', 'display:none');
  context_menu_background.setAttribute('style', 'display:none');
}




// Event listeners
for (let i = 0; i < link_card_headers.length; i++) {
  link_card_headers[i].addEventListener('contextmenu', showContextMenu, false);
}
context_menu_background.addEventListener('click', hideContextMenu, false);
context_menu_background.addEventListener('contextmenu', hideContextMenu, false);

alert('lalala')