// --- GSAP & LENIS SMOOTH SCROLL INITIALIZATION ---

// 1. Initialize Lenis Smooth Scroll (Only if library is loaded)
let lenis;
if (typeof Lenis !== 'undefined') {
  lenis = new Lenis({
    lerp: 0.1, // Softer interpolation for better stability
    wheelMultiplier: 0.9, // Slightly slower scroll to prevent rendering lag
    gestureOrientation: 'vertical',
    smoothWheel: true,
    infinite: false,
  });

  // Use GSAP ticker if available for smoother synchronization, otherwise fallback to standard raf
  if (typeof gsap !== 'undefined') {
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
  } else {
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }
}

// Global Variables
const navbar = document.querySelector(".custom-navbar");
const hero = document.getElementById("hero-banner");

let heroHeight = 0;
if (hero) {
  heroHeight = hero.offsetHeight;
  window.addEventListener("resize", () => {
    heroHeight = hero.offsetHeight;
  });
}

let scrollTimeout;
function handleNavbar() {
  if (scrollTimeout) return;
  
  scrollTimeout = requestAnimationFrame(() => {
    if (heroHeight > 0) {
      if (window.scrollY > heroHeight - 100) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    } else if (navbar && window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
    scrollTimeout = null;
  });
}

window.addEventListener("scroll", handleNavbar, { passive: true });
handleNavbar();

// --- GLOBAL SITE-WIDE ANIMATIONS ---

document.addEventListener('DOMContentLoaded', () => {

  // Register ScrollTrigger & Animations (Only if GSAP is loaded)
  if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    
    // Ensure accurate metrics
    ScrollTrigger.config({ limitCallbacks: true });

    // Connect ScrollTrigger to Lenis if available
    if (lenis) {
      lenis.on('scroll', ScrollTrigger.update);
    }

    // Site-wide Reveal (Fade Up)
    const revealElements = document.querySelectorAll('.lux-exp-header, .exp-list-row, .experience-grid');
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
    AOS.init({ 
      duration: 600, // Faster duration
      once: true, 
      easing: "ease-out-quad",
      disable: 'mobile',
      offset: 100, // Trigger sooner
      throttleDelay: 99, // Performance boost
      debounceDelay: 50 // Performance boost
    });
    
    // Refresh AOS when everything is loaded
    window.addEventListener('load', () => {
      AOS.refresh();
      if(typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
    });
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

  // --- THEMED ROOMS ROTATION & FLOATING EFFECT ---
  const rooms = document.querySelectorAll('.room-item');
  if (rooms.length > 0 && window.innerWidth > 991) {
    // 1. Initial Data Capture
    let roomData = Array.from(rooms).map(room => ({
      img: room.querySelector('img').src,
      title: room.querySelector('h3').textContent,
      link: room.querySelector('.explore-room-btn').getAttribute('href'),
      alt: room.querySelector('img').getAttribute('alt')
    }));

    // 2. Continuous Floating Animation
    rooms.forEach((room, i) => {
      gsap.to(room, {
        y: `+=${15 + i * 2}`,
        x: `+=${i % 2 === 0 ? 5 : -5}`,
        rotation: i % 2 === 0 ? "+=2" : "-=2", // Subtle floating rotation
        duration: 2.5 + i * 0.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });

    // 3. Professional Rotation Sequence
    function rotateRooms() {
      const tl = gsap.timeline();

      // Staggered fade out (sequential)
      tl.to(rooms, {
        opacity: 0,
        scale: 0.97,
        duration: 0.6,
        stagger: 0.1, // Creates the sequential look
        ease: "power2.in"
      });

      // Swap content while invisible
      tl.add(() => {
        roomData.push(roomData.shift());
        rooms.forEach((room, index) => {
          const data = roomData[index];
          room.querySelector('img').src = data.img;
          room.querySelector('img').alt = data.alt || "";
          room.querySelector('h3').textContent = data.title;
          room.querySelector('.explore-room-btn').setAttribute('href', data.link);
        });
      });

      // Staggered fade in (sequential)
      tl.to(rooms, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
      });
    }

    // Run the sequence every 4.5 seconds (including transition time)
    setInterval(rotateRooms, 4500);
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

  // --- CONTACT FORM VALIDATION ---
  const contactForm = document.querySelector('.form-box form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      let isValid = true;
      const name = contactForm.querySelector('input[name="name"]');
      const email = contactForm.querySelector('input[name="email"]');
      const phone = contactForm.querySelector('input[name="phone"]');
      const subject = contactForm.querySelector('input[name="subject"]');
      const message = contactForm.querySelector('textarea[name="message"]');

      // Helper to set error
      const setError = (el, condition) => {
        if (condition) {
          el.classList.add('form-error');
          isValid = false;
        } else {
          el.classList.remove('form-error');
        }
      };

      // Name: Min 2 chars
      setError(name, name.value.trim().length < 2);

      // Email: Basic Regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setError(email, !emailRegex.test(email.value.trim()));

      // Phone: Exactly 10 digits
      const phoneClean = phone.value.replace(/\D/g, '');
      setError(phone, phoneClean.length !== 10);
      
      // If phone field is inside a wrapper, color the wrapper too
      const phoneField = contactForm.querySelector('.phone-field');
      if (phoneField) {
        if (phoneClean.length !== 10) phoneField.classList.add('form-error');
        else phoneField.classList.remove('form-error');
      }

      // Subject: Min 3 chars
      setError(subject, subject.value.trim().length < 3);

      // Message: Min 10 chars
      setError(message, message.value.trim().length < 10);

      if (!isValid) {
        e.preventDefault();
        // Option: Show a small alert or just rely on CSS
        alert("Please fill all fields correctly. Phone must be 10 digits.");
      }
    });

    // Clear error on input
    contactForm.querySelectorAll('input, textarea').forEach(el => {
      el.addEventListener('input', () => {
        el.classList.remove('form-error');
        const phoneField = contactForm.querySelector('.phone-field');
        if (phoneField && el.name === 'phone') phoneField.classList.remove('form-error');
      });
    });
  }
});