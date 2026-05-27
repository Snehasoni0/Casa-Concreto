const experiences = [
  {
    title: "Concrete Sculpting",
    icon: "fa-solid fa-hammer",
    desc: "Discover the art of concrete sculpting through immersive hands-on workshops designed for creative minds. Learn unique crafting techniques while shaping beautiful decorative pieces in a peaceful luxury retreat setting. Perfect for couples and travelers seeking highly rewarding creative activities in Rajasthan.",
    image: "https://res.cloudinary.com/dx1jbyib2/image/upload/f_auto,q_auto/v1776243281/workshop_axg3nt.jpg"
  },
  {
    title: "Barbecue Oracle",
    icon: "fa-solid fa-fire-burner",
    desc: "Experience unforgettable barbecue evenings under the open sky with live grilling, warm bonfire vibes, and flavorful delicacies. Enjoy premium outdoor dining surrounded by lush nature and relaxing music. A truly perfect luxury getaway experience for families, couples, and friends seeking lovely starlit nights.",
    image: "https://res.cloudinary.com/dx1jbyib2/image/upload/f_auto,q_auto/v1776243261/barbeque_upvnwc.jpg"
  },
  {
    title: "Luxury Stay",
    icon: "fa-solid fa-crown",
    desc: "Indulge in a thoughtfully curated luxury stay featuring elegant interiors, exquisite hospitality, and peaceful surroundings. Every corner is designed to offer comfort, sophistication, and relaxation for a truly premium retreat experience. Ideal for romantic escapes, weekend staycations, and peaceful holidays.",
    image: "https://res.cloudinary.com/dx1jbyib2/image/upload/f_auto,q_auto/v1776243262/3-luxury-setup-scaled_ekvaty.jpg"
  },
  {
    title: "Bonfire Nights",
    icon: "fa-solid fa-fire",
    desc: "Spend magical evenings around a cozy bonfire surrounded by beautiful landscapes and starry skies. Enjoy storytelling, music, warm beverages, and memorable conversations in a serene outdoor setting. This is a premium nighttime experience crafted to bring families, couples, and close friends together naturally.",
    image: "https://res.cloudinary.com/dx1jbyib2/image/upload/f_auto,q_auto/v1776243258/6.-Bonfire-scaled_asagtq.jpg"
  },
  {
    title: "Floating Breakfast",
    icon: "fa-solid fa-water",
    desc: "Elevate your mornings with a luxurious floating breakfast experience served beside the pool in a calm and highly refreshing atmosphere. Savor gourmet dishes, fresh beverages, and beautifully presented platters designed for a premium vacation feel. Perfect for couples seeking happy moments and serene mornings.",
    image: "https://res.cloudinary.com/dx1jbyib2/image/upload/f_auto,q_auto/v1776243272/new-floating-tray_1_bc994w.jpg"
  },
  {
    title: "Langa & Live Music",
    icon: "fa-solid fa-music",
    desc: "Immerse yourself in the soulful rhythms of traditional Langa folk music performed live by talented local artists. Experience Rajasthan's rich cultural heritage through mesmerizing melodies, authentic instruments, and vibrant performances. A truly enchanting evening that blends raw luxury with local tradition.",
    image: "https://res.cloudinary.com/dx1jbyib2/image/upload/f_auto,q_auto/v1776243266/langa_kdppvk.jpg"
  },
  {
    title: "Village Safari",
    icon: "fa-solid fa-jeep",
    desc: "Explore the authentic charm of nearby villages through guided safari tours filled with culture, heritage, and scenic beauty. Witness traditional lifestyles, local craftsmanship, and untouched rural landscapes during your adventure. An enriching travel experience for guests seeking cultural tours in Rajasthan.",
    image: "https://res.cloudinary.com/dx1jbyib2/image/upload/f_auto,q_auto/v1776243265/village-1280_phfivd.jpg"
  },
  {
    title: "Yoga Bliss",
    icon: "fa-solid fa-spa",
    desc: "Reconnect your mind and body with peaceful yoga sessions conducted in a serene, calm natural environment. Practice mindful breathing, meditation, and guided wellness routines designed to refresh your energy and inner balance. A rejuvenating stay perfect for relaxation, healing, and holistic wellness retreats.",
    image: "https://res.cloudinary.com/dx1jbyib2/image/upload/f_auto,q_auto/v1776243261/8.-Yoga-scaled_o69pum.jpg"
  },
  {
    title: "Bird Watching",
    icon: "fa-solid fa-binoculars",
    desc: "Enjoy peaceful bird watching experiences surrounded by nature and scenic landscapes rich with native bird species. Wake up to soothing sounds and observe colorful birds in their natural habitat during quiet morning hours. Perfect for nature enthusiasts, keen photographers, and travelers seeking true serenity.",
    image: "https://res.cloudinary.com/dx1jbyib2/image/upload/f_auto,q_auto/v1776243259/bird_xr0xjj.jpg"
  }
];

document.addEventListener('DOMContentLoaded', () => {

  // 1. Horizontal Gallery
  const gallery = document.getElementById('experience-gallery');
  if (gallery) {
    gallery.innerHTML = experiences.map((exp, i) => {
      const variantClass = (i % 3 === 0) ? 'exp-tall' : (i % 3 === 1) ? 'exp-wide' : 'exp-med';
      return `
            <div data-aos="fade-up" data-aos-delay="${i * 100}" class="exp-gallery-item ${variantClass}">
              <img src="${exp.image}" alt="${exp.title}" class="lux-parallax" loading="lazy">
              <div class="exp-item-overlay">
                <h3>${exp.title}</h3>
              </div>
            </div>`;
    }).join('');
  }

  // 2. Zigzag Magazine List (Fixed Jumps & Double Image Match)
  const detailedList = document.getElementById('experience-list');
  if (detailedList) {
    let html = '';
    let expIndex = 0;
    let rowCounter = 0;

    while (expIndex < experiences.length) {
      const exp = experiences[expIndex];
      const isAlternate = rowCounter % 2 !== 0;
      
      // Alternating row layout type: Double Image vs Single Image
      const isDoubleRow = rowCounter % 2 === 0;

      if (isDoubleRow) {
        // Double Image Row: Uses the exact SAME item's image twice, showing its single content block centered
        html += `
            <div class="exp-list-row row-double ${isAlternate ? 'row-reverse' : ''}" data-aos="fade-up" data-mag-flip="double">
              <div class="exp-col exp-side-img overflow-hidden">
                <img src="${exp.image}" alt="${exp.title} - View 1" class="lux-parallax" loading="lazy">
              </div>
              <div class="exp-col exp-text-col">
                <div class="exp-text-inner">
                  <span class="exp-number">Curated Experience — ${(expIndex + 1).toString().padStart(2, '0')}</span>
                  <h3 class="exp-title">${exp.title.replace(' ', '<br>')}</h3>
                  <div class="exp-divider"></div>
                  <p class="exp-description">${exp.desc}</p>
                  <a href="contactus.html" class="casa-btn-simple">Reserve Experience</a>
                </div>
              </div>
              <div class="exp-col exp-side-img overflow-hidden">
                <img src="${exp.image}" alt="${exp.title} - View 2" class="secondary-img lux-parallax" loading="lazy">
              </div>
            </div>
            <div class="exp-magazine-breaker" data-aos="fade-in">
                <span>CASA CONCRETO</span>
            </div>
          `;
      } else {
        // Single Image Row: Regular layout with one side image and one text column
        const isReversed = Math.floor(rowCounter / 2) % 2 !== 0;
        html += `
            <div class="exp-list-row row-single ${isReversed ? 'row-reverse' : ''}" data-aos="${isReversed ? 'fade-left' : 'fade-right'}">
              <div class="exp-col exp-image-col overflow-hidden">
                <img src="${exp.image}" alt="${exp.title}" class="lux-parallax" loading="lazy">
              </div>
              <div class="exp-col exp-text-col">
                <div class="exp-text-inner">
                  <span class="exp-number">Curated Moment — ${(expIndex + 1).toString().padStart(2, '0')}</span>
                  <h3 class="exp-title">${exp.title}</h3>
                  <div class="exp-divider"></div>
                  <p class="exp-description">${exp.desc}</p>
                  <a href="contactus.html" class="casa-btn-simple">Reserve Experience</a>
                </div>
              </div>
            </div>
            <div class="exp-magazine-breaker" data-aos="fade-in">
                <span>CASA CONCRETO</span>
            </div>
          `;
      }
      
      // Increments sequentially by exactly 1 item per row. No data gaps anymore!
      expIndex++;
      rowCounter++;
    }
    detailedList.innerHTML = html;
  }

});