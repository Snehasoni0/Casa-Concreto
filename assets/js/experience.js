const experiences = [
  { title: "Concrete Sculpting", icon: "fa-solid fa-hammer", desc: "Unleash your creativity with hands-on concrete sculpting sessions.", image: "../../assets/images/experience/workshop.jpg" },
  { title: "Barbecue Oracle", icon: "fa-solid fa-fire-burner", desc: "Indulge yourself in warm flames and sizzling delicacies.", image: "../../assets/images/experience/barbeque.jpg" },
  { title: "Luxury Stay", icon: "fa-solid fa-crown", desc: "Designed to elevate your retreat with curated luxury moments.", image: "../../assets/images/experience/3-luxury-setup-scaled.jpg" },
  { title: "Bonfire Nights", icon: "fa-solid fa-fire", desc: "Enjoy cozy evenings around a glowing bonfire in our garden.", image: "../../assets/images/experience/6.-Bonfire-scaled.jpg" },
  { title: "Floating Breakfast", icon: "fa-solid fa-water", desc: "Begin your morning with gourmet delights by the pool.", image: "../../assets/images/experience/new-floating-tray (1).jpg" },
  { title: "Langa & Live Music", icon: "fa-solid fa-music", desc: "Immerse yourself in enchanting tunes of traditional Langa music.", image: "../../assets/images/experience/langa.jpg" },
  { title: "Village Safari", icon: "fa-solid fa-jeep", desc: "Explore the rustic charm of nearby villages with guided safaris.", image: "../../assets/images/experience/village-1280.jpg" },
  { title: "Yoga Bliss", icon: "fa-solid fa-spa", desc: "Reconnect with your inner self through guided yoga sessions.", image: "../../assets/images/experience/8.-Yoga-scaled.jpg" },
  { title: "Bird Watching", icon: "fa-solid fa-binoculars", desc: "Spot native species while enjoying the tranquil environment.", image: "../../assets/images/experience/bird.jpg" }
];

document.addEventListener('DOMContentLoaded', () => {

  // 1. Horizontal Gallery
  const gallery = document.getElementById('experience-gallery');
  if (gallery) {
    gallery.innerHTML = experiences.map((exp, i) => {
      const variantClass = (i % 3 === 0) ? 'exp-tall' : (i % 3 === 1) ? 'exp-wide' : 'exp-med';
      return `
            <div data-aos="fade-up" data-aos-delay="${i * 100}" class="exp-gallery-item ${variantClass}">
              <img src="${exp.image}" alt="${exp.title}" class="lux-parallax">
              <div class="exp-item-overlay">
                <h3>${exp.title}</h3>
              </div>
            </div>`;
    }).join('');
  }

  // 2. Zigzag Magazine List
  const detailedList = document.getElementById('experience-list');
  if (detailedList) {
    let html = '';
    let expIndex = 0;
    let rowCounter = 0;

    while (expIndex < experiences.length) {
      const exp = experiences[expIndex];
      const nextExp = experiences[expIndex + 1];
      const isAlternate = rowCounter % 2 !== 0;
      const isDouble = rowCounter % 2 === 0;

      if (isDouble && nextExp) {
        html += `
            <div class="exp-list-row row-double ${isAlternate ? 'row-reverse' : ''}" data-aos="fade-up" data-mag-flip="double">
              <div class="exp-col exp-side-img overflow-hidden">
                <img src="${exp.image}" alt="${exp.title}" class="lux-parallax">
              </div>
              <div class="exp-col exp-text-col">
                <div class="exp-text-inner">
                  <span class="exp-number">Artisan Experience — 0${expIndex + 1}</span>
                  <h3 class="exp-title">${exp.title}</h3>
                  <div class="exp-divider"></div>
                  <p class="exp-description">${exp.desc}</p>
                  <a href="../contactus.html" class="casa-btn-simple">Reserve Now</a>
                </div>
              </div>
              <div class="exp-col exp-side-img overflow-hidden">
                <img src="${nextExp.image}" alt="${nextExp.title}" class="secondary-img lux-parallax">
              </div>
            </div>
            <div class="exp-magazine-breaker" data-aos="fade-in">
                <span>CASA CONCRETO</span>
            </div>
          `;
        expIndex++; 
      } else {
        const isReversed = rowCounter % 4 === 1;
        html += `
            <div class="exp-list-row row-single ${isReversed ? 'row-reverse' : ''}" data-aos="${isReversed ? 'fade-left' : 'fade-right'}">
              <div class="exp-col exp-image-col overflow-hidden">
                <img src="${exp.image}" alt="${exp.title}" class="lux-parallax">
              </div>
              <div class="exp-col exp-text-col">
                <div class="exp-text-inner">
                  <span class="exp-number">Curated Moment — 0${expIndex + 1}</span>
                  <h3 class="exp-title">${exp.title}</h3>
                  <div class="exp-divider"></div>
                  <p class="exp-description">${exp.desc}</p>
                  <a href="../contactus.html" class="casa-btn-simple">Reserve Experience</a>
                </div>
              </div>
            </div>
            <div class="exp-magazine-breaker" data-aos="fade-in">
                <span>CASA CONCRETO</span>
            </div>
          `;
      }
      expIndex++;
      rowCounter++;
    }
    detailedList.innerHTML = html;
  }

  // --- GSAP SMOOTH FLIP ---
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Flip logic for Double Row (Exchanging 2 images)
    gsap.utils.toArray('[data-mag-flip="double"]').forEach(row => {
        const left = row.querySelector('.exp-side-img:first-child');
        const right = row.querySelector('.exp-side-img:last-child');
        
        row.addEventListener('mouseenter', () => {
            gsap.to(left, { xPercent: row.classList.contains('row-reverse') ? -200 : 200, duration: 1.5, ease: "power4.inOut" });
            gsap.to(right, { xPercent: row.classList.contains('row-reverse') ? 200 : -200, duration: 1.5, ease: "power4.inOut" });
        });
        row.addEventListener('mouseleave', () => {
            gsap.to([left, right], { xPercent: 0, duration: 1.5, ease: "power4.inOut" });
        });
    });

    // Parallax Logic
    gsap.utils.toArray('.lux-parallax').forEach(img => {
      gsap.to(img, {
        y: "40px",
        ease: "none",
        scrollTrigger: {
          trigger: img.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5
        }
      });
    });

    // Staggered reveals
    gsap.utils.toArray('.exp-text-inner').forEach(text => {
      gsap.from(text.children, {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: text,
          start: "top 95%"
        }
      });
    });
  }
});