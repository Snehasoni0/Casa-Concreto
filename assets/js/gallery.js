const images = [
  "https://res.cloudinary.com/dxaj4o4xh/image/upload/v1775198382/casa-concreto-img1_kwzda8.jpg",
  "https://res.cloudinary.com/dxaj4o4xh/image/upload/v1775198381/casa-concreto-img2_dmuio0.jpg",
  "https://res.cloudinary.com/dxaj4o4xh/image/upload/v1775198382/casa-concreto-img3_smaept.jpg",
  "https://res.cloudinary.com/dxaj4o4xh/image/upload/v1775198381/casa-concreto-img4_qcsdrs.jpg",
  "https://res.cloudinary.com/dxaj4o4xh/image/upload/v1775198382/casa-concreto-img5_yj8sqn.jpg",
  "https://res.cloudinary.com/dxaj4o4xh/image/upload/v1775198382/casa-concreto-img6_pmyndw.jpg",
  "https://res.cloudinary.com/dxaj4o4xh/image/upload/v1775198383/casa-concreto-img7_yb1z5l.jpg",
  "https://res.cloudinary.com/dxaj4o4xh/image/upload/v1775198383/casa-concreto-img8_unx3f5.jpg",
  "https://res.cloudinary.com/dxaj4o4xh/image/upload/v1775198383/casa-concreto-img9_davgea.jpg",
  "https://res.cloudinary.com/dxaj4o4xh/image/upload/v1775198388/casa-concreto-img10_w3lthb.jpg",
  "https://res.cloudinary.com/dxaj4o4xh/image/upload/v1775198383/casa-concreto-img11_nuwobq.jpg",
  "https://res.cloudinary.com/dxaj4o4xh/image/upload/v1775198384/casa-concreto-img12_hldgww.jpg",
  "https://res.cloudinary.com/dxaj4o4xh/image/upload/v1775198384/casa-concreto-img13_nem9f0.jpg",
  "https://res.cloudinary.com/dxaj4o4xh/image/upload/v1775198384/casa-concreto-img14_na6jya.jpg",
  "https://res.cloudinary.com/dxaj4o4xh/image/upload/v1775198384/casa-concreto-img15_k4bkeb.jpg",
  "https://res.cloudinary.com/dxaj4o4xh/image/upload/v1775198384/casa-concreto-img16_ngrhs5.jpg",
  "https://res.cloudinary.com/dxaj4o4xh/image/upload/v1775198385/casa-concreto-img17_ee1mj7.jpg",
  "https://res.cloudinary.com/dxaj4o4xh/image/upload/v1775198385/casa-concreto-img18_q7uqai.jpg",
  "https://res.cloudinary.com/dxaj4o4xh/image/upload/v1775198385/casa-concreto-img19_g1a4uv.jpg",
  "https://res.cloudinary.com/dxaj4o4xh/image/upload/v1775198385/casa-concreto-img20_ioszop.jpg",
  "https://res.cloudinary.com/dxaj4o4xh/image/upload/v1775198385/casa-concreto-img21_qzniyx.jpg",
  "https://res.cloudinary.com/dxaj4o4xh/image/upload/v1775198386/casa-concreto-img22_qri4df.jpg",
  "https://res.cloudinary.com/dxaj4o4xh/image/upload/v1775198386/casa-concreto-img23_qfnv2z.jpg",
  "https://res.cloudinary.com/dxaj4o4xh/image/upload/v1775198386/casa-concreto-img24_i7o8w4.jpg",
  "https://res.cloudinary.com/dxaj4o4xh/image/upload/v1775198386/casa-concreto-img25_maf1ug.jpg",
  "https://res.cloudinary.com/dxaj4o4xh/image/upload/v1775198382/casa-concreto-img26_owedfd.jpg",
  "https://res.cloudinary.com/dxaj4o4xh/image/upload/v1775198382/casa-concreto-img27_coaogw.jpg",
];


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
totalNum.textContent = images.length;

// Generate Grid
images.forEach((img, index) => {
    const image = document.createElement("img");
    image.src = img;
    image.alt = "Casa Concreto Gallery Image";
    image.setAttribute("data-aos", "fade-up");
    image.setAttribute("data-aos-duration", "800");

    image.addEventListener("click", () => {
        openModal(index);
    });

    grid.appendChild(image);
});

// Refresh AOS
if (window.AOS) {
    AOS.refresh();
}

function openModal(index) {
    currentIndex = index;
    updateModalImage();
    modal.classList.add("active");
    document.body.style.overflow = "hidden"; // Native scroll lock
    if (window.lenis) lenis.stop(); // Lenis scroll lock
}

function closeModal() {
    modal.classList.remove("active");
    document.body.style.overflow = "";
    if (window.lenis) lenis.start();
}

function updateModalImage() {
    loader.style.display = "block";
    modalImg.style.opacity = "0";
    
    const tempImg = new Image();
    tempImg.src = images[currentIndex];
    tempImg.onload = () => {
        modalImg.src = images[currentIndex];
        modalImg.style.opacity = "1";
        loader.style.display = "none";
    };
    
    currentNum.textContent = currentIndex + 1;
}

function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    updateModalImage();
}

function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateModalImage();
}

// Event Listeners
closeBtn.onclick = closeModal;
nextBtn.onclick = nextImage;
prevBtn.onclick = prevImage;

// Click overlay to close
document.querySelector(".modal-overlay").onclick = closeModal;

// Keyboard Navigation
document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("active")) return;
    
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
    if (e.key === "Escape") closeModal();
});
