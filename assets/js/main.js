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
    navbar.classList.add("scrolled");
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
  AOS.init({ duration: 1000, once: false, easing: "ease-in-out" });

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


// --- BOTTOM SCOPE (Immediate Initialization) ---
// Note: We use jQuery's shorthand here to match original site logic for carousels
$(document).ready(function() {
  if ($(".owl-carousel").not('.reels-grid').length) {
    $(".owl-carousel").not('.reels-grid').owlCarousel({
      items: 3, loop: true, margin: 15, nav: true, dots: true, autoplay: true,
      responsive: { 0: { items: 1 }, 600: { items: 2 }, 1000: { items: 3 } }
    });
  }

  if ($('.reels-grid').length) {
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
});

  // Anchor smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
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

// --- GALLERY FLOATING IMAGES LOGIC ---
let imageIndex = 0;
const galleryImages = [
  './assets/images/home/home-gallery-pool.jpg',
  './assets/images/home/home-gallery-bedroom.jpg',
  './assets/images/home/home-gallery-living-area.jpg',
  './assets/images/home/home-gallery-lounge.jpg',
  './assets/images/home/home-gallery-bar.jpg',
  './assets/images/home/home-gallery-kids.jpg',
  './assets/images/home/home-gallery-food-plate.jpg',
  './assets/images/home/home-gallery-staff.jpg'
];

function createFloatingImage() {
  if (window.innerWidth < 768) return;
  const container = document.getElementById('floatingContainer');
  if (!container) return;
  const existingImgs = document.querySelectorAll('.floating-img');
  if (existingImgs.length > 4) return;

  const img = document.createElement('img');
  img.src = galleryImages[imageIndex];
  imageIndex = (imageIndex + 1) % galleryImages.length;
  img.className = 'floating-img';

  let posX, posY, isOverlapping = true, attempts = 0;
  while (isOverlapping && attempts < 15) {
    const side = Math.floor(Math.random() * 4);
    if (side === 0) { // Left
      posX = Math.random() * 10; 
      posY = 5 + Math.random() * 60; 
    }
    else if (side === 1) { // Right
      posX = 70 + Math.random() * 15; 
      posY = 5 + Math.random() * 60; 
    }
    else if (side === 2) { // Top
      posX = 15 + Math.random() * 60; 
      posY = 2 + Math.random() * 15; 
    }
    else { // Bottom (Keep it visible)
      posX = 15 + Math.random() * 60; 
      posY = 55 + Math.random() * 10; 
    }
    
    isOverlapping = Array.from(existingImgs).some(exImg => {
      const exLeft = parseFloat(exImg.style.left);
      const exTop = parseFloat(exImg.style.top);
      return Math.abs(exLeft - posX) < 30 && Math.abs(exTop - posY) < 30;
    });
    attempts++;
  }

  // Adjusted sizing: Smaller icons at the bottom to ensure visibility
  const baseWidth = posY > 50 ? 240 + Math.random() * 60 : 300 + Math.random() * 80;
  img.style.width = `${baseWidth}px`;

  img.style.left = `${posX}%`;
  img.style.top = `${posY}%`;
  img.style.transform = `rotate(${(Math.random() - 0.5) * 15}deg)`;
  container.appendChild(img);
  setTimeout(() => img.classList.add('active'), 100);
  setTimeout(() => {
    img.classList.remove('active');
    setTimeout(() => img.remove(), 1500);
  }, 4500);
}

if (document.getElementById('floatingContainer')) {
  setInterval(createFloatingImage, 2500);
}



