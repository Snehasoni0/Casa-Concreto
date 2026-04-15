let images = [];

const cloudName = "dx1jbyib2";
const tagName = "gallery";

const grid = document.getElementById("galleryGrid");
const modal = document.getElementById("fullGalleryModal");
const modalImg = document.getElementById("modalFullImage");
const closeBtn = document.querySelector(".modal-close");
const prevBtn = document.querySelector(".modal-nav.prev");
const nextBtn = document.querySelector(".modal-nav.next");
const currentNum = document.getElementById("currentImgNum");
const totalNum = document.getElementById("totalImgNum");
const loader = document.querySelector(".modal-loader");

let currentIndex = 0;

async function loadGalleryImages() {
  try {
    grid.innerHTML = `<p style="grid-column: 1/-1; text-align:center;">Loading images...</p>`;

    const url = `https://res.cloudinary.com/${cloudName}/image/list/${tagName}.json`;
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Failed to fetch images: ${res.status}`);
    }

    const data = await res.json();

    if (!data.resources || !Array.isArray(data.resources)) {
      throw new Error("Invalid Cloudinary response");
    }

    images = data.resources.map((item) => {
      if (item.secure_url) return item.secure_url;
      return `https://res.cloudinary.com/${cloudName}/image/upload/${item.public_id}.${item.format}`;
    });

    totalNum.textContent = images.length;
    grid.innerHTML = "";

    if (images.length === 0) {
      grid.innerHTML = `<p style="grid-column: 1/-1; text-align:center;">No images found.</p>`;
      return;
    }

    images.forEach((img, index) => {
      const image = document.createElement("img");
      image.src = img;
      image.alt = "Casa Concreto Gallery Image";
      image.loading = "lazy";
      image.setAttribute("data-aos", "fade-up");
      image.setAttribute("data-aos-duration", "800");

      image.addEventListener("click", () => {
        openModal(index);
      });

      grid.appendChild(image);
    });

    if (window.AOS) {
      AOS.refresh();
    }
  } catch (error) {
    console.error("Gallery load error:", error);
    grid.innerHTML = `<p style="grid-column: 1/-1; text-align:center; color:red;">Unable to load gallery images.</p>`;
    totalNum.textContent = "0";
  }
}

function openModal(index) {
  if (!images.length) return;

  currentIndex = index;
  updateModalImage();
  modal.classList.add("active");
  document.body.style.overflow = "hidden";

  if (window.lenis) lenis.stop();
}

function closeModal() {
  modal.classList.remove("active");
  document.body.style.overflow = "";

  if (window.lenis) lenis.start();
}

function updateModalImage() {
  if (!images.length) return;

  loader.style.display = "block";
  modalImg.style.opacity = "0";

  const tempImg = new Image();
  tempImg.src = images[currentIndex];

  tempImg.onload = () => {
    modalImg.src = images[currentIndex];
    modalImg.style.opacity = "1";
    loader.style.display = "none";
  };

  tempImg.onerror = () => {
    loader.style.display = "none";
    console.error("Failed to load modal image");
  };

  currentNum.textContent = currentIndex + 1;
}

function nextImage() {
  if (!images.length) return;
  currentIndex = (currentIndex + 1) % images.length;
  updateModalImage();
}

function prevImage() {
  if (!images.length) return;
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateModalImage();
}

if (closeBtn) closeBtn.onclick = closeModal;
if (nextBtn) nextBtn.onclick = nextImage;
if (prevBtn) prevBtn.onclick = prevImage;

const overlay = document.querySelector(".modal-overlay");
if (overlay) overlay.onclick = closeModal;

document.addEventListener("keydown", (e) => {
  if (!modal.classList.contains("active")) return;

  if (e.key === "ArrowRight") nextImage();
  if (e.key === "ArrowLeft") prevImage();
  if (e.key === "Escape") closeModal();
});

loadGalleryImages();