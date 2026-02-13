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



// console.log("hello")

const galleryItem = document.querySelectorAll(".gallery-item");
const modal = document.getElementById("galleryModal");
const modalImg = document.getElementById("modalImage");
const closeModal = document.querySelector(".close-modal");

galleryItem.forEach((item) => {

  item.addEventListener("click", () => {
    const img = item.querySelector("img");
    modal.classList.add("active");
    modalImg.src = img.src;
  });

});

// close icon
closeModal.addEventListener("click", () => {
  modal.classList.remove("active");
});

// overlay click
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("active");
  }
});


$('.reels-grid').owlCarousel({
  loop: true,
  margin: 20,
  autoplay: true,
  autoplayTimeout: 3000,
  autoplayHoverPause: true,
  nav: false,
  dots: false,

  responsive: {
    0: {
      items: 1
    },
    600: {
      items: 2
    },
    1000: {
      items: 4
    }
  }
});





