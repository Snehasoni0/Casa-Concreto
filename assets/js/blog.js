const blogs = [

{
  title: "Maximizing Your Luxury Stay Experience",
  desc: "Learn top tips for making the most of your Casa Concreto retreat, from personalized services to indulgent amenities.",
  image: "../../assets/images/about/villa.jpeg",
  featured: true
},

{
  title: "Tips for Planning the Perfect Romantic Getaway",
  desc: "Create unforgettable moments with curated experiences.",
  image: "../../assets/images/blog/blogs-2.jpeg",
  path: "../../pages/discover/blog1.html"
},

{
  title: "The Art of Concrete Sculpting",
  desc: "Workshops & inspiration at Casa Concreto.",
  image: "../../assets/images/blog/blogs-3.jpeg",
  path: "../../pages/discover/blog2.html"
},

{
  title: "Poolside Relaxation Essentials",
  desc: "Luxury days by the pool made perfect.",
  image: "../../assets/images/blog/blogs-4.jpeg",
  path: "../../pages/discover/blog3.html"
},

{
  title: "Exquisite Outdoor Dining Under the Stars",
  desc: "An unforgettable candlelit dining experience.",
  image: "../../assets/images/blog/blogs-5.jpeg",
  path: "../../pages/discover/blog4.html"
},

{
  title: "Upcoming Events This Season",
  desc: "What’s happening this month at Casa Concreto.",
  image: "../../assets/images/blog/blogs-6.jpeg",
  path: "../../pages/discover/blog5.html"
},

{
  title: "Wellness & Spa Retreats",
  desc: "Rejuvenate your mind and body.",
  image: "../../assets/images/blog/blogs-7.jpeg",
  path: "../../pages/discover/blog6.html"
}

];


const featuredWrap = document.getElementById("featuredBlog");
const grid = document.getElementById("blogGrid");

blogs.forEach(blog => {

  if(blog.featured){

    featuredWrap.innerHTML = `
      <img src="${blog.image}">
      <div class="featured-text">
        <h2>${blog.title}</h2>
        <p>${blog.desc}</p>
        <a href="../../pages/discover/blog-des.html">Read More →</a>
      </div>
    `;

  } else {

    grid.innerHTML += `
      <div data-aos="fade-up" data-aos-duration="1000" class="blog-card">
        <img src="${blog.image}">
        <h3>${blog.title}</h3>
        <p>${blog.desc}</p>
        <a href="${blog.path}">Read More →</a>
      </div>
    `;
  }

});
