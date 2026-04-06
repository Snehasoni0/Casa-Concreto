const experiences = [
  { title: "Concrete Sculpting", icon: "fa-solid fa-hammer", desc: "Unleash your creativity with hands-on concrete sculpting sessions.", image: "https://res.cloudinary.com/dxaj4o4xh/image/upload/v1775199411/workshop_gmy77h.jpg" },
  { title: "Barbecue Oracle", icon: "fa-solid fa-fire-burner", desc: "Indulge yourself in warm flames and sizzling delicacies.", image: "https://res.cloudinary.com/dxaj4o4xh/image/upload/v1775199410/barbeque_ici6y6.jpg" },
  { title: "Luxury Stay", icon: "fa-solid fa-crown", desc: "Designed to elevate your retreat with curated luxury moments.", image: "https://res.cloudinary.com/dxaj4o4xh/image/upload/v1775199409/3-luxury-setup-scaled_ft49ef.jpg" },
  { title: "Bonfire Nights", icon: "fa-solid fa-fire", desc: "Enjoy cozy evenings around a glowing bonfire in our garden.", image: "https://res.cloudinary.com/dxaj4o4xh/image/upload/v1775199410/6.-Bonfire-scaled_vbqi80.jpg" },
  { title: "Floating Breakfast", icon: "fa-solid fa-water", desc: "Begin your morning with gourmet delights by the pool.", image: "https://res.cloudinary.com/dxaj4o4xh/image/upload/v1775199411/new-floating-tray_1_krm2tt.jpg" },
  { title: "Langa & Live Music", icon: "fa-solid fa-music", desc: "Immerse yourself in enchanting tunes of traditional Langa music.", image: "https://res.cloudinary.com/dxaj4o4xh/image/upload/v1775199411/langa_xxi99y.jpg" },
  { title: "Village Safari", icon: "fa-solid fa-jeep", desc: "Explore the rustic charm of nearby villages with guided safaris.", image: "https://res.cloudinary.com/dxaj4o4xh/image/upload/v1775199411/village-1280_mct134.jpg" },
  { title: "Yoga Bliss", icon: "fa-solid fa-spa", desc: "Reconnect with your inner self through guided yoga sessions.", image: "https://res.cloudinary.com/dxaj4o4xh/image/upload/v1775199410/8.-Yoga-scaled_iipkhj.jpg" },
  { title: "Bird Watching", icon: "fa-solid fa-binoculars", desc: "Spot native species while enjoying the tranquil environment.", image: "https://res.cloudinary.com/dxaj4o4xh/image/upload/v1775199410/bird_fhprlw.jpg" }
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

});