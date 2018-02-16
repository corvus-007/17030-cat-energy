window.addEventListener('DOMContentLoaded', function () {
  svg4everybody();

  var toggleMenu = document.querySelector('.main-nav__toggle');
  var mainNav = document.querySelector('.main-nav');

  mainNav.classList.remove('main-nav--no-js');

  if (toggleMenu) {
    toggleMenu.addEventListener('click', function (event) {
      event.preventDefault();
      mainNav.classList.toggle('main-nav--closed');
    });
  }
});
