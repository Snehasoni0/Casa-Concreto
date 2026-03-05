const experiences = [

  {
    title: "Concrete Sculpting Workshop",
    desc: "Unleash your creativity with hands-on concrete sculpting sessions. Learn the basics of shaping, molding, and crafting unique art pieces under expert guidance.",
    image: "../../assets/images/experience/workshop.jpg"
  },

  {
    title: "Barbecue Oracle",
    desc: "Indulge yourself in warm flames and sizzling delicacies. Experience the joy of live barbecue nights where flavors meet fire in a cozy outdoor setting.",
    image: "../../assets/images/experience/barbeque.jpg"
  },

  {
    title: "Luxury Stay Experiences",
    desc: "Designed to elevate your Casa Concreto retreat, enjoy curated luxury moments including private dining setups, personalized services, and tranquil ambience.",
    image: "../../assets/images/experience/3-luxury-setup-scaled.jpg"
  },

  {
    title: "Casa Concreto Bonfire Nights",
    desc: "Enjoy cozy evenings around a glowing bonfire in our spacious garden, creating warm memories under the starlit sky with friends and family.",
    image: "../../assets/images/experience/6.-Bonfire-scaled.jpg"
  },


  {
    title: "Floating Tray Breakfast",
    desc: "Begin your morning with a floating breakfast experience by the pool, offering gourmet delights served on elegant trays amidst calming waters.",
    image: "../../assets/images/experience/new-floating-tray (1).jpg"
  },

  {
    title: "Langa & Live Music",
    desc: "Elevate your stay with a symphony of cultural richness. Immerse yourself in enchanting tunes of traditional Langa music or soulful melodies, adding an extraordinary dimension to your Casa Concreto experience.",
    image: "../../assets/images/experience/langa.jpg"
  },

  {
    title: "Village Safari",
    desc: "Explore the rustic charm of nearby villages with guided safaris, offering insights into local culture, traditions, and rural life experiences.",
    image: "../../assets/images/experience/village-1280.jpg"
  },

  {
    title: "Casa Concreto Yoga Bliss",
    desc: "Reconnect with your inner self through guided yoga sessions held in peaceful surroundings, designed to restore balance and mindfulness.",
    image: "../../assets/images/experience/8.-Yoga-scaled.jpg"
  },

  {
    title: "Bird Watching",
    desc: "Immerse yourself in nature with peaceful bird watching experiences, spotting native species while enjoying the tranquil environment around Casa Concreto.",
    image: "../../assets/images/experience/bird.jpg"
  }

];

const items = document.querySelectorAll(".experience-item");

items.forEach((item, index) => {

  const img = item.querySelector(".exp-img");

  // alternate image position
  if(index % 2 !== 0){
    item.classList.add("reverse");
  }

  // alternate orientation
  if(index % 2 === 0){
    img.classList.add("vertical");
  } else{
    img.classList.add("horizontal");
  }

});


