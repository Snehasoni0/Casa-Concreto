// --- GSAP & LENIS SMOOTH SCROLL INITIALIZATION ---

// 1. Initialize Lenis Smooth Scroll (Only if library is loaded)
let lenis;
if (typeof Lenis !== 'undefined') {
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 2,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}

// Global Variables
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
    if(navbar) navbar.classList.add("scrolled");
  }
}

window.addEventListener("scroll", handleNavbar);
handleNavbar();

// --- GLOBAL SITE-WIDE ANIMATIONS ---

document.addEventListener('DOMContentLoaded', () => {

  // Register ScrollTrigger & Animations (Only if GSAP is loaded)
  if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Connect ScrollTrigger to Lenis if available
    if (lenis) {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    }

    // Site-wide Reveal (Fade Up)
    const revealElements = document.querySelectorAll('.lux-exp-header, .exp-list-row, .experience-grid, .footer-col');
    revealElements.forEach((el) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 50,
        duration: 1.2,
        ease: "power2.out"
      });
    });

    // Parallax Hero Zoom
    if (hero) {
      const heroImg = hero.querySelector('img') || hero.querySelector('video');
      if (heroImg) {
        gsap.to(heroImg, {
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: true
          },
          scale: 1.1,
          y: 50,
          ease: "none"
        });
      }
    }
  }

  // Navigation Logic
  const hamburger = document.querySelector('.hamburger');
  const closeBtn = document.querySelector('.close-menu');
  const menu = document.querySelector('.menu');
  const dropdownParents = document.querySelectorAll('.has-dropdown');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      menu.classList.add('active');
      hamburger.style.display = 'none';
      closeBtn.style.display = 'block';
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      menu.classList.remove('active');
      closeBtn.style.display = 'none';
      hamburger.style.display = 'block';
    });
  }

  dropdownParents.forEach(item => {
    item.addEventListener('click', () => {
      item.classList.toggle('open');
    });
  });

  // AOS Init
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 1000, once: false, easing: "ease-in-out" });
  }

  // Experience Slider
  const bg = document.querySelector(".experience-bg");
  if (document.querySelector(".experience-slider")) {
    const swiper = new Swiper(".experience-slider", {
      loop: true,
      speed: 1000,
      autoplay: { delay: 4000, disableOnInteraction: false },
      navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
      on: {
        init: function () { updateBackground(this); },
        slideChange: function () { updateBackground(this); },
      },
    });

    function updateBackground(swiperInstance) {
      const activeSlide = swiperInstance.slides[swiperInstance.activeIndex];
      const img = activeSlide.querySelector(".experience-image img");
      if (!img || !bg) return;
      bg.style.opacity = 0;
      setTimeout(() => {
        bg.style.backgroundImage = `url(${img.src})`;
        bg.style.opacity = 1;
        bg.style.transform = "scale(1.05)";
      }, 200);
    }
  }

  // Gallery Carousel Initialization
  if (window.jQuery && $(".gallery-carousel").length) {
    $(".gallery-carousel").owlCarousel({
      items: 3,
      loop: true,
      margin: 30,
      nav: true,
      dots: true,
      autoplay: true,
      autoplayTimeout: 5000,
      smartSpeed: 800,
      navText: ["<i class='fa-solid fa-chevron-left'></i>", "<i class='fa-solid fa-chevron-right'></i>"],
      responsive: {
        0: { items: 1, margin: 15 },
        768: { items: 2, margin: 20 },
        1024: { items: 3, margin: 30 }
      }
    });
  }

  // Gallery Modal Logic
  const modal = document.getElementById("galleryModal");
  const modalImg = document.getElementById("modalImg");
  const captionText = document.getElementById("modalCaption");
  const closeBtnModal = document.querySelector(".close-modal");

  if(window.jQuery) {
    $(".gallery-item-wrap").on("click", function() {
      const imgSrc = $(this).data("img");
      const title = $(this).data("title");
      
      if(modal && modalImg) {
        modal.style.display = "flex";
        modalImg.src = imgSrc;
        captionText.innerHTML = title;
        document.body.style.overflow = "hidden";
      }
    });
  }

  if(closeBtnModal) {
    closeBtnModal.onclick = function() {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  }

  // Other Carousels (Reels)
  if (window.jQuery && $('.reels-grid').length) {
    $('.reels-grid').owlCarousel({
      loop: true,
      margin: 20,
      autoplay: true,
      autoplayTimeout: 3000,
      autoplayHoverPause: true,
      nav: false,
      dots: false,
      responsive: {
        0: { items: 1 },
        600: { items: 2 },
        1000: { items: 4 }
      }
    });
  }

  // Anchor smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetSelection = this.getAttribute('href');
      if(targetSelection === "#") return;
      
      const target = document.querySelector(targetSelection);
      if (target) {
        if (typeof lenis !== 'undefined' && lenis) {
          lenis.scrollTo(target, { offset: -80 });
        } else {
          window.scrollTo({
            top: target.offsetTop - 80,
            behavior: "smooth"
          });
        }
      }
    });
  });
});