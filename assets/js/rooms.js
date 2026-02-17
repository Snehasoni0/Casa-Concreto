if (document.querySelector(".mySwiper") && typeof Swiper !== "undefined") {

  new Swiper(".mySwiper", {
    loop: true,

    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
  });

}
