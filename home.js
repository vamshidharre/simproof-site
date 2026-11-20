// Native scrolling and controls stay available without JavaScript.
const menuButton = document.querySelector('.menu-toggle');
const mainNav = document.getElementById('main-nav');
if (menuButton && mainNav) {
  menuButton.hidden = false;
  document.documentElement.classList.add('has-menu');
  function closeMenu() {
    menuButton.setAttribute('aria-expanded', 'false');
    mainNav.classList.remove('is-open');
  }
  menuButton.addEventListener('click', () => {
    const expanded = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!expanded));
    mainNav.classList.toggle('is-open', !expanded);
  });
  mainNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      menuButton.focus();
    }
  });
}
