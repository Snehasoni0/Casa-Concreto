(function() {
  const currentScript = document.currentScript;
  const src = currentScript.getAttribute('src');
  const basePath = src.replace('assets/js/header.js', '');

  const headerHTML = `
  <!-- header section started -->
  <header class="custom-navbar">
    <nav>
      <div class="logo">
        <a href="${basePath}index.html">
          <img loading="lazy" src="${basePath}assets/images/casa-concreto-logo.png" alt="logo">
        </a>
      </div>

      <div class="hamburger">&#9776;</div>
      <div class="close-menu">&#10005;</div>

      <div class='menu'><ul>
        <li><a href='${basePath}pages/about.html'>ABOUT</a></li>
        <li class='has-dropdown'>THEMED ROOMS 
          <ul class='dropdown'>
            <li><a href='${basePath}pages/rooms/insitu.html'>Insitu</a></li>
            <li><a href='${basePath}pages/rooms/woodlogs.html'>Wood Logs</a></li>
            <li><a href='${basePath}pages/rooms/wabisabi.html'>Wabi-Sabi</a></li>
            <li><a href='${basePath}pages/rooms/stamping.html'>Stamping</a></li>
            <li><a href='${basePath}pages/rooms/black-stone.html'>Black Stone</a></li>
          </ul>
        </li>
        <li class='has-dropdown'>DISCOVER 
          <ul class='dropdown'>
            <li><a href='${basePath}pages/discover/Amenities.html'>Amenities</a></li>
            <li><a href='${basePath}pages/discover/gallery.html'>Gallery</a></li>
            <li><a href='${basePath}pages/discover/blog.html'>Blog</a></li>
          </ul>
        </li>
        <li><a href='${basePath}pages/Experience.html'>EXPERIENCE</a></li>
        <li><a href='${basePath}pages/faq.html'>FAQS</a></li>
        <li><a href='${basePath}pages/contactus.html'>CONTACT</a></li>
      </ul></div>
    </nav>
  </header>
  <!-- header section ended -->
  `;

  currentScript.insertAdjacentHTML('beforebegin', headerHTML);
})();
