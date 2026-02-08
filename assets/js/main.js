const navbar = document.querySelector(".custom-navbar");
const hero = document.getElementById("hero-banner");

window.addEventListener("scroll", () => {
  const heroHeight = hero.offsetHeight;

  if (window.scrollY > heroHeight - 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});


document.addEventListener('DOMContentLoaded', () => {

  const hamburger = document.querySelector('.hamburger');
  const closeBtn = document.querySelector('.close-menu');
  const menu = document.querySelector('.menu');
  const dropdownParents = document.querySelectorAll('.has-dropdown');

  hamburger.addEventListener('click', () => {
    menu.classList.add('active');
    hamburger.style.display = 'none';
    closeBtn.style.display = 'block';
  });

  closeBtn.addEventListener('click', () => {
    menu.classList.remove('active');
    closeBtn.style.display = 'none';
    hamburger.style.display = 'block';
  });

  dropdownParents.forEach(item => {
    item.addEventListener('click', () => {
      item.classList.toggle('open');
    });
  });

});


$(document).ready(function () {
  $(".owl-carousel").owlCarousel({
    items: 3,
    loop: true,
    margin: 15,
    nav: true,
    dots: true,
    dotsEach: 1,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    responsive: {
      0: { items: 1 },
      600: { items: 2 },
      1000: { items: 3 }
    }
  });
});
