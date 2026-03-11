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

// const track = document.getElementById('wheelTrack');
// let currentIndex = 0;

// function init() {
//   experiences.forEach((exp, i) => {
//     const div = document.createElement('div');
//     div.className = `nav-item ${i === 0 ? 'active' : ''}`;
//     // Rendering FontAwesome Icon
//     div.innerHTML = `<i class="${exp.icon}"></i><h3>${exp.title}</h3>`;
//     track.appendChild(div);
//   });
//   updateStage(0);
//   startLoop();
// }
// function updateStage(index) {
//   const data = experiences[index];

//   // Left Side Update
//   const imgEl = document.getElementById('activeImg');
//   imgEl.style.opacity = '0';
//   setTimeout(() => {
//     imgEl.src = data.image;
//     document.getElementById('activeTitle').innerText = data.title;
//     document.getElementById('activeDesc').innerText = data.desc;
//     document.getElementById('activeNum').innerText = `0${index + 1}`;
//     imgEl.style.opacity = '1';
//   }, 300);

//   // Right Side Update
//   const allItems = document.querySelectorAll('.nav-item');
//   allItems.forEach((item, i) => item.classList.toggle('active', i === index));

//   // RESPONSIVE MATH
//   // Check if we are on mobile (matches the CSS media query)
//   const isMobile = window.innerWidth <= 991;
//   const itemHeight = isMobile ? 80 : 120; // 80px for mobile, 120px for desktop

//   // Offset logic to keep active item in the middle (2nd slot)
//   const offset = -(index * itemHeight) + itemHeight;

//   const track = document.getElementById('wheelTrack');
//   track.style.transform = `translateY(${offset}px)`;
// }

// function startLoop() {
//   setInterval(() => {
//     currentIndex = (currentIndex + 1) % experiences.length;
//     updateStage(currentIndex);
//   }, 4000);
// }

// init();

// Wrap everything in this listener to prevent "null" errors
document.addEventListener('DOMContentLoaded', () => {
    
    const pattern = [
      'black', 'image', 'white',  // Row 1
      'image', 'black', 'image',  // Row 2
      'white', 'image', 'black',  // Row 3
      'image', 'white', 'image',  // Row 4
      'black', 'image', 'white',  // Row 5
      'image', 'black', 'image'   // Row 6
    ];

    const grid = document.getElementById('experience-grid');

    // Safety check: only run if the grid exists on this page
    if (grid) {
        let textIdx = 0;
        let imgIdx = 0;

        const html = pattern.map(type => {
          if (type === 'image') {
            const data = experiences[imgIdx % experiences.length];
            imgIdx++;
            return `
              <div class="tile image-tile">
                <img src="${data.image}" alt="${data.title}">
              </div>`;
          } else {
            const data = experiences[textIdx % experiences.length];
            const bgColor = type === 'black' ? 'bg-black' : 'bg-white';
            textIdx++;
            return `
              <div class="tile text-tile ${bgColor}">
                <h3>${data.title}</h3>
                <p>${data.desc}</p>
              </div>`;
          }
        }).join('');

        grid.innerHTML = html;
    } else {
        console.warn("Element #experience-grid not found on this page.");
    }
});