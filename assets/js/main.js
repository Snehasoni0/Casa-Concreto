const navbar = document.querySelector(".custom-navbar");
const hero = document.getElementById("hero-banner");

function handleNavbar() {
  if (hero) {
    const heroHeight = hero.offsetHeight;

    if (window.scrollY > heroHeight - 100) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

  } else {
    // pages without hero banner
    navbar.classList.add("scrolled");
  }
}

/* run once when page loads */
handleNavbar();

/* run on scroll */
window.addEventListener("scroll", handleNavbar);


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


  AOS.init({
    duration: 1000,
    once: false,
    easing: "ease-in-out",
  });

  const bg = document.querySelector(".experience-bg");

  const swiper = new Swiper(".experience-slider", {
    loop: true,
    speed: 1000,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    on: {
      init: function () {
        updateBackground(this);
      },
      slideChange: function () {
        updateBackground(this);
      },
    },
  });

  function updateBackground(swiperInstance) {

    const activeSlide =
      swiperInstance.slides[swiperInstance.activeIndex];

    const img = activeSlide.querySelector(".experience-image img");

    if (!img) return;

    bg.style.opacity = 0;

    setTimeout(() => {
      bg.style.backgroundImage = `url(${img.src})`;
      bg.style.opacity = 1;
      bg.style.transform = "scale(1.05)";
    }, 200);
  }

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

closeModal.addEventListener("click", () => {
  modal.classList.remove("active");
});

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

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    const target = document.querySelector(targetId);

    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: "smooth"
      });
    }
  });
});



