document.addEventListener("DOMContentLoaded", function () {

  /* ================= SWIPER ================= */

  if (document.querySelector(".roomSwiper")) {

    new Swiper(".roomSwiper", {
      slidesPerView: 2,
      spaceBetween: 30,
      loop: true,

      autoplay: {
        delay: 3000,        // 3 seconds
        disableOnInteraction: false,
      },

      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },

      breakpoints: {
        0: { slidesPerView: 1 },
        768: { slidesPerView: 2 }
      }
    });

  }


  /* ================= MODAL ================= */

  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  const closeBtn = document.querySelector(".modal-close");

  if (modal && modalImg && closeBtn) {

    document.querySelectorAll(".swiper-slide img").forEach(img => {
      img.addEventListener("click", function () {
        modal.style.display = "flex";
        modalImg.src = this.src;
      });
    });

    closeBtn.addEventListener("click", function () {
      modal.style.display = "none";
    });

    modal.addEventListener("click", function (e) {
      if (e.target !== modalImg) {
        modal.style.display = "none";
      }
    });

  }

});