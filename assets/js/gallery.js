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
const galleryModal = document.getElementById("galleryModal");
const galleryModalImage = document.getElementById("galleryModalImage");

let currentIndex = 0;

images.forEach((img, index) => {
  const image = document.createElement("img");
  image.src = img;
  image.setAttribute("data-aos", "fade-up");
  image.setAttribute("data-aos-duration", "800");

  image.addEventListener("click", () => {
    openModal(index);
  });

  grid.appendChild(image);
});

// Refresh AOS to detect dynamic elements
if (window.AOS) {
    AOS.refresh();
}


function openModal(index) {
  currentIndex = index;
  galleryModal.classList.add("active");
  galleryModalImage.src = images[index];
}

document.querySelector(".close").onclick = () => {
  galleryModal.classList.remove("active");
};

document.querySelector(".next").onclick = () => {
  currentIndex = (currentIndex + 1) % images.length;
  galleryModalImage.src = images[currentIndex];
};

document.querySelector(".prev").onclick = () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  galleryModalImage.src = images[currentIndex];
};
