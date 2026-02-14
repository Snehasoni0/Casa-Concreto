const images = [
"../assets/images/gallery/casa-concreto-img1.jpg",
"../assets/images/gallery/casa-concreto-img2.jpg",
"../assets/images/gallery/casa-concreto-img3.jpg",
"../assets/images/gallery/casa-concreto-img4.jpg",
"../assets/images/gallery/casa-concreto-img5.jpg",
"../assets/images/gallery/casa-concreto-img6.jpg",
"../assets/images/gallery/casa-concreto-img7.jpg",
"../assets/images/gallery/casa-concreto-img8.jpg",
"../assets/images/gallery/casa-concreto-img9.jpg",
"../assets/images/gallery/casa-concreto-img10.jpg",
"../assets/images/gallery/casa-concreto-img11.jpg",
"../assets/images/gallery/casa-concreto-img12.jpg",
"../assets/images/gallery/casa-concreto-img13.jpg",
"../assets/images/gallery/casa-concreto-img14.jpg",
"../assets/images/gallery/casa-concreto-img15.jpg",
"../assets/images/gallery/casa-concreto-img16.jpg",
"../assets/images/gallery/casa-concreto-img17.jpg",
"../assets/images/gallery/casa-concreto-img18.jpg",
"../assets/images/gallery/casa-concreto-img19.jpg",
"../assets/images/gallery/casa-concreto-img20.jpg",
"../assets/images/gallery/casa-concreto-img21.jpg",
"../assets/images/gallery/casa-concreto-img22.jpg",
"../assets/images/gallery/casa-concreto-img23.jpg",
"../assets/images/gallery/casa-concreto-img24.jpg",
"../assets/images/gallery/casa-concreto-img25.jpg",
"../assets/images/gallery/casa-concreto-img26.jpg",
"../assets/images/gallery/casa-concreto-img27.jpg",
];


const grid = document.getElementById("galleryGrid");
const galleryModal = document.getElementById("galleryModal");
const galleryModalImage = document.getElementById("galleryModalImage");

let currentIndex = 0;

/* BUILD GRID */

images.forEach((img, index)=>{
const image = document.createElement("img");
image.src = img;

image.addEventListener("click",()=>{
openModal(index);
});

grid.appendChild(image);
});

/* MODAL FUNCTIONS */

function openModal(index){
currentIndex = index;
galleryModal.classList.add("active");
galleryModalImage.src = images[index];
}

document.querySelector(".close").onclick = ()=>{
galleryModal.classList.remove("active");
};

document.querySelector(".next").onclick = ()=>{
currentIndex = (currentIndex + 1) % images.length;
galleryModalImage.src = images[currentIndex];
};

document.querySelector(".prev").onclick = ()=>{
currentIndex = (currentIndex - 1 + images.length) % images.length;
galleryModalImage.src = images[currentIndex];
};
